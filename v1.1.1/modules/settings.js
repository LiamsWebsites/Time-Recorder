import {assets, global, sounds} from './index.js';

function handleKey(event) {
    if (event.code === 'KeyR') {
        assets.brightnessOverlay.style.opacity = '0';
        assets.brightnessOverlay.style.pointerEvents = 'none';
        assets.brightness.value = 100;
        assets.brightness.dispatchEvent(new Event('input'));
        assets.keyReminder.style.visibility = 'hidden';
        document.removeEventListener('keydown', handleKey);
    }
}

export function muteAll() {
    assets.volume.forEach(e => {
        if (e.id === 'brightness') return;
        e.value = 0;
        e.dispatchEvent(new Event('input'));
    });
}

export function controlBright() {
    assets.brightnessOverlay.style.opacity = 1 - assets.brightness.value / 100;
    if (assets.brightnessOverlay.style.opacity === '1') {
        assets.brightnessOverlay.style.pointerEvents = 'auto';
        assets.keyReminder.style.visibility = 'visible';
        document.addEventListener('keydown', handleKey);
        global.changeBright = true;
    }
    if (global.changeBright && assets.brightnessOverlay.style.opacity !== '1') {
        assets.keyReminder.style.visibility = 'hidden';
        assets.brightnessOverlay.style.pointerEvents = 'none';
        document.removeEventListener('keydown', handleKey);
    }
}

export function initSettings() {
    assets.settings.style.transform = "rotate(-90deg)";
    assets.buttons.forEach(button => {
        if (button.className !== 'settingsButton' && button.id !== 'resetVolFull' && button.className !== 'otherSettingsButton') {
            button.disabled = true;
        }
    });
    assets.settingsOverlay.style.cursor = 'not-allowed';
    assets.settingsOverlay.style.display = 'flex';
    assets.settingsUi.style.visibility = 'visible';
    assets.Close.addEventListener('click', () => {
        assets.settings.style.transform = "rotate(0deg)";
        assets.settingsOverlay.style.cursor = 'default';
        assets.settingsOverlay.style.display = 'none';
        assets.settingsUi.style.visibility = 'hidden';
        assets.buttons.forEach(button => {
            button.disabled = false;
        });
        assets.deleteDisplay.textContent = 'Delete This User';
    });
    assets.assignError.checked = localStorage.getItem('noAsk') === 'true';
}

export function boxFontSelect() {
    assets.modBox.style.fontFamily = assets.boxFontSelect.value;
    assets.fontPreview.style.fontFamily = assets.boxFontSelect.value;
}

export function fontThicknessSelect() {
    assets.modBox.style.fontWeight = assets.fontThicknessSelect.value;
    assets.fontPreview.style.fontWeight = assets.fontThicknessSelect.value;
}

export function fontLineSelect() {
    assets.modBox.style.textDecorationLine = assets.fontLineSelect.value;
    assets.fontPreview.style.textDecorationLine = assets.fontLineSelect.value;
}

export function lineStyleSelect() {
    assets.modBox.style.textDecorationStyle = assets.lineStyleSelect.value;
    assets.fontPreview.style.textDecorationStyle = assets.lineStyleSelect.value;
}

export function usernameSwitch() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('myApp_')).map(key => key.slice(6));
    let exist = document.getElementById('diffUsername');
    let changed = false;
    if (exist) {
        exist.remove();
        changed = true;
    }
    if (keys.length < 1) {
        sounds.playSound(assets.fatalError);
        alert('Corrupted localStorage');
        return;
    }
    if (changed) {
        for (let i=0; i<keys.length; i++) {
            const option = document.createElement('option');
            global.dangerElements.push(option);
            global.dangerElements[i].value = keys[i];
            global.dangerElements[i].textContent = keys[i];
            assets.usernameSwitch.append(option);
        }
    }
}

export function changetoUser() {
    if (assets.usernameSwitch.value !== global.nameofUser) {
        global.nameofUser = assets.usernameSwitch.value;
        const parsed = JSON.parse(localStorage.getItem('myApp_'+global.nameofUser));
        global.balloonGame = parsed.balloonGame;
        global.bedBallGame = parsed.bedBallGame;
        global.memLog = [];
        if (global.lastClicked === 'memory' && assets.check.checked) {
            assets.manageMemory.disabled = false;
            assets.manageMemory.click();
            assets.manageMemory.disabled = true;
        }
    } else {
        assets.deleteDisplay.textContent = 'You are Currently Using this Username';
        sounds.playSound(assets.errorSound);
    }
}

export function deleteUser() {
    if (assets.usernameSwitch.value === "") {
        sounds.playSound(assets.warning);
        assets.deleteDisplay.textContent = 'No User Selected';
        return;
    }
    if (assets.usernameSwitch.value !== global.nameofUser) {
        console.log(assets.usernameSwitch.value);
        localStorage.removeItem('myApp_'+assets.usernameSwitch.value);
        const valueToRemove = assets.usernameSwitch.value;
        const option = Array.from(assets.usernameSwitch.options).find(opt => opt.value === valueToRemove);
        if (option) option.remove();
    } else {
        sounds.playSound(assets.errorSound);
        assets.deleteDisplay.textContent = 'Cannot Delete Username that is Currently Being Used';
        return;
    }
}

export function fontSizeInput() {
    assets.modBox.style.fontSize = `${assets.fontSizeInput.value}pt`;
    assets.fontPreview.style.fontSize = `${assets.fontSizeInput.value}pt`;
}