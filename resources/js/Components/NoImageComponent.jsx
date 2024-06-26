import React from 'react'
import NoImage from "../../../public/image/no-image.jpg";

function NoImageComponent() {
  return (
    <>
        <img src={NoImage}  width={100} loading="lazy"/>
    </>
  )
}

export default NoImageComponent