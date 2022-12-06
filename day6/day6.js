const fs = require('fs');

function day6() {
    const data = fs.readFileSync('day6/input.txt', 'utf8').trim();

    let index = null;
    for(let i = 0; i < data.length; i++) {
        const markerSet = new Set(data.slice(i,i+4));
        if(markerSet.size == 4)
        {
            index = i+4;
            break;
        }
    }

    const part_1 = index;

    index = null;
    for(let i = 0; i < data.length; i++) {
        const markerSet = new Set(data.slice(i,i+14));
        if(markerSet.size == 14)
        {
            index = i+14;
            break;
        }
    }
    
    const part_2 = index;

    return {"part 1": part_1,
            "part 2": part_2};
}

module.exports = day6;
