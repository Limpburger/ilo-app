import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

function Game() {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      parent: 'game-container',
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      // load any assets you need for your game here
    }

    function create() {
      // create any game objects you need here
    }

    function update() {
      // update your game logic here
    }

    return () => {
      // clean up the game instance when the component unmounts
      game.destroy(true);
    }
  }, []);

  return(
    <div ref={gameContainerRef} />
  );

}

export default Game;
