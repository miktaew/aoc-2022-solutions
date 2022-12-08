const fs = require('fs');

function day8() {
    const data = fs.readFileSync('day8/input.txt', 'utf8').trim().split("\n");

    let visible_trees = data.length * 2 + data[0].length*2 - 4;

    for(let i = 1; i < data.length - 1; i++) {
        for(let j = 1; j < data[0].length - 1; j++) {
            let height = data[i][j];
            let visible = true;

            for(let a = 0; a < i; a++) {
                if(data[a][j] >= height) {
                    visible = false;
                    break;
                }
            }
            if(visible) {
                visible_trees++;
                continue;
            }
            visible = true;

            for(let b = data.length - 1; b > i; b--) {
                if(data[b][j] >= height) {
                    visible = false;
                    break;
                }
            }
            if(visible) {
                visible_trees++;
                continue;
            }
            visible = true;

            for(let c = 0; c < j; c++) {
                if(data[i][c] >= height) {
                    visible = false;
                    break;
                }
            }
            if(visible) {
                visible_trees++;
                continue;
            }
            visible = true;

            for(let d = data[0].length - 1; d > j; d--) {
                if(data[i][d] >= height) {
                    visible = false;
                    break;
                }
            }
            if(visible) {
                visible_trees++;
            }
        }
    }

    const part_1 = visible_trees;

    let top_score = 0;
    for(let i = 1; i < data.length - 1; i++) {
        for(let j = 1; j < data[0].length - 1; j++) {
            let visible = [0,0,0,0];
            let height = data[i][j];

            for(let a = i+1; a < data.length; a++) {
                visible[0]++;
                if(data[a][j] >= height) {
                    break;
                }
            }

            for(let b = i-1; b >= 0; b--) {
                visible[1]++;
                if(data[b][j] >= height) {
                    break;
                }
            }

            for(let c = j+1; c < data[0].length; c++) {
                visible[2]++;
                if(data[i][c] >= height) {
                    break;
                }
            }

            for(let d = j-1; d >= 0; d--) {
                visible[3]++;
                if(data[i][d] >= height) {
                    break;
                }
            }
            let curr_score = visible.reduce((a,b) => a*b);
            if(curr_score > top_score) {
                top_score = curr_score;
            }
        }
    }

    const part_2 = top_score;

    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day8;