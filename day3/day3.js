const fs = require('fs');

function day3() {
    const data = fs.readFileSync('day3/input.txt', 'utf8').split("\n");
    const data_1 = data.map(x => [x.slice(0, x.length/2), x.slice(x.length/2)]);
   
    const shared_items = [];
    for(let i = 0; i < data_1.length; i++) {
        for(let j = 0; j < data_1[i][0].length; j++) {
            if(data_1[i][1].includes(data_1[i][0][j])) {
                shared_items.push(data_1[i][0][j]);
                break;
            }
        }
    }

    const tripled_items = [];
    for(let i = 0; i < data.length; i+=3) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i+1].includes(data[i][j]) && data[i+2].includes(data[i][j])) {
                tripled_items.push(data[i][j]); 
                break;
            }
        }
    }

    const part_1 = sum_priorities(shared_items);
    const part_2 = sum_priorities(tripled_items);

    return {"part 1": part_1,
            "part 2": part_2};
}

function sum_priorities(items) {
    return items.map(x => {
        const code = x.charCodeAt(0);
        if(code >= 97) {
            return code - 96;
        } else if(code >= 65) {
            return code - 38;
        }
    }).reduce((sum,curr) => sum+curr);
}

module.exports = day3;
