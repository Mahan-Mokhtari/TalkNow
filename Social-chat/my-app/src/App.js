import React, { useState, useEffect } from "react";
import PostData from "./Components/PostInput";
import PostCard from "./Components/PostCard";
import { Col, Container } from "react-bootstrap";
import EditCon from "./Components/EditCon";
import Login from "./Components/Login";
import AnyMsgPopUp from "./Components/AnyMsgPopUp";
import SignIn from "./Components/SignIn";
import LogOut from "./Components/LogOut";
import LogInPopUp from "./Components/LoginPopUp";
import SignInPopUp from "./Components/SignInPopUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

let urlGetTest = "http://localhost:3001/testGetData";

function App() {
  const [editSave, setEditSave] = useState([]);
  const [dataSave, setDataSave] = useState([]);
  const [signAndLogInSave, setSignAndLogInSave] = useState([]);
  const [popUpSave, setPopUpSave] = useState([]);
  const [InputSave, setInputSave] = useState([]);
  const sendButtonStatus = () => {
    sendDataUp();
    setEditSave([]);
  };

  const RunPopUp = (text) => {
    let PopUps = [];
    PopUps.push(
      <AnyMsgPopUp
        key={"someCoolKey"}
        DeletePopUp={DeleteAnyMsgPopUp}
        text={text}
      />
    );
    setPopUpSave(PopUps);
  };

  const DeletePopUp = () => {
    setSignAndLogInSave([]);
  };

  const DeleteAnyMsgPopUp = () => {
    setPopUpSave([]);
  };

  const Auth = (c) => {
    console.log("func is active in Log in");
    let SavelogOrSignIn = [];
    if (c === "login") {
      SavelogOrSignIn.push(
        <LogInPopUp
        InputStart={InputStart}
          RunPopUp={RunPopUp}
          sendDataUp={sendDataUp}
          DeletePopUp={DeletePopUp}
          key={"keyForLogIn"}
        />
      );
    } else {
      SavelogOrSignIn.push(
        <SignInPopUp
        InputStart={InputStart}
          RunPopUp={RunPopUp}
          sendDataUp={sendDataUp}
          DeletePopUp={DeletePopUp}
          key={"keyForSignIn"}
        />
      );
    }
    setSignAndLogInSave(SavelogOrSignIn);
  };

  const removeEdit = (res) => {
    console.log(res);
    console.log("ran 8");
    sendDataUp();
    console.log("ran 9");
    setEditSave([]);
    console.log("ran 10");
    sendDataUp();
    console.log("ran 11");
  };

  const SendEdit = (id, text) => {
    console.log("ran 2");
    const edits = [];
    Axios.get("http://localhost:3001/testGetData").then((res) => {
      edits.push(
        <EditCon
          removeEdit={removeEdit}
          content={text}
          id={id}
          key={res.data[0].key + "wrgh"}
        />
      );
      setEditSave(edits);
      console.log("ran 3");
    });
  };
//run this when log in log out and sign up
  const sendDataUp = () => {
    const posts = [];

    Axios.get("http://localhost:3001/testGetData")
      .then((res) => {
        console.log("res hereeeeeee", res);
        for (var i = 0; i < res.data.length; i++) {
          console.log(i);
          console.log(res.data[i].key);
          //and a edit send up func
          posts.push(
            <PostCard
              sendEdit={SendEdit}
              sendButtonStatus={sendButtonStatus}
              name={res.data[i].UserName}
              text={res.data[i].content}
              file={res.data[i].File}
              id={res.data[i].key}
              key={res.data[i].key+'key'}
            />
          );
        }
        setDataSave(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let InputStart = ()=>{
    setInputSave([])
    let inputArray = []
    inputArray.push(<PostData RunPopUp={RunPopUp} sendDataUp={sendDataUp} />)
    setInputSave(inputArray)
  }

  useEffect(() => {
    Axios.get(urlGetTest)
      .then((res) => {
        console.log("sent from app.js", res);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
        }
      });
      InputStart()
    sendDataUp();
  }, []);

  return (
    <>
      <Container>
        <LogOut InputStart={InputStart} sendDataUp={sendDataUp} RunPopUp={RunPopUp} />
        <SignIn  sendDataUp={sendDataUp} RunPopUp={RunPopUp} SignMeIn={Auth} />
        {signAndLogInSave}
        <Login  sendDataUp={sendDataUp} RunPopUp={RunPopUp} LogMeIn={Auth} />
        {InputSave}
        {popUpSave}
        <Col>{dataSave}</Col>
        {editSave}
      </Container>
    </>
  );
}
export default App;
