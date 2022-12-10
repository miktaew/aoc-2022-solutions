const fs = require('fs');

function day10() {
    const data = fs.readFileSync('day10/input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));

    let cycle = 0;
    let register = 1;
    let to_add = null;
    let signal_strenghts = [];
    let i = 0;
    let pixels = "";

    while(data[i] || to_add) {
        cycle++;

        if(cycle % 40 == 20) {
            signal_strenghts.push(cycle * register);
        }

        if((cycle-1)%40 == 0) {
            pixels += "\n";
        } 
        if((cycle-1)%40 >= register - 1 && (cycle-1)%40 <= register + 1) {
            pixels += "#";
        } else {
            pixels += ".";
        }
    
        if(to_add !== null) {
            register += to_add;
            to_add = null;
            continue;
        } else {            
            if(data[i] === "noop") {
                continue;
            }

            else if(data[i][0] === "addx") {
                to_add = parseInt(data[i][1]);
            }
            i++;
        }
    }
    const part_1 = signal_strenghts.reduce((sum,curr) => sum+curr);
    
    const part_2 = pixels;

    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day10;
