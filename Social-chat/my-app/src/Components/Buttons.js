import React from "react";
import {  Form, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Buttons(props) {

  function SubmitEdit(e) {
    e.preventDefault();
    props.edit();
  }
  function SubmitDelete(e) {
    e.preventDefault();
    props.DeleteItem()
  }
  return (
    <>
          <ButtonGroup>
            <Form onSubmit={(e) => SubmitEdit(e)}>
              <Button className="btn" type="submit" variant="success">
                Edit
              </Button>
            </Form>
          </ButtonGroup>{" "}
          <ButtonGroup>
            <Form onSubmit={(e) => SubmitDelete(e)}>
              <Button className="btn" type="submit" variant="danger">
                Delete
              </Button>
            </Form>
          </ButtonGroup>
    </>
  );
}
export default Buttons;

