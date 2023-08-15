import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "./Buttons"
import BG from "./CardBG.jpg";
import Axios from "axios";
function PostCard(props) {
  const urlTestButtonsDelete = "http://localhost:3001/TestButtonsDelete";
  let name = localStorage.getItem("nameLocal");
  let token = localStorage.getItem("tokenLocal");
console.log('token',token)
let edit = ()=>{

  props.sendEdit(props.id, props.text)
}
let deleteItem = ()=>{
  Axios.post(urlTestButtonsDelete, {
    Buttons: "Delete",
    key: props.id,
  })
    .then(() => {
    
      props.sendButtonStatus();
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
}
  return (
    <>
      <Card>
        <Card.Img variant="top" src={props.file} />
        <Card.Body>
          <Card.Title>{props.name} has said :</Card.Title>
          <Card.Text>{props.text}</Card.Text>
          {
            token === 'null' ||token === ''|| props.name !== name
            ?(<div></div>)
            :(<Buttons 
              edit={edit}
              DeleteItem={deleteItem}
              
            
              key={'saerytgsrth'} />)

          }
        </Card.Body>
      </Card>
    </>
  );
}
export default PostCard;
