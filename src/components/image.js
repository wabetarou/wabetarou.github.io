//components/image.js

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = (props) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 100) {
                    ...GatsbyImageSharpFluid
                }
                fixed(width: 30) {
                   ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    `}

    /*
      サイズFIXしたい時は上記childImageSharp {...}の中を以下のように変更
              sizes(maxWidth: 300) {
                ...GatsbyImageSharpSizes
              }
    */
    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });
      if (!image) { return null; }
      //const imageSizes = image.node.childImageSharp.sizes; ←サイズFIXしたい時
      if (props.fixed) {
        return (
          <Img
            fixed={image.node.childImageSharp.fixed}
            alt={props.alt}
            imgStyle={props.style}
            className={props.className}
          />
        )
      }
      return (
        /*<Img alt={props.alt} sizes={imageSizes} /> ←サイズFIXしたい時 */
        <Img
            fluid={image.node.childImageSharp.fluid}
            alt={props.alt}
            imgStyle={props.style}
            className={props.className}
        />
      );
    }}
  />
)
export default Image

// fixed={avatar}
// alt={author?.name || ``}
// className="bio-avatar"
// imgStyle={{
//     borderRadius: `50%`,   
// }}