import React, { useState, useRef, useEffect } from 'react';
import Logo from "./logo.svg";
import "./App.css";
import Modal from 'react-modal'
import Avatar from './Avatar.jsx';
import Pet from './Pet.jsx';
import Shop from './Shop.jsx';

import Phaser from 'phaser';
import PhaserGame from './PhaserGame.tsx';

//import DrawArea from './drawArea';


Modal.setAppElement('#root');

const GRID_SIZE = 100;


const GridMap = () => {
  const [objects, setObjects] = useState([
    { id: 'house', x: 100, y: 100 },
    { id: 'shop', x: 0, y: 0 },
    { id: 'game', x: 200, y: 200 },
  ]);

  const handleDrop = (id, x, y) => {
    setObjects((prevObjects) =>
      prevObjects.map((obj) => (obj.id === id ? { ...obj, x, y } : obj))
    );
  };

  return (
    <div className="home-screen">
      {objects.map(obj => (
        <DraggableObject key={obj.id} {...obj} onDrop={handleDrop}  />
      ))}
      <DropTarget onDrop={handleDrop} />
    </div>
  );
};

const DraggableObject = ({ id, x, y, onDrop}) => {
    const dragObjectRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    //modalState
    const [houseModalIsOpen, setHouseModalIsOpen] = useState(false);
    const [shopModalIsOpen, setShopModalIsOpen] = useState(false);

    //gameState
    const [showPhaserCanvas, setShowPhaserCanvas] = useState(false);

    const [selectedObject, setSelectedObject] = useState('');

    const [isCustomizingChar, setIsCustomizingChar] = useState(false);
    const [isCustomizingPet, setIsCustomizingPet] = useState(false);
    const [isCustomizingTheme, setIsCustomizingTheme] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.dropEffect = 'move';

    setDragging(true);
    setOffset({
      x: e.clientX - dragObjectRef.current.offsetLeft,
      y: e.clientY - dragObjectRef.current.offsetTop,
    });
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    const x = e.clientX - offset.x;
    const y = e.clientY - offset.y;

    const newX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const newY = Math.round(y / GRID_SIZE) * GRID_SIZE;

    if (newX >= 0 && newX + GRID_SIZE <= (GRID_SIZE * 10) && newY >= 0 && newY + GRID_SIZE <= (GRID_SIZE * 10)) {
        onDrop(id, newX, newY);
      } else {
        onDrop(id, 0, 0);
      }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      dragObjectRef.current.style.left = `${x}px`;
      dragObjectRef.current.style.top = `${y}px`;
    }
  };

    // Use the updated x and y values in the style attribute
    const style = { left: `${x}px`, top: `${y}px` };

    // Handle Click images
    const [houseClicked, setHouseClicked] = useState(false);
    const [shopClicked, setShopClicked] = useState(false);
    const [gameClicked, setGameClicked] = useState(false);


    //Click house object in grid > navigate to house Modal
    const houseClick = () => {
        setSelectedObject("House");
        setHouseModalIsOpen(true);
        console.log('Click House');
        setHouseClicked(true);
        setShopClicked(false);
      } 
    //Click shop object in grid > navigate to shop Modal
      const shopClick = () => {
        setSelectedObject("Shop");
        setShopModalIsOpen(true);
        setShopClicked(true);
        setHouseClicked(false);
        console.log('Click Shop');
      } 

      const gameClick = () => {
        setShopClicked(false);
        setHouseClicked(false);

        setSelectedObject('Game');
        setShowPhaserCanvas(true);
        console.log('Click Game');
        
      } 

      const customStyles = {
        content: {
          height: '95%',
          width: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'auto'
        }
      };

      // const customizeCharClick = () => {
      //   setIsCustomizingTheme(false);
      //   setIsCustomizingPet(false);
      //   setIsCustomizingChar(true);
      // }

      // const customizePetClick = () => {
      //   setIsCustomizingChar(false);
      //   setIsCustomizingTheme(false);
      //   setIsCustomizingPet(true);
      // }

      // const customizeThemeClick = () => {
      //   setIsCustomizingPet(false);
      //   setIsCustomizingChar(false);
      //   setIsCustomizingTheme(true);
      // }

  return (
    <div
    ref={dragObjectRef}
    className={`draggable-object 
    ${id === 'house' && houseClicked ? 'house-clicked' : ''} 
    ${id === 'shop' && shopClicked ? 'shop-clicked' : ''}
    ${id === 'game' && shopClicked ? 'game-clicked' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseMove={handleMouseMove}
      style={style}
    >
      {id === 'house' && <img onClick={() => houseClick()} src={Logo} alt="House" width="100px" height="100px" />}
      {id === 'shop' && <img onClick={() => shopClick()} src={Logo} alt="Shop" width="100px" height="100px"  />}
      {id === 'game' && <img onClick={() => gameClick()} src={Logo} alt="Game" width="100px" height="100px"  />}

      {/* PhaserGame */}
      {showPhaserCanvas && selectedObject === 'Game' && <PhaserGame />}

      <div id="game-container"></div>

      
      {/* House Modal Page */}
      <Modal isOpen={houseModalIsOpen} style={customStyles} contentClassName="custom-modal-content">
   
        <div className="houseModal">
          
          <header className="headerModal">
          <button className="cancelModalButton" onClick={() => setHouseModalIsOpen(false)}>BACK</button>
            <h1>
              <span>
                {selectedObject}
              </span>
            </h1>
          </header>

          

<div className="container">
  <div className="tabs">

    <div className="tabby-tab">
      <input type="radio" id="tab-1" name="tabby-tabs" defaultChecked/>
      <label for="tab-1">AVATAR</label>
      <div className="tabby-content">
        <Avatar/>
      </div>
    </div>

    <div className="tabby-tab">
      <input type="radio" id="tab-2" name="tabby-tabs"/>
      <label for="tab-2">PETS</label>
      <div className="tabby-content">
        <Pet/>
      </div>
    </div>

    <div className="tabby-tab">
      <input type="radio" id="tab-3" name="tabby-tabs"/>
      <label for="tab-3">Tabby Tab 3</label>
      <div className="tabby-content">
      <p>Use lap as chair love to play with owner's hair tie pooping rainbow while flying in a toasted bread costume in space. Run in circles loves cheeseburgers, nap all day kick up litter. Stick butt in face hide when guests come over.</p> 

      </div>
    </div>

    <div className="tabby-tab">
      <input type="radio" id="tab-4" name="tabby-tabs"/>
      <label for="tab-4">Tabby Tab 4</label>
      <div className="tabby-content">
        <img src="http://i63.tinypic.com/kakc9i.png"/>
        <p>Use lap as chair love to play with owner's hair tie pooping rainbow while flying in a toasted bread costume in space. Run in circles loves cheeseburgers, nap all day kick up litter. Stick butt in face hide when guests come over.</p> 
      </div>
    </div>
    
  </div>

  </div>
        </div>

        
      </Modal>

      <Modal isOpen={shopModalIsOpen}>
        <div className="shopModal">

        <header className="headerModal">
          <button className="cancelModalButton" onClick={() => setShopModalIsOpen(false)}>BACK</button>
            <h1>
              <span>
                {selectedObject}
              </span>
            </h1>
          </header>

          <div className="containerModal">
            <div>
              <Shop/>
            </div>
          </div>

        {/* <h1>{selectedObject}</h1>
        <button className="cancelModalButton" onClick={() => setShopModalIsOpen(false)}>Close Shop</button>
        <button className="Customize-Tab" onClick={() => customizeCharClick()} >Customize Char</button>
        <button className="Customize-Tab" onClick={() => customizePetClick()} >Customize Pet</button>
        <button className="Customize-Tab" onClick={() => customizeThemeClick()} >Customize Theme</button> */}
        </div>
      </Modal>
    </div>
  );
};

const DropTarget = () => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');

    const x = e.clientX - e.target.getBoundingClientRect().left;
    const y = e.clientY - e.target.getBoundingClientRect().top;

    // Call the onDrop function with the updated coordinates
    if (id) {
      const onDrop = e.target.getAttribute('ondrop');
      window[onDrop](id, x, y);
    }
  };

//const dropAreaRef = useRef(null);
//   useEffect(() => {
//     // Still needs to be added to If statement of droppable
//     const dropAreaWidth = dropAreaRef.current.offsetWidth;
//     const dropAreaHeight = dropAreaRef.current.offsetHeight;
//   }, []);





  return <div 
  //ref={dropAreaRef} 
  className="drop-target" 
  onDragOver={handleDragOver} 
  onDrop={handleDrop}>
  </div>;
};

export default GridMap;
