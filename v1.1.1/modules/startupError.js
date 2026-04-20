import { assets, global } from "./index.js";

export function init() {
    const audio = new Audio();
    audio.play().then(() => audio.pause());
    if (assets.username.value === '' && assets.selectUsername.value === '') {
        playSound(assets.warning);
        assets.username.placeholder = 'Please Enter a Username';
        return;
    }
    if (assets.username.value === '') {
        global.nameofUser = assets.selectUsername.value;
    } else {
        global.nameofUser = assets.username.value;
    }
    for (let child of assets.overlay.children) {
        child.style.display = 'none';
    }
    assets.overlay.style.backgroundColor = "rgba(0,0,0,0)";
    global.openSite = true;
    setTimeout(() => {
        assets.overlay.style.display = 'none';
    }, 320);
}

export function errorConf() {
    localStorage.setItem('noAsk', assets.errorCheck.checked);
    assets.errorDiv.style.display = 'none';
}

export function selectUsername() {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('myApp_')).map(key => key.slice(6));
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
            assets.selectUsername.append(appe);
        }
    } else {
        if (global.elements.length === 0) {
            for (let i=0; i<keys.length; i++) {
                const option = document.createElement('option');
                global.elements.push(option);
                global.elements[i].value = keys[i];
                global.elements[i].textContent = keys[i];
                assets.selectUsername.append(option);
            }
        }
    }
}