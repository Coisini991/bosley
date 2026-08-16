/**
 * sync-wiki.cjs — Obsidian 库 → Astro 项目 同步脚本
 *
 * 做三件事：
 *   1. 清理旧的 posts/wiki-knowledge/ 目录（如果还在）
 *   2. 从 Obsidian 库同步 wiki 内容到 src/content/wiki/
 *      - 跳过 raw/ 目录（原始资料不进网站）
 *      - 注入 kind: "wiki"
 *      - 注入 slug: 文件名（让 URL 为 /posts/文件名/）
 *      - 补 published 字段（从 created 取，都没有用今天）
 *      - 保留 featured 字段（你在 Obsidian 里手动加的精选标记）
 *      - WIKI-SCHEMA.md 和 log.md 自动加 draft: true
 *   3. 给 src/content/posts/ 下所有 md 加 kind: "post"（如果还没有）
 *
 * 用法：
 *   node scripts/sync-wiki.cjs
 *
 * 日常工作流：
 *   1. 在 Obsidian 里用 LLM skill 整理知识
 *   2. 给精选 wiki 页加 featured: true
 *   3. 运行 node scripts/sync-wiki.cjs
 *   4. pnpm dev 预览
 *   5. git add + commit + push
 */

const fs = require("fs");
const path = require("path");

// ===== 配置 =====
const OBSIDIAN_ROOT = "E:\\bigdata\\bosley\\wiki-knowledge";
const PROJECT_ROOT = path.resolve(__dirname, "..");
const WIKI_TARGET = path.join(PROJECT_ROOT, "src", "content", "wiki");
const POSTS_DIR = path.join(PROJECT_ROOT, "src", "content", "posts");
const MARKDOWN_RE = /\.(md|mdx)$/i;

// 特殊文件：自动加 draft: true
const DRAFT_FILES = new Set(["WIKI-SCHEMA.md", "log.md"]);

// ===== 主逻辑（用动态 import 加载 gray-matter，兼容 ESM 包）=====
(async () => {
	const matter = (await import("gray-matter")).default;

	console.log("=== sync-wiki.cjs ===\n");

	// 检查 Obsidian 库是否存在
	if (!fs.existsSync(OBSIDIAN_ROOT)) {
		console.error(`✗ Obsidian 库不存在: ${OBSIDIAN_ROOT}`);
		console.error("  请检查路径是否正确，或修改脚本顶部的 OBSIDIAN_ROOT");
		process.exit(1);
	}

	// 1. 清理旧目录
	console.log('1. 清理旧的 posts/wiki-knowledge/ ...');
	const oldDir = path.join(POSTS_DIR, "wiki-knowledge");
	if (fs.existsSync(oldDir)) {
		fs.rmSync(oldDir, { recursive: true });
		console.log("   ✓ 已删除 posts/wiki-knowledge/");
	} else {
		console.log("   - 不存在，跳过");
	}

	// 2. 同步 Obsidian 库 → src/content/wiki/
	console.log("\n2. 同步 Obsidian 库 → src/content/wiki/ ...");

	// 同步前（删除之前！）：读取项目里现有的 featured 值，这样用户在 VSCode 里改的 featured: true 不会被覆盖
	// 缓存 key 使用「相对路径 + 文件名」（不带扩展名），避免不同子目录同名文件冲突
	const featuredCache = new Map();
	if (fs.existsSync(WIKI_TARGET)) {
		function readExistingFeatured(dir, relPath = "") {
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			for (const entry of entries) {
				const full = path.join(dir, entry.name);
				const rel = path.join(relPath, entry.name);
				if (entry.isDirectory()) {
					readExistingFeatured(full, rel);
					continue;
				}
				if (!MARKDOWN_RE.test(entry.name)) continue;
				try {
					const parsed = matter(fs.readFileSync(full, "utf8"));
					if (parsed.data.featured !== undefined) {
						const cacheKey = rel.replace(MARKDOWN_RE, "");
						featuredCache.set(cacheKey, parsed.data.featured);
					}
				} catch {}
			}
		}
		readExistingFeatured(WIKI_TARGET);
	}

	// 读完缓存再清空 target 目录，确保和 Obsidian 库完全一致
	if (fs.existsSync(WIKI_TARGET)) {
		fs.rmSync(WIKI_TARGET, { recursive: true });
	}
	fs.mkdirSync(WIKI_TARGET, { recursive: true });

	const slugMap = new Map(); // 检测 slug 冲突
	let wikiCount = 0;

	function walkWiki(srcDir, relPath = "") {
		const entries = fs.readdirSync(srcDir, { withFileTypes: true });
		for (const entry of entries) {
			const srcFull = path.join(srcDir, entry.name);
			const relFull = path.join(relPath, entry.name);

			if (entry.isDirectory()) {
				// 跳过 raw/ 目录（原始资料不进网站）
				if (entry.name === "raw") continue;
				walkWiki(srcFull, relFull);
				continue;
			}

			if (!MARKDOWN_RE.test(entry.name)) continue;

			const raw = fs.readFileSync(srcFull, "utf8");
			let parsed;
			try {
				parsed = matter(raw);
			} catch (e) {
				console.warn(`   ⚠ 解析 frontmatter 失败: ${relFull} (${e.message})`);
				// 当作无 frontmatter 处理
				parsed = { data: {}, content: raw };
			}

			const fm = { ...parsed.data };
			const body = parsed.content;

			// 注入 kind
			fm.kind = "wiki";

			// 注入 slug（文件名，不带扩展名）
			const slug = entry.name.replace(MARKDOWN_RE, "");
			fm.slug = slug;

			// 检测 slug 冲突
			if (slugMap.has(slug)) {
				console.warn(
					`   ⚠ Slug 冲突: "${slug}" 同时出现在 ${slugMap.get(slug)} 和 ${relFull}`,
				);
			} else {
				slugMap.set(slug, relFull);
			}

			// 补 title（从正文 # 提取，或用文件名）
			if (!fm.title) {
				const titleMatch = body.match(/^#\s+(.+)$/m);
				fm.title = titleMatch ? titleMatch[1].trim() : slug;
			}

			// 补 published（从 created 取，都没有用今天），确保是 Date 对象
			if (!fm.published) {
				const dateStr = fm.created || new Date().toISOString().slice(0, 10);
				fm.published = new Date(dateStr);
			} else if (typeof fm.published === "string") {
				fm.published = new Date(fm.published);
			}

			// featured: 优先用 Obsidian 里的值，没有则用项目里现有的值，都没有用 false
			if (fm.featured === undefined) {
				const cacheKey = relFull.replace(MARKDOWN_RE, "");
				fm.featured = featuredCache.get(cacheKey) ?? false;
			}

			// 特殊文件自动加 draft
			if (DRAFT_FILES.has(entry.name)) {
				fm.draft = true;
			}

			// 写入 target
			const dstFull = path.join(WIKI_TARGET, relFull);
			fs.mkdirSync(path.dirname(dstFull), { recursive: true });
			fs.writeFileSync(dstFull, matter.stringify(body, fm));

			console.log(`   ✓ ${relFull}`);
			wikiCount++;
		}
	}

	walkWiki(OBSIDIAN_ROOT);
	console.log(`   共同步 ${wikiCount} 个 wiki 文件`);

	// 3. 给 posts/ 下所有 md 加 kind: "post"
	console.log('\n3. 给 posts/ 加 kind: "post" ...');
	let postCount = 0;

	function walkPosts(dir) {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walkPosts(full);
				continue;
			}
			if (!MARKDOWN_RE.test(entry.name)) continue;

			const raw = fs.readFileSync(full, "utf8");
			let parsed;
			try {
				parsed = matter(raw);
			} catch (e) {
				console.warn(`   ⚠ 解析失败: ${path.relative(POSTS_DIR, full)}`);
				continue;
			}

			// 已有 kind 就跳过
			if (parsed.data.kind) continue;

			parsed.data.kind = "post";
			fs.writeFileSync(full, matter.stringify(parsed.content, parsed.data));
			console.log(`   ✓ ${path.relative(POSTS_DIR, full)}`);
			postCount++;
		}
	}

	walkPosts(POSTS_DIR);
	if (postCount === 0) {
		console.log("   - 所有文件已有 kind 字段，跳过");
	} else {
		console.log(`   共处理 ${postCount} 个 post 文件`);
	}

	// 完成
	console.log("\n✅ 同步完成！");
	console.log("\n下一步：");
	console.log("  1. 在 Obsidian 里给精选 wiki 页加 featured: true");
	console.log("  2. 重新运行此脚本同步");
	console.log("  3. pnpm dev 预览效果");
	console.log("  4. git add + commit + push");
})().catch((err) => {
	console.error("\n✗ 同步失败:", err);
	process.exit(1);
});
