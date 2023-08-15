import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
let tokenLocal = localStorage.getItem("tokenLocal");
let name = localStorage.getItem("nameLocal");
function Login(props) {
  let submit = (e) => {
    e.preventDefault();
    console.log("we logged you in");
   
    
    if (tokenLocal === '' ||tokenLocal === 'null'|| name === '') {
      props.LogMeIn("login");
    } else {
        console.log(tokenLocal)
      props.RunPopUp("you already are in a account !!!!");
    }
  };
  return (
    <>
      <Form className="fixed" onSubmit={(e) => submit(e)}>
        <Button
          className="BtnSignFrontPage"
          style={{ position: "absolute", top: 0, left: 0, margin: "10px" }}
          type="submit"
        >
          Login{'    '}<i className="fa fa-sign-in" aria-hidden="true"></i>
        </Button>
      </Form>
    </>
  );
}
export default Login;
