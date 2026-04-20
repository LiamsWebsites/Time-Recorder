import {assets, global} from './index.js';

function formatTimes(timesObj) {
    let result = "";
    for (const game in timesObj) {
        result += `${game}:\n`;
        const gameTimes = timesObj[game];
        for (const prop in gameTimes) {
            result += `  ${prop}:\n`;
            const arr = gameTimes[prop];
            arr.forEach((time) => {
                result += `    ${time.toFixed(3)} seconds\n`;
            });

            if (arr.length === 0) {
                result += "    None\n";
            }
        }
        result += "\n";
    }
    return result;
}

export function editable() {
    if (assets.editable.checked) {
        assets.modBox.readOnly = false;
    } else {
        assets.modBox.readOnly = true;
    }
}

export function manageTime() {
    assets.manageTime.style.boxShadow = "0 0 5px 4px rgba(255, 0, 0, 0.5)";
    assets.manageMemory.style.boxShadow = "none";
    global.lastClicked = 'time';
    if (assets.viewVers.value === 'json') {
        assets.modBox.value = JSON.stringify(global.times);
        global.curMode = 'json';
    } else {
        assets.modBox.value = formatTimes(global.times);
        global.curMode = 'text';
    }    
}

export function manageMemory() {
    assets.manageMemory.style.boxShadow = "0 0 5px 4px rgba(255, 0, 0, 0.5)";
    assets.manageTime.style.boxShadow = "none";
    global.lastClicked = 'memory';
    let combo = {
        balloonGame: {},
        bedBallGame: {}
    };
    combo.balloonGame = global.balloonGame;
    combo.bedBallGame = global.bedBallGame;
    if (assets.viewVers.value === 'json') {
        assets.modBox.value = JSON.stringify(combo);
        global.curMode = 'json';
    } else {
        assets.modBox.value = formatTimes(combo);
        global.curMode = 'text';
    }
}

export function modChanged() {
    if (global.curMode === 'json') {
        global.modChanged = true;
    }
}

export function updCheck() {
    if (assets.check.checked) {
        if (global.lastClicked === 'time') {
            assets.manageTime.click();
        }
        if (global.lastClicked === 'memory') {
            assets.manageMemory.click();
        }
    }
}