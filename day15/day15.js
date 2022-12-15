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
        diamonds.push([data[i][0], diamond_radius]);
       
        const distance = Math.abs(data[i][0][1] - target);

        const remaining_range = diamond_radius - distance;
        if(remaining_range < 0) {
            continue;
        }

        limits.push([data[i][0][0]-remaining_range, data[i][0][0]+remaining_range]);
    }

    const beacons_on_target = new Set(data.filter(x => x[1][1] === target).map(x => x[1]).map(x => x[0])).size;
    const part_1 = part1(limits) - beacons_on_target;
    const part_2 = part2(diamonds, 4000000);

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

function part2(diamonds, max_coord) {
    const edges = [];

    for(let i = 0; i < diamonds.length; i++) {
        edges.push(
            [
                diamonds[i][0][1],diamonds[i][0][0]-diamonds[i][1]-1,
                diamonds[i][0][1]-diamonds[i][1]-1,diamonds[i][0][0],
            ],
            [
                diamonds[i][0][1]+diamonds[i][1]+1,diamonds[i][0][0],
                diamonds[i][0][1],diamonds[i][0][0]+diamonds[i][1]+1
            ],
            [
                diamonds[i][0][1],diamonds[i][0][0]-diamonds[i][1]-1,
                diamonds[i][0][1]+diamonds[i][1]+1,diamonds[i][0][0],
            ],
            [
                diamonds[i][0][1]-diamonds[i][1]-1,diamonds[i][0][0],
                diamonds[i][0][1],diamonds[i][0][0]+diamonds[i][1]+1,
            ]
        );
    }

    for(let i = 0; i < edges.length; i++) {
        const length = Math.abs(edges[i][0] - edges[i][2]) + Math.abs(edges[i][1] - edges[i][3]);
        let dirX = edges[i][0] > edges[i][2]? -1 : 1;
        let dirY = edges[i][1] > edges[i][3]? -1 : 1;
        for(let j = 0; j < length;j++) {
            let is_free = true;
            for(let z = 0; z < diamonds.length; z++) {

                if(edges[i][0]+dirX*j < 0 || edges[i][0]+dirX*j > max_coord || edges[i][1]+dirY*j < 0 || edges[i][1]+dirY*j > max_coord) {
                    
                    is_free = false;
                    break;
                }
                if((Math.abs((edges[i][0]+dirX*j)-diamonds[z][0][0]) + Math.abs((edges[i][1]+dirY*j) - diamonds[z][0][1])) < diamonds[z][1]) {
                    is_free = false;
                    break;
                }
            }

            if(is_free) {
                return (edges[i][0]+dirX*j)*4000000 + (edges[i][1]+dirY*j);
            }
        }
    }
}

module.exports = day15;