import React from "react"
import { Link } from "gatsby"

const PostColumnTemplate = ({ node }) => {
  //   const { node } = data.allMarkdownRemark.edges
  return (
    <li class="post-list" key={node.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2>
            <Link to={node.fields.slug} itemProp="url">
              <span itemProp="headline">{node.frontmatter.title}</span>
            </Link>
          </h2>
          <small>{node.frontmatter.created}</small>
          <div className="tag-list">
            {node.frontmatter.tag?.map(tag => {
              return (
                <div className="tag">
                  <small>
                    <Link to={`/tags/${tag}/`}>{tag}</Link>
                  </small>
                </div>
              )
            })}
          </div>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: node.frontmatter.description || node.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </article>
      <hr />
    </li>
  )
}
export default PostColumnTemplate
