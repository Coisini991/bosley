import { backgroundWallpaper } from "../config";
import type { ImageMetadata } from "astro";

export type BackgroundImages = {
	desktop: string[];
	mobile: string[];
	isMultiple: boolean;
};

// 将单个值或数组统一为数组
const toArray = (src: string | string[] | undefined): string[] => {
	if (!src) return [];
	if (Array.isArray(src)) return src;
	return [src];
};

// 构建期自动扫描 DesktopWallpaper 目录，返回所有 jpg/png/avif 图片路径（排除视频兜底图 hf_21.jpg）
// 使用 import.meta.glob 在构建时静态扫描，新增图片无需改配置即可加入轮播
const DESKTOP_WALLPAPER_BASE = "assets/images/DesktopWallpaper";
const MOBILE_WALLPAPER_BASE = "assets/images/MobileWallpaper";
// 视频兜底图，不能进入轮播
const EXCLUDE_FILES = new Set(["hf_21.jpg"]);

const scanWallpaperDir = (base: string): string[] => {
	const modules = import.meta.glob<ImageMetadata>(
		"../assets/images/**/*.{png,jpg,jpeg,webp,avif}",
		{ import: "default" },
	);
	const prefix = `${base}/`;
	const matched = Object.keys(modules)
		.map((p) => p.replace(/^.*assets\/images\//, "assets/images/"))
		.filter((p) => p.startsWith(prefix))
		.filter((p) => {
			const name = p.split("/").pop() || "";
			return !EXCLUDE_FILES.has(name);
		})
		.sort();
	return matched;
};

// 背景图片处理工具函数
// 支持 "auto" 模式：自动扫描对应目录；否则按显式配置返回
const resolveImages = (src: string | string[] | undefined): string[] => {
	if (src === "auto") {
		return scanWallpaperDir(DESKTOP_WALLPAPER_BASE);
	}
	if (src === "auto-mobile") {
		return scanWallpaperDir(MOBILE_WALLPAPER_BASE);
	}
	return toArray(src);
};

// 背景图片处理工具函数
// 返回所有配置的图片（用于构建时渲染所有图片）
export const getBackgroundImages = (): BackgroundImages => {
	const bgSrc = backgroundWallpaper.src;

	if (
		typeof bgSrc === "object" &&
		bgSrc !== null &&
		!Array.isArray(bgSrc) &&
		("desktop" in bgSrc || "mobile" in bgSrc)
	) {
		const srcObj = bgSrc as {
			desktop?: string | string[];
			mobile?: string | string[];
		};
		const desktopImages = resolveImages(srcObj.desktop as string | string[]);
		const mobileImages = resolveImages(srcObj.mobile as string | string[]);
		return {
			desktop: desktopImages.length > 0 ? desktopImages : mobileImages,
			mobile: mobileImages.length > 0 ? mobileImages : desktopImages,
			isMultiple: desktopImages.length > 1 || mobileImages.length > 1,
		};
	}
	// 如果是字符串或数组，同时用于桌面端和移动端
	const images = toArray(bgSrc as string | string[]);
	return {
		desktop: images,
		mobile: images,
		isMultiple: images.length > 1,
	};
};

// 类型守卫函数
export const isBannerSrcObject = (
	src:
		| string
		| string[]
		| { desktop?: string | string[]; mobile?: string | string[] },
): src is { desktop?: string | string[]; mobile?: string | string[] } => {
	return (
		typeof src === "object" &&
		src !== null &&
		!Array.isArray(src) &&
		("desktop" in src || "mobile" in src)
	);
};

// 获取默认背景图片（返回第一张，用于 SEO 等场景）
export const getDefaultBackground = (): string => {
	const images = getBackgroundImages();
	return images.desktop[0] || images.mobile[0] || "";
};

// 检查是否为首页
export const isHomePage = (pathname: string): boolean => {
	// 获取 base URL
	const baseUrl = import.meta.env.BASE_URL || "/";
	const baseUrlNoSlash = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

	if (pathname === baseUrl) return true;
	if (pathname === baseUrlNoSlash) return true;
	if (pathname === "/") return true;

	return false;
};

// 获取横幅偏移量
export const getBannerOffset = (position = "center"): string => {
	const bannerOffsetByPosition = {
		top: "100vh",
		center: "50vh",
		bottom: "0",
	};
	return (
		bannerOffsetByPosition[position as keyof typeof bannerOffsetByPosition] ||
		"50vh"
	);
};
