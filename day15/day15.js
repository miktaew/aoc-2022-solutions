const fs = require('fs');

function day15() {
    const data = fs.readFileSync('day15/input.txt', 'utf8').trim().split("\n").map(x => x.replace("Sensor at ", ""))
                    .map(x => x.replace(" closest beacon is at ","")).map(x => x.split(":"))
                    .map(x => x.map(y => y.replace("x=","").replace("y=","").split(", "))).map(x => x.map(y => y.map(z => parseInt(z))));

    const limits = [];
    const target = 2000000;

    const diamonds = [];

    for(let i = 0; i < data.length; i++) {

        const diamond_radius = Math.abs(data[i][0][0]-data[i][1][0]) + Math.abs(data[i][0][1] - data[i][1][1]);
        diamonds.push([[data[i][0]], diamond_radius]);
       
        const distance = Math.abs(data[i][0][1] - target);

        const remaining_range = diamond_radius - distance;
        if(remaining_range < 0) {
            continue;
        }

        limits.push([data[i][0][0]-remaining_range, data[i][0][0]+remaining_range]);
    }

    const beacons_on_target = new Set(data.filter(x => x[1][1] === target).map(x => x[1]).map(x => x[0])).size;
    const part_1 = part1(limits) - beacons_on_target;
    const part_2 = null;

    return {"part 1": part_1,
            "part 2": part_2};
}

function part1(temp_limits) {
    limits = [...temp_limits.map(x => [...x])];
    const shared_limits = [];
    for(let i = 0; i < limits.length; i++) {
        const temp_limit = limits[i];
        for(let j = 0; j < limits.length; j++) {
            if(limits[i][0] <= limits[j][1] && limits[i][1] >= limits[j][0]) {
                temp_limit[0] = Math.min(limits[i][0],limits[j][0]);
                temp_limit[1] = Math.max(limits[i][1],limits[j][1]);
            }
        }

        shared_limits[i] = temp_limit;
    }
    
    return shared_limits[shared_limits.length-1].reduce((a,b)=>Math.abs(a)+Math.abs(b)) + 1;
}

module.exports = day15;