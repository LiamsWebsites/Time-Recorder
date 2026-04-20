import {assets, global, sounds} from './index.js';

function appendTime(game, key, inp) {
    if (isNaN(Number(inp)) || Number(inp)<=0) {
        assets.insertError.textContent = 'Invalid Time';
        sounds.playSound(assets.errorSound);
        return 'error';
    }
    global.times[game][key].push(Number(Number(inp).toFixed(3)));
    global.saveLog.push([game, key, Number(Number(inp).toFixed(3)), global.times[game][key].length]);
}

function loadGame(key, defaults) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data ?? defaults;
    } catch {
        alert('improper reset detected for', key);
        return defaults;
    }
}

function saveGame(key, data1, data2) {
    let obj = {
        balloonGame: data1,
        bedBallGame: data2
    }
    localStorage.setItem(key, JSON.stringify(obj));
}

function clearTimes(prop) {
    if (prop === 'balloonGame') {
        global.times.balloonGame = {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }
    } else {
        global.times.bedBallGame = {
            anyHitNoBed: [],
            handsOnlyNoBed: [],
            anyHitNoSurface: []
        }
    }
}

export function loadUser() {
    if (assets.username.value === '' && assets.selectUsername.value === '') return;
        global.memory = loadGame('myApp_'+global.nameofUser, {
            balloonGame: {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            },
            bedBallGame: {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            }
        });
    global.balloonGame = global.memory.balloonGame;
    global.bedBallGame = global.memory.bedBallGame;
    localStorage.setItem('myApp_'+global.nameofUser, JSON.stringify(global.memory));
}

export function balloonSave() {
    if (appendTime('balloonGame', assets.balloonDropdown.value, assets.balloonInput.value) === 'error') return;
        if (global.enter !== null) {
            let currentTime = global.times['balloonGame'][assets.balloonDropdown.value][global.times['balloonGame'][assets.balloonDropdown.value].length - 1]
            if (assets.Auto.checked) {
                global.balloonGame[assets.balloonDropdown.value].push(currentTime);
                saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
            }
            if (assets.check.checked) {
                if (assets.Auto.checked) {
                    if (global.lastClicked === 'memory') {
                        assets.manageMemory.click();
                    } 
                    if (global.lastClicked === 'time') {
                        assets.manageTime.click();
                    }
            } else if (global.lastClicked === 'time') {assets.manageTime.click()}
        }
    }
}

export function bedBallSave() {
        if (appendTime('bedBallGame', assets.bedBallDropdown.value, bedballInput.value)) return;
        if (global.enter !== null) {
            let currentTime = global.times.bedBallGame[assets.bedBallDropdown.value][global.times.bedBallGame[assets.bedBallDropdown.value].length - 1];
            if (assets.Auto.checked) {
                global.bedBallGame[assets.bedBallDropdown.value].push(currentTime);
                saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
            }
            if (assets.check.checked) {
                if (assets.Auto.checked) {
                    if (global.lastClicked === 'memory') {
                        assets.manageMemory.click();
                    } 
                    if (global.lastClicked === 'time') {
                        assets.manageTime.click();
                    }
            } else if (global.lastClicked === 'time') {assets.manageTime.click()}
        }
    }
}

export function undoSave() {
    if (global.saveLog.length>0) {
        let array = [...global.saveLog[global.saveLog.length - 1]];     
        if (typeof array[2] === 'string' || isNaN(array[2]) || array[2]<0 || typeof array[1] !== 'string' || typeof array[0] !== 'string' || array.length !== 4 || typeof array[3] !== 'number') {
            assets.insertError.textContent = 'Critical Error: Corrupted Time Arrays';
            sounds.playSound(assets.fatalError);
            return;
        }
        global.times[array[0]][array[1]].splice(array[3]-1, 1);
        if (assets.check.checked && (global.lastClicked === 'time')) {
            assets.manageTime.click();
        }
        global.saveLog.splice(global.saveLog.length-1, 1);
    } else {
        assets.insertError.textContent = 'Nothing to undo';
        sounds.playSound(assets.warning);
    }
}

export function undoMem() {
    if (global.memLog.length > 0) {
        let array = [...global.memLog[global.memLog.length - 1]];
        if (typeof array[2] === 'string' || isNaN(array[2]) || array[2] < 0 || typeof array[1] !== 'string' || typeof array[0] !== 'string' || array.length !== 4 || !(array[0] === 'balloonGame' || array[0] === 'bedBallGame') || typeof array[3] !== 'number') {
            assets.insertError.textContent = 'Critical Error: Corrupted Memory Arrays';
            sounds.playSound(assets.fatalError);
            return;
        }
        let obj;
        if (array[0] === 'balloonGame') {
            obj = global.balloonGame;
        } else {
            obj = global.bedBallGame;
        }
        obj[array[1]].splice(array[3]-1, 1);
        if (assets.check.checked && global.lastClicked === 'memory') {
            assets.manageMemory.click();
        }
        global.memLog.splice(global.memLog.length-1, 1);
        saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
    } else {
        assets.insertError.textContent = 'Nothing to undo';
        sounds.playSound(assets.warning);
    }
}

export function memBalloonsmack() {
    let currentTime = Number(Number(assets.balloonInput.value).toFixed(3));
    if (isNaN(currentTime) || currentTime < 0) {
        assets.insertError.textContent = 'Invalid Time';
        sounds.playSound(assets.errorSound);
        return;
    }
    global.balloonGame[assets.balloonDropdown.value].push(currentTime);
    global.memLog.push(['balloonGame', assets.balloonDropdown.value, currentTime, global.balloonGame[assets.balloonDropdown.value].length]);
    if (assets.check.checked && global.lastClicked === 'memory') {
        assets.manageMemory.click();
    }
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
}

export function memBedBall() {
    let currentTime = Number(Number(assets.bedballInput.value).toFixed(3));
    if (isNaN(currentTime) || currentTime < 0) {
        assets.insertError.textContent = 'Invalid Time';
        sounds.playSound(assets.errorSound);
        return;
    }
    global.bedBallGame[assets.bedBallDropdown.value].push(currentTime);
    global.memLog.push(['bedBallGame', assets.bedBallDropdown.value, currentTime, global.bedBallGame[assets.bedBallDropdown.value].length]);
    if (assets.check.checked && global.lastClicked === 'memory') {
        assets.manageMemory.click();
    }
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
}

export function transport() {
    if (JSON.stringify(global.times.balloonGame) === JSON.stringify(global.blankDef.balloonGame) && JSON.stringify(global.times.bedBallGame) === JSON.stringify(global.blankDef.bedBallGame)) {
        assets.insertError.textContent = 'Cannot transfer empty JSON';
        sounds.playSound(assets.warning);
        return;
    }
    for (const obj in global.times) {
        let object = global.times[obj]; // balloonGame/bedBallGame OBJECT
        for (const o in object) {
            let array = object[o]; // the array within balloonGame/bedBallGame
            if (array.length>0) {
                if (obj === 'balloonGame') {
                    global.balloonGame[o].push(...array);
                } else {
                    global.bedBallGame[o].push(...array);
                }
            }
            global.times[obj][o] = [];
        }
    }
    if (assets.check.checked) {
        if (global.lastClicked === 'time') {
            assets.manageTime.click();
        }
        if (global.lastClicked === 'memory') {
            assets.manageMemory.click();
        }
    }
    global.memLog = [];
    global.saveLog = [];
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
}

export function transportRev() {
    if (JSON.stringify(global.balloonGame) === JSON.stringify(global.blankDef.balloonGame) && JSON.stringify(global.bedBallGame) === JSON.stringify(global.blankDef.bedBallGame)) {
        assets.insertError.textContent = 'Cannot transfer empty JSON';
        sounds.playSound(assets.warning);
        return;
    }
    for (const o in global.balloonGame) {
        let array = global.balloonGame[o];
        if (array.length>0) {
            global.times.balloonGame[o].push(...array);
        }
        global.balloonGame[o] = [];
    }
    for (const o in global.bedBallGame) {
        let array = global.bedBallGame[o];
        if (array.length>0) {
            global.times.bedBallGame[o].push(...array);
        }
        global.bedBallGame[o] = [];
    }
    if (assets.check.checked) {
        if (global.lastClicked === 'time') {
            assets.manageTime.click();
        }
        if (global.lastClicked === 'memory') {
            assets.manageMemory.click();
        }
    }
    global.memLog = [];
    global.saveLog = [];
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
}

export function memClear() {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
            saveGame('myApp_'+global.nameofUser, global.balloonGame, {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            });
            global.bedBallGame = {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            }
    }
    if (global.lastClicked === 'memory' && assets.check.checked) {assets.manageMemory.click()}
}

export function balloonMem() {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {      
        saveGame('myApp_'+global.nameofUser, {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }, global.bedBallGame); 
        global.balloonGame = {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }
    }
    if (global.lastClicked === 'memory' && assets.check.checked) {assets.manageMemory.click()}
}

export function allTime() {
    clearTimes('balloonGame');
    clearTimes('bedBallGame');
    global.saveLog = [];
    if (assets.check.checked && global.lastClicked === 'time') {assets.manageTime.click()}
}

export function allMem() {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
        userconfirm = confirm('Are you really sure?');
        if (userconfirm) {
            global.memLog = [];
            saveGame('myApp_'+global.nameofUser, {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            }, {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            });
            global.balloonGame = {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            }
            global.bedBallGame = {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            }
        }
    }
    if (global.lastClicked === 'memory' && assets.check.checked) {
        assets.manageMemory.click();
    }
}

export function saveTime() {
    if (!assets.editable.checked) {
        assets.insertError.textContent = 'Warning: Saving Times and Memory is disabled in read-only mode.'
        sounds.playSound(assets.warning);
        return;
    }
    try {
        global.parse = JSON.parse(assets.modBox.value);
    } catch(err) {
        assets.insertError.textContent = err;
        sounds.playSound(assets.errorSound);
        return;
    }
    if (global.parse.balloonGame === undefined || global.parse.bedBallGame === undefined) {
        assets.insertError.textContent = 'Undefined Objects';
        sounds.playSound(assets.errorSound);
        return;
    }
    let balloong = global.parse.balloonGame;
    let bedbal = global.parse.bedBallGame;
    let balloonKeys = Object.keys(balloong);
    let bedballKeys = Object.keys(bedbal);
    if (global.balloonHas.some(key => !(balloonKeys.includes(key))) || global.bedballHas.some(key => !(bedballKeys.includes(key)))) {
        assets.insertError.textContent = 'Missing JSON Properties';
        sounds.playSound(assets.errorSound);
        return;
    }
    for (let data in balloong) {
        if (!global.balloonHas.includes(data)) {
            delete global.parse.balloonGame[data];
        }
    }
    for (let data in bedbal) {
        if (!global.bedballHas.includes(data)) {
            delete global.parse.bedBallGame[data];
        }
    }
    global.saveLog = [];
    global.lastClicked = 'time';
    assets.manageTime.style.boxShadow = "0 0 3px 2px rgba(255, 0, 0, 0.5)";
    assets.manageMemory.style.boxShadow = 'none';
    global.times = global.parse;
}

export function saveMemory() {
    if (!assets.editable.checked) {
        assets.insertError.textContent = 'Warning: Saving Times and Memory is disabled in read-only mode.';
        sounds.playSound(assets.warning);
        return;
    }
    try {
        global.parse = JSON.parse(assets.modBox.value);
    } catch(err) {
        assets.insertError.textContent = err;
        sounds.playSound(assets.errorSound);
        return;
    }
    if (global.parse.balloonGame === undefined || global.parse.bedBallGame === undefined) {
        assets.insertError.textContent = 'Undefined JSON Objects';
        sounds.playSound(assets.errorSound);
        return;
    }
    let balloong = global.parse.balloonGame;
    let bedbal = global.parse.bedBallGame;
    let balloonKeys = Object.keys(balloong);
    let bedballKeys = Object.keys(bedbal);
    if (global.balloonHas.some(key => !(balloonKeys.includes(key))) || global.bedballHas.some(key => !(bedballKeys.includes(key)))) {
        assets.insertError.textContent = 'Missing JSON Properties';
        sounds.playSound(assets.errorSound);
        return;
    }
    for (let data in balloong) {
        if (!global.balloonHas.includes(data)) {
            delete global.parse.balloonGame[data];
        }
    }
    for (let data in bedbal) {
        if (!global.bedballHas.includes(data)) {
            delete global.parse.bedBallGame[data];
        }
    }
    global.memLog = [];
    global.lastClicked = 'memory';
    assets.manageMemory.style.boxShadow = "0 0 3px 2px rgba(255, 0, 0, 0.5)";
    assets.manageTime.style.boxShadow = "none";
    global.balloonGame = global.parse.balloonGame;
    global.bedBallGame = global.parse.bedBallGame;
    saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
}