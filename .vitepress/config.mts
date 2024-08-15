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
      { text: "全部", link: "/start/markdown" },
      {
        text: "集合",
        items: [
          { text: "HTTP", link: "/http/tcp" },
          { text: "JS", link: "/js/ajax" },
          { text: "Linux", link: "/linux/linux" },
        ],
      },
      { text: "关于", link: "/about" },
    ],
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单列表",
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    sidebar: {
      "/start": [
        {
          text: "开始",
          collapsed: false,
          items: [
            { text: "Markdown", link: "/start/markdown" },
            { text: "虚拟机", link: "/start/virtual" },
            { text: "WebSocket", link: "/start/webSocket" },
            {
              text: "Navigator.sendBeacon",
              link: "/start/navigator.sendBeacon",
            },
            { text: "JWT", link: "/start/jwt" },
            { text: "Express", link: "/start/express" },
            { text: "Security", link: "/start/security" },
            { text: "Docker", link: "/start/docker" },
          ],
        },
        {
          text: "HTTP",
          collapsed: true,
          items: [
            { text: "TCP", link: "/http/tcp" },
            { text: "TSL/SSL", link: "/http/tsl&ssl" },
            { text: "Nginx", link: "/http/nginx" },
          ],
        },
        {
          text: "JS",
          collapsed: true,
          items: [
            { text: "跨域", link: "/js/cross-domain" },
            { text: "Ajax", link: "/js/ajax" },
            { text: "N", link: "/js/n" },
            { text: "Vite", link: "/js/vite" },
            { text: "Router", link: "/js/router" },
            { text: "Network", link: "/start/network" },
          ],
        },
        {
          text: "Linux",
          collapsed: true,
          items: [
            { text: "Linux", link: "/linux/linux" },
            { text: "vi & vim", link: "/linux/vi&vim" },
          ],
        },
        {
          text: "Examples",
          collapsed: true,
          items: [
            { text: "Markdown Examples", link: "/examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/examples/api-examples" },
          ],
        },
      ],
      "/http": [
        {
          text: "HTTP",
          items: [
            { text: "TCP", link: "/http/tcp" },
            { text: "TSL/SSL", link: "/http/tsl&ssl" },
            { text: "Nginx", link: "/http/nginx" },
          ],
        },
      ],
      "/js": [
        {
          text: "JS",
          items: [
            { text: "跨域", link: "/js/cross-domain" },
            { text: "Ajax", link: "/js/ajax" },
            { text: "N", link: "/js/n" },
            { text: "Vite", link: "/js/vite" },
            { text: "Router", link: "/js/router" },
          ],
        },
      ],
      "/linux": [
        {
          text: "Linux",
          items: [
            { text: "Linux", link: "/linux/linux" },
            { text: "vi & vim", link: "/linux/vi&vim" },
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
      level: [1, 6],
      label: "页面导航",
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
