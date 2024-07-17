import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  lang: "zh-CN",
  head: [
    // Android Chrome 标签栏图标
    [
      "link",
      {
        rel: "icon",
        href: "/blog/favicon/android-chrome-192x192.png",
        sizes: "192x192",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        href: "/blog/favicon/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
    // Apple Touch 图标（用于 iOS 设备）
    [
      "link",
      { rel: "apple-touch-icon", href: "/blog/favicon/apple-touch-icon.png" },
    ],
    // Favicon 标签栏图标
    [
      "link",
      { rel: "icon", href: "/blog/favicon/favicon-32x32.png", sizes: "32x32" },
    ],
    [
      "link",
      { rel: "icon", href: "/blog/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    // 兼容旧版本浏览器的 Favicon
    ["link", { rel: "shortcut icon", href: "/blog/favicon/favicon.ico" }],
  ],
  title: "🌕🌖🌗🌘🌑🌒🌓🌔's Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start" },
      { text: "Examples", link: "/examples/markdown-examples" },
      { text: "关于", link: "/about" },
    ],
    darkModeSwitchLabel: "主题",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    sidebar: {
      "/start": [
        {
          text: "开始",
          items: [
            { text: "Markdown", link: "/start/markdown" },
            { text: "Vite", link: "/start/vite" },
            { text: "JWT", link: "/start/jwt" },
            { text: "Express", link: "/start/express" },
            { text: "N", link: "/start/n" },
            { text: "虚拟机", link: "/start/virtual" },
            { text: "Linux", link: "/start/linux" },
            { text: "vi & vim", link: "/start/vi&vim" },
          ],
        },
      ],
      "/examples": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/examples/api-examples" },
          ],
        },
      ],
    },

    outline: {
      level: 'deep',
      label: "页面导航"
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Ms-150" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2019-${new Date().getFullYear()} 🌕🌖🌗🌘🌑🌒🌓🌔`,
    },
  },
  srcDir: "./src",
  ignoreDeadLinks: true, // 忽略死链
});
