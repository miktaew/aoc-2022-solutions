const fs = require('fs');

function day5() {
    const data = fs.readFileSync('day5/input.txt', 'utf8').trim().split("\n\n").map(x => x.split("\n"));

    const stacks = [];
    
    for(let i = 0; i < data[0][0].length; i++) {
        const stack = [];
        if(data[0][data[0].length-1][i] !== " ") {
            
            for(let j = data[0].length-2; j >= 0; j--) {
                if(data[0][j][i] === " ") {
                    break;
                }

                stack.push(`[${data[0][j][i]}]`);
            }

            stacks.push(stack);
        }
    }

    const instructions = data[1].map(x => x.replace("move ", "").replace("from ", "").replace("to ","").split(" ").map(y => parseInt(y)));

    const stacks_1 = stacks.map(a => {return [...a]});
    for(let i = 0; i < instructions.length; i++) {
        for(let j = 0; j < instructions[i][0]; j++) {
            stacks_1[instructions[i][2]-1].push(stacks_1[instructions[i][1]-1].pop());
        }
    }
    const part_1 = stacks_1.map(x => x.pop().replace("[", "").replace("]", "")).reduce((str,curr) => str + curr);

    
    for(let i = 0; i < instructions.length; i++) {
        stacks[instructions[i][2]-1].push(...stacks[instructions[i][1]-1].splice(-instructions[i][0]));
    }
    const part_2 = stacks.map(x => x.pop().replace("[", "").replace("]", "")).reduce((str,curr) => str + curr);

    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day5;
