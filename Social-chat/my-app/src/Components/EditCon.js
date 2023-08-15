import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
function EditCon(props) {
  const urlTestButtonsEdit = "http://localhost:3001/TestButtonsEdit";
  console.log("ran 4");
  const [postEdit, setPostEdit] = useState({
    EditContent: "",
  });

  async function submit(e) {
    console.log("ran 5");

    e.preventDefault();
    await Axios.post(urlTestButtonsEdit, {
      content: postEdit.EditContent,
      key: props.id,
    })
      .then((res) => {
        console.log("ran 6");
        props.removeEdit(res);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });

    console.log("ran 7");
  }

  function handleChange(e) {
    e.preventDefault();
    const newEdit = { ...postEdit };
    newEdit[e.target.id] = e.target.value;
    setPostEdit(newEdit);

    //make the form stick to the top of the screen
    console.log(newEdit);
  }

  return (
    <>
      <Form className="fixed" onSubmit={(e) => submit(e)}>
        <InputGroup className="mb-3">
          <Form.Control
            xs={20}
            sm={20}
            md={16}
            lg={16}
            placeholder={props.content}
            type="text"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            id="EditContent"
            name="PostText"
            value={postEdit.EditContent}
            onChange={(e) => handleChange(e)}
          />
          <Button type="submit">Change</Button>
        </InputGroup>
      </Form>
    </>
  );
}
export default EditCon;
