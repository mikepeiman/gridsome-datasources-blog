// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "MikePeiman.com",
  siteUrl: "https://mikepeiman.com",
  siteDescription:
    "Father, Web Developer, Entrepreneur, Natural Philosopher. Learning and teaching how to live better lives and build a better world.",
  icon: "src/assets/LifeIQ.svg",
  plugins: [
    {
      use: "@gridsome/source-faker",
      options: {
        numNodes: 50,
        route: "/faker-posts/:id"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        route: "/filesystem/:slug",
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
        id: "UA-93096307-4"
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
      use: "~/src/sources/strapi"
    },
    {
      use: "~/src/sources/blogpost"
    },
    {
      use: "~/src/sources/graphcms"
    },
    {
      use: "~/src/sources/localdota"
    },
    {
      use: "~/src/sources/heroes",
      options: {
        numNodes: 120,
        perPage: 120
      }
    },
    {
      use: "~/src/sources/todoist",
      options: {
        url: "https://beta.todoist.com/API/v8/projects",
        token: "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f"
      }
    }
  ]
};
