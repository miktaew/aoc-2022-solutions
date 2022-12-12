const fs = require('fs');

function day12() {
    const data = fs.readFileSync('day12/input.txt', 'utf8').trim().split("\n");
    
    let start_node;
    let end_node;

    for(let i = 0; i < data.length; i++) {
        if(start_node && end_node) {
            break;
        }
        for(let j = 0; j < data[0].length; j++) {
            if(data[i][j]==="S") {
                start_node = [i,j];
            } else if(data[i][j]==="E") {
                end_node = [i,j];
            }
        }
    }    

    const part_1 = Object.keys(shortestPath(data, start_node, "E", "up")).length-1;
    const part_2 = Object.keys(shortestPath(data, end_node, "a", "down")).length-1;

    return {"part 1": part_1,
            "part 2": part_2};
}

function shortestPath(data, start_node, target, limitation) {
    const queue = [start_node];
    const visited = {};
    visited[start_node] = true;

    const previous = {start_node: null};
    
    while(queue.length > 0) {

        const current = queue.shift();

        if(data[current[0]][current[1]] === target) {
            const path = [current];
            let node = current;

            while(!(node[0] === start_node[0] && node[1] === start_node[1])) {

                path.push(previous[node]);

                node = previous[node];
            }
            return path;
        }

        const children = neighbors(data, current, limitation);
        for(let i = 0; i < children.length; i++) {
            if(visited[children[i]]) {
                continue;
            }

            visited[children[i]] = true;
            previous[children[i]] = current;
            queue.push(children[i]);
        }
        
    }
}

function neighbors(data, node, limitation) {
    const result = [];

    const i = node[0];
    const j = node[1];

    if(limitation === "up")
    {
        if(data[i-1] && data[i-1][j] && elevation(data,[i-1, j]) <= elevation(data,node) + 1) {
            result.push([i-1, j]);
        }
        if(data[i+1] && data[i+1][j] && elevation(data,[i+1, j]) <= elevation(data,node) + 1) {
            result.push([i+1, j]);
        }
        if(data[i][j-1] && elevation(data,[i, j-1]) <= elevation(data,node) + 1) {
            result.push([i,j-1]);
        }
        if(data[i][j+1] && elevation(data,[i, j+1]) <= elevation(data,node) + 1) {
            result.push([i,j+1]);
        }
    } else if(limitation === "down") {
        if(data[i-1] && data[i-1][j] && elevation(data,[i-1, j]) >= elevation(data,node) - 1) {
            result.push([i-1, j]);
        }
        if(data[i+1] && data[i+1][j] && elevation(data,[i+1, j]) >= elevation(data,node) - 1) {
            result.push([i+1, j]);
        }
        if(data[i][j-1] && elevation(data,[i, j-1]) >= elevation(data,node) - 1) {
            result.push([i,j-1]);
        }
        if(data[i][j+1] && elevation(data,[i, j+1]) >= elevation(data,node) - 1) {
            result.push([i,j+1]);
        }
    }

    return result;
}

function elevation(data,node) {
    if(data[node[0]][node[1]] === "S") {
        return "a".charCodeAt(0);
    } else if(data[node[0]][node[1]] === "E") {
        return "z".charCodeAt(0);
    } else {
        return data[node[0]][node[1]].charCodeAt(0);
    }
}

module.exports = day12;
