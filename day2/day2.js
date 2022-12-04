const fs = require('fs');

function day2() {
    const data = fs.readFileSync('day2/input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));


    const part_1 = data.map(x => score_1(...x)).reduce((sum,curr) => sum+curr);

    const part_2 = data.map(x => score_2(...x)).reduce((sum,curr) => sum+curr);
    return {"part 1": part_1,
            "part 2": part_2};
}

function score_1(elf, you) {
    // rock - paper - scissors -> ABC/XYZ
    //winning = 6 points
    //draw = 3 points
    //rock = 1 point
    //paper = 2 points
    //scissors = 3 points

    if(elf === "A") {
        if(you === "X") return (3+1);
        if(you === "Y") return (6+2);
        if(you === "Z") return (0+3);
    } else if(elf === "B") {
        if(you === "X") return (0+1);
        if(you === "Y") return (3+2);
        if(you === "Z") return (6+3);
    } else if(elf === "C") {
        if(you === "X") return (6+1);
        if(you === "Y") return (0+2);
        if(you === "Z") return (3+3);
    }
}

function score_2(elf, you) {
    // rock - paper - scissors -> ABC
    // win - draw - loose -> XYZ
    //winning = 6 points
    //draw = 3 points
    //rock = 1 point
    //paper = 2 points
    //scissors = 3 points
    
    if(elf === "A") {
        if(you === "X") return (0+3);
        if(you === "Y") return (3+1);
        if(you === "Z") return (6+2);
    } else if(elf === "B") {
        if(you === "X") return (0+1);
        if(you === "Y") return (3+2);
        if(you === "Z") return (6+3);
    } else if(elf === "C") {
        if(you === "X") return (0+2);
        if(you === "Y") return (3+3);
        if(you === "Z") return (6+1);
    }
}
module.exports = day2;