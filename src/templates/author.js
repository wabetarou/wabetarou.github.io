import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostColumn from "../components/post-column"

const Author = ({ pageContext, data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { author } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  // const authorHeader = `${totalCount} post${
  //   totalCount === 1 ? "" : "s"
  // } authorged with "${author}"`
  const authorHeader = `author ${author} : ${totalCount}件`
  return (
    <Layout location={location} title={siteTitle}>
      <h2>{authorHeader}</h2>
      <ol style={{ listStyle: `none` }}>
        {edges.map(({ node }) => {
          return <PostColumn node={node} />
        })}
      </ol>
      <Link to="/authors">All authors</Link>
    </Layout>
  )
}

Author.propTypes = {
  pageContext: PropTypes.shape({
    author: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Author

export const pageQuery = graphql`
  query($author: String) {
    site {
      siteMetadata {
        title
        author {
          name
          summary
          social {
            github
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___created], order: DESC }
      filter: { frontmatter: { author: { in: [$author] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            created(formatString: "Y-M-D ddd")
            tag
            author
          }
        }
      }
    }
  }
`
