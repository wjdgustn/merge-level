const fs = require('fs');
const path = require('path');

const setting = require('./setting.json');
const utils = require('./utils');

const levels = setting.levels.map(a => utils.ADOFAIParser(fs.readFileSync(path.join('level', a))));

let skipTile = 0;
for(let i in levels) {
    i = Number(i);
    if(i < levels.length - 1) levels[i].angleData.pop();
    if(!i) continue;

    skipTile += levels[i - 1].angleData.length;

    levels[0].actions.push(...levels[i].actions.map(a => {
        a.floor += skipTile;
        return a;
    }));

    levels[0].decorations.push(...levels[i].decorations.map(a => {
        a.floor += skipTile;
        return a;
    }));

    levels[0].angleData.push(...levels[i].angleData);
}

levels[0].settings.songFilename = setting.song;

fs.writeFileSync(path.join('level', setting.output), JSON.stringify(levels[0], null, 4));