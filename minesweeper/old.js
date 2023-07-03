document.addEventListener('DOMContentLoaded', () => {   
  //Global const
  let minesCount = 10;
  let tableSize = 10;
  let countRecursiveCall = 0;
  // HTML STRUCTURE
  const WRAPPER = document.createElement('div');
  const HEADER = document.createElement('header');
  const RESULT = document.createElement('div');
  const TAB = document.createElement('div');
  const FLAGS = document.createElement('div');
  const headerTitle = document.createElement('h1');
  
  
  WRAPPER.classList.add('wrapper');
  HEADER.classList.add('header');
  RESULT.setAttribute('id', 'result');
  TAB.classList.add('table');
  headerTitle.classList.add('header-title');
  
  HEADER.appendChild(headerTitle);
  WRAPPER.appendChild(HEADER);
  WRAPPER.appendChild(RESULT);
  WRAPPER.appendChild(TAB);
  WRAPPER.appendChild(FLAGS);
  document.body.appendChild(WRAPPER);
  
  headerTitle.innerHTML = '<span id=\'stepsCount\'></span>(<=steps)<input type="button" value="ClickToStartGame!" id=\'startGame\'>(timer=>)<span id=\'timeCount\'></span>';
  FLAGS.innerHTML = 'Uncleared mines left: <span id=\'flagsCount\'></span>';
  const flagsCount = document.querySelector('#flagsCount');
  const stepsCount = document.querySelector('#stepsCount');
  const timeCount = document.querySelector('#timeCount');
  flagsCount.innerHTML = minesCount;
  stepsCount.innerHTML = 0;
  timeCount.innerHTML = '00';
  for(let i = 0; i < tableSize*tableSize; i++) {
    const item = document.createElement('div');
    item.setAttribute('id', i);
    item.classList.add('start');
    TAB.appendChild(item);
  }
  document.querySelector('#startGame').onclick = () =>beforeGame();
  /////////////////////////////////////////////////////////////////
  function beforeGame() {
    countRecursiveCall=0;
    RESULT.innerHTML='';
    flagsCount.innerHTML = minesCount;
    stepsCount.innerHTML = 0;
    timeCount.innerHTML = '00';
    TAB.innerHTML = '';
    for(let i = 0; i < tableSize*tableSize; i++) {
      const item = document.createElement('div');
      item.setAttribute('id', i);
      item.classList.add('start');
      TAB.appendChild(item);
      item.onclick = function() {
        item.classList.add('first-cell');
        startGame(item.id);
      }
    }
  }
  function startGame(idFirstCell) {
    let step = 0; let timer = '00';
    let time = performance.now();
    let Arr = new Array();
    let gameOver = false;
    let flags = 0;
        
    //check item - action
    function check(item) {
      if (gameOver) return;
      if (item.classList.contains('checked') || item.classList.contains('flag')) return;
      if (item.classList.contains('mine')) {
        gameLost(item);
      } else {
        let alarm = item.getAttribute('dangerLevel');
        item.classList.add('checked');
        if (alarm !=0) {
          if (alarm == 1) item.classList.add('alarm1');
          if (alarm == 2) item.classList.add('alarm2');
          if (alarm == 3) item.classList.add('alarm3');
          if (alarm == 4) item.classList.add('alarm4');
          if (alarm == 5) item.classList.add('alarm5');
          step++;
          stepsCount.innerHTML = step;
          item.innerHTML = alarm;
          return;
        }
        getAdjacentCells(parseInt(item.id,10));
      }
    }
     
    function getAdjacentCells(itemNumber){
      const i=Math.trunc(itemNumber/tableSize);
      const j=(itemNumber % tableSize);
      const iTop=itemNumber-tableSize;
      const iTopLeft=iTop-1;
      const iTopRight=iTop+1;
      const iBottom=itemNumber+tableSize;
      const iBottomLeft=iBottom-1;
      const iBottomRight=iBottom+1;
      const iLeft=itemNumber-1;
      const iRight=itemNumber+1;
      const Top=(iTop >= 0);
      const Bottom=((iBottom) <= (tableSize**2-1));
      const Left=j>0;
      const Right=j<tableSize-1;
      const Square = [
        [iTop, Top],
        [iTopLeft, Top && Left],
        [iTopRight, Top && Right],
        [iBottom, Bottom],
        [iBottomLeft, Bottom && Left],
        [iBottomRight, Bottom && Right],
        [iLeft, Left],
        [iRight, Right]
      ];
      
      for (const [index, condition] of Square) {
        const cellIndex = index >= 0 ? index : -1; // Handle out-of-bounds indices
        if (condition) check(Arr[cellIndex]);
      }
      
    }
    
    const minesArr = Array(minesCount).fill('mine');
    const emptyArr = Array(tableSize*tableSize - minesCount-1).fill('empty');
    const randArr = emptyArr.concat(minesArr).sort(() => 0.5-Math.random());
    randArr.splice(idFirstCell,0,'empty');
    //console.log(randArr.join("|"));
    //create Array of random div elem with class empty or mine and id = number elem
    //adding elemets in HTML structure
    for(let i = 0; i < tableSize*tableSize; i++) {
      const item = document.getElementById(i);
      item.classList.add(randArr[i]);
      Arr.push(item);
      /////item-events - onclick & oncontextmenu/////////////////
      item.onclick = function() {check(item);}
      item.oncontextmenu = function(evt) {
        evt.preventDefault(CloseEvent);
        flag(item);
      }
      /////////////////////////////////////////////////////////
    }
    //found count of mines for every item in array and set this number as attr - dangerLevel 
    for (let i = 0; i < Arr.length; i++) {
      if (Arr[i].classList.contains('empty')) {
        alarm=dangerLevel(i);
        Arr[i].setAttribute('dangerLevel', alarm);
        Arr[i].innerHTML=alarm;
      }
    }
    check(document.getElementById(idFirstCell));
       
    function dangerLevel(itemNumber) {
      res=0;
      const i=Math.trunc(itemNumber/tableSize);
      const j=(itemNumber % tableSize);
      const iTop=itemNumber-tableSize;
      const iTopLeft=iTop-1;
      const iTopRight=iTop+1;
      const iBottom=itemNumber+tableSize;
      const iBottomLeft=iBottom-1;
      const iBottomRight=iBottom+1;
      const iLeft=itemNumber-1;
      const iRight=itemNumber+1;
      const Top=(iTop >= 0);
      const Bottom=((iBottom) <= (tableSize**2-1));
      const Left=j>0;
      const Right=j<tableSize-1;
      
      //top
      if (Top && Arr[iTop].classList.contains('mine')) res++;

      //bottom
      if (Bottom && Arr[iBottom].classList.contains('mine') ) res++;

      //left
      if (Left && Arr[iLeft].classList.contains('mine')) res++;

      //left-top
      if (Left && Top && Arr[iTopLeft].classList.contains('mine')) res++;

      //left-bottom
      if (Left && Bottom && Arr[iBottomLeft].classList.contains('mine')) res++;

      //right
      if (Right && Arr[iRight].classList.contains('mine')) res++;

      //right-top
      if (Right && Top && Arr[iTopRight].classList.contains('mine')) res++;

      //right-bottom
      if (Right && Bottom && Arr[iBottomRight].classList.contains('mine')) res++;
            
      return res;
    }    
    //add label - Flag
    function flag(item) {
      if (gameOver) return;
      if (!item.classList.contains('checked') && (flags < minesCount)) {
        if (!item.classList.contains('flag')) {
          item.classList.add('flag');
          item.innerHTML = 'V';
          flags ++;
          flagsCount.innerHTML = minesCount - flags;
          isGameWon();
        } else {
          item.classList.remove('flag');
          item.innerHTML = '';
          flags --;
          flagsCount.innerHTML = minesCount - flags;
        }
      }
    }
        
    //Game Lost
    function gameLost(item) {
      RESULT.innerHTML = 'Game over. Try again';
      gameOver = true;
      //show hidden other mines
      Arr.forEach(elem => {
        if (elem.classList.contains('mine')) {
          elem.innerHTML = 'Q';
          elem.classList.remove('mine');
          elem.classList.add('checked');
        }
      })
    }
    
    //Is Game Won?
    function isGameWon() {
    let countFlagMines = 0;
  
      for (let i = 0; i < Arr.length; i++) {
        if (Arr[i].classList.contains('flag') && Arr[i].classList.contains('mine')) {
          countFlagMines++;
        }
        if (countFlagMines === minesCount) {
          time = Math.trunc((performance.now()-time)/1000);
          RESULT.innerHTML = 'Hooray! You found all mines in '+time+' seconds and '+step+' moves!';
          RESULT.style.color = 'orange';
          gameOver = true;
        }
      }
    }
  }
})
  



