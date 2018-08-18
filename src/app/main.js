import { createState } from '../lib';
kontra.init();

const dodgeOffset = 5;
const movementKeys = ['left', 'right', 'down'];
const initialValues = {
  x: 125,        // starting x,y position of the sprite
  y: 100,
  color: 'red',  // fill color of the sprite rectangle
  width: 50,     // width and height of the sprite rectangle
  height: 40,
  // dx: 2          // move the sprite 2px to the right every frame
}

const initialState = {
  dodging: {
    left: false,
    right: false,
    down: false,
  }
};

const sprite = kontra.sprite(initialValues);
const state = createState(initialState);

const activateDodgeAttribute = direction => state.setAttribute({
  dodging: {...initialState.dodging, [direction]: true }
});

const movementMatrix = {
  dodgeLeft() {
    sprite.x = sprite.x - dodgeOffset;
    activateDodgeAttribute('left');
  },
  dodgeRight() {
    sprite.x = sprite.x + dodgeOffset;
    activateDodgeAttribute('right');
  },
  dodgeDown() {
    sprite.y = sprite.y + dodgeOffset;
    activateDodgeAttribute('down');
  },
  resetDodge() {
    sprite.x = initialValues.x;
    sprite.y = initialValues.y;
    state.setAttribute({
      dodging: initialState.dodging,
    });
  },

}
const createDodgeHandler = direction => () => {
  const isCurrentlyDodgingThisWay = state.getAttribute('dodging')[direction];
  if(isCurrentlyDodgingThisWay) return;
  movementMatrix.resetDodge();
  movementMatrix[`dodge${direction[0].toUpperCase()}${direction.substring(1)}`]()
}

movementKeys.forEach(key => kontra.keys.bind(key, createDodgeHandler(key)))

// create the main game loop
let loop = kontra.gameLoop({  
  update: function() {
    // update the game state
  },
  // render the game state
  render: function() {
    sprite.render();
  }
});

// start the game
loop.start();