import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

const AuthorPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout location={location} title={title}>
    <Helmet title={title} />
    <div>
      <h1>Authors</h1>
      <ul>
        {group
          .sort(function (a, b) {
            if (a.totalCount > b.totalCount) return -1
            if (a.totalCount < b.totalCount) return 1
            return 0
          })
          .map(author => (
            <li key={author.totalCount}>
              <Link to={`/authors/${kebabCase(author.fieldValue)}/`}>
                {author.fieldValue} ({author.totalCount})
              </Link>
            </li>
          ))}
      </ul>
    </div>
  </Layout>
)

AuthorPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default AuthorPage

export const pageQuery = graphql`
  query {
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
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___author) {
        fieldValue
        totalCount
      }
    }
  }
`
