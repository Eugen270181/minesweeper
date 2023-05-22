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
  
  //create Field-Table of cells
  function createTable() {
    flagsCount.innerHTML = minesCount;

    const minesArr = Array(minesCount).fill('mine');
    const emptyArr = Array(tableSize*tableSize - minesCount).fill('empty');
    const randArr = emptyArr.concat(minesArr).sort(() => 0.5-Math.random());
    console.log(randArr.join("|"));
    //create Array of randon div elem with class empty or mine and id = number elem
    //adding elemets in HTML structure
    for(let i = 0; i < tableSize*tableSize; i++) {
      const item = document.createElement('div');
      item.setAttribute('id', i);
      item.classList.add(randArr[i]);
      Arr.push(item);
      TAB.appendChild(item);
      /////item-events - onclick & oncontextmenu/////////////////
      item.onclick = function() {
        check(item);
      }

      item.oncontextmenu = function() {
        flag(item);
      }
      /////////////////////////////////////////////////////////
    }
    
    //found count of mines for every item in array and set this number as attr - dangerLevel 
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i].classList.contains('empty')) {
        Arr[i].setAttribute('dangerLevel', dangerLevel(i));
      }
    }
  }
  
  function dangerLevel(itemNumber){
    rez=0;
    i=Math.trunc(itemNumber/tableSize);
    j=(itemNumber % tableSize);
    iTop=itemNumber-tableSize;iTopLeft=iTop-1;iTopRight=iTop+1;
    iBottom=itemNumber+tableSize;iBottomLeft=iBottom-1;iBottomRight=iBottom+1;
    iLeft=itemNumber-1;iRight=itemNumber+1;
    Top=(iTop >= 0);Bottom=((iBottom) <= (tableSize**2-1));
    Left=j>0;Right=j<tableSize-1;
    //top
    if (Top && Arr[iTop].classList.contains('mine')) rez++;
    //bottom
    if (Bottom && Arr[iBottom].classList.contains('mine')) rez++;
    //left
    if (Left && Arr[iLeft].classList.contains('mine')) rez++;
    //left-top
    if (Left && Top && Arr[iTopLeft].classList.contains('mine')) rez++;
    //left-bottom
    if (Left && Bottom && Arr[iBottomLeft].classList.contains('mine')) rez++;
    //right
    if (Right && Arr[iRight].classList.contains('mine')) rez++;
    //right-top
    if (Right && Top && Arr[iTopRight].classList.contains('mine')) rez++;
    //right-bottom
    if (Right && Bottom && Arr[iBottomRight].classList.contains('mine')) rez++;
    return rez;
  }
  createTable();
  //add label - Flag
  function flag(item) {
    if (gameOver) return;
    if (!item.classList.contains('checked') && (flags < minesCount)) {
      if (!item.classList.contains('flag')) {
        item.classList.add('flag');
        item.innerHTML = 'V';
        flags ++;
        flagsCount.innerHTML = minesCount - flags;
        //isGameWon();
      } else {
        item.classList.remove('flag');
        item.innerHTML = '';
        flags --;
        flagsCount.innerHTML = minesCount - flags;
      }
    }
  }
  //check item - action
  function check(item) {
    if (gameOver) return;
    if (item.classList.contains('checked') || item.classList.contains('flag')) return;
    if (item.classList.contains('mine')) {
      //gameLost(item);
    } else {
      let alarm = item.getAttribute('dangerLevel');
      if (alarm !=0) {
        if (alarm == 1) item.classList.add('alarm1');
        if (alarm == 2) item.classList.add('alarm2');
        if (alarm == 3) item.classList.add('alarm3');
        if (alarm == 4) item.classList.add('alarm4');
        item.classList.add('checked');
        item.innerHTML = alarm;
        return;
      }
      //checkEmpty(item, item.id);
    }
    item.classList.add('checked')
  }
  




