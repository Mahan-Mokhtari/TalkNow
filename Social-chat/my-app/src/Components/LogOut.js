import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
function LoginOut(props) {
  const urlLogOut = "http://localhost:3001/testLogOut";
  let submit = async (e) => {
    e.preventDefault();
    console.log("we logged you out");
    let tokenLocal = localStorage.getItem("tokenLocal");
    let name = localStorage.getItem("nameLocal");
    localStorage.setItem("nameLocal",'');
    console.log(name);
    if (
      tokenLocal === '' ||
      tokenLocal === 'null' ||
      name === "" ||
      name.toLocaleUpperCase()==="GUEST"
    ) {
     await props.RunPopUp("you cant log out beacuse your not signed up");
      // alert('you arent signed into a account  ')
    } else {
      //alert('youve been logged out')
      await Axios.post(urlLogOut, {
        UserName: name,
      })
        .then((res) => {
          console.log(res)
          props.RunPopUp("you have been logged out, bye ");
          localStorage.setItem("tokenLocal",'');
          localStorage.setItem("nameLocal",'');
          props.sendDataUp();
          props.InputStart()
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
        localStorage.setItem("tokenLocal",'');
        localStorage.setItem("nameLocal",'');
    }
  };
  //if token is present dont allow
  return (
    <>
      <Form className="fixed" onSubmit={(e) => submit(e)}>
        <Button
          className="BtnSignFrontPage"
          style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}
          type="submit"
        >
          Logout{'   '}<i className="fa fa-sign-out" aria-hidden="true"></i>
        </Button>
      </Form>
    </>
  );
}
export default LoginOut;
