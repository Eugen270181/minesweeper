// HTML STRUCTURE
const WRAPPER = document.createElement('div');
const HEADER = document.createElement('header');
const RESULT = document.createElement('div');
const TAB = document.createElement('div');
const FLAGS = document.createElement('div');
const headerTitle = document.createElement('h1');

WRAPPER.classList.add('wrapper');
HEADER.classList.add('header');
RESULT.setAttribute('id', 'res');
TAB.classList.add('table');
headerTitle.classList.add('header-title');

HEADER.appendChild(headerTitle);
WRAPPER.appendChild(HEADER);
WRAPPER.appendChild(RESULT);
WRAPPER.appendChild(TAB);
WRAPPER.appendChild(FLAGS);
document.body.appendChild(WRAPPER);

headerTitle.innerHTML = 'MinesWeeper!';
FLAGS.innerHTML = 'Uncleared mines left: <span id=\'flagsCount\'></span>';
/////////////////////////////////////////////////////////////////
  const flagsCount = document.querySelector('#flagsCount');
  let minesCount = 10;
  let tableSize = 10;
  let flags = 0;
  let Arr = [];
  let gameOver = false;
  
  //create Field of cells
  function createTable() {
    flagsCount.innerHTML = minesCount;

    const minesArr = Array(minesCount).fill('mine');
    const emptyArr = Array(tableSize*tableSize - minesCount).fill('empty');
    const randArr = emptyArr.concat(minesArr).sort(() => 0.5-Math.random());
    //console.log(randArr.join("|"));

    for(let i = 0; i < tableSize*tableSize; i++) {
      const item = document.createElement('div');
      item.setAttribute('id', i);
      item.classList.add(randArr[i]);
      Arr.push(item);
      TAB.appendChild(item);
      /////item-events - onclick & oncontextmenu/////////////////
      item.onclick = function(e) {
        item.style.backgroundColor = "red";
      }

      item.oncontextmenu = function(e) {
        alert("oncontextmenu");
      }
      /////////////////////////////////////////////////////////
    }
  }
  
  createTable();




