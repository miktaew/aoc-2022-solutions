const fs = require('fs');

function day13() {
    const data = fs.readFileSync('day13/input.txt', 'utf8').trim().split("\n\n").map(x => x.split("\n"));

    let indice_sum = 0;

    for(let i = 0; i < data.length; i++) {
        const left = JSON.parse(data[i][0]);
        const right = JSON.parse(data[i][1]);

        let correct = compare(left,right);

        if(correct) {
            indice_sum += i+1;
        }
    }

    const part_1 = indice_sum;

    const temp = data.flat();
    temp.push("[[2]]", "[[6]]");
    const data2 = temp.sort((a,b) => compare(JSON.parse(b),JSON.parse(a)) - compare(JSON.parse(a),JSON.parse(b)));

    const part_2 = (data2.indexOf("[[2]]")+1) * (data2.indexOf("[[6]]")+1);

    return {"part 1": part_1,
            "part 2": part_2};
}

function compare(left, right) {
    if(typeof left === "number" && typeof right === "number") {
        if(left < right) {
            return true;
        }
        if(left > right) {
            return false;
        }
        return;
    }
    
    if(Array.isArray(left) && Array.isArray(right)) {
        for(let i = 0; i < Math.min(left.length, right.length); i++) {
            const result = compare(left[i], right[i]);
            if(result !== undefined) {
                return result;
            }
        }
        return left.length > right.length ? false : right.length > left.length ? true : undefined;
    }
    
    return compare([left].flat(), [right].flat());
}

module.exports = day13;