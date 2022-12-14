const fs = require('fs');

function day14() {
    const data = fs.readFileSync('day14/input.txt', 'utf8').trim().split("\n").map(x => x.split(" -> ").map(y => y.split(",").map(z => parseInt(z))));

    const cave = {};

    let lowest_path = 0;

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length - 1; j++) {
            if(data[i][j][0] != data[i][j+1][0]) {
                if(data[i][j][1] > lowest_path) {
                    lowest_path = data[i][j][1];
                }
                if(data[i][j][0] > data[i][j+1][0]) {
                    for(let k = data[i][j+1][0]; k <= data[i][j][0]; k++) {
                        cave[[k, data[i][j][1]]] = "#";
                    }
                } else {
                    for(let k = data[i][j][0]; k <= data[i][j+1][0]; k++) {
                        cave[[k, data[i][j][1]]] = "#";
                    }
                }
            } else if(data[i][j][1] !== data[i][j+1][1]) {
                

                if(data[i][j][1] > data[i][j+1][1]) {
                    for(let k = data[i][j+1][1]; k <= data[i][j][1]; k++) {
                        cave[[data[i][j][0], k]] = "#";
                    }
                } else {
                    for(let k = data[i][j][1]; k <= data[i][j+1][1]; k++) {
                        cave[[data[i][j][0], k]] = "#";
                    }
                }
            }
        }
    }

    const part_1 = fallingPart1(Object.assign({}, cave), lowest_path);
    const part_2 = fallingPart2(cave, lowest_path+2);

    return {"part 1": part_1,
            "part 2": part_2};
}

function fallingPart1(cave, lowest_path) {

    let reached_void = false;
    let settled = 0;

    while(!reached_void) {
        let is_settled = false;
        let sand = [500,0];
        while(!is_settled) {

            if(sand[1] >= lowest_path) {
                reached_void = true;
                break;
            }
            if(!cave[[sand[0],sand[1]+1]]) {
                sand = [sand[0],sand[1]+1];
            } else if(!cave[[sand[0]-1, sand[1]+1]]) {
                sand = [sand[0]-1, sand[1]+1];
            } else if(!cave[[sand[0]+1, sand[1]+1]]) {
                sand = [sand[0]+1, sand[1]+1];
            } else {
                cave[[sand[0],sand[1]]] = "o";
                settled++;
                is_settled = true;
            }
        }
    }
    return settled;
}
function fallingPart2(cave, bottom) {
    let settled = 0;

    while(!cave[[500,0]]) {
        let is_settled = false;
        let sand = [500,0];
        while(!is_settled) {
            if(!cave[[sand[0],sand[1]+1]] && sand[1]+1 != bottom) {
                sand = [sand[0],sand[1]+1];
            } else if(!cave[[sand[0]-1, sand[1]+1]] && sand[1]+1 != bottom) {
                sand = [sand[0]-1, sand[1]+1];
            } else if(!cave[[sand[0]+1, sand[1]+1]] && sand[1]+1 != bottom) {
                sand = [sand[0]+1, sand[1]+1];
            } else {
                cave[[sand[0],sand[1]]] = "o";
                settled++;
                is_settled = true;
            }
        }
    }
    return settled;
}

module.exports = day14;