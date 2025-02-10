import React, { useState } from 'react'
import "./SharpText.css"
type Props = {
  itemClickEventHandler: (item: HTMLElement) => void,
}

const SharpText2 = (props: Props) => {
  const [isAddComment, setIsAddComment] = useState(false);
  const [inputedComment, setInputedComment] = useState("");
  return (
    <div>
      <div onClick={(e) => {
        setIsAddComment(true);
      }}>
        <span className="text-dayo" style={{fontFamily:"Hiragino Sans"}}>
          コメント
        </span>
      </div>
      {isAddComment && <div onClick={e => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("st-black-filter")) {
          setIsAddComment(false);
        }
      }}>
        <div className="st-black-filter"></div>
        <div className="addProductCommentForward">
          <div>コメントを入力</div>
          <input onChange={e => setInputedComment(e.currentTarget.value)} />
          <button onClick={e => {
            const newText = document.createElement("span");
            newText.textContent = inputedComment;
            props.itemClickEventHandler(newText);
            setIsAddComment(false);
          }}>追加</button>
        </div>

      </div>}
    </div>

    // <div  onClick={(e) => {
    //   const content=prompt("コメントを入力");
    //   const newText=document.createElement("span");
    //   newText.textContent=content;
    //   props.itemClickEventHandler(newText);
    // }} style={{border:"1px solid black"}}>
    //   <span className="text-dayo">
    //     コメント
    //   </span>
    // </div>



  )
}

export default SharpText2