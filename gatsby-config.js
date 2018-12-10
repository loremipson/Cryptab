module.exports = {
  siteMetadata: {
    title: 'Cryptab'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-source-coincap',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        version: '2.1.5',
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
        chrome_url_overrides: {
          newtab: 'index.html'
        },
        manifest_version: 2,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
