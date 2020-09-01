import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import tickIcon from './components/img/tick.svg';
function App() {
  const [todos, setTodos] = useState([]);
  let [input, setInput] = useState('');
  const [ currentFilter, setCurrentFilter ] = useState('all'); 
  const onItemClicked = (item) => {
    return(event) => {
      const isComplete = item.isComplete;
      const index = todos.indexOf(item);
      setTodos([
        ...todos.slice(0, index),
        {
          ...item,
          isComplete: !isComplete
        },
        ...todos.slice(index + 1)
      ])
    }
  }
  const onEnterUp = (event) => {
    if(event.keyCode === 13){
      if(!input){
        return;
      }
      input = input.trim();
      if(!input){
        return;
      }  
      setTodos([
        {
          title: input,
          isComplete: false
        },
        ...todos
      ])
      
      setInput('');
    }
  }
  const showAll = () => {
    setCurrentFilter('all');
  }
  const showActive = () => {
    setCurrentFilter('active');
  }
  const showCompleted = () => {
    setCurrentFilter('completed');
  }
  const clearCompleted = () => {
    let todoItems = todos.filter(item => item.isComplete === false)
    setTodos([
      ...todoItems
    ])
  }
  let leftItems = todos.filter(item => item.isComplete === false);

  
  return (
    todos.length &&(
    <div className="app">
      <div className="app-header">
        <img  src={tickIcon} width={32}/>
        <input 
          value={input} 
          onChange={event => setInput(event.target.value)}
          onKeyUp={onEnterUp}
          type="text" 
          placeholder="What needs to be done?"/>
      </div>
      
      {todos.length > 0 && currentFilter === 'all' &&
        todos.map((item, index) => (
          <Item 
            key={index} 
            title={item.title} 
            isComplete={item.isComplete}
            onClick={onItemClicked(item)}
          />
        ))
      }
      {todos.length > 0 && currentFilter === 'active' &&
        todos.map((item, index) => (
          !item.isComplete && 
          <Item 
            key={index} 
            title={item.title} 
            isComplete={item.isComplete}
            onClick={onItemClicked(item)}
          />
        ))
      }
      {todos.length > 0 && currentFilter === 'completed' &&
        todos.map((item, index) => (
          item.isComplete && <Item 
            key={index} 
            title={item.title} 
            isComplete={item.isComplete}
            onClick={onItemClicked(item)}
          />
        ))
      }
      <div className="app-footer">
        <p>{leftItems.length} items left</p>
        <div className="btn-group">
          <button onClick={showAll}>All</button>
          <button onClick={showActive}>Active</button>
          <button onClick={showCompleted}>Completed</button>
        </div>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
      
    </div>
  )||
  !todos.length && (
  <div className="app">
    <div className="app-header">
      <img src={tickIcon} width={32}/>
      <input 
        value={input} 
        onChange={event => setInput(event.target.value)}
        onKeyUp={onEnterUp}
        type="text" 
        placeholder="What needs to be done?"/>
    </div>
  </div>
  )
  )
}


export default App;
