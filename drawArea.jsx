import React, {useState} from "react";
import { ReactComponent as Head1 } from './img/head1.svg';
import './App.css'
import Logo from "./logo.svg";

function DrawingArea() {
    const [color, setColor] = useState('#000000');
  
    function handleDrawingClick(event) {
      event.target.style.fill = color;
    }
  
    function handleColorChange(event) {
      setColor(event.target.value);
    }
  
    return (
      <div>
        <svg id="drawing" onClick={handleDrawingClick}>
          <Head1/>
        </svg>
        <select id="select-color" onChange={handleColorChange}>
          <option value="#000000">Black</option>
          <option value="#ffffff">White</option>
          <option value="#ff0000">Red</option>
          <option value="#00ff00">Green</option>
          <option value="#0000ff">Blue</option>
        </select>
      </div>
    );
  }

  export default DrawingArea;