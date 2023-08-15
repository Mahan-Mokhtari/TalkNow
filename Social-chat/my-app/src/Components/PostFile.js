//imports react and use state hook
import React, { useState } from "react";
//imports axios helps send data to the server/backend
import Axios from "axios";
import 'font-awesome/css/font-awesome.min.css';
import { nanoid } from "nanoid";
//uses bootstarp components mad for react and imports css aswell
import { Button, Form, InputGroup, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Btn.css"
function PostFile(props) {
  const urlSend = "http://localhost:3001/testSendImg";
  const urlget = "http://localhost:3001/testgetData";
  let tokenLocal = localStorage.getItem("tokenLocal");
  let name = localStorage.getItem("nameLocal");
  const urlGetAccount = "http://localhost:3001/testGetAccount";
  const [postData, setPostData] = useState({
    file: "",
    key: "",
  });
  
  function submit(e) {
    e.preventDefault();
    console.log(postData.file)
      Axios.post(urlGetAccount, {
        UserName: name,
      }).then((res) => {
        if (res.data.token === tokenLocal) {
          let keyId = nanoid();
          Axios.post(urlSend, {
            File: postData.file,
            key: keyId,
            UserName:name
          })
            .then((res) => {
              //console.log(res.postData.content,'insidesubmit')
              console.log(e);
            })
            .catch((error) => {
              if (error) {
                console.log(error);
              }
            });

          Axios.get(urlget)
            .then((res) => {
              console.log(res);
              props.sendDataUp();
            })
            .catch((error) => {
              if (error) {
                console.log(error);
              }
            });
        } else {
          props.RunPopUp("Please make a account");
        }
      });
    
  }

  function handleChange(e) {
    e.preventDefault();
    const newpost = { ...postData };
    newpost[e.target.id] = e.target.value;
    setPostData(newpost);

    //make the form stick to the top of the screen
    console.log(newpost);
  }
  return (
    <>
      <Row>
        <Col>
          <Form  className="fixed" onSubmit={(e) => submit(e)}>
            
            <InputGroup  className="mb-3">
              <i  onClick={()=>{props.InputUp('OpenPen')}}  style={{ marginRight: "20px", marginTop:'5px'}} className="fa fa-pencil fa-2x" aria-hidden="true"></i>
               <Form.Control
                xs={20}
                sm={20}
                md={16}
                lg={16}
                placeholder="type your post here"
                type="file"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                id="file"
                name="PostFile"
                value={postData.file}
                onChange={(e) => handleChange(e)}
              /> <Button  style={{borderTopRightRadius: '5px',borderBottomRightRadius: '5px'}} className="BtnSignFrontPage" type="submit">
              <i className="fa fa-share" aria-hidden="true"></i>
              </Button>
              
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default PostFile;
