
let robots = [];

const robot_height = cell_size;
const robot_width = cell_size / 2;

// get a random direction for our robot friend
function get_random_direction() {
    const n = get_random_int(4);
    if (n === 0) return "up";
    if (n === 1) return "down";
    if (n === 2) return "left";
    return "right";
}

function reset_robots() {
    robots = [];
    const col_start = Math.max(Math.floor(cols / 4), 2)
    const row_start = Math.max(Math.floor(rows / 4), 2)
    let width = cols - col_start * 2
    let height = rows - row_start * 2
    if (width <= 0 || height <= 0) {
        width = 1;
        height = 1;
    }
    for (let i = 0; i < num_robots; i++) {
        robots.push({
            x: ((col_start + get_random_int(width)) * cell_size) + cell_size * 0.5,
            y: ((row_start + get_random_int(height)) * cell_size) + cell_size * 0.5,
            direction: get_random_direction(),
            // robot path finding
            current_path: [],
            choice_not_made: [],
            dead_end: [],
        })
    }
}

// draw the bad guys
function draw_robots() {
    for (let robot of robots) {
        image(robot_svg, robot.x, robot.y, robot_width, robot_height)
    }
}


// move the bad guys
function move_robots() {
    for (let robot of robots) {
        image(robot_svg, robot.x, robot.y, robot_width, robot_height)
    }
}
