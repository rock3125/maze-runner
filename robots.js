
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

// is a direction viable? i.e. we haven't tried it before
function is_viable(robot, cell_x, cell_y, direction) {
    for (const de of robot.dead_end) {
        if (de.cell_x === cell_x && de.cell_y === cell_y && de.direction === direction)
            return false
    }
    return true
}

// move the bad guys
function move_robots() {
    for (let robot of robots) {

        let dx = 0;
        let dy = 0;
        if (robot.direction === "up") {
            dy = -1;
        } else if (robot.direction === "down") {
            dy = 1;
        } else if (robot.direction === "left") {
            dx = -1;
        } else if (robot.direction === "right") {
            dx = 1;
        }

        let cell_x = Math.floor(robot.x / cell_size);
        let cell_y = Math.floor(robot.y / cell_size);

        const new_xy = move_if_possible(robot.x, robot.y, dx, dy,
            robot_width * 0.5, robot_height * 0.5, robot_height * 0.5)

        // couldn't move?
        if (robot.x === new_xy.x && robot.y === new_xy.y) {
            robot.dead_end.push({cell_x: cell_x, cell_y: cell_y, direction: robot.direction});
            // pick a new direction
            if (is_viable(robot, cell_x, cell_y, "left")) {
                robot.direction = "left";
            } else if (is_viable(robot, cell_x, cell_y, "right")) {
                robot.direction = "right";
            } else if (is_viable(robot, cell_x, cell_y, "up")) {
                robot.direction = "up";
            } else if (is_viable(robot, cell_x, cell_y, "down")) {
                robot.direction = "down";
            }
        }

        robot.x = new_xy.x;
        robot.y = new_xy.y;

    }

}
