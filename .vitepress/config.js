
  import { defineConfig } from "vitepress";
  export default defineConfig({
  "base": "/blog",
  "lang": "zh-CN",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/blog/favicon/android-chrome-192x192.png",
        "sizes": "192x192"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/blog/favicon/android-chrome-512x512.png",
        "sizes": "512x512"
      }
    ],
    [
      "link",
      {
        "rel": "apple-touch-icon",
        "href": "/blog/favicon/apple-touch-icon.png"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/blog/favicon/favicon-32x32.png",
        "sizes": "32x32"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/blog/favicon/favicon-16x16.png",
        "sizes": "16x16"
      }
    ],
    [
      "link",
      {
        "rel": "shortcut icon",
        "href": "/blog/favicon/favicon.ico"
      }
    ]
  ],
  "title": "🌕🌖🌗🌘🌑🌒🌓🌔's Blog",
  "description": "🌕🌖🌗🌘🌑🌒🌓🌔's Blog, Powered by VitePress",
  "themeConfig": {
    "search": {
      "provider": "local"
    },
    "nav": [
      {
        "text": "首页",
        "link": "/"
      },
      {
        "text": "集合",
        "items": [
          {
            "text": "Start",
            "link": "/start/markdown"
          },
          {
            "text": "HTTP",
            "link": "/http/tcp"
          },
          {
            "text": "JS",
            "link": "/js/ajax"
          },
          {
            "text": "Git",
            "link": "/git/git"
          },
          {
            "text": "Node",
            "link": "/node/node"
          },
          {
            "text": "Media",
            "link": "/media/pngquant"
          },
          {
            "text": "SQL",
            "link": "/sql/mysql"
          },
          {
            "text": "Linux",
            "link": "/linux/linux"
          },
          {
            "text": "Docker",
            "link": "/docker/docker"
          },
          {
            "text": "Util",
            "link": "/util/ohmyzsh"
          }
        ]
      },
      {
        "text": "关于",
        "link": "/about"
      }
    ],
    "darkModeSwitchLabel": "主题",
    "sidebarMenuLabel": "菜单列表",
    "docFooter": {
      "prev": "上一页",
      "next": "下一页"
    },
    "sidebar": {
      "/about/": [
        {
          "text": "about",
          "collapsed": false,
          "items": [
            {
              "text": "index",
              "link": "/about/index"
            }
          ]
        }
      ],
      "/demo/": [
        {
          "text": "demo",
          "collapsed": false,
          "items": [
            {
              "text": "blobPreview",
              "link": "/demo/blobPreview"
            },
            {
              "text": "cameraPreview",
              "link": "/demo/cameraPreview"
            },
            {
              "text": "shortLink",
              "link": "/demo/shortLink"
            },
            {
              "text": "watermark",
              "link": "/demo/watermark"
            }
          ]
        }
      ],
      "/docker/": [
        {
          "text": "docker",
          "collapsed": false,
          "items": [
            {
              "text": "docker",
              "link": "/docker/docker"
            }
          ]
        }
      ],
      "/examples/": [
        {
          "text": "examples",
          "collapsed": false,
          "items": [
            {
              "text": "api-examples",
              "link": "/examples/api-examples"
            },
            {
              "text": "markdown-examples",
              "link": "/examples/markdown-examples"
            }
          ]
        }
      ],
      "/git/": [
        {
          "text": "git",
          "collapsed": false,
          "items": [
            {
              "text": "git",
              "link": "/git/git"
            },
            {
              "text": "github-pages",
              "link": "/git/github-pages"
            }
          ]
        }
      ],
      "/http/": [
        {
          "text": "http",
          "collapsed": false,
          "items": [
            {
              "text": "dns",
              "link": "/http/dns"
            },
            {
              "text": "http",
              "link": "/http/http"
            },
            {
              "text": "network",
              "link": "/http/network"
            },
            {
              "text": "nginx",
              "link": "/http/nginx"
            },
            {
              "text": "security",
              "link": "/http/security"
            },
            {
              "text": "tcp",
              "link": "/http/tcp"
            },
            {
              "text": "tsl&ssl",
              "link": "/http/tsl&ssl"
            },
            {
              "text": "webSocket",
              "link": "/http/webSocket"
            }
          ]
        }
      ],
      "/jenkins/": [
        {
          "text": "jenkins",
          "collapsed": false,
          "items": [
            {
              "text": "index",
              "link": "/jenkins/index"
            }
          ]
        }
      ],
      "/js/": [
        {
          "text": "js",
          "collapsed": false,
          "items": [
            {
              "text": "ajax",
              "link": "/js/ajax"
            },
            {
              "text": "ali-oss",
              "link": "/js/ali-oss"
            },
            {
              "text": "amis",
              "link": "/js/amis"
            },
            {
              "text": "cross-domain",
              "link": "/js/cross-domain"
            },
            {
              "text": "mockjs",
              "link": "/js/mockjs"
            },
            {
              "text": "n",
              "link": "/js/n"
            },
            {
              "text": "nanoid",
              "link": "/js/nanoid"
            },
            {
              "text": "navigator.sendBeacon",
              "link": "/js/navigator.sendBeacon"
            },
            {
              "text": "qrcode",
              "link": "/js/qrcode"
            },
            {
              "text": "react",
              "link": "/js/react"
            },
            {
              "text": "router",
              "link": "/js/router"
            },
            {
              "text": "typescript",
              "link": "/js/typescript"
            },
            {
              "text": "vite",
              "link": "/js/vite"
            }
          ]
        }
      ],
      "/linux/": [
        {
          "text": "linux",
          "collapsed": false,
          "items": [
            {
              "text": "ftp",
              "link": "/linux/ftp"
            },
            {
              "text": "linux",
              "link": "/linux/linux"
            },
            {
              "text": "ssh",
              "link": "/linux/ssh"
            },
            {
              "text": "tree",
              "link": "/linux/tree"
            },
            {
              "text": "vi&vim",
              "link": "/linux/vi&vim"
            },
            {
              "text": "yum&dnf&apt",
              "link": "/linux/yum&dnf&apt"
            }
          ]
        }
      ],
      "/media/": [
        {
          "text": "media",
          "collapsed": false,
          "items": [
            {
              "text": "ffmpeg",
              "link": "/media/ffmpeg"
            },
            {
              "text": "pngquant",
              "link": "/media/pngquant"
            }
          ]
        }
      ],
      "/node/": [
        {
          "text": "node",
          "collapsed": false,
          "items": [
            {
              "text": "browser-sync",
              "link": "/node/browser-sync"
            },
            {
              "text": "cli",
              "link": "/node/cli"
            },
            {
              "text": "ejs",
              "link": "/node/ejs"
            },
            {
              "text": "express",
              "link": "/node/express"
            },
            {
              "text": "ioredis",
              "link": "/node/ioredis"
            },
            {
              "text": "jwt",
              "link": "/node/jwt"
            },
            {
              "text": "lua",
              "link": "/node/lua"
            },
            {
              "text": "marked",
              "link": "/node/marked"
            },
            {
              "text": "node",
              "link": "/node/node"
            },
            {
              "text": "npm&yarn&npx&pnpm",
              "link": "/node/npm&yarn&npx&pnpm"
            }
          ]
        }
      ],
      "/public/": [
        {
          "text": "public",
          "collapsed": false,
          "items": [
            {
              "text": "FAVICON",
              "collapsed": true,
              "items": []
            }
          ]
        }
      ],
      "/sql/": [
        {
          "text": "sql",
          "collapsed": false,
          "items": [
            {
              "text": "knex",
              "link": "/sql/knex"
            },
            {
              "text": "mysql",
              "link": "/sql/mysql"
            },
            {
              "text": "postgresql",
              "link": "/sql/postgresql"
            },
            {
              "text": "prisma",
              "link": "/sql/prisma"
            },
            {
              "text": "redis",
              "link": "/sql/redis"
            }
          ]
        }
      ],
      "/start/": [
        {
          "text": "start",
          "collapsed": false,
          "items": [
            {
              "text": "markdown",
              "link": "/start/markdown"
            },
            {
              "text": "schema",
              "link": "/start/schema"
            },
            {
              "text": "upload",
              "link": "/start/upload"
            },
            {
              "text": "virtual",
              "link": "/start/virtual"
            },
            {
              "text": "wordpress",
              "link": "/start/wordpress"
            }
          ]
        }
      ],
      "/uniapp/": [
        {
          "text": "uniapp",
          "collapsed": false,
          "items": [
            {
              "text": "index",
              "link": "/uniapp/index"
            }
          ]
        }
      ],
      "/util/": [
        {
          "text": "util",
          "collapsed": false,
          "items": [
            {
              "text": "baota",
              "link": "/util/baota"
            },
            {
              "text": "email",
              "link": "/util/email"
            },
            {
              "text": "ewomail",
              "link": "/util/ewomail"
            },
            {
              "text": "exiftool",
              "link": "/util/exiftool"
            },
            {
              "text": "fangfanggezi",
              "link": "/util/fangfanggezi"
            },
            {
              "text": "homebrew",
              "link": "/util/homebrew"
            },
            {
              "text": "localsend",
              "link": "/util/localsend"
            },
            {
              "text": "ohmyzsh",
              "link": "/util/ohmyzsh"
            },
            {
              "text": "ping",
              "link": "/util/ping"
            },
            {
              "text": "transformTools",
              "link": "/util/transformTools"
            }
          ]
        }
      ]
    },
    "outline": {
      "level": [
        1,
        6
      ],
      "label": "页面导航"
    },
    "socialLinks": [
      {
        "icon": "github",
        "link": "https://github.com/Ms-150"
      }
    ],
    "footer": {
      "message": "Released under the MIT License.",
      "copyright": "Copyright © 2019-2024 🌕🌖🌗🌘🌑🌒🌓🌔"
    },
    "lastUpdated": {
      "text": "最后更新",
      "formatOptions": {
        "dateStyle": "medium"
      }
    }
  },
  "srcDir": "./src",
  "ignoreDeadLinks": true
});
