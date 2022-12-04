const fs = require('fs');

function day4() {
    const data = fs.readFileSync('day4/input.txt', 'utf8').trim().split("\n").map(x => x.split(",").map(x => x.split("-").map(x => Number(x))));

    console.log(data);

    const part_1 = data.filter(
        pair => pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1] || pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]
    ).length;

    const part_2 = data.filter(
        pair => 
            pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][0]
            ||
            pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]
            ||
            pair[0][0] <= pair[1][1] && pair[0][1] >= pair[1][1]
            || 
            pair[1][0] >= pair[0][0] && pair[1][1] <= pair[0][1]
    ).length;

    return {"part 1": part_1,
            "part 2": part_2}; 
}

module.exports = day4;
