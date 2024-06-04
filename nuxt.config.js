import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export default {
  target: "static",
  // debug: true,
  server: {
    host: "0.0.0.0"
  },
  env: {
    SITE_ID: process.env.SITE_ID
  },
  generate: {
    crawler: false,
    concurrency: 10,
    interval: 100,
    async routes() {
      const postsData = await fetch(
        `${process.env.PROD_API_URL}/api/game/get_all_path?site_id=${process.env.SITE_ID}`
      );
      const posts = await postsData.json();
      const urls = posts.data.category.concat(posts.data.detail).concat(posts.data.download);
      return urls;
    }
  },
  axios: {
    baseURL:
      process.env.NODE_ENV === "production" ? process.env.PROD_API_URL : process.env.TEST_API_URL
  },
  router: {
    trailingSlash: true
  },
  head: {
    title:
      "Alltools1－dedicated to the dreams and wonders of the young crowd, play with your own colors in the game!",
    meta: [
      {
        name: "version",
        content: process.env.APP_VERSION || "1.0"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content:
          "Alltools1 is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, ≈ and a wide range of styles waiting for your selection. When you are looking for fun through games, Alltools1 will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!"
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Role-playing games, entertainment games, puzzle games, strategy games, cute games, pet games, parkour games, synthesis games, dress up games, princess games, adventure games, casual games, healing games, horror games, music games, cooking games"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  image: {
    provider: "cloudflare",
    cloudflare: {
      baseURL: "https://bunchthings.com"
    }
  },
  plugins: [
    { src: "~/plugins/vue-infinite-scroll", ssr: false },
    "~/plugins/axios",
    "~/plugins/global-data"
  ],
  components: true,
  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxt/image",
    "@nuxtjs/pwa",
    "@nuxtjs/sitemap",
    "nuxt-purgecss"
  ],
  css: ["@/assets/css/fonts.css", "@/assets/css/reset.css", "@/assets/css/common.scss"],
  styleResources: {
    scss: ["~/assets/css/_mixins.scss"]
  },
  modules: ["@nuxtjs/axios"],
  sitemap: {
    hostname: "https://Alltools1.com/"
  },
  pwa: {
    manifest: {
      name: "Alltools1",
      short_name: "Alltools1",
      description:
        "Alltools1 is a platform that gathers countless young gamers with the best free online games. All of our games are designed to provide young people with a better way to relax and have fun, with healthy gameplay and a wide range of styles waiting for your selection. When you are looking for fun through games, Alltools1 will be your faithful choice, offering you a more comprehensive range of games, the most diverse selection and as many new surprises as possible!",
      icons: [
        {
          src: "/icons/32.png",
          sizes: "32x32",
          type: "image/png"
        },
        {
          src: "/icons/48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/icons/72.png",
          sizes: "72x72",
          type: "image/png"
        },
        {
          src: "/icons/96.png",
          sizes: "96x96",
          type: "image/png"
        },
        {
          src: "/icons/144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "/icons/192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/256.png",
          sizes: "256x256",
          type: "image/png"
        },
        {
          src: "/icons/512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }
  },
  build: {
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    },
    extractCSS: {
      ignoreOrder: true
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: ".",
        name: true,
        minSize: 10000,
        maxSize: 244000,
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            maxSize: 244000,
            priority: -10
          },
          styles: {
            name: "styles",
            test: /\.(css|vue)$/,
            chunks: "all",
            enforce: true
          }
        }
      },
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: { inline: false },
            discardComments: { removeAll: true }
          }
        })
      ]
    }
  }
};
