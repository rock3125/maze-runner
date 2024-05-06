class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = {top: true, right: true, bottom: true, left: true};
        this.visited = false;
        this.isStart = false;   // Flag to identify the start cell
        this.isEnd = false;     // Flag to identify the end cell
    }

    draw(context, size) {
        const x = this.x * size;
        const y = this.y * size;
        if (this.isStart) {
            context.fillStyle = 'green'; // Start cell color
        } else if (this.isEnd) {
            context.fillStyle = 'red'; // End cell color
        } else {
            context.fillStyle = 'white';
        }
        context.fillRect(x, y, size, size);
        context.strokeStyle = 'black';
        context.beginPath();
        if (this.walls.top) {
            context.moveTo(x, y);
            context.lineTo(x + size, y);
        }
        if (this.walls.right) {
            context.moveTo(x + size, y);
            context.lineTo(x + size, y + size);
        }
        if (this.walls.bottom) {
            context.moveTo(x + size, y + size);
            context.lineTo(x, y + size);
        }
        if (this.walls.left) {
            context.moveTo(x, y + size);
            context.lineTo(x, y);
        }
        context.stroke();
    }

    checkNeighbors(grid, rows, cols) {
        let neighbors = [];
        let directions = [
            [0, -1, 'top', 'bottom'],
            [1, 0, 'right', 'left'],
            [0, 1, 'bottom', 'top'],
            [-1, 0, 'left', 'right']
        ];

        directions.forEach(([dx, dy, prop, opposite]) => {
            let nx = this.x + dx;
            let ny = this.y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !grid[ny][nx].visited) {
                neighbors.push({cell: grid[ny][nx], wall: prop, opposite: opposite});
            }
        });

        return neighbors.length > 0 ? neighbors : undefined;
    }
}

function generateMaze(rows, cols, cellSize) {
    let canvas = document.getElementById('mazeCanvas');
    let context = canvas.getContext('2d');
    let grid = [];
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
            grid[y][x] = new Cell(x, y);
        }
    }

    let stack = [];
    let current = grid[0][0];
    current.visited = true;

    do {
        let next = current.checkNeighbors(grid, rows, cols);
        if (next) {
            let chosen = next[Math.floor(Math.random() * next.length)];
            chosen.cell.visited = true;
            stack.push(current);
            current.walls[chosen.wall] = false;
            chosen.cell.walls[chosen.opposite] = false;
            current = chosen.cell;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    } while (stack.length > 0);

    grid[0][0].isStart = true; // Marking the start cell
    grid[rows - 1][cols - 1].isEnd = true; // Marking the end cell

    // Drawing the maze after it's fully generated
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            grid[y][x].draw(context, cellSize);
        }
    }
}

generateMaze(40, 40, 20); // Adjust grid size and cell size as needed
