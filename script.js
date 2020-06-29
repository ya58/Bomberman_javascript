const H_GRID = 20;
const V_GRID = 20;
const GRID_SIZE = 40;


const WINDOW_WIDTH = H_GRID * GRID_SIZE;
const WINDOW_HEIGHT = V_GRID * GRID_SIZE;




var carre = document.getElementById('carre');
carre.style.width = WINDOW_WIDTH;
carre.style.height = WINDOW_HEIGHT;


var pion = document.getElementById('pion'),
  s = pion.style,
  x = 0,
  y = 0;


var blockGrid = []; //on cree des grilles
for (var i = 0; i < H_GRID; i++) {
  blockGrid.push([]);
  for (var j = 0; j < V_GRID; j++) {
    let block = document.createElement("div");
    block.style.width = "40px";
    block.style.height = "40px";
    block.style.display = "flex";
    block.style.position = "absolute";

    if (random100() > 90) {
        block.style.backgroundColor = "black";
      block.traverser = false;
    } else {

      block.traverser = true;
    }
    block.style.marginLeft = (i * GRID_SIZE).toString() + "px";
    block.style.marginTop = (j * GRID_SIZE).toString() + "px";

    document.getElementById("carre").appendChild(block);
    blockGrid[i].push(block);
  }
}

var vilainListe = []
for (var i = 0; i < 10; i++) {
  let vilain = document.createElement('div');

let x = 0;
let y = 0;
while (!blockGrid[x][y].traverser || (x === 0 && y ===0)) {
x = Math.floor(Math.random() * (H_GRID))
y = Math.floor(Math.random() * (V_GRID))
}
blockGrid[x][y].traverser = false;
  vilain.vilainX = x;
  vilain.vilainY = y;
  vilain.direction = "right";



  vilain.id = "vilain" + String(i);
  vilain.style.width = "40px";
  vilain.style.height = "40px";
  vilain.style.position = "absolute";
  vilain.style.backgroundImage = 'url(img/vaisseau.png)';
  vilain.style.backgroundSize = "contain";
  vilain.style.left = String(vilain.vilainX * GRID_SIZE) + "px";
  vilain.style.top = String(vilain.vilainY * GRID_SIZE) + "px";
  vilain.style.zIndex = "95";
  carre.appendChild(vilain);




  vilainListe.push(vilain)
}



var frame = 0;

function loop() {
  if (frame === 60) {
    for (var i = 0; i < vilainListe.length; i++) {
      let vilain = vilainListe[i];
      let vilainX = vilain.vilainX
      let vilainY = vilain.vilainY
      let direction = vilain.direction
      blockGrid[vilainX][vilainY].traverser = true ;
      switch (direction) {
        case "left":
          if (vilainY > 0 && blockGrid[vilainX][vilainY - 1].traverser)
            vilainY--;
          break;

        case "right":

          if (vilainX < H_GRID - 1 && blockGrid[vilainX + 1][vilainY].traverser)
            vilainX++;
          break;

        case "up":
          console.log(vilainY)
          if (vilainY < V_GRID - 1 && blockGrid[vilainX][vilainY + 1].traverser)

            vilainY++;
          break;

        case "down":
          if (vilainX > 0 && blockGrid[vilainX - 1][vilainY].traverser)
            vilainX--;
          break;
      }
      vilain.style.left = String(vilainX * GRID_SIZE) + 'px';
      vilain.style.top = String(vilainY * GRID_SIZE) + 'px';

      let random = random100();

      if (random < 25) {
        direction = "left";
      }

      if (random >= 25 && random < 50) {
        direction = "right";
      }

      if (random >= 50 && random < 75) {
        direction = "up";
      }

      if (random > 75) {
        direction = "down";
      }

      vilain.vilainX = vilainX
      vilain.vilainY = vilainY
      vilain.direction = direction
      blockGrid[vilainX][vilainY].traverser = false ;
    }

    frame = 0;
  }
  frame++;

  window.requestAnimationFrame(loop);

}

window.requestAnimationFrame(loop);




document.onkeydown = function(event) {
//  var event = event || window.event;
    var keyCode = event.keyCode;
  switch (keyCode) {
    case 38:
    startAnimationhaut();//haut
      if (y > 0 && blockGrid[x][y - 1].traverser)
        y--; // ou y-=40;
      break;
    case 39:
    startAnimationdroite();//droite
      if (x < H_GRID -1 && blockGrid[x + 1][y].traverser)
        x++;
      break;
    case 40://bas
    startAnimationbas();
    console.log(y);
      if (y < V_GRID -1 && blockGrid[x][y + 1].traverser)
        y++;
      break;
    case 37:
    startAnimationgauche();//gauches
      if (x > 0 && blockGrid[x - 1][y].traverser)
        x--;
      break;
  }
  s.left = String(x*GRID_SIZE) + 'px';
  s.top = String(y*GRID_SIZE) + 'px';
}


function randomColor() {
  return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function random100() {
  return Math.floor(Math.random() * 100);
}


var animationInterval;
var spriteSheet = document.getElementById("pion");
var widthOfSpriteSheet = 160;
var widthOfEachSprite = 40;
var heightOfSpriteSheet = 160;
var heightOfEachSprite = 40;

function stopAnimation() {
  clearInterval(animationInterval);
}

function startAnimationbas() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 0px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}


function startAnimationhaut() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 40px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}


function startAnimationdroite() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 80px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}

function startAnimationgauche() {
  stopAnimation();
  var position = widthOfEachSprite; //start position for the image
  const speed = 110; //in millisecond(ms)
  const diff = widthOfEachSprite; //difference between two sprites

  animationInterval = setInterval(() => {
    spriteSheet.style.backgroundPosition = `-${position}px 120px`;

    if (position < widthOfSpriteSheet) {
      position = position + diff;
    } else {
      //increment the position by the width of each sprite each time
      position = widthOfEachSprite;
    }
    //reset the position to show first sprite after the last one
  }, speed);
}


//Start animation
// startAnimation();
