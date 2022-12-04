const fs = require('fs');

function day1() {
    const data = fs.readFileSync('day1/input.txt', 'utf8').trim().split("\n\n").map(x => x.split("\n").map(y => parseInt(y)).reduce((sum, z) => sum+z)).sort((a,b) => a-b);


    const part_1 = data[data.length - 1];
    const part_2 = data.slice(data.length-3, data.length).reduce((sum, z) => sum+z);
    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day1;
