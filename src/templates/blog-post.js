import React from "react"
import { Link, graphql } from "gatsby"
import Image from "../components/image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "@suziwen/gitalk/dist/gitalk.css"
import Gitalk from "gatsby-plugin-gitalk"
import { intersection } from "underscore"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  // post.idの最初の6桁を16進数から10進数に変換したもの
  let idHash = parseInt(post.id.substr(0, 6), 16)
  let gitalkConfig = {
    id: post.id || post.slug,
    title: post.frontmatter.title,
    number: idHash,
  }
  console.log(post.id.substr(0, 6))
  console.log(idHash)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.created}</p>
          <div className="tag-list">
            {post.frontmatter.tag?.map(tag => {
              return (
                <small>
                  <div className="tag">
                    <Link to={`/tags/${tag}/`}>{tag}</Link>
                  </div>
                </small>
              )
            })}
          </div>
          <small className="profile-mini">
            <figure>
              <Image
                filename={"profile-pic-" + post.frontmatter.author + ".jpg"}
                style={{
                  borderRadius: `50%`,
                  height: `100%`,
                }}
                fixed={true}
              />
            </figure>
            <div>{post.frontmatter.author}</div>
          </small>
        </header>
        <hr />
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <footer>
          by
          {post.frontmatter.author.map((name, index) => {
            if (index === post.frontmatter.author.length - 1) {
              return " " + name
            }
            return " " + name + ","
          })}
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Gitalk options={gitalkConfig} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        created(formatString: "Y-M-D ddd")
        updated(formatString: "Y-M-D ddd")
        description
        tag
        author
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
