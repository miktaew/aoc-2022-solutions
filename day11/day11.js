const fs = require('fs');

function day11() {
    const data = fs.readFileSync('day11/input.txt', 'utf8').trim().split("\n\n").map(x => x.split("\n"));

    const monkey_items_1 = data.map(x => x[1].split(": ")[1]).map(y => y.replaceAll(",", "").split(" ").map(z => parseInt(z)));
    const monkey_items_2 = data.map(x => x[1].split(": ")[1]).map(y => y.replaceAll(",", "").split(" ").map(z => parseInt(z)));
    const monkey_operations = data.map(x => x[2].split(" = ")[1]).map(x => x.slice(4)).map(x => x.split(" "));
    const monkey_targets = data.map(x => [Number(x[4][x[4].length-1]),Number(x[5][x[5].length-1])]);
    const monkeys_1 = [];
    const monkeys_2 = [];

    for(let i = 0; i < data.length; i++) {
        monkeys_1.push(0);
        monkeys_2.push(0);
    }

    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < monkeys_1.length; j++) {

            let test = data[j][3].split(" by ")[1];

            while(monkey_items_1[j].length) {
                monkeys_1[j]++;
                let item = monkey_items_1[j].shift();

                if(monkey_operations[j][0] === "+") {
                    item += parseInt(monkey_operations[j][1]);
                } else if(monkey_operations[j][1] === "old") {
                    item = item**2;
                } else {
                    item *= parseInt(monkey_operations[j][1]);
                }

                item = Math.floor(item/3);

                if(item%test == 0) {
                    monkey_items_1[monkey_targets[j][0]].push(item);
                } else {
                    monkey_items_1[monkey_targets[j][1]].push(item);
                }

            }
        }
    }

    let hax = data.map(x => x[3].split(" ").slice(-1)).reduce((a,b) => a*b);

    for(let i = 0; i < 10000; i++) {
        for(let j = 0; j < monkeys_2.length; j++) {

            let test = data[j][3].split(" by ")[1];

            while(monkey_items_2[j].length) {
                monkeys_2[j]++;
                let item = monkey_items_2[j].shift();

                if(monkey_operations[j][0] === "+") {
                    item += parseInt(monkey_operations[j][1]);
                } else if(monkey_operations[j][1] === "old") {
                    item = item**2;
                } else {
                    item *= parseInt(monkey_operations[j][1]);
                }

                item = item%hax;

                if(item%test == 0) {
                    monkey_items_2[monkey_targets[j][0]].push(item);
                } else {
                    monkey_items_2[monkey_targets[j][1]].push(item);
                }

            }
        }
    }

    
    const part_1 = monkeys_1.sort((a,b) => b-a).slice(0,2).reduce((a,b) => a*b); 
    const part_2 = monkeys_2.sort((a,b) => b-a).slice(0,2).reduce((a,b) => a*b);
    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day11;
