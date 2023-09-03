// const main = document.getElementById('main');


var grid;
const cols = 10;
const rows = 10;
var generation = 0;
var running;

function create2dArray() {
    const arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

function setup() {
    console.log('setup');
    // create a 2D array
    grid = create2dArray(10, 10);

    // draw the grid
    draw();//

}

function draw() {
    var canvas = document.querySelector('canvas');
    if (!canvas) {
        // create a canvas
        canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        canvas.style.border = '1px solid black';
        document.body.appendChild(canvas);

        // add event listener
        canvas.addEventListener('click', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const i = Math.floor(x / 50);
            const j = Math.floor(y / 50);
            grid[i][j] = grid[i][j] === 1 ? 0 : 1;
            console.log(grid[i][j]);
            drawCells();
        });
    }

    // get the context
    const ctx = canvas.getContext('2d');

    // draw the grid
    function drawGrid() {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        for (let i = 0; i < grid.length; i++) {
            ctx.moveTo(0, i * 50);
            ctx.lineTo(500, i * 50);
            ctx.moveTo(i * 50, 0);
            ctx.lineTo(i * 50, 500);
        }
        ctx.stroke();
    }

    // draw the cells
    function drawCells() {
        ctx.beginPath();
        ctx.fillStyle = 'black';
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] === 1) {
                    ctx.fillRect(i * 50 + 2, j * 50 + 2, 50 - 4, 50 - 4);
                } else {
                    ctx.clearRect(i * 50 + 2, j * 50 + 2, 50 - 4, 50 - 4);
                }
            }
        }
    }
    drawGrid();
    drawCells();
}

function calculateNeighbors(grid, x, y) {
    // calculate the number of live neighbors for each cell
    // return the number of live neighbors
    let neighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
        if (i < 0 || i >= grid.length) continue;
        for (let j = y - 1; j <= y + 1; j++) {
            if (j < 0 || j >= grid.length) continue;
            if (i === x && j === y) continue;
            if (grid[i][j] === 1) neighbors++;
        }
    }
    return neighbors;
}

function nextGen() {
    // 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    // calculate the next generation
    next = create2dArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const neighbors = calculateNeighbors(grid, i, j);

            if (neighbors < 2 || neighbors > 3) {
                next[i][j] = 0;
            } else if (neighbors === 3) {
                next[i][j] = 1;
            } else {
                next[i][j] = grid[i][j];
            }
        }
    }
    grid = next;
    draw();
    generation++;
    document.getElementById('generation').innerHTML = generation;
}

function start() {
    console.log('start');
    // start the game
    // run the game
    clearInterval(running);
    running = setInterval(() => {
        nextGen();
    }, 500)
}

function stop() {
    console.log('stop');
    // stop the game
    clearInterval(running);
    return;
}

function reset() {
    console.log('reset');
    // reset the game
    grid = create2dArray(cols, rows);
    draw();
    generation = 0;
    document.getElementById('generation').innerHTML = generation;
    return;
}

console.log('setup', setup());