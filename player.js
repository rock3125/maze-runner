
const player_height = cell_size;
const player_width = cell_size / 2;

let player = {
    x: cell_size / 2,
    y: cell_size / 2,
    animation: 0,
    direction: 1, // left -1, right 1
}


function draw_player() {
    if (girl_svg) {
        image(girl_svg[player.animation], player.x, player.y, player_width, player_height)
    }
}

function player_keys() {
    let dy = 0;
    let dx = 0;
    if (keyIsDown(UP_ARROW)) {
        dy = -1;
    } else if (keyIsDown(DOWN_ARROW)) {
        dy = 1;
    }

    if (keyIsDown(LEFT_ARROW)) {
        dx = -1;
    } else if (keyIsDown(RIGHT_ARROW)) {
        dx = 1;
    }

    let cell_x = Math.floor(player.x / cell_size);
    let cell_y = Math.floor(player.y / cell_size);
    const current_cell = maze[cell_y][cell_x];

    if (dx < 0) {
        const new_x = player.x + dx * player_width * 0.5;
        const new_cell_x = Math.floor(new_x / cell_size);
        if (new_cell_x >= 0) {
            if (new_cell_x !== cell_x) {
                const left_cell = maze[cell_y][new_cell_x];
                if (!left_cell.walls.right && !current_cell.walls.left) {
                    player.x += dx;
                }
            } else {
                player.x += dx;
            }
        }
    }
    else if (dx > 0) {
        const new_x = player.x + dx * player_width * 0.5;
        const new_cell_x = Math.floor(new_x / cell_size);
        if (new_cell_x < cols) {
            if (new_cell_x !== cell_x) {
                const right_cell = maze[cell_y][new_cell_x];
                if (!right_cell.walls.left && !current_cell.walls.right) {
                    player.x += dx;
                }
            } else {
                player.x += dx;
            }
        }
    }

    if (dy < 0) {
        const new_y = player.y + dy * player_height * 0.6;
        const new_cell_y = Math.floor(new_y / cell_size);
        if (new_cell_y >= 0) {
            if (new_cell_y !== cell_y) {
                const top_cell = maze[new_cell_y][cell_x];
                if (!top_cell.walls.bottom && !current_cell.walls.top) {
                    player.y += dy;
                }
            } else {
                player.y += dy;
            }
        }
    }
    else if (dy > 0) {
        const new_y = player.y + dy * player_height * 0.6;
        const new_cell_y = Math.floor(new_y / cell_size);
        if (new_cell_y < rows) {
            if (new_cell_y !== cell_y) {
                const bottom_cell = maze[new_cell_y][cell_x];
                if (!bottom_cell.walls.top && !current_cell.walls.bottom) {
                    player.y += dy;
                }
            } else {
                player.y += dy;
            }
        }
    }

    if (dx !== 0 || dy !== 0) {
        if (game_counter % 3 === 0) {
            player.animation = (player.animation + 1) % girl_svg.length;
        }
    } else {
        player.animation = 0;
    }

}
