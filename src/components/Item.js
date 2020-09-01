import React from 'react';
import './Item.css';
import checkIcon from './img/check.svg';
import checkDoneIcon from './img/check-done.svg';

function Item({title, isComplete, onClick}) {
  let url = checkIcon;
  if(isComplete){
    url = checkDoneIcon;
  }
  return (
    <div className={`item ${isComplete === true && 'item-complete'}`}>
      <img onClick={onClick}  src={url} width={32}/>
      <p>{title}</p>
    </div>
  )
}

export default Item
