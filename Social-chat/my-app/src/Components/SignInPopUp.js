import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/signIn.css";
import Axios from "axios";
function SignInPopUp(props) {
  const urlSignIn = "http://localhost:3001/testSignIn";
  const [SignInPop, SetSignInPop] = useState({
    username: "",
    password: "",
  });

  let submit = (e) => {
    e.preventDefault();
    if(SignInPop.username.length >9){
      props.RunPopUp("username is too long");
    }else if(SignInPop.password.length <9){
      props.RunPopUp("Password is too short");
    }else{
    console.log("we sent sign in data");
    if (SignInPop.username.trim() === "" || SignInPop.password.trim() === "") {
      localStorage.setItem("nameLocal",'');
      props.RunPopUp("please enter data");
    } else {
      Axios.post(urlSignIn, {
        username: SignInPop.username,
        password: SignInPop.password,
      })
        .then((res) => {
          console.log(res.data);
          if (res.data === "fail") {
            props.RunPopUp("pick a new username this ones taken");
          } else {
            props.RunPopUp("welcome to the site ");
            props.DeletePopUp();
            localStorage.setItem("nameLocal", res.data.UserName);
            localStorage.setItem("tokenLocal", res.data.token);
            props.sendDataUp();
            props.InputStart()
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }}
  };

  function handleChange(e) {
    e.preventDefault();
    const UserSignIn = { ...SignInPop };
    UserSignIn[e.target.id] = e.target.value;
    SetSignInPop(UserSignIn);
  }

  return (
    <>
      <div className="containerr">
        <div className="form-container">
          <Form className="fixed" onSubmit={(e) => submit(e)}>
            <InputGroup className="mb-33">
              <Form.Control
                className="input"
                placeholder="type your username here   "
                type="text"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id="username"
                name="PostText"
                value={SignInPop.username}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
            <InputGroup className="mb-33">
              <Form.Control
                placeholder="type your password here   "
                type="password"
                className="input"
                id="password"
                name="PostText"
                value={SignInPop.password}
                onChange={(e) => handleChange(e)}
              />
            </InputGroup>
            <Button className="BtnSign" type="submit">
              sumbit
            </Button>
            <Button onClick={()=>{props.DeletePopUp();}} className="BtnSign" type="submit">
              close
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
export default SignInPopUp;
