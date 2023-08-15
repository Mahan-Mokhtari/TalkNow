import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/signIn.css";
import Axios from "axios";
function LoginPopUp(props) {
  const urlLogIn = "http://localhost:3001/TestLogin";

  const [LogInPop, SetLogInPop] = useState({
    username: "",
    password: "",
  });

  let submit = (e) => {
    e.preventDefault();
    console.log("welcome back");
    if (LogInPop.username.trim() === "" || LogInPop.password.trim() === "") {
      props.RunPopUp("please enter data");
    } else {
      if (LogInPop.username.toUpperCase() === "GUEST") {
        props.RunPopUp("Pick a diffrent name");
      } else {
        Axios.post(urlLogIn, {
          newPassword: "",
          username: LogInPop.username,
          password: LogInPop.password,
        })
          .then((res) => {
            console.log(res.data);
            if (res.data === "failUsername") {
              props.RunPopUp("Your username dosent match");
            } else {
              Axios.post(urlLogIn, {
                newPassword: res.data.Password,
                username: LogInPop.username,
                password: LogInPop.password,
              })
                .then((result) => {
                  console.log('resyult login',result);
                  if (result.data === "failPassword") {
                    props.RunPopUp("your Password dosent match");
                  } else {
                    console.log(result);
                    console.log(result.data);
                    console.log(result.data.UserName);
                    console.log('data hereeeeee',result.data.token);
                    props.RunPopUp("your logged in welcome back ");
                    props.DeletePopUp();
                    localStorage.setItem("nameLocal", result.data.UserName);
                    localStorage.setItem("tokenLocal", result.data.token);
                    let tokenLocal = localStorage.getItem("tokenLocal");
                    console.log(tokenLocal)
                    props.sendDataUp();
                    props.InputStart()
                  }
                })
                .catch((error) => {
                  if (error) {
                    console.log(error);
                  }
                });
            }
          })
          .catch((error) => {
            if (error) {
              console.log(error);
            }
          });
      }
    }
  };

  function handleChange(e) {
    e.preventDefault();
    const UserLogIn = { ...LogInPop };
    UserLogIn[e.target.id] = e.target.value;
    SetLogInPop(UserLogIn);
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
                value={LogInPop.username}
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
                value={LogInPop.password}
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
export default LoginPopUp;
