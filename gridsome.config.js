// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Curriculum For Life",
  siteUrl: "https://curriculumfor.life",
  siteDescription: "The Missing Manual For Your Life",
  icon: "src/assets/LifeIQ.svg",
  plugins: [
    {
      use: "@gridsome/source-faker",
      options: {
        numNodes: 50,
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        route: "/blog/:slug",
        resolveAbsolutePaths: true,
        remark: {
          autolinkClassName: "fas fa-hashtag",
          externalLinksTarget: "_blank",
          externalLinksRel: ["nofollow", "noopener", "noreferrer"],
          plugins: [["gridsome-plugin-remark-shiki", { theme: "nord" }]]
        }
      }
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-xxx"
      }
    },
    {
      use: "~/src/sources/products",
      options: {
        // typeName: "Airtable",
        apiKey: "keyoLbEc7OzfEfj68",
        base: "app0QClDCzUUtEYAk"
      }
    },
    {
      use: "~/src/sources/swapi"
    },
    {
      use: "~/src/sources/graphcms",
      // options: {
      //   typeName: 'GraphCMS',
      //   route: '/graph/:slug',
      //   path: '~/src/templates/GraphPost.vue'
      // }
    }
  ]
};
