
const player_size = cell_size;

let player = {
    x: cell_size / 2,
    y: cell_size / 2,
    animation: 0,
    direction: 1, // left -1, right 1
}


function draw_player() {
    if (girl_svg) {
        image(girl_svg[0], player.x, player.y, player_size / 2, player_size)
    }
}

