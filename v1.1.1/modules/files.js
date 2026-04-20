import {assets, global, sounds} from './index.js';

function isFilename(name) {
    const illegalChars = /[\\/:*?"<>|]/;
    const reservedNames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
    if (!name) return false;
    if (illegalChars.test(name)) return false;
    if (reservedNames.test(name)) return false;
    if (name.endsWith(' ') || name.endsWith('.')) return false;
    return true;
}

function saveGame(key, data1, data2) {
    let obj = {
        balloonGame: data1,
        bedBallGame: data2
    }
    localStorage.setItem(key, JSON.stringify(obj));
}

export function exportFile() {
    let dataStr;
    if (assets.verif.checked) {
        try {
            global.parse = JSON.parse(assets.modBox.value);
        } catch(err) {
            assets.insertError.textContent = err;
            sounds.playSound(assets.errorSound);
            return;
        }
        dataStr = assets.modBox.value;
    } else {
        dataStr = JSON.stringify({
            balloonGame: global.balloonGame,
            bedBallGame: global.bedBallGame
        }, null, 2);
    }

    const blob = new Blob([dataStr], { type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    if (isFilename(assets.fileName.value)) {
        a.download = `${assets.fileName.value}.json`;
    } else {
        a.download = 'memory.json';
    }
    a.click();

    URL.revokeObjectURL(url);
}

export function exportTime() {
    let dataStr;
    if (assets.verif.checked) {
        try {
            global.parse = JSON.parse(assets.modBox.value);
        } catch(err) {
            assets.insertError.textContent = err;
            sounds.playSound(assets.errorSound);
            return;
        }
        dataStr = assets.modBox.value;
    } else {
        dataStr = JSON.stringify({
            balloonGame: global.times.balloonGame,
            bedBallGame: global.times.bedBallGame
        }, null, 2);
    }
    const blob = new Blob([dataStr], { type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    if (isFilename(assets.fileName.value)) {
        a.download = `${assets.fileName.value}.json`;
    } else {
        a.download = 'time.json';
    }
    a.click();
    URL.revokeObjectURL(url);
}

export function fileInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        try {
            const parsed = JSON.parse(text);
            const balloon = parsed.balloonGame;
            const bedball = parsed.bedBallGame;
            if (!parsed.balloonGame || !parsed.bedBallGame) {
                assets.insertError.textContent = 'Missing JSON objects';
                sounds.playSound(assets.errorSound);
                return;
            }
            if (!balloon.anyHitNoSurface || !balloon.anyHitNoGround || !balloon.handsOnlyNoGround || !balloon.feetOnlyNoGround || !balloon.anyHitStrikeFloor || !bedball.anyHitNoBed || !bedball.handsOnlyNoBed || !bedball.anyHitNoSurface) {
                assets.insertError.textContent = 'Missing JSON properties';
                sounds.playSound(assets.errorSound);
                return;
            }
            for (let target in balloon) {
                if (!global.balloonHas.includes(target)) {
                    delete parsed.balloonGame[target];
                }
            }
            for (let target in bedball) {
                if (!global.bedballHas.includes(target)) {
                    delete parsed.bedBallGame[target];
                }
            }
            global.balloonGame = parsed.balloonGame;
            global.bedBallGame = parsed.bedBallGame;
            saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
            saveGame('myApp_'+global.nameofUser, global.balloonGame, global.bedBallGame);
            if (assets.check.checked && (global.lastClicked === 'memory' || global.lastClicked === '')) {
                assets.manageMemory.click();
            }
        } catch (err) {
            console.log(err);
            assets.insertError.textContent = 'Invalid JSON file';
            sounds.playSound(assets.errorSound);
        }
    };
    reader.readAsText(file);
    assets.fileInput.value = '';
}

export function timeInput(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        try {
            const parsed = JSON.parse(text);
            const balloon = parsed.balloonGame;
            const bedball = parsed.bedBallGame;
            if (!parsed.balloonGame || !parsed.bedBallGame) {
                assets.insertError.textContent = 'Missing JSON objects';
                sounds.playSound(assets.errorSound);
                return;
            }
            if (!balloon.anyHitNoSurface || !balloon.anyHitNoGround || !balloon.handsOnlyNoGround || !balloon.feetOnlyNoGround || !balloon.anyHitStrikeFloor || !bedball.anyHitNoBed || !bedball.handsOnlyNoBed || !bedball.anyHitNoSurface) {
                assets.insertError.textContent = 'Missing JSON properties';
                sounds.playSound(assets.errorSound);
                return;
            }
            for (let target in balloon) {
                if (!global.balloonHas.includes(target)) {
                    delete parsed.balloonGame[target];
                }
            }
            for (let target in bedball) {
                if (!global.bedballHas.includes(target)) {
                    delete parsed.bedBallGame[target];
                }
            }
            global.times.balloonGame = parsed.balloonGame;
            global.times.bedBallGame = parsed.bedBallGame;
            if (assets.check.checked && (global.lastClicked === 'time' || global.lastClicked === '')) {
                assets.manageTime.click();
            }
        } catch (err) {
            assets.insertError.textContent = 'Invalid JSON file';
            sounds.playSound(assets.errorSound);
        }
    }
    reader.readAsText(file);
    assets.timeInput.value = '';
}