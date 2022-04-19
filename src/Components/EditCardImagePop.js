import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"

export default function EditCardImagePop(props) {
  const [imagePop, setImagePop] = useState(false)

  const { cards, handleChange, index } = props

  return (
    <Form.Group as={Col} controlId="formGridImageUrl">
      <Form.Control
        placeholder="Image Url"
        name="back_img"
        value={cards[index].back_img}
        onChange={(e) => handleChange(e, index)}
        onMouseOver={() => setImagePop(!imagePop)}
        onMouseOut={() => setImagePop(!imagePop)}
      />
      <>
        {imagePop && cards[index].back_img && cards[index].back_img.startsWith("http") ? (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "auto",
              height: "150px",
              overflow: "hidden",
              borderRadius: "10px",
            }}>
            <img
              style={{ width: "auto", height: "150px" }}
              src={cards[index].back_img}
              alt={cards[index].term}
            />
          </div>
        ) : (
          <div></div>
        )}
      </>
    </Form.Group>
  )
}
