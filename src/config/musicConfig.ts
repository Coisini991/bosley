import type { MusicPlayerConfig } from "../types/musicConfig";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "local",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// R2 音乐配置（当 mode 为 "local" 时使用）
	local: {
		playlist: [
			{
				name: "请先说你好",
				artist: "贺一航",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E8%B4%BA%E4%B8%80%E8%88%AA%20-%20%E8%AF%B7%E5%85%88%E8%AF%B4%E4%BD%A0%E5%A5%BD%20%5Bmqms2%5D.mp3",
			},
			{
				name: "九张机《双世宠妃》",
				artist: "叶炫清",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E5%8F%B6%E7%82%AB%E6%B8%85%20-%20%E4%B9%9D%E5%BC%A0%E6%9C%BA%20-%2001%20-%20%E4%B9%9D%E5%BC%A0%E6%9C%BA%20(%E3%80%8A%E5%8F%8C%E4%B8%96%E5%AE%A0%E5%A6%83%E3%80%8B%E4%B8%BB%E9%A2%98%E6%9B%B2).mp3",
			},
			{
				name: "天亮以前说再见",
				artist: "何野",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E4%BD%95%E9%87%8E%20-%20%E5%A4%A9%E4%BA%AE%E4%BB%A5%E5%89%8D%E8%AF%B4%E5%86%8D%E8%A7%81%20%5Bmqms2%5D.mp3",
			},
			{
				name: "三角题",
				artist: "二珂",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E4%BA%8C%E7%8F%82%20-%20%E4%B8%89%E8%A7%92%E9%A2%98%20%5Bmqms2%5D.flac",
			},
			{
				name: "侧脸",
				artist: "于果",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E4%BA%8E%E6%9E%9C%20-%20%E4%BE%A7%E8%84%B8%20-%2000%20-%20%E4%BE%A7%E8%84%B8.mp3",
			},
			{
				name: "白山茶",
				artist: "陈雪凝",
				url: "https://cdn.bosley.cc.cd/CloudMusic/%E7%99%BD%E5%B1%B1%E8%8C%B6-%E9%99%88%E9%9B%AA%E5%87%9D%C2%B7.mp3",
			},
			{
				name: "Begin Again",
				artist: "Taylor Swift",
				url: "https://cdn.bosley.cc.cd/CloudMusic/Taylor%20Swift%20-%20Begin%20Again%20%5Bmqms2%5D.mp3",
			},
		],
	},
};
