
const player_height = cell_size;
const player_width = cell_size / 2;

let player = {}
let bullets = [];
const bullet_speed = 5;

function reset_player() {
    player = {
        x: cell_size / 2,
        y: cell_size / 2,
        animation: 0,
        dir: {x :0, y: 0}
    }
    bullets = [];
}

function draw_player() {
    if (girl_svg) {
        image(girl_svg[player.animation], player.x, player.y, player_width, player_height)
    }
}

function shoot() {
    // Only shoot if we have a direction
    if (player.dir.x === 0 && player.dir.y === 0) return;

    // Rate limiting: Only one bullet every 20 frames
    if (game_counter % 4 === 0) {
        bullets.push({
            x: player.x,
            y: player.y,
            dx: player.dir.x,
            dy: player.dir.y
        });
    }
}

function player_keys() {
    let dy = 0;
    let dx = 0;

    let speed = 1;
    if (keyIsDown(SHIFT)) {
        speed = 2;
    }

    if (keyIsDown(UP_ARROW)) {
        dy = -speed;
    } else if (keyIsDown(DOWN_ARROW)) {
        dy = speed;
    }

    if (keyIsDown(LEFT_ARROW)) {
        dx = -speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
        dx = speed;
    }

    if (keyIsDown(32)) { // 32 is Space
        shoot();
    }

    if (dx !== 0 || dy !== 0) {
        // set player direction
        player.dir = { x: dx, y: dy };

        const new_xy = move_if_possible(player.x, player.y, dx, dy,
            player_width * 0.5, player_height * 0.6, player_height * 0.4)
        player.x = new_xy.x;
        player.y = new_xy.y;
    }

    if (dx !== 0 || dy !== 0) {
        if (game_counter % 3 === 0) {
            player.animation = (player.animation + 1) % girl_svg.length;
        }
    } else {
        player.animation = 0;
    }

    const target_box_x = (cols - 1) * cell_size + (cell_size * 0.5);
    const target_box_y = (rows - 1) * cell_size + (cell_size * 0.5);
    const target_delta_x = Math.abs(player.x - target_box_x);
    const target_delta_y = Math.abs(player.y - target_box_y);
    if (target_delta_x < 10 && target_delta_y < 30) {
        game_state = "won";
    }

}

function update_bullets() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];

        // Move the bullet based on the speed and the player's last direction
        b.x += b.dx * bullet_speed;
        b.y += b.dy * bullet_speed;

        // 1. Check for wall collisions using move_if_possible
        // We use a tiny radius (1 pixel) for the bullet
        let check = move_if_possible(b.x, b.y, b.dx, b.dy,
            player_width * 0.5, player_height * 0.5, player_width * 0.4);
        if (check.x === b.x && check.y === b.y) {
            bullets.splice(i, 1); // Hit a wall, remove bullet
            continue;
        }

        // 2. Check for robot collisions
        for (let j = robots.length - 1; j >= 0; j--) {
            let r = robots[j];
            let d = dist(b.x, b.y, r.x, r.y);
            if (d < cell_size * 0.5) {
                robots.splice(j, 1); // Destroy robot
                bullets.splice(i, 1); // Remove bullet
                break;
            }
        }

        // 3. Remove bullets that go off-screen
        if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
            bullets.splice(i, 1);
        }
    }
}

function draw_bullets() {
    fill(255, 255, 0); // Yellow bullets
    noStroke();
    for (let b of bullets) {
        ellipse(b.x, b.y, 5, 5);
    }
}

