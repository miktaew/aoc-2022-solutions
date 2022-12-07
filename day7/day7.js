const fs = require('fs');

function day7() {
    const data = fs.readFileSync('day7/input.txt', 'utf8').trim().split("\n").map(x => x.split(" "));

    create_tree(data);

    const part_1 = sum_sizes(tree);

    const needed_size = 30000000 - 70000000 + tree.size;
    const part_2 = get_large_nodes(tree, needed_size).sort((a,b) => a-b)[0];


    return {"part 1": part_1,
            "part 2": part_2};
}

class TreeNode {
    constructor({key, size = 0, parent = null, type}) {
        this.key = key;
        this.size = size;
        this.parent = parent;
        this.children = {};
        this.type = type;
    }
}

const tree = new TreeNode({key: "/", size: 0, parent: null, type: "dir"});

function create_tree(data) {
    let current_node = tree;

    for(let i = 1; i < data.length; i++) {
        while(data[i][0] !== "$") {
            if(parseInt(data[i][0])) {
                current_node.children[data[i][1]] = new TreeNode({
                    key: data[i][1],
                    size: parseInt(data[i][0]),
                    parent: current_node,
                    type: "file"
                });
            }

            if(i+1 < data.length) {
                i++;
            } else {
                break;
            }
        }

        if(data[i][1] === "cd") {
            if(data[i][2] !== "..") {
                if(!current_node.children[data[i][2]]) {
                    current_node.children[data[i][2]] = new TreeNode({
                        key: data[i][2],
                        size: 0,
                        parent: current_node,
                        type: "dir",
                    })
                }
                current_node = current_node.children[data[i][2]];
            }
            else {
                current_node = current_node.parent;
            }
        }
    }

    set_sizes(tree);
    return tree;
};

function set_sizes(current_node) {
    if(current_node.type === "file") {
        return current_node.size;
    } 
    
    if(current_node.type === "dir") {
        
        let sum = 0;
        Object.keys(current_node.children).forEach(child => {
            sum += set_sizes(current_node.children[child]);
        });

        current_node.size = sum;
        return sum;
    }
}

let total = 0;
function sum_sizes(current_node) {
    if(current_node.type === "dir") {
        Object.keys(current_node.children).forEach(child => {
            sum_sizes(current_node.children[child]);
        });

        total = total + (current_node.size <= 100000? current_node.size : 0);
    }
    
    return total;
}

function get_large_nodes(current_node, needed_size, large_nodes = []) {
    if(current_node.type === "dir") {
        Object.keys(current_node.children).forEach(child => {
            get_large_nodes(current_node.children[child], needed_size, large_nodes);
        });
    }

    if(current_node.size >= needed_size) {
        large_nodes.push(current_node.size);
    }
    
    return large_nodes;
}

module.exports = day7;
