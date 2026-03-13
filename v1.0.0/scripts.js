const clearError = document.getElementById('clearError');
const logoVolume = document.getElementById('logoVolume');
const buttonVolume = document.getElementById('buttonVolume');
const systemVolume = document.getElementById('systemVolume');
const volume = Array.from(document.getElementsByClassName('volume'));
const settingsUi = document.getElementById('settingsUi');
settingsUi.style.display = 'none';
const Close = document.getElementById('close');
const settingsOverlay = document.getElementById('settingsOverlay');
const balloonSave = document.getElementById('balloonSave');
const bedBallSave = document.getElementById('bedBallSave');
const memBalloonsmack = document.getElementById('memBalloonsmack');
const specialButtons = Array.from(document.getElementsByClassName('specialButton'));
const memBedBall = document.getElementById('memBedBall');
const viewBalloonTime = document.getElementById('viewBalloonTime');
const viewBallTime = document.getElementById('viewBallTime');
const bask = document.getElementById('bask');
const logoPercent = document.getElementById('logoPercent');
const buttonPercent = document.getElementById('buttonPercent');
const mute = Array.from(document.getElementsByClassName('mute'));
const systemPercent = document.getElementById('systemPercent');
const balloon = document.getElementById('balloon');
const allMute = document.getElementById('allMute');
const timeClear = document.getElementById('timeClear');
const overlay = document.getElementById('overlay');
const insertError = document.getElementById('insertError');
const memClear = document.getElementById('memClear');
const startButton = document.getElementById('startButton');
const settings = document.getElementById('settings');
const viewVers = document.getElementById('viewVers');
const balloonPb = document.getElementById('balloonPb');
const balloonAvg = document.getElementById('balloonAvg');
const balloonAvgAmount = document.getElementById('balloonAvgAmount');
const bedballPb = document.getElementById('bedballPb');
const bedballAvg = document.getElementById('bedballAvg');
const bedballAvgAmount = document.getElementById('bedballAvgAmount');
const manageMemory = document.getElementById('manageMemory');
const manageTime = document.getElementById('manageTime');
const labe = document.getElementById('labe');
const Auto = document.getElementById('auto');
const src = document.getElementById('src');
const balloonTime = document.getElementById('balloonTime');
const balloonMem = document.getElementById('balloonMem');
const modBox = document.getElementById('modBox');
const allTime = document.getElementById('allTime');
const allMem = document.getElementById('allMem');
const transport = document.getElementById('transport');
const everyButton = document.querySelectorAll('button');
const everyDropdown = document.querySelectorAll('select');
const everyCheckbox = document.querySelectorAll('label');
const check = document.getElementById('check');
check.checked = true;
const saveTime = document.getElementById('saveTime');
const saveMemory = document.getElementById('saveMemory');
const balloonDropdown = document.getElementById('balloonDropdown');
const bedBallDropdown = document.getElementById('bedBallDropdown');
const clearText = document.getElementById('clearText');
const exportFile = document.getElementById('exportFile');
const verif = document.getElementById('verif');
const fileName = document.getElementById('fileName');
const exportTime = document.getElementById('exportTime');
const uploadMem = document.getElementById('uploadMem');
const uploadTime = document.getElementById('uploadTime');
const undo = document.getElementById('undo');
const fileInput = document.createElement('input');
const timeInput = document.createElement('input');
fileInput.type = 'file'
timeInput.type = 'file';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.disabled = true;
});

let enter = '';
let parse = '';
let auto = false;
let curMode = 'json';
let lastClicked = '';
let saveLog = [];
const draggables = document.querySelectorAll('.draggable');
const balloonInflate = new Audio('sounds/balloonInflate.mp3');
balloonInflate.playbackRate = 7;
const basketballBounce = new Audio('sounds/basketballBounce.mp3');
const mouseClick = new Audio('sounds/mouseClick.mp3');
const mouseClick2 = new Audio('sounds/mouseClick2.mp3');
const mouseClick3 = new Audio('sounds/mouseClick3.mp3');
const mouseClick4 = new Audio('sounds/mouseClick4.mp3');
const startup = new Audio('sounds/startup.mp3');
const errorSound = new Audio('sounds/error.mp3');

draggables.forEach(elem => {
    elem.addEventListener('mousedown', onMouseDown);
    function onMouseDown(e) {
        e.preventDefault();
        let shiftX = e.clientX - elem.getBoundingClientRect().left;
        let shiftY = e.clientY - elem.getBoundingClientRect().top;
        function onMouseMove(event) {
            elem.style.left = event.clientX - shiftX + 'px';
            elem.style.top = event.clientY - shiftY + 'px';
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    }
    elem.ondragstart = () => false;
});

function playSound(sound, cond, speed) { // if cond === true then no overlapping sounds
    let volume=1;
    let filename = sound.src.split('/').pop();
    if (filename === 'balloonInflate.mp3' || filename === 'basketballBounce.mp3') {
        volume = logoVolume.value/100;
        console.log('logo');
    }
    if (filename === 'error.mp3' || filename === 'startup.mp3') {
        volume = systemVolume.value/100;
        console.log('system');
    }
    if (filename === 'mouseClick.mp3' || filename === 'mouseClick2.mp3' || filename === 'mouseClick3.mp3' || filename === 'mouseClick4.mp3') {
        volume = buttonVolume.value/100;
        console.log('button');
    }
    const bool = typeof speed === 'number' && speed > 0 && speed !== Infinity;
    if (cond) {
        sound.volume = volume;
        sound.playbackRate = bool ? speed : 1;
        sound.currentTime = 0;
        sound.play();
        return;
    }
    const newSound = sound.cloneNode();
    newSound.volume = volume;
    newSound.playbackRate = bool ? speed : 1;
    newSound.play();
}

volume.forEach(e => {
    e.value = 100;
    e.addEventListener('input', () => {
        switch(e.id) {
            case 'logoVolume':
                logoPercent.textContent = `${e.value}%`;
                break;
            case 'buttonVolume':
                buttonPercent.textContent = `${e.value}%`;
                break;
            case 'systemVolume':
                systemPercent.textContent = `${e.value}%`;
                break;
            default:
                playSound(errorSound, 0, 1);
                alert('Corrupted Sound Mixer. Please contact dev.');
        }
    });
});

let times = {
    balloonGame: {
        anyHitNoSurface: [],
        anyHitNoGround: [],
        handsOnlyNoGround: [],
        handsOnlyNoSurface: [],
        feetOnlyNoGround: [],
        anyHitStrikeFloor: [],
    },
    bedBallGame: {
        anyHitNoBed: [],
        handsOnlyNoBed: [],
        anyHitNoSurface: [],
    }
}

function clearTimes(prop) {
    if (prop === 'balloonGame') {
        times.balloonGame = {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }
    } else {
        times.bedBallGame = {
            anyHitNoBed: [],
            handsOnlyNoBed: [],
            anyHitNoSurface: []
        }
    }
}

function loadGame(key, defaults) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data ?? defaults;
    } catch {
        console.error('improper reset detected for', key);
        return defaults;
    }
}

function saveGame(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

saveGame('balloonGame', {
    anyHitNoSurface: [193.89, 85.66, 85.67],
    anyHitNoGround: [],
    handsOnlyNoGround: [],
    handsOnlyNoSurface: [],
    feetOnlyNoGround: [],
    anyHitStrikeFloor: []
})

let balloonGame = await loadGame("balloonGame", {
    anyHitNoSurface: [193.89, 85.66, 85.67],
    anyHitNoGround: [],
    handsOnlyNoGround: [],
    handsOnlyNoSurface: [],
    feetOnlyNoGround: [],
    anyHitStrikeFloor: []
});

let bedBallGame = await loadGame("bedBallGame", {
    anyHitNoBed: [94.66, 44.55, 44.54],
    handsOnlyNoBed: [],
    anyHitNoSurface: []
});

function appendTime(game, key, inp) {
    if (isNaN(Number(inp)) || Number(inp)<=0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
        return 'error';
    }
    times[game][key].push(Number(inp));
    saveLog.push([game, key, Number(inp)]);
    console.log(saveLog);
}

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

function updateText(arg) {
    if (arg) {
        if (curMode !== viewVers.value) {
            if (lastClicked === 'memory') {
                manageMemory.click();
            } else {
                manageTime.click();
            }
        }
    }
}

function isFilename(name) {
    const illegalChars = /[\\/:*?"<>|]/;
    const reservedNames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i;
    if (!name) return false;
    if (illegalChars.test(name)) return false;
    if (reservedNames.test(name)) return false;
    if (name.endsWith(' ') || name.endsWith('.')) return false;
    return true;
}

function bestAverage(arr, k) {
    if (k > arr.length || k < 1 || !Number.isInteger(k)) return null;
    let sum = arr.slice(0, k).reduce((a, c) => a + c, 0);
    let best = sum;
    for (let i = k; i < arr.length; i++) {
        sum = sum - arr[i - k] + arr[i];
        if (sum > best) best = sum;
    }
    return best / k;
}

mute.forEach(e => {
    e.addEventListener('click', () => {
        switch(e.id) {
            case 'muteLogo':
                logoVolume.value = 0;
                logoVolume.dispatchEvent(new Event('input'));
                break;
            case 'muteButton':
                buttonVolume.value = 0;
                buttonVolume.dispatchEvent(new Event('input'));
                break;
            case 'muteSystem':
                systemVolume.value = 0;
                systemVolume.dispatchEvent(new Event('input'));
                break;
            default:
                playSound(errorSound);
                alert('Corrupted mute buttons. Please contact dev.');
        }
    });
    e.addEventListener('mousedown', () => {
        playSound(mouseClick);
    })
});

allMute.addEventListener('click', () => {
    volume.forEach(e => {
        e.value = 0;
        e.dispatchEvent(new Event('input'));
    });
});

allMute.addEventListener('mousedown', () => {
    playSound(mouseClick);
});

everyButton.forEach(e => {
    if (e.id == 'startButton') {
        e.addEventListener('click', () => {
            startup.play();
        }, {once: true});
    }
    e.addEventListener('mousedown', () => {
        playSound(mouseClick);
    });
});

everyDropdown.forEach(e => {
    e.addEventListener('mousedown', () => {
        playSound(mouseClick2);
    });
});

everyCheckbox.forEach(e => {
    e.addEventListener('mousedown', () => {
        playSound(mouseClick3);
    });
});

settings.addEventListener('click', () => {
    buttons.forEach(button => {
        if (button.className !== 'settingsButton') {
            button.disabled = true;
        }
    });
    settingsOverlay.style.cursor = 'not-allowed';
    settingsOverlay.style.display = 'flex';
    settingsUi.style.display = 'flex';
    Close.addEventListener('click', () => {
        settingsOverlay.style.cursor = 'default';
        settingsOverlay.style.display = 'none';
        settingsUi.style.display = 'none';
        buttons.forEach(button => {
            button.disabled = false;
        });
    });
});

specialButtons.forEach(e => {
    e.addEventListener('mousedown', () => {
        playSound(mouseClick4);
    })
});

startButton.addEventListener('click', () => {
    const audio = new Audio();
    audio.play().then(() => audio.pause());
    overlay.style.display = 'none';
});

balloon.addEventListener('mouseenter', () => {
    playSound(balloonInflate, true, 7);
});

bask.addEventListener('mouseenter', () => {
    playSound(basketballBounce, true);
});

balloonSave.addEventListener('click', () => {
    if (appendTime('balloonGame', balloonDropdown.value, balloonInput.value) === 'error') return;
    if (enter !== null) {
        let currentTime = times['balloonGame'][balloonDropdown.value][times['balloonGame'][balloonDropdown.value].length - 1]
        if (Auto.checked) {
            balloonGame[balloonDropdown.value].push(currentTime);
            saveGame('balloonGame', balloonGame);
        }
        if (check.checked && lastClicked === 'time') {
            manageTime.click();
        }
    }
});


bedBallSave.addEventListener('click', () => {
    if (appendTime('bedBallGame', bedBallDropdown.value, bedballInput.value)) return;
    if (enter !== null) {
        let currentTime = times.bedBallGame[bedBallDropdown.value][times.bedBallGame[bedBallDropdown.value].length - 1];
        if (Auto.checked) {
            bedBallGame[bedBallDropdown.value].push(currentTime);
            saveGame('bedBallGame', bedBallGame);
        }
        if (check.checked && lastClicked === 'time') {
            manageTime.click();
        }
    }
});

undo.addEventListener('click', () => {
    if (saveLog.length>0) {
        let array = [...saveLog[saveLog.length - 1]];     
        if (typeof array[2] === 'string' || isNaN(array[2]) || array[2]<0 || typeof array[1] !== 'string' || typeof array[0] !== 'string') {
            insertError.textContent = 'Critical Error: Corrupted Arrays';
            playSound(errorSound);
            return;
        }
        times[array[0]][array[1]].splice(times[array[0]][array[1]].indexOf(array[2]), 1);
        if (check.checked && lastClicked === 'time') {
            manageTime.click();
        }
        saveLog.splice(saveLog.length-1, 1);
    }
});

memBalloonsmack.addEventListener('click', () => {
    let currentTime = Number(balloonInput.value);
    if (isNaN(currentTime) || currentTime<0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
        return;
    }
    balloonGame[balloonDropdown.value].push(currentTime);
    saveGame('balloonGame', balloonGame);
});

memBedBall.addEventListener('click', () => {
    let currentTime = Number(bedballInput.value);
    if (isNaN(currentTime) || currentTime < 0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
    }
    bedBallGame[bedBallDropdown.value].push(currentTime);
    saveGame('bedBallGame', bedBallGame);
});

transport.addEventListener('click', () => {
    for (const obj in times) {
        let object = times[obj]; // balloonGame/bedBallGame OBJECT
        for (const o in object) {
            let array = object[o]; // the array within balloonGame/bedBallGame
            if (array.length>0) {
                if (obj === 'balloonGame') {
                    balloonGame[o].push(...array);
                } else {
                    bedBallGame[o].push(...array);
                }
            }
            times[obj][o] = [];
        }
    }
    saveGame('bedBallGame', bedBallGame);
    saveGame('balloonGame', balloonGame);
});

viewBalloonTime.addEventListener('click', () => {
    let theArray = balloonGame[balloonDropdown.value];
    if (theArray.length === 0) {
        balloonAvg.textContent = 'No Scores Set';
        balloonPb.textContent = 'No Scores Set';
        return;
    }
    balloonPb.textContent = 'Balloonsmack PB: ' + (Math.max(...theArray)).toString();
    let val = Number(balloonAvgAmount.value);
    if (isNaN(val) || val<1) {
        balloonAvg.textContent = 'Error: Improper Average Amount';
        return;
    }
    if (val > theArray.length) {
        val = theArray.length;
        balloonAvgAmount.value = val;
    }
    balloonAvg.textContent = `Balloonsmack Average: ${bestAverage(theArray, val).toFixed(3)}`;
});

viewBallTime.addEventListener('click', () => {
    let theArray = bedBallGame[bedBallDropdown.value];
    if (theArray.length === 0) {
        bedballPb.textContent = 'No Scores Set';
        bedballAvg.textContent = 'No Scores Set';
        return;
    }
    bedballPb.textContent = 'Bedball PB: ' + Math.max(...theArray).toString();
    let val = Number(bedballAvgAmount.value);
    if (isNaN(val) || val < 1) {
        bedballAvg.textContent = 'Error: Improper Average Amount';
        return;
    }
    if (val > theArray.length) {
        val = theArray.length;
        bedballAvgAmount.value = val;
    }
    bedballAvg.textContent = `Bedball Average: ${bestAverage(theArray, val).toFixed(3)}`;
});

timeClear.addEventListener('click', () => {clearTimes('bedBallGame')});
memClear.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
        userconfirm = confirm('Are you really sure?');
        if (userconfirm) {
            saveGame('bedBallGame', {
                anyHitNoBed: [0,0],
                handsOnlyNoBed: [0,0],
                anyHitNoSurface: [0,0]
            });
            bedBallGame = {
                anyHitNoBed: [0,0],
                handsOnlyNoBed: [0,0],
                anyHitNoSurface: [0,0]
            }
        }
    }
});

balloonTime.addEventListener('click', () => {clearTimes('balloonGame')});

balloonMem.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
        userconfirm = confirm('Are you really sure?');
        if (userconfirm) {
            saveGame('balloonGame', {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            }); 
            balloonGame = {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            }
        }
    }
});

manageTime.addEventListener('click', () => {
    lastClicked = 'time';
    if (viewVers.value === 'json') {
        modBox.value = JSON.stringify(times);
        curMode = 'json';
    } else {
        modBox.value = formatTimes(times);
        curMode = 'text';
    }
});

manageMemory.addEventListener('click', () => {
    lastClicked = 'memory';
    let combo = {
        balloonGame: {},
        bedBallGame: {}
    };
    combo.balloonGame = balloonGame;
    combo.bedBallGame = bedBallGame;
    if (viewVers.value === 'json') {
        modBox.value = JSON.stringify(combo);
        curMode = 'json';
    } else {
        modBox.value = formatTimes(combo);
        curMode = 'text';
    }
});

allTime.addEventListener('click', () => {
    clearTimes('balloonGame');
    clearTimes('bedBallGame');
    if (check.checked && lastClicked === 'time') {manageTime.click()}
});

allMem.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
        userconfirm = confirm('Are you really sure?');
        if (userconfirm) {
            saveGame('balloonGame', {
                anyHitNoSurface: [0,0],
                anyHitNoGround: [0,0],
                handsOnlyNoGround: [0,0],
                handsOnlyNoSurface: [0,0],
                feetOnlyNoGround: [0,0],
                anyHitStrikeFloor: [0,0]
            });
            saveGame('bedBallGame', {
                anyHitNoBed: [0,0],
                handsOnlyNoBed: [0,0],
                anyHitNoSurface: [0,0]
            });
            balloonGame = {
                anyHitNoSurface: [0,0],
                anyHitNoGround: [0,0],
                handsOnlyNoGround: [0,0],
                handsOnlyNoSurface: [0,0],
                feetOnlyNoGround: [0,0],
                anyHitStrikeFloor: [0,0]
            }
            bedBallGame = {
                anyHitNoBed: [0,0],
                handsOnlyNoBed: [0,0],
                anyHitNoSurface: [0,0]
            }
        }
    }
    if (lastClicked === 'memory' && check.checked) {
        manageMemory.click();
    }
});

saveTime.addEventListener('click', () => {
    try {
        parse = JSON.parse(modBox.value);
    } catch {
        insertError.textContent = 'Improper syntax';
        playSound(errorSound);
        return;
    }
    if (parse.balloonGame === undefined || parse.bedBallGame === undefined) {
        insertError.textContent = 'Undefined Objects';
        playSound(errorSound);
        return;
    }
    times = parse;
});

saveMemory.addEventListener('click', () => {
    try {
        parse = JSON.parse(modBox.value);
    } catch {
        insertError.textContent = 'Improper Syntax';
        playSound(errorSound);
        return;
    }
    if (parse.balloonGame === undefined || parse.bedBallGame === undefined) {
        insertError.textContent = 'Undefined Objects';
        playSound(errorSound);
        return;
    }
    balloonGame = parse.balloonGame;
    bedBallGame = parse.bedBallGame;
    saveGame('balloonGame', balloonGame);
    saveGame('bedBallGame', bedBallGame);
    if (lastClicked === 'memory' && check.checked) {
        manageMemory.click();
    }
});

clearText.addEventListener('click', () => {modBox.value = ''});

exportFile.addEventListener('click', () => {
    let dataStr;
    if (verif.checked) {
        try {
            parse = JSON.parse(modBox.value);
        } catch(err) {
            insertError.textContent = err;
            playSound(errorSound);
            return;
        }
        dataStr = modBox.value;
    } else {
        dataStr = JSON.stringify({
            balloonGame,
            bedBallGame
        }, null, 2);
    }

    const blob = new Blob([dataStr], { type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    if (isFilename(fileName.value)) {
        a.download = `${fileName.value}.json`;
    } else {
        a.download = 'memory.json';
    }
    a.click();

    URL.revokeObjectURL(url);
});

exportTime.addEventListener('click', () => {
    let dataStr;
    if (verif.checked) {
        try {
            parse = JSON.parse(modBox.value);
        } catch(err) {
            insertError.textContent = err;
            playSound(errorSound);
            return;
        }
        dataStr = modBox.value;
        console.log(dataStr);
    } else {
        dataStr = JSON.stringify({
            balloonGame: times.balloonGame,
            bedBallGame: times.bedBallGame
        }, null, 2);
    }

    const blob = new Blob([dataStr], { type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    if (isFilename(fileName.value)) {
        a.download = `${fileName.value}.json`;
    } else {
        a.download = 'time.json';
    }
    a.click();
    URL.revokeObjectURL(url);
});

uploadMem.addEventListener('click', () => {fileInput.click()});
uploadTime.addEventListener('click', () => {timeInput.click()});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        try {
            const parsed = JSON.parse(text);
            console.log(parsed);
            if (!parsed.balloonGame || !parsed.bedBallGame) {
                insertError.textContent = 'Invalid JSON structure';
                playSound(errorSound);
                return;
            }
            balloonGame = parsed.balloonGame;
            bedBallGame = parsed.bedBallGame;
            saveGame('balloonGame', balloonGame);
            saveGame('bedBallGame', bedBallGame);
            console.log('successfully loaded');
        } catch (err) {
            insertError.textContent = 'Invalid JSON file';
            playSound(errorSound);
        }
    };
    reader.readAsText(file);
});

timeInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        try {
            const parsed = JSON.parse(text);
            if (!parsed.balloonGame || !parsed.bedBallGame) {
                insertError.textContent = 'Invalid JSON';
                playSound(errorSound);
                return;
            }
            times.balloonGame = parsed.balloonGame;
            times.bedBallGame = parsed.bedBallGame;
        } catch (err) {
            insertError.textContent = 'Invalid JSON file';
            playSound(errorSound);
        }
    };
    reader.readAsText(file);
});

clearError.addEventListener('click', () => {
    insertError.textContent = '';
})

viewVers.addEventListener('change', () => {
    updateText(check.checked && lastClicked !== '');
});

check.addEventListener('change', () => {
    updateText(check.checked && lastClicked !== '')
});

buttons.forEach(button => {
    button.disabled = false;
});