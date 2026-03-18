const errorDiv = document.getElementById('error');
if (window.innerWidth < 1244 && (localStorage.getItem('askAgain') === 'false' || localStorage.getItem('askAgain') === null)) {
    errorDiv.style.display = 'flex';
}
const errorButton = document.getElementById('errorButton');
const errorCheck = document.getElementById('errorCheck');
const clearError = document.getElementById('clearError');
const viewBalloonTime2 = document.getElementById('viewBalloonTime2');
const viewBallTime2 = document.getElementById('viewBallTime2');
const logoVolume = document.getElementById('logoVolume');
const buttonVolume = document.getElementById('buttonVolume');
const systemVolume = document.getElementById('systemVolume');
const volume = Array.from(document.getElementsByClassName('volume'));
const settingsUi = document.getElementById('settingsUi');
const Close = document.getElementById('close');
const settingsOverlay = document.getElementById('settingsOverlay');
const balloonSave = document.getElementById('balloonSave');
const bedBallSave = document.getElementById('bedBallSave');
const brightnessOverlay = document.getElementById('brightnessOverlay');
const keyReminder = document.getElementById('keyReminder');
const brightness = document.getElementById('brightness');
brightness.value = 100;
const memBalloonsmack = document.getElementById('memBalloonsmack');
const specialButtons = Array.from(document.getElementsByClassName('specialButton'));
const memBedBall = document.getElementById('memBedBall');
const viewBalloonTime = document.getElementById('viewBalloonTime');
const viewBallTime = document.getElementById('viewBallTime');
const allBallTime = [viewBallTime, viewBallTime2];
const allBalloonTime = [viewBalloonTime, viewBalloonTime2];
const bask = document.getElementById('bask');
const logoPercent = document.getElementById('logoPercent');
const buttonPercent = document.getElementById('buttonPercent');
const mute = Array.from(document.getElementsByClassName('mute'));
const systemPercent = document.getElementById('systemPercent');
const brightPercent = document.getElementById('brightPercent');
const username = document.getElementById('username');
const editable = document.getElementById('editable');
editable.checked = true;
const balloon = document.getElementById('balloon');
const allMute = document.getElementById('allMute');
const balloonTime = document.getElementById('balloonTime');
const balloonMem = document.getElementById('balloonMem');
const timeClear = document.getElementById('timeClear');
const overlay = document.getElementById('overlay');
const insertError = document.getElementById('insertError');
const memClear = document.getElementById('memClear');
const selectUsername = document.getElementById('selectUsername');
const startButton = document.getElementById('startButton');
const resetVolFull = document.getElementById('resetVolFull');
const soundMixerButton = document.getElementById('soundMixerButton');
const soundMixer = document.getElementById('soundMixer');
const displayMixer = document.getElementById('displayMixer');
const dangerZone = document.getElementById('dangerZone');
soundMixer.style.position = 'static';
soundMixer.style.visibility = 'visible';
displayMixer.style.position = 'absolute';
displayMixer.style.visibility = 'hidden';
dangerZone.style.position = 'absolute';
dangerZone.style.visibility = 'hidden';
const settingsButton = Array.from(document.getElementsByClassName('settingsButton'));
const settings = document.getElementById('settings');
const viewVers = document.getElementById('viewVers');
const balloonPb = document.getElementById('balloonPb');
const balloonAvg = document.getElementById('balloonAvg');
const usernameSwitch = document.getElementById('usernameSwitch');
const deleteUser = document.getElementById('deleteUser');
const changetoUser = document.getElementById('changetoUser');
const balloonAvgAmount = document.getElementById('balloonAvgAmount');
const bedballPb = document.getElementById('bedballPb');
const bedballAvg = document.getElementById('bedballAvg');
const bedballAvgAmount = document.getElementById('bedballAvgAmount');
const manageMemory = document.getElementById('manageMemory');
const manageTime = document.getElementById('manageTime');
const labe = document.getElementById('labe');
const Auto = document.getElementById('auto');
const src = document.getElementById('src');
const deleteDisplay = document.getElementById('deleteDisplay');
const modBox = document.getElementById('modBox');
const allTime = document.getElementById('allTime');
const allMem = document.getElementById('allMem');
const transport = document.getElementById('transport');
const transportReverse = document.getElementById('transportReverse');
const everyButton = document.querySelectorAll('button');
const everyDropdown = document.querySelectorAll('select');
const everyCheckbox = document.querySelectorAll('label');
const fontPreview = document.getElementById('fontPreview');
const boxFontSelect = document.getElementById('boxFontSelect');
const fontThicknessSelect = document.getElementById('fontThicknessSelect');
const fontLineSelect = document.getElementById('fontLineSelect');
const lineStyleSelect = document.getElementById('lineStyleSelect');
boxFontSelect.value = 'monospace';
fontThicknessSelect.value = '400';
fontLineSelect.value = 'none';
lineStyleSelect.value = 'solid';
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
const fontSizeInput = document.getElementById('fontSizeInput');
const draggableBalloon = document.getElementById('draggableBalloon');
const draggableBask = document.getElementById('draggableBask');
draggableBalloon.checked = true;
draggableBask.checked = true;
const uploadMem = document.getElementById('uploadMem');
const uploadTime = document.getElementById('uploadTime');
const undoSave = document.getElementById('undoSave');
const fileInput = document.createElement('input');
const timeInput = document.createElement('input');
fileInput.type = 'file'
timeInput.type = 'file';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.disabled = true;
});
const balloonHas = ['anyHitNoSurface', 'anyHitNoGround', 'handsOnlyNoGround', 'handsOnlyNoSurface', 'feetOnlyNoGround', 'anyHitStrikeFloor'];
const bedballHas = ['anyHitNoBed', 'handsOnlyNoBed', 'anyHitNoSurface'];
let enter = '';
let parse = '';
let nameofUser = '';
let auto = false;
let curMode = 'json';
let lastClicked = '';
let modChanged = false;
let saveLog = [];
let memLog = [];
let elements = [];
let dangerElements = [];
let openSite = false;
let changeBright = false;
let memory, balloonGame, bedBallGame;
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
const fatalError = new Audio('sounds/fatalError.mp3');
const warning = new Audio('sounds/warning.mp3');

draggables.forEach(elem => {
    const reference = document.getElementById(elem.dataset.target);
    elem.addEventListener('mousedown', onMouseDown);
    function onMouseDown(e) {
        if (!reference.checked) return;
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
    }
    if (filename === 'error.mp3' || filename === 'startup.mp3' || filename === 'fatalError.mp3' || filename === 'warning.mp3') {
        volume = systemVolume.value/100;
    }
    if (filename === 'mouseClick.mp3' || filename === 'mouseClick2.mp3' || filename === 'mouseClick3.mp3' || filename === 'mouseClick4.mp3') {
        volume = buttonVolume.value/100;
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

function handleKey(event) {
    if (event.code === 'KeyR') {
        brightnessOverlay.style.opacity = '0';
        brightnessOverlay.style.pointerEvents = 'none';
        brightness.value = 100;
        brightness.dispatchEvent(new Event('input'));
        keyReminder.style.visibility = 'hidden';
        document.removeEventListener('keydown', handleKey);
    }
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
            case 'brightness':
                brightPercent.textContent = `${e.value}%`;
                break;
            default:
                playSound(fatalError, 1);
                alert('Corrupted Settings. Please contact dev.');
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

let blankDef = {
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

function appendTime(game, key, inp) {
    if (isNaN(Number(inp)) || Number(inp)<=0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
        return 'error';
    }
    times[game][key].push(Number(Number(inp).toFixed(3)));
    saveLog.push([game, key, Number(Number(inp).toFixed(3)), times[game][key].length]);
}

function containsSpecialChars(str) {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
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

function changeVisibility(div, hidden) {
    if (hidden) {
        div.style.visibility = 'hidden';
        div.style.position = 'absolute';
    } else {
        div.style.visibility = 'visible';
        div.style.position = 'static';
    }
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
                playSound(fatalError, 1);
                alert('Corrupted mute buttons. Please contact dev.');
        }
    });
    e.addEventListener('mousedown', () => {
        playSound(mouseClick);
    })
});

errorButton.addEventListener('click', () => {
    localStorage.setItem('askAgain', errorCheck.checked);
    errorDiv.style.display = 'none';
});

allMute.addEventListener('click', () => {
    volume.forEach(e => {
        if (e.id === 'brightness') return;
        e.value = 0;
        e.dispatchEvent(new Event('input'));
    });
});

allMute.addEventListener('mousedown', () => {
    playSound(mouseClick);
});

brightness.addEventListener('input', () => {
    brightnessOverlay.style.opacity = 1 - brightness.value / 100;
    if (brightnessOverlay.style.opacity === '1') {
        brightnessOverlay.style.pointerEvents = 'auto';
        keyReminder.style.visibility = 'visible';
        document.addEventListener('keydown', handleKey);
        changeBright = true;
    }
    if (changeBright && brightnessOverlay.style.opacity !== '1') {
        keyReminder.style.visibility = 'hidden';
        brightnessOverlay.style.pointerEvents = 'none';
        document.removeEventListener('keydown', handleKey);
    }
});

everyButton.forEach(e => {
    if (e.id == 'startButton') {
        e.addEventListener('click', () => {
            if (username.value !== '' || selectUsername.value !== '') startup.play();
        });
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
    settings.style.transform = "rotate(-90deg)";
    buttons.forEach(button => {
        if (button.className !== 'settingsButton' && button.id !== 'resetVolFull' && button.className !== 'otherSettingsButton') {
            button.disabled = true;
        }
    });
    settingsOverlay.style.cursor = 'not-allowed';
    settingsOverlay.style.display = 'flex';
    settingsUi.style.visibility = 'visible';
    Close.addEventListener('click', () => {
        settings.style.transform = "rotate(0deg)";
        settingsOverlay.style.cursor = 'default';
        settingsOverlay.style.display = 'none';
        settingsUi.style.visibility = 'hidden';
        buttons.forEach(button => {
            button.disabled = false;
        });
        deleteDisplay.textContent = 'Delete This User';
    });
});

settingsButton.forEach(e => {
    e.addEventListener('click', () => {
        settingsButton.forEach(o => {
            const target = document.getElementById(o.dataset.target);
            if (o.id === e.id) {
                o.style.backgroundColor = 'rgb(202, 227, 228)';
                changeVisibility(target, false);
            } else {
                o.style.backgroundColor = 'rgb(153,150,150)';
                changeVisibility(target, true);
            }
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
    if (username.value === '' && selectUsername.value === '') {
        playSound(warning);
        username.placeholder = 'Please Enter a Username';
        return;
    }
    if (username.value === '') {
        nameofUser = selectUsername.value;
    } else {
        nameofUser = username.value;
    }
    for (let child of overlay.children) {
        child.style.display = 'none';
    }
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
    openSite = true;
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 320);
});

startButton.addEventListener('click', () => {
    if (username.value === '' && selectUsername.value === '') return;
    memory = loadGame('myApp_'+nameofUser, {
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
    balloonGame = memory.balloonGame;
    bedBallGame = memory.bedBallGame;
    localStorage.setItem('myApp_'+nameofUser, JSON.stringify(memory));
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
            saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
        }
        if (check.checked) {
            if (Auto.checked) {
                if (lastClicked === 'memory') {
                    manageMemory.click();
                } 
                if (lastClicked === 'time') {
                    manageTime.click();
                }
            } else if (lastClicked === 'time') {manageTime.click()}
        }
    }
});

bedBallSave.addEventListener('click', () => {
    if (appendTime('bedBallGame', bedBallDropdown.value, bedballInput.value)) return;
    if (enter !== null) {
        let currentTime = times.bedBallGame[bedBallDropdown.value][times.bedBallGame[bedBallDropdown.value].length - 1];
        if (Auto.checked) {
            bedBallGame[bedBallDropdown.value].push(currentTime);
            saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
        }
        if (check.checked) {
            if (Auto.checked) {
                if (lastClicked === 'memory') {
                    manageMemory.click();
                } 
                if (lastClicked === 'time') {
                    manageTime.click();
                }
            } else if (lastClicked === 'time') {manageTime.click()}
        }
    }
});

undoSave.addEventListener('click', () => {
    if (saveLog.length>0) {
        let array = [...saveLog[saveLog.length - 1]];     
        if (typeof array[2] === 'string' || isNaN(array[2]) || array[2]<0 || typeof array[1] !== 'string' || typeof array[0] !== 'string' || array.length !== 4 || typeof array[3] !== 'number') {
            insertError.textContent = 'Critical Error: Corrupted Time Arrays';
            playSound(fatalError);
            return;
        }
        times[array[0]][array[1]].splice(array[3]-1, 1);
        if (check.checked && (lastClicked === 'time')) {
            manageTime.click();
        }
        saveLog.splice(saveLog.length-1, 1);
    }
});

undoMem.addEventListener('click', () => {
    if (memLog.length > 0) {
        let array = [...memLog[memLog.length - 1]];
        if (typeof array[2] === 'string' || isNaN(array[2]) || array[2] < 0 || typeof array[1] !== 'string' || typeof array[0] !== 'string' || array.length !== 4 || !(array[0] === 'balloonGame' || array[0] === 'bedBallGame') || typeof array[3] !== 'number') {
            insertError.textContent = 'Critical Error: Corrupted Memory Arrays';
            playSound(fatalError);
            return;
        }
        let obj;
        if (array[0] === 'balloonGame') {
            obj = balloonGame;
        } else {
            obj = bedBallGame;
        }
        obj[array[1]].splice(array[3]-1, 1);
        if (check.checked && lastClicked === 'memory') {
            manageMemory.click();
        }
        memLog.splice(memLog.length-1, 1);
        saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
    }
});

memBalloonsmack.addEventListener('click', () => {
    let currentTime = Number(Number(balloonInput.value).toFixed(3));
    if (isNaN(currentTime) || currentTime < 0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
        return;
    }
    balloonGame[balloonDropdown.value].push(currentTime);
    memLog.push(['balloonGame', balloonDropdown.value, currentTime, balloonGame[balloonDropdown.value].length]);
    if (check.checked && lastClicked === 'memory') {
        manageMemory.click();
    }
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
});

memBedBall.addEventListener('click', () => {
    let currentTime = Number(Number(bedballInput.value).toFixed(3));
    if (isNaN(currentTime) || currentTime < 0) {
        insertError.textContent = 'Invalid Time';
        playSound(errorSound);
        return;
    }
    bedBallGame[bedBallDropdown.value].push(currentTime);
    memLog.push(['bedBallGame', bedBallDropdown.value, currentTime, bedBallGame[bedBallDropdown.value].length]);
    if (check.checked && lastClicked === 'memory') {
        manageMemory.click();
    }
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
});

transport.addEventListener('click', () => {
    if (JSON.stringify(times.balloonGame) === JSON.stringify(blankDef.balloonGame) && JSON.stringify(times.bedBallGame) === JSON.stringify(blankDef.bedBallGame)) {
        insertError.textContent = 'Cannot transfer empty JSON';
        playSound(warning);
        return;
    }
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
    if (check.checked) {
        if (lastClicked === 'time') {
            manageTime.click();
        }
        if (lastClicked === 'memory') {
            manageMemory.click();
        }
    }
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
});

transportReverse.addEventListener('click', () => {
    if (JSON.stringify(balloonGame) === JSON.stringify(blankDef.balloonGame) && JSON.stringify(bedBallGame) === JSON.stringify(blankDef.bedBallGame)) {
        insertError.textContent = 'Cannot transfer empty JSON';
        playSound(warning);
        return;
    }
    for (const o in balloonGame) {
        let array = balloonGame[o];
        if (array.length>0) {
            times.balloonGame[o].push(...array);
        }
        balloonGame[o] = [];
    }
    for (const o in bedBallGame) {
        let array = bedBallGame[o];
        if (array.length>0) {
            times.bedBallGame[o].push(...array);
        }
        bedBallGame[o] = [];
    }
    if (check.checked) {
        if (lastClicked === 'time') {
            manageTime.click();
        }
        if (lastClicked === 'memory') {
            manageMemory.click();
        }
    }
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
});

resetVolFull.addEventListener('click', () => {
    const event = new Event('input');
    volume.forEach(e => {
        if (e.id === 'brightness') return;
        e.value = 100;
        e.dispatchEvent(event);
    });
});

editable.addEventListener('change', () => {
    if (editable.checked) {
        modBox.readOnly = false;
    } else {
        modBox.readOnly = true;
    }
});

allBalloonTime.forEach(e => {
    let theArray;
    e.addEventListener('click', () => {
        if (e.id === 'viewBalloonTime') {
            theArray = times.balloonGame[balloonDropdown.value];
        } else {
            theArray = balloonGame[balloonDropdown.value];
        }
        if (theArray.length === 0) {
            balloonAvg.textContent = 'No Scores Set';
            balloonPb.textContent = 'No Scores Set';
            return;
        }
        balloonPb.textContent = 'Balloonsmack PB: ' + (Math.max(...theArray)).toFixed(3);
        let val = Number(balloonAvgAmount.value);
        if (isNaN(val) || val<1) {
            balloonAvg.textContent = 'Error: Improper Average Amount';
            return;
        }
        val = Math.round(val);
        if (val > theArray.length) {
            val = theArray.length;
            balloonAvgAmount.value = val;
        }
        balloonAvgAmount.value = val;
        balloonAvg.textContent = `Balloonsmack Average: ${bestAverage(theArray, val).toFixed(3)}`;
    })
});

allBallTime.forEach(e => {
    let theArray;
    e.addEventListener('click', () => {
        if (e.id === 'viewBallTime') {
            theArray = times.bedBallGame[bedBallDropdown.value];
        } else {
            theArray = bedBallGame[bedBallDropdown.value]; 
        }
        if (theArray.length === 0) {
            bedballPb.textContent = 'No Scores Set';
            bedballAvg.textContent = 'No Scores Set';
            return;
        }
        bedballPb.textContent = 'Bedball PB: ' + Math.max(...theArray).toFixed(3);
        let val = Number(bedballAvgAmount.value);
        if (isNaN(val) || val < 1) {
            bedballAvg.textContent = 'Error: Improper Average Amount';
            return;
        }
        val = Math.round(val);
        if (val > theArray.length) {
            val = theArray.length;
        }
        bedballAvgAmount.value = val;
        bedballAvg.textContent = `Bedball Average: ${bestAverage(theArray, val).toFixed(3)}`;
    })
});

timeClear.addEventListener('click', () => {clearTimes('bedBallGame')});
memClear.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
            saveGame('myApp_'+nameofUser, balloonGame, {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            });
            bedBallGame = {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            }
    }
    if (lastClicked === 'memory' && check.checked) {manageMemory.click()}
});

balloonTime.addEventListener('click', () => {clearTimes('balloonGame')});

balloonMem.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {      
        saveGame('myApp_'+nameofUser, {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }, bedBallGame); 
        balloonGame = {
            anyHitNoSurface: [],
            anyHitNoGround: [],
            handsOnlyNoGround: [],
            handsOnlyNoSurface: [],
            feetOnlyNoGround: [],
            anyHitStrikeFloor: []
        }
    }
    if (lastClicked === 'memory' && check.checked) {manageMemory.click()}
});

manageTime.addEventListener('click', () => {
    manageTime.style.boxShadow = "0 0 5px 4px rgba(255, 0, 0, 0.5)";
    manageMemory.style.boxShadow = "none";
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
    manageMemory.style.boxShadow = "0 0 5px 4px rgba(255, 0, 0, 0.5)";
    manageTime.style.boxShadow = "none";
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
    saveLog = [];
    if (check.checked && lastClicked === 'time') {manageTime.click()}
});

allMem.addEventListener('click', () => {
    let userconfirm = confirm('Are you sure you want to perform this action?');
    if (userconfirm) {
        userconfirm = confirm('Are you really sure?');
        if (userconfirm) {
            memLog = [];
            saveGame('myApp_'+nameofUser, {
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
            balloonGame = {
                anyHitNoSurface: [],
                anyHitNoGround: [],
                handsOnlyNoGround: [],
                handsOnlyNoSurface: [],
                feetOnlyNoGround: [],
                anyHitStrikeFloor: []
            }
            bedBallGame = {
                anyHitNoBed: [],
                handsOnlyNoBed: [],
                anyHitNoSurface: []
            }
        }
    }
    if (lastClicked === 'memory' && check.checked) {
        manageMemory.click();
    }
});

saveTime.addEventListener('click', () => {
    if (!editable.checked) {
        insertError.textContent = 'Warning: Saving Times and Memory is disabled in read-only mode.'
        playSound(warning);
        return;
    }
    try {
        parse = JSON.parse(modBox.value);
    } catch(err) {
        insertError.textContent = err;
        playSound(errorSound);
        return;
    }
    if (parse.balloonGame === undefined || parse.bedBallGame === undefined) {
        insertError.textContent = 'Undefined Objects';
        playSound(errorSound);
        return;
    }
    let balloong = parse.balloonGame;
    let bedbal = parse.bedBallGame;
    let balloonKeys = Object.keys(balloong);
    let bedballKeys = Object.keys(bedbal);
    if (balloonHas.some(key => !(balloonKeys.includes(key))) || bedballHas.some(key => !(bedballKeys.includes(key)))) {
        insertError.textContent = 'Missing JSON Properties';
        playSound(errorSound);
        return;
    }
    for (let data in balloong) {
        if (!balloonHas.includes(data)) {
            delete parse.balloonGame[data];
        }
    }
    for (let data in bedbal) {
        if (!bedballHas.includes(data)) {
            delete parse.bedBallGame[data];
        }
    }
    saveLog = [];
    memLog = [];
    lastClicked = 'time';
    manageTime.style.boxShadow = "0 0 3px 2px rgba(255, 0, 0, 0.5)";
    manageMemory.style.boxShadow = 'none';
    times = parse;
});

saveMemory.addEventListener('click', () => {
    if (!editable.checked) {
        insertError.textContent = 'Warning: Saving Times and Memory is disabled in read-only mode.';
        playSound(warning);
        return;
    }
    try {
        parse = JSON.parse(modBox.value);
    } catch(err) {
        insertError.textContent = err;
        playSound(errorSound);
        return;
    }
    if (parse.balloonGame === undefined || parse.bedBallGame === undefined) {
        insertError.textContent = 'Undefined JSON Objects';
        playSound(errorSound);
        return;
    }
    let balloong = parse.balloonGame;
    let bedbal = parse.bedBallGame;
    let balloonKeys = Object.keys(balloong);
    let bedballKeys = Object.keys(bedbal);
    if (balloonHas.some(key => !(balloonKeys.includes(key))) || bedballHas.some(key => !(bedballKeys.includes(key)))) {
        insertError.textContent = 'Missing JSON Properties';
        playSound(errorSound);
        return;
    }
    for (let data in balloong) {
        if (!balloonHas.includes(data)) {
            delete parse.balloonGame[data];
        }
    }
    for (let data in bedbal) {
        if (!bedballHas.includes(data)) {
            delete parse.bedBallGame[data];
        }
    }
    saveLog = [];
    memLog = [];
    lastClicked = 'memory';
    manageMemory.style.boxShadow = "0 0 3px 2px rgba(255, 0, 0, 0.5)";
    manageTime.style.boxShadow = "none";
    balloonGame = parse.balloonGame;
    bedBallGame = parse.bedBallGame;
    saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
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

modBox.addEventListener('input', () => {
    if (curMode === 'json') {
        modChanged = true;
    }
})

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
            const balloon = parsed.balloonGame;
            const bedball = parsed.bedBallGame;
            if (!parsed.balloonGame || !parsed.bedBallGame) {
                insertError.textContent = 'Missing JSON objects';
                playSound(errorSound);
                return;
            }
            if (!balloon.anyHitNoSurface || !balloon.anyHitNoGround || !balloon.handsOnlyNoGround || !balloon.feetOnlyNoGround || !balloon.anyHitStrikeFloor || !bedball.anyHitNoBed || !bedball.handsOnlyNoBed || !bedball.anyHitNoSurface) {
                insertError.textContent = 'Missing JSON properties';
                playSound(errorSound);
                return;
            }
            for (let target in balloon) {
                if (!balloonHas.includes(target)) {
                    delete parsed.balloonGame[target];
                }
            }
            for (let target in bedball) {
                if (!bedballHas.includes(target)) {
                    delete parsed.bedBallGame[target];
                }
            }
            balloonGame = parsed.balloonGame;
            bedBallGame = parsed.bedBallGame;
            saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
            saveGame('myApp_'+nameofUser, balloonGame, bedBallGame);
            if (check.checked && (lastClicked === 'memory' || lastClicked === '')) {
                manageMemory.click();
            }
        } catch (err) {
            insertError.textContent = 'Invalid JSON file';
            playSound(errorSound);
        }
    };
    reader.readAsText(file);
    fileInput.value = '';
});

timeInput.addEventListener('change', (event) => {
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
                insertError.textContent = 'Missing JSON objects';
                playSound(errorSound);
                return;
            }
            if (!balloon.anyHitNoSurface || !balloon.anyHitNoGround || !balloon.handsOnlyNoGround || !balloon.feetOnlyNoGround || !balloon.anyHitStrikeFloor || !bedball.anyHitNoBed || !bedball.handsOnlyNoBed || !bedball.anyHitNoSurface) {
                insertError.textContent = 'Missing JSON properties';
                playSound(errorSound);
                return;
            }
            for (let target in balloon) {
                if (!balloonHas.includes(target)) {
                    delete parsed.balloonGame[target];
                }
            }
            for (let target in bedball) {
                if (!bedballHas.includes(target)) {
                    delete parsed.bedBallGame[target];
                }
            }
            times.balloonGame = parsed.balloonGame;
            times.bedBallGame = parsed.bedBallGame;
            if (check.checked && (lastClicked === 'time' || lastClicked === '')) {
                manageTime.click();
            }
        } catch (err) {
            insertError.textContent = 'Invalid JSON file';
            playSound(errorSound);
        }
    }
    reader.readAsText(file);
    timeInput.value = '';
});

clearError.addEventListener('click', () => insertError.textContent = '');

viewVers.addEventListener('change', () => {
    updateText(check.checked && lastClicked !== '' && lastClicked !== 'change');
});

check.addEventListener('change', () => {
    if (check.checked) {
        if (lastClicked === 'time') {
            manageTime.click();
        }
        if (lastClicked === 'memory') {
            manageMemory.click();
        }
    }
});

boxFontSelect.addEventListener('change', () => {
    modBox.style.fontFamily = boxFontSelect.value;
    fontPreview.style.fontFamily = boxFontSelect.value;
});
fontThicknessSelect.addEventListener('change', () => {
    modBox.style.fontWeight = fontThicknessSelect.value;
    fontPreview.style.fontWeight = fontThicknessSelect.value;
});
fontLineSelect.addEventListener('change', () => {
    modBox.style.textDecorationLine = fontLineSelect.value;
    fontPreview.style.textDecorationLine = fontLineSelect.value;
});
lineStyleSelect.addEventListener('change', () => {
    modBox.style.textDecorationStyle = lineStyleSelect.value;
    fontPreview.style.textDecorationStyle = lineStyleSelect.value;
});

selectUsername.addEventListener('focus', () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('myApp_')).map(key => key.slice(6));;
    let exist = document.getElementById('usernamevalselect');
    let appe = document.getElementById('nonePresent');
    if (exist) {
        exist.remove();
    }
    if (keys.length === 0) {
        if (!appe) {
            appe = document.createElement('option');
            appe.id = 'nonePresent';
            appe.value = '';
            appe.textContent = 'No usernames exist yet';
            selectUsername.append(appe);
        }
    } else {
        if (elements.length === 0) {
            for (let i=0; i<keys.length; i++) {
                const option = document.createElement('option');
                elements.push(option);
                elements[i].value = keys[i];
                elements[i].textContent = keys[i];
                selectUsername.append(option);
            }
        }
    }
});

usernameSwitch.addEventListener('focus', () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('myApp_')).map(key => key.slice(6));
    let exist = document.getElementById('diffUsername');
    let changed = false;
    if (exist) {
        exist.remove();
        changed = true;
    }
    if (keys.length < 1) {
        playSound(fatalError);
        alert('Corrupted localStorage');
        return;
    }
    if (changed) {
        for (let i=0; i<keys.length; i++) {
            const option = document.createElement('option');
            dangerElements.push(option);
            dangerElements[i].value = keys[i];
            dangerElements[i].textContent = keys[i];
            usernameSwitch.append(option);
        }
    }
});

changetoUser.addEventListener('click', () => {
    if (usernameSwitch.value !== nameofUser) {
        console.log('switch')
        nameofUser = usernameSwitch.value;
        const parse = JSON.parse(localStorage.getItem('myApp_'+nameofUser));
        balloonGame = parse.balloonGame;
        bedBallGame = parse.bedBallGame;
        memLog = [];
        if (lastClicked === 'memory' && check.checked) {
            manageMemory.disabled = false;
            manageMemory.click();
            manageMemory.disabled = true;
        }
    } else {
        deleteDisplay.textContent = 'You are Currently Using this Username';
        playSound(errorSound);
    }
});

deleteUser.addEventListener('click', () => {
    if (usernameSwitch.value === "") {
        playSound(warning);
        deleteDisplay.textContent = 'No User Selected';
        return;
    }
    if (usernameSwitch.value !== nameofUser) {
        console.log(usernameSwitch.value);
        localStorage.removeItem('myApp_'+usernameSwitch.value);
        const valueToRemove = usernameSwitch.value;
        const option = Array.from(usernameSwitch.options).find(opt => opt.value === valueToRemove);
        if (option) option.remove();
    } else {
        playSound(errorSound);
        deleteDisplay.textContent = 'Cannot Delete Username that is Currently Being Used';
        return;
    }
});

fontSizeInput.addEventListener('change', () => {
    modBox.style.fontSize = `${fontSizeInput.value}pt`;
    fontPreview.style.fontSize = `${fontSizeInput.value}pt`;
});

buttons.forEach(button => {
    button.disabled = false;
});