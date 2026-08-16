import {assets, global, memory, files, inputs, settings, startupError, sounds} from "./modules/index.js";

if (localStorage.getItem('askAgain')) localStorage.removeItem('askAgain');
if (localStorage.getItem('noAsk') === null) localStorage.setItem('noAsk', 'false');
if (window.innerWidth < 1244 && localStorage.getItem('noAsk') === 'false') {
    assets.errorDiv.style.display = 'flex';
}

assets.buttons.forEach(button => {
    button.disabled = true;
});

assets.brightness.value = 100;
assets.editable.checked = true;
assets.soundMixer.style.position = 'static';
assets.soundMixer.style.visibility = 'visible';
assets.displayMixer.style.position = 'absolute';
assets.displayMixer.style.visibility = 'hidden';
assets.dangerZone.style.position = 'absolute';
assets.dangerZone.style.visibility = 'hidden';
assets.boxFontSelect.value = 'monospace';
assets.fontThicknessSelect.value = '400';
assets.fontLineSelect.value = 'none';
assets.lineStyleSelect.value = 'solid';
assets.check.checked = true;
assets.draggableBalloon.checked = true;
assets.draggableBask.checked = true;
assets.fileInput.type = 'file';
assets.timeInput.type = 'file';
assets.balloonInflate.playbackRate = 7;

assets.draggables.forEach(elem => {
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

assets.volume.forEach(e => {
    e.value = 100;
    e.addEventListener('input', () => {
        switch(e.id) {
            case 'logoVolume':
                assets.logoPercent.textContent = `${e.value}%`;
                break;
            case 'buttonVolume':
                assets.buttonPercent.textContent = `${e.value}%`;
                break;
            case 'systemVolume':
                assets.systemPercent.textContent = `${e.value}%`;
                break;
            case 'brightness':
                assets.brightPercent.textContent = `${e.value}%`;
                break;
            default:
                sounds.playSound(assets.fatalError, 1);
                alert('Corrupted Settings. Please contact dev.');
        }
    });
});

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

function containsSpecialChars(str) {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
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
        if (global.curMode !== assets.viewVers.value) {
            if (global.lastClicked === 'memory') {
                assets.manageMemory.click();
            } else {
                assets.manageTime.click();
            }
        }
    }
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

assets.mute.forEach(e => {
    e.addEventListener('click', () => {
        switch(e.id) {
            case 'muteLogo':
                assets.logoVolume.value = 0;
                assets.logoVolume.dispatchEvent(new Event('input'));
                break;
            case 'muteButton':
                assets.buttonVolume.value = 0;
                assets.buttonVolume.dispatchEvent(new Event('input'));
                break;
            case 'muteSystem':
                assets.systemVolume.value = 0;
                assets.systemVolume.dispatchEvent(new Event('input'));
                break;
            default:
                sounds.playSound(assets.fatalError, 1);
                alert('Corrupted mute buttons. Please contact dev.');
        }
    });
    e.addEventListener('mousedown', () => {
        sounds.playSound(assets.mouseClick);
    });
});

assets.errorButton.addEventListener('click', startupError.errorConf);
assets.allMute.addEventListener('click', settings.muteAll);

assets.allMute.addEventListener('mousedown', () => {
    sounds.playSound(assets.mouseClick);
});

assets.brightness.addEventListener('input', settings.controlBright);

assets.everyButton.forEach(e => {
    if (e.id == 'startButton') {
        e.addEventListener('click', () => {
            if (assets.username.value !== '' || assets.selectUsername.value !== '') assets.startup.play();
        });
    }
    e.addEventListener('mousedown', () => {
        sounds.playSound(assets.mouseClick);
    });
});

assets.everyDropdown.forEach(e => {
    e.addEventListener('mousedown', () => {
        sounds.playSound(assets.mouseClick2);
    });
});

assets.everyCheckbox.forEach(e => {
    e.addEventListener('mousedown', () => {
        sounds.playSound(assets.mouseClick3);
    });
});

assets.settings.addEventListener('click', settings.controlBright);
assets.settings.addEventListener('click', settings.initSettings);
assets.go2timer.addEventListener('click', settings.initTimer);
assets.saveDir1.addEventListener('change', settings.adjustTimerDropdown);

function start() {
    settings.startTimer();
    assets.startStop.textContent = 'Stop';
    assets.startStop.removeEventListener('click', start);
    assets.startStop.addEventListener('click', halt);
}

function halt() {
    settings.stopTimer();
    assets.startStop.textContent = 'Start';
    assets.startStop.removeEventListener('click', halt);
    assets.startStop.addEventListener('click', start);
}

assets.startStop.addEventListener('click', start);
assets.clearTimer.addEventListener('click', () => {
    settings.clearTimer();
    if (assets.startStop.textContent === 'Stop') {
        assets.startStop.textContent = 'Start';
        assets.startStop.removeEventListener('click', halt);
        assets.startStop.addEventListener('click', start);
    }
});
assets.saveTimerTime.addEventListener('click', memory.saveTimerTime);

assets.settingsButton.forEach(e => {
    e.addEventListener('click', () => {
        assets.settingsButton.forEach(o => {
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

assets.specialButtons.forEach(e => {
    e.addEventListener('mousedown', () => {
        sounds.playSound(assets.mouseClick4);
    });
});

assets.startButton.addEventListener('click', startupError.init);
assets.startButton.addEventListener('click', memory.loadUser);

assets.balloon.addEventListener('mouseenter', () => {
    sounds.playSound(assets.balloonInflate, true, 7);
});

assets.bask.addEventListener('mouseenter', () => {
    sounds.playSound(assets.basketballBounce, true);
});

assets.balloonSave.addEventListener('click', memory.balloonSave);
assets.bedBallSave.addEventListener('click', memory.bedBallSave);
assets.undoSave.addEventListener('click', memory.undoSave);
assets.undoMem.addEventListener('click', memory.undoMem);
assets.memBalloonsmack.addEventListener('click', memory.memBalloonsmack);
assets.memBedBall.addEventListener('click', memory.memBedBall);
assets.transport.addEventListener('click', memory.transport);
assets.transportReverse.addEventListener('click', memory.transportRev);
assets.resetVolFull.addEventListener('click', sounds.volumeFull);
assets.editable.addEventListener('change', inputs.editable);

assets.allBalloonTime.forEach(e => {
    let theArray;
    e.addEventListener('click', () => {
        if (e.id === 'viewBalloonTime') {
            theArray = global.times.balloonGame[assets.balloonDropdown.value];
        } else {
            theArray = global.balloonGame[assets.balloonDropdown.value];
        }
        if (theArray.length === 0) {
            assets.balloonAvg.textContent = 'No Scores Set';
            assets.balloonPb.textContent = 'No Scores Set';
            return;
        }
        assets.balloonPb.textContent = 'Balloonsmack PB: ' + (Math.max(...theArray)).toFixed(3);
        let val = Number(assets.balloonAvgAmount.value);
        if (isNaN(val) || val<1) {
            assets.balloonAvg.textContent = 'Error: Improper Average Amount';
            return;
        }
        val = Math.round(val);
        if (val > theArray.length) {
            val = theArray.length;
            assets.balloonAvgAmount.value = val;
        }
        assets.balloonAvgAmount.value = val;
        assets.balloonAvg.textContent = `Balloonsmack Average: ${bestAverage(theArray, val).toFixed(3)}`;
    });
});

assets.allBallTime.forEach(e => {
    let theArray;
    e.addEventListener('click', () => {
        if (e.id === 'viewBallTime') {
            theArray = global.times.bedBallGame[assets.bedBallDropdown.value];
        } else {
            theArray = global.bedBallGame[assets.bedBallDropdown.value]; 
        }
        if (theArray.length === 0) {
            assets.bedballPb.textContent = 'No Scores Set';
            assets.bedballAvg.textContent = 'No Scores Set';
            return;
        }
        assets.bedballPb.textContent = 'Bedball PB: ' + Math.max(...theArray).toFixed(3);
        let val = Number(assets.bedballAvgAmount.value);
        if (isNaN(val) || val < 1) {
            assets.bedballAvg.textContent = 'Error: Improper Average Amount';
            return;
        }
        val = Math.round(val);
        if (val > theArray.length) {
            val = theArray.length;
        }
        assets.bedballAvgAmount.value = val;
        assets.bedballAvg.textContent = `Bedball Average: ${bestAverage(theArray, val).toFixed(3)}`;
    })
});

assets.timeClear.addEventListener('click', () => {clearTimes('bedBallGame')});
assets.memClear.addEventListener('click', memory.memClear);
assets.balloonTime.addEventListener('click', () => {clearTimes('balloonGame')});

assets.balloonMem.addEventListener('click', memory.balloonMem);
assets.manageTime.addEventListener('click', inputs.manageTime);
assets.manageMemory.addEventListener('click', inputs.manageMemory);
assets.allTime.addEventListener('click', memory.allTime);
assets.allMem.addEventListener('click', memory.allMem);
assets.saveTime.addEventListener('click', memory.saveTime);
assets.saveMemory.addEventListener('click', memory.saveMemory);

assets.clearText.addEventListener('click', () => {assets.modBox.value = ''});
assets.exportFile.addEventListener('click', files.exportFile);
assets.modBox.addEventListener('input', inputs.modChanged)
assets.exportTime.addEventListener('click', files.exportTime);

assets.uploadMem.addEventListener('click', () => {assets.fileInput.click()});
assets.uploadTime.addEventListener('click', () => {assets.timeInput.click()});

assets.fileInput.addEventListener('change', files.fileInput, event);
assets.timeInput.addEventListener('change', files.timeInput, event);

assets.clearError.addEventListener('click', () => assets.insertError.textContent = '');

assets.viewVers.addEventListener('change', () => {
    updateText(assets.check.checked && global.lastClicked !== '' && global.lastClicked !== 'change');
});

assets.check.addEventListener('change', inputs.updCheck);

assets.boxFontSelect.addEventListener('change', settings.boxFontSelect);
assets.fontThicknessSelect.addEventListener('change', settings.fontThicknessSelect);
assets.fontLineSelect.addEventListener('change', settings.fontLineSelect);
assets.lineStyleSelect.addEventListener('change', settings.lineStyleSelect);
assets.selectUsername.addEventListener('focus', startupError.selectUsername);
assets.usernameSwitch.addEventListener('focus', settings.usernameSwitch);
assets.changetoUser.addEventListener('click', settings.changetoUser);
assets.deleteUser.addEventListener('click', settings.deleteUser);
assets.fontSizeInput.addEventListener('change', settings.fontSizeInput);
assets.assignError.addEventListener('click', () => {
    localStorage.setItem('noAsk', String(assignError.checked));
});

assets.fontSizeInput.value = Math.round(Number((window.getComputedStyle(assets.modBox).fontSize).slice(0, -2)) * 0.75);

assets.buttons.forEach(button => {
    button.disabled = false;
});

document.addEventListener('clearTimerError', () => {
    setTimeout(() => {
        if (global.currFading === 1) assets.timerErrorOutput.textContent = '';
        global.currFading--;
    }, 5000);
});