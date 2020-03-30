// DOM
const drawingContainer = document.querySelector('#drawing-container');
const clearGridBtn = document.querySelector('#clear-grid-btn');
const resizeGridBtn = document.querySelector('#resize-grid-btn');

const drawBlackBtn = document.querySelector('#draw-black-btn');
const drawRGBBtn = document.querySelector('#draw-rgb-btn');
const drawEraseBtn = document.querySelector('#draw-erase-btn');

// Defaults
let gridSize = 16;
let drawStyle = colorCellBlack;

// Event Listeners
drawBlackBtn.addEventListener('click', () => {
    drawStyle = colorCellBlack;
    addDrawStyle();
});
drawRGBBtn.addEventListener('click', () => {
    drawStyle = colorCellRGB;
    addDrawStyle();
});
drawEraseBtn.addEventListener('click', () => {
    drawStyle = colorCellErase;
    addDrawStyle();
});
clearGridBtn.addEventListener('click', clearGrid);
resizeGridBtn.addEventListener('click', resizeGrid);

// Initial draw grid
drawGrid(gridSize);


// Functions
function drawGrid(cellSize) {
    for(let row = 0; row < cellSize; row++) {
        let rowElem = document.createElement('div');
        rowElem.style.display = 'flex';
        drawingContainer.appendChild(rowElem);
        for(let col = 0; col < cellSize; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = `${drawingContainer.clientWidth / cellSize}px`;
            cell.style.height = `${drawingContainer.clientHeight / cellSize}px`;
            rowElem.appendChild(cell);
        }
    }
    addDrawStyle();
}

function addDrawStyle() {
    let cellGrid = document.querySelectorAll('div.cell');
    cellGrid.forEach((cell) => {
        cell.removeEventListener('mouseover', drawStyle);
        cell.addEventListener('mouseover', drawStyle);
    });
}

function colorCellBlack() {
    this.style.backgroundColor = 'black';
}

function colorCellRGB() {
    let color = `rgb(${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1}, ${Math.floor(Math.random() * 255) + 1})`;
    this.style.backgroundColor = color;
}

function colorCellErase() {
    this.style.backgroundColor = '#E1E1E1';
}

function clearGrid() {
    drawingContainer.innerHTML = '';
    drawGrid(gridSize);
}

function resizeGrid() {
    drawingContainer.innerHTML = '';

    let newSize = prompt("Enter new grid size:");
    if(newSize > 0) {
        gridSize = newSize;
        drawGrid(gridSize);
    } else {
        drawGrid(gridSize);
    }
}