import React from "react"
import { Link } from "gatsby"
import Image from "./image"

const PostColumnTemplate = ({ node }) => {
  //   const { node } = data.allMarkdownRemark.edges
  return (
    <li className="post-list" key={node.fields.slug}>
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
                <small>
                  <div className="tag">
                    <Link to={`/tags/${tag}/`}>{tag}</Link>
                  </div>
                </small>
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
        <small className="profile-mini">
            {node.frontmatter.author?.map(name => {
              return(
                <div style={{position:`relative`}}>
                  <div style={{width:`30px`,display:`inline-block`,position:`absolute`}}>
                    <Image
                      filename={"profile-pic-" + name + ".jpg"}
                      style={{
                        borderRadius: `50%`,
                        height: `auto`,
                      }}
                      />
                  </div>
                  <div style={{position:`relative`,top:`5px`,left:`35px`,marginBottom:`15px`}}>{name}</div>
                </div>
              )
            })}
        </small>
      </article>
      <hr />
    </li>
  )
}
export default PostColumnTemplate
