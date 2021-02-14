const fs = require("fs")
const clientSecret = fs.readFileSync("./.clientSecret","utf8")

module.exports = {
  siteMetadata: {
    title: `NARAZUKE`,
    author: [
      {
        name: `nozzle`,
        summary: `who lives in gummaken.`,
        social: {
          github: "nozzlex3",
        },
      },
      {
        name: `konnyaku`,
        summary: `who is known as Siege Sukosuko Samurai.`,
        social: {
          github: "wabetarou",
        },
      },
    ],
    description: `narazuke saiko-`,
    siteUrl: `https://narazuke.github.io`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
              backgroundColor: `none`,
              wrapperStyle: `overflow: visible`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-code-titles`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: "gatsby-plugin-gitalk",
      options: {
        config: {
          clientID: "837629045eb9da51e9f1",
          clientSecret: `${clientSecret}`,
          repo: "narazuke.github.io",
          owner: "narazuke",
          admin: ["wabetarou", "nozzlex3"],
          pagerDirection: "last",
          createIssueManually: false,
          distractionFreeMode: false,
          enableHotKey: true,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
