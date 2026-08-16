import type { BooknavGroup, BooknavPageConfig } from "../types/booknavConfig";

// 书签导航页面配置
export const booknavPageConfig: BooknavPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// favicon 自动获取配置
	favicon: {
		// 书签未填写 icon 时，是否自动获取目标站点的 favicon 图标
		enabled: true,

		// favicon 接口地址，{domain} 为占位符，会被替换成目标站点域名
		// 更换接口只需保证地址里含有 {domain}，例如：
		//   https://a.favicon.im/{domain}
		//   https://favicon.im/{domain}
		api: "https://a.favicon.im/{domain}",
	},
};

// 书签导航配置
// 每个数组项是一个分类组，分类组内的 items 是该分类下的书签
export const booknavConfig: BooknavGroup[] = [
	{
		id: "dev",
		name: "开发",
		icon: "material-symbols:code-rounded",
		desc: "写代码时离不开的站点",
		weight: 100,
		items: [
			{
				title: "kaifa",
				url: "https://kaifa.baidu.com/home",
				desc: "开发者搜索",
				// icon 字段可以使用 astro-icon 图标库的图标名称
				// 也可以使用图片 URL 和本地图片路径
				// 不填则会通过接口自动获取目标站点的 favicon 图标（需要在上面配置）
				weight: 8,
			},
			{
				title: "MDN Web Docs",
				url: "https://developer.mozilla.org",
				desc: "最权威的 Web 技术文档",
				weight: 9,
			},
			{
				title: "Astro",
				url: "https://astro.build",
				desc: "内容驱动型网站的 Web 框架",
				weight: 8,
			},
			{
				title: "Svelte",
				url: "https://svelte.dev",
				desc: "把组件编译成高效原生 JS 的框架",
				weight: 7,
			},
			{
				title: "Tailwind CSS",
				url: "https://tailwindcss.com",
				desc: "一个功能强大且灵活的 CSS 框架",
				weight: 6,
			},
			{
				title: "学相伴",
				url: "https://mp.weixin.qq.com/mp/homepage?__biz=Mzg2NTAzMTExNg==&hid=1&sn=3247dca1433a891523d9e4176c90c499",
				desc: "遇见狂神说",
				weight: 10,
			},
			{
				title: "开发者导航",
				url: "http://cxy521.com/",
				desc: "专为开发者准备的导航站点",
				weight: 6,
			},
			{
				title: "LUG USTC",
				url: "https://lug.ustc.edu.cn/wiki/doc/smart-questions/",
				desc: "中国科学技术大学搭建社区交流共享的平台",
				weight: 6,
			},
			{
				title: "r2coding",
				url: "https://www.r2coding.com/#/README",
				desc: "编程自学之路，所用资源和分享内容的大聚合",
				weight: 6,
			},
			{
				title: "Java面试题",
				url: "https://www.nowcoder.com/issue/tutorial?tutorialId=94&uuid=4206176d637541fa92c784a4f547e979",
				desc: "牛客网Java面试题专区",
				weight: 6,
			},
				{
				title: "MyBatis-Plus",
				url: "https://baomidou.com/",
				desc: "为简化开发、提高效率而生",
				weight: 9,
			},
			{
				title: "Maven仓库",
				url: "https://mvnrepository.com/",
				desc: "Maven 仓库搜索",
				weight: 9,
			},
			{
				title: "visualgo",
				url: "https://visualgo.net/zh",
				desc: "通过动画可视化数据结构和算法",
				weight: 9,
			},
		],
	},
	{
		id: "Realm",
		name: "文娱",
		icon: "material-symbols:code-rounded",
		desc: "娱乐至死的时代—文娱天地",
		weight: 90,
		items: [
			{
				title: "茶杯狐",
				url: "https://www.cupfox.cc/",
				desc: "茶杯狐官方网站 - 您的在线电影天堂",
				weight: 8,
			},
			{
				title: "不太灵",
				url: "https://web5.mukaku.com/",
				desc: "不太灵vip影视",
				weight: 10,
			},
			{
				title: "老电影时光",
				url: "https://www.ldysg.com/",
				desc: "不多年以后，你是否会想起那个遥远的下午",
				weight: 10,
			},
			{
				title: "MP4电影",
				url: "https://mp4.z6.net.cn/",
				desc: "从前资源超多的MP4电影仓库",
				weight: 10,
			},
			{
				title: "MP4电影",
				url: "https://mp4.z6.net.cn/",
				desc: "从前资源超多的MP4电影仓库",
				weight: 10,
			},
		],
	},
	{
		id: "design",
		name: "设计",
		icon: "material-symbols:palette-outline-rounded",
		desc: "配色、图标与灵感来源",
		weight: 90,
		items: [
			{
				title: "涂鹿(Toolooz)",
				url: "https://toolooz.com/",
				desc: "曲线文字绘制设计工具 轻松创建沿任意路径排布的精美文字，打造独特视觉效果。",
				weight: 7,
			},
			{
				title: "物言卡片",
				url: "https://mono.cards/zh-CN",
				desc: "万物皆卡片。支持文章、音乐、视频、照片、地点等内容。搭配多张卡片作为个人主页。",
				weight: 7,
			},
			{
				title: "Iconify",
				url: "https://icon-sets.iconify.design",
				desc: "海量开源图标集合搜索",
				weight: 10,
			},
			{
				title: "iconfont",
				url: "https://www.iconfont.cn",
				desc: "阿里巴巴矢量图标库",
				weight: 9,
			},
		],
	},
	{
		id: "tools",
		name: "工具",
		icon: "material-symbols:build-outline-rounded",
		desc: "顺手的在线小工具",
		weight: 80,
		items: [
			{
				title: "imagestools",
				url: "https://imagestool.com/zh_CN/",
				desc: "在线处理 图片",
				weight: 10,
			},
			{
				title: "TinyPNG",
				url: "https://tinypng.com",
				desc: "在线压缩 PNG / JPEG 图片",
				weight: 10,
			},
			{
				title: "Squoosh",
				url: "https://squoosh.app",
				desc: "Google 出品的图片压缩与格式转换",
				weight: 9,
			},
			{
				title: "Carbon",
				url: "https://carbon.now.sh",
				desc: "把代码片段生成漂亮的图片",
				weight: 8,
			},
			{
				title: "office-converter",
				url: "https://cn.office-converter.com/",
				desc: "文件转换器",
				weight: 8,
			},
			{
				title: "imagestool",
				url: "https://imagestool.com/webp2jpg-online/",
				desc: "图片压缩与格式转换",
				weight: 10,                 // 组内权重，越大越靠前
        		// enabled: false,         // 想临时隐藏就加这句
			},
			{
				title: "convertio",
				url: "https://convertio.co/zh/",
				desc: "将您的文件转换成任意格式",
				weight: 8,
			},
			{
				title: "ipa下载",
				url: "https://ipa.store/app",
				desc: "iPA商店APP现已发布，下载、砸壳等操作免验证更丝滑，支持iOS14.0+设备安装使用，推荐巨魔或者证书用户下载安装！",
				weight: 8,
			},
		],
	},
	{
		id: "resources",
		name: "资源",
		icon: "material-symbols:auto-stories-outline-rounded",
		desc: "文档、教程与阅读",
		weight: 70,
		items: [
			{
				title: "Firefly Docs",
				url: "https://docs-firefly.cuteleaf.cn",
				desc: "Firefly 主题模板文档",
				icon: "https://docs-firefly.cuteleaf.cn/logo.png",
				weight: 9,
			},
			{
				title: "夏夜流萤",
				url: "https://blog.cuteleaf.cn",
				desc: "飞萤之火自无梦的长夜亮起",
				weight: 10,
			},
		
			{
				title: "symbolab",
				url: "https://zs.symbolab.com/",
				desc: "人工智能数学计算器",
				weight: 9,
			},
			{
				title: "茉灵智库",
				url: "https://blog.88lin.eu.org/",
				desc: "茉灵智库|分享技术与生活的无限可能",
				weight: 9,
			},
			{
				title: "学术平台",
				url: "https://www.x-mol.com/",
				desc: "高水平期刊一站式浏览",
				weight: 9,
			},
			{
				title: "UP云搜",
				url: "https://www.upyunso.com/",
				desc: "聚合全网网盘资源，一搜即达",
				weight: 9,
			},
		],
	},
	{
		id: "resources",
		name: "导航",
		icon: "glyphs-poly:map-signs",
		
		desc: "一些自用的导航分享",
		weight: 70,
		items: [
			{
				title: "小众技术",
				url: "https://www.xiaozhongjishu.com/",
				desc: "小众技术分享",
				weight: 10,
			},
			{
				title: "懒人导航网",
				url: "https://lanrenao.com/",
				desc: "随便看看懒人导航网",
				weight: 9,
			},
			{
				title: "iMyShare",
				url: "https://imyshare.com/",
				desc: "精品实用网络资源导航，助你学习、工作和生活",
				weight: 9,
			},
		],
	},
	{
		id: "Personalized Book",
		name: "定制书",
		icon: "glyphs-poly:map",
		desc: "一些自用的导航分享",
		weight: 70,
		items: [
			{
				title: "糖水",
				url: "https://www.tangshui.net/",
				desc: "有温度的生活记录软件 荣获GMCA最受用户期待APP大奖",
				weight: 9,
			},
			{
				title: "拾柒",
				url: "https://www.shiqichuban.com/",
				desc: "记录生活印制成书 让生活更有仪式感",
				weight: 10,
			},
			
		],
	},
	
	
	
];
