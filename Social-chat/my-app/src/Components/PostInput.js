//imports react and use state hook
import React, { useEffect,useState } from "react";
//imports axios helps send data to the server/backend
import PostText from "./PostText"
import PostFile from "./PostFile";
import 'font-awesome/css/font-awesome.min.css';


function PostData(props) {
  const [postItem, setPostItem] = useState([]);

  let sendDataToParent = ()=>{
    props.sendDataUp()
  }

  let PopUp = (v)=>{
    props.RunPopUp(v)
  }

  let getInput = (v)=>{
    setPostItem([])
    let Item = [];
    if(v ==='OpenCam'){
      Item.push(<PostFile  InputUp={getInput} RunPopUp={PopUp} sendDataUp={sendDataToParent} key={'Filekey'}/>)
    }else if(v ==="OpenPen"){
    Item.push(<PostText InputUp={getInput} RunPopUp={PopUp} sendDataUp={sendDataToParent} key={'textkey'}/>)
    }
    setPostItem(Item)
  }

  useEffect(() => {
    let Item = [];
    Item.push(<PostText InputUp={getInput} RunPopUp={PopUp} sendDataUp={sendDataToParent} key={'textkey'}/>)
    setPostItem(Item)
  }, []);


  
  return (
    <>
     {postItem}
    </>
  );
}

export default PostData;
