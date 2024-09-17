import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog",
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
          { text: "Git", link: "/git/git" },
          { text: "Node", link: "/node/node" },
          { text: "Media", link: "/media/pngquant" },
          { text: "SQL", link: "/sql/mysql" },
          { text: "Linux", link: "/linux/linux" },
          { text: "Docker", link: "/docker/docker" },
          { text: "Util", link: "/util/ohmyzsh" },
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
          ],
        },
        {
          text: "HTTP",
          collapsed: true,
          items: [
            { text: "TCP", link: "/http/tcp" },
            { text: "HTTP", link: "/http/http" },
            { text: "DNS", link: "/http/dns" },
            { text: "TSL/SSL", link: "/http/tsl&ssl" },
            { text: "Network", link: "/http/network" },
            { text: "Security", link: "/http/security" },
            { text: "WebSocket", link: "/http/webSocket" },
            { text: "Nginx", link: "/http/nginx" },
          ],
        },
        {
          text: "JS",
          collapsed: true,
          items: [
            { text: "跨域", link: "/js/cross-domain" },
            {
              text: "Navigator.sendBeacon",
              link: "/js/navigator.sendBeacon",
            },
            { text: "Ajax", link: "/js/ajax" },
            { text: "N", link: "/js/n" },
            { text: "Vite", link: "/js/vite" },
            { text: "Router", link: "/js/router" },
          ],
        },
        {
          text: "Git",
          collapsed: true,
          items: [
            { text: "Git", link: "/git/git" },
            { text: "GitHubPages", link: "/git/github-pages" },
          ],
        },
        {
          text: "Node",
          collapsed: true,
          items: [
            { text: "Node", link: "/node/node" },
            { text: "npm&yarn&npx&pnpm", link: "/node/npm&yarn&npx&pnpm" },
            { text: "Marked", link: "/node/marked" },
            { text: "EJS", link: "/node/ejs" },
            { text: "Express", link: "/node/express" },
            { text: "JWT", link: "/node/jwt" },
          ],
        },
        {
          text: "Media",
          collapsed: true,
          items: [
            { text: "Pngquant", link: "/media/pngquant" },
            { text: "ffmpeg", link: "/media/ffmpeg" },
          ],
        },
        {
          text: "SQL",
          collapsed: true,
          items: [
            { text: "MySQL", link: "/sql/mysql" },
            { text: "PostgreSQL", link: "/sql/postgresql" },
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
          text: "Docker",
          collapsed: true,
          items: [{ text: "Docker", link: "/docker/docker" }],
        },
        {
          text: "Util",
          collapsed: true,
          items: [
            { text: "Home Brew", link: "/util/homebrew" },
            { text: "Oh My Zsh ", link: "/util/ohmyzsh" },
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
            { text: "HTTP", link: "/http/http" },
            { text: "DNS", link: "/http/dns" },
            { text: "TSL/SSL", link: "/http/tsl&ssl" },
            { text: "Network", link: "/http/network" },
            { text: "Security", link: "/http/security" },
            { text: "WebSocket", link: "/http/webSocket" },
            { text: "Nginx", link: "/http/nginx" },
          ],
        },
      ],
      "/js": [
        {
          text: "JS",
          items: [
            { text: "跨域", link: "/js/cross-domain" },
            {
              text: "Navigator.sendBeacon",
              link: "/js/navigator.sendBeacon",
            },
            { text: "Ajax", link: "/js/ajax" },
            { text: "N", link: "/js/n" },
            { text: "Vite", link: "/js/vite" },
            { text: "Router", link: "/js/router" },
          ],
        },
      ],
      "/git": [
        {
          text: "Git",
          items: [
            { text: "Git", link: "/git/git" },
            { text: "GitHubPages", link: "/git/github-pages" },
          ],
        },
      ],
      "/node": [
        {
          text: "Node",
          items: [
            { text: "Node", link: "/node/node" },
            { text: "npm&yarn&npx&pnpm", link: "/node/npm&yarn&npx&pnpm" },
            { text: "Marked", link: "/node/marked" },
            { text: "EJS", link: "/node/ejs" },
            
            { text: "Express", link: "/node/express" },
          ],
        },
      ],
      "/media": [
        {
          text: "Media",
          items: [
            { text: "pngquant", link: "/media/pngquant" },
            { text: "ffmpeg", link: "/media/ffmpeg" },
          ],
        },
      ],
      "/sql": [
        {
          text: "SQL",
          items: [
            { text: "MySQL", link: "/sql/mysql" },
            { text: "PostgreSQL", link: "/sql/postgresql" },
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
      "/docker": [
        {
          text: "Docker",
          items: [{ text: "Docker", link: "/docker/docker" }],
        },
      ],
      "/util": [
        {
          text: "Util",
          items: [
            { text: "Home Brew", link: "/util/homebrew" },
            { text: "Oh My Zsh", link: "/util/ohmyzsh" },
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
