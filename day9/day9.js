const fs = require('fs');

function day9() {
    const data = fs.readFileSync('day9/input.txt', 'utf8').trim().split("\n");

    const part_1 = calculate_rope(2, data);

    const part_2 = calculate_rope(10, data);

    return {"part 1": part_1,
            "part 2": part_2};
}

function calculate_rope(rope_size, data) {
    const rope = [];
    for(let i = 0; i < rope_size; i++) {
        rope.push([0,0]);
    }

    let visited_spots = {[[0,0]]: 1};

    for(let i = 0; i < data.length; i++) {
        let [direction, distance] = data[i].split(" ");

        while(distance--) {
            if(direction === "R") {
                rope[0][1] += 1; 
            } else if(direction === "L") {
                rope[0][1] -= 1;
            } else if(direction === "U") {
                rope[0][0] += 1;
            } else {
                rope[0][0] -= 1;
            }

            for(let j = 1; j < rope_size; j++) {
                if(Math.abs(rope[j][0] - rope[j-1][0]) > 1 || Math.abs(rope[j][1] - rope[j-1][1]) > 1) 
                {
                    if(rope[j][0] != rope[j-1][0] && rope[j][1] != rope[j-1][1]) {
                        rope[j][0] += rope[j-1][0] > rope[j][0] ? 1 : -1;
                        rope[j][1] += rope[j-1][1] > rope[j][1] ? 1 : -1;
                    } else if(rope[j][0] == rope[j-1][0]) {
                        rope[j][1] += rope[j-1][1] > rope[j][1] ? 1 : -1;
                    } else {
                        rope[j][0] += rope[j-1][0] > rope[j][0] ? 1 : -1;
                    }
                }
            }

            visited_spots[rope[rope_size-1]] = 1;
        }
    }

    return Object.keys(visited_spots).length;;
}

module.exports = day9;