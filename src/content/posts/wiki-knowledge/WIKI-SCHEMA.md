---
title: WIKI-SCHEMA
type: schema
created: 2026-07-25
updated: 2026-07-25
tags: [meta, config]
---

# WIKI-SCHEMA — 个人知识库约定与配置

> 本文件是知识库的「宪法」：定义结构、页面模板、交叉引用规则与工作流。
> 由用户与 LLM 共同演化。LLM 每次操作前应先读本文件。

## 1. 位置（重要）
- **本知识库根目录：`E:\bigdata\bosley\wiki-knowledge\`**（项目级，用户明确指定）。
- ⚠️ 这覆盖了 llm-wiki 技能默认的 `~/.workbuddy/wiki-knowledge/`。今后凡用户提及「知识库 / wiki」，一律使用本项目路径，不要回退到用户级默认路径。
- 原始资料不可变层：`raw/`（图片放 `raw/assets/`）。
- LLM 维护层：`wiki/`（含 `index.md`、`log.md`、`overview.md` 与 `pages/` 子目录）。

## 2. 目录结构
```
E:\bigdata\bosley\wiki-knowledge\
├── raw/                       # 原始资料（不可变，LLM 只读）
│   ├── assets/                # 下载的图片
│   └── README.md              # 投放资料说明
├── wiki/                      # LLM 维护的 markdown
│   ├── index.md               # 内容目录（每次 ingest 更新）
│   ├── log.md                 # 追加式操作日志
│   ├── overview.md            # 全局综述 / 知识图谱概览
│   └── pages/
│       ├── entities/          # 人/物/机构等实体页
│       ├── concepts/          # 概念/理论页
│       ├── sources/           # 单篇资料摘要页
│       ├── comparisons/       # 对比分析页
│       └── syntheses/         # 综合综述页
└── WIKI-SCHEMA.md             # 本文件
```

## 3. 页面模板
```markdown
---
title: 页面标题
type: entity | concept | source-summary | comparison | synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [来源文件名列表]
tags: [标签]
---

# 页面标题

正文。用 [[wiki-links]] 做交叉引用。

## See Also
- [[related-page]]
```
- 文件名用小写连字符（kebab-case），如 `attention-management.md`。
- 页面语言跟随资料与提问语言（默认简体中文）。

## 4. 交叉引用规则
- 相关概念一律用 `[[页面名]]` 双链。
- 每页结尾必有 `## See Also`。
- `index.md` 是唯一目录入口；`overview.md` 是唯一全局综述。
- 出现「提到但没建页」的重要概念 → 记入 overview 的「数据缺口」，下次 ingest 或 lint 时补建。

## 5. 分类（可随使用演化）
- **个人 Personal**：目标、健康、习惯、日记
- **阅读 Reading**：书、文章、播客笔记
- **项目 Projects**：项目笔记、决策、复盘
- **研究 Research**：论文、主题研究
- **工作 Work**：会议、文档、流程
- **灵感 Ideas**：随想、点子

## 6. 工作流
### Ingest（摄入）——用户投放资料后
1. 读资料，与用户讨论要点
2. 在 `wiki/pages/sources/` 写摘要页
3. 更新 `wiki/index.md`（按分类登记）
4. 更新相关实体/概念/综述页（一次摄入可触及 10–15 页）
5. 在 `wiki/log.md` 追加一条 `## [YYYY-MM-DD] ingest | 标题`
6. 建议一次摄入一份资料，质量优先

### Query（提问）——针对知识库问答
1. 读 `index.md` 找相关页
2. 读那些页，综合作答并标注来源
3. **好的回答要回填为新页**（对比/分析/联系），别让洞察消失在聊天里

### Lint（体检）——定期健康检查
查找：页间矛盾 / 被新来源取代的过时论断 / 无入链的孤儿页 / 提到却未建页的概念 / 缺失交叉引用 / 可用网搜补的数据缺口。

## 7. 原则
1. 原始资料不可变——绝不修改 `raw/` 内文件
2. LLM 拥有 wiki 层——用户读，LLM 写与维护
3. 知识复利——每次摄入与提问都丰富 wiki
4. 好答案回填——别让分析消失在聊天历史
5. 定期 lint——随增长保持健康
