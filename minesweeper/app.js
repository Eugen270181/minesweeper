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
FLAGS.innerHTML = 'Flags count: <span id=\'flagsCount\'>10</span>';
/////////////////////////////////////////////////////////////////
  const res = document.querySelector('#res');
  const table = document.querySelector('.table');
  const flagsCount = document.querySelector('#flagsCount');
  let bombCount = 10;
  let width = 10;
  let flags = 0;
  let arr = [];
  let gameOver = false;



