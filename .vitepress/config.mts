import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blog/",
  lang: "zh-CN",
  title: "🌕🌖🌗🌘🌑🌒🌓🌔's Blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start" },
      { text: "Examples", link: "/examples/markdown-examples" },
      { text: "关于", link: "/about" },
    ],

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

    outline: [1, 5],

    socialLinks: [{ icon: "github", link: "https://github.com/Ms-150" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © 2019-${new Date().getFullYear()} 🌕🌖🌗🌘🌑🌒🌓🌔`,
    },
  },
  srcDir: "./src",
  ignoreDeadLinks: true  // 忽略死链
});
