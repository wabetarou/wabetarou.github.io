import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Tag from "../components/tag"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <hr />
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.created}</small>
                  <div className="tag-list">
                    {post.frontmatter.tag?.map(tag => {
                      return (
                        <div className="tag">
                          {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                          >
                            <path
                              fill="#fff"
                              stroke="#231815"
                              d="M-8.75-5h48.813"
                            ></path>
                            <path
                              fill="#2b932b"
                              fillRule="evenodd"
                              d="M-25.333 18.781c-1.657 0-13-9.969-13-11.375s11.343-11.375 13-11.375"
                            ></path>
                            <path
                              fill="#555"
                              d="M53.59 33.012L30.596 10.02c-1.11-1.11-16.875 1.452-18 2.577s-3.687 16.889-2.577 18L33.013 53.59c1.11 1.11 3.224.797 4.724-.703l15.148-15.148c1.5-1.501 1.815-3.617.705-4.727zm-31.403-5.7a4.875 4.875 0 11.001-9.751 4.875 4.875 0 01-.001 9.751z"
                            ></path>
                          </svg> */}
                          <small>{tag}</small>
                        </div>
                      )
                    })}
                  </div>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

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
    allMarkdownRemark(sort: { fields: [frontmatter___created], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          created(formatString: "Y-M-D ddd")
          updated(formatString: "Y-M-D ddd")
          title
          description
          tag
        }
      }
    }
  }
`
