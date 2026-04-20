import {assets, global} from './index.js';

export function playSound(sound, cond, speed) { // if cond === true then no overlapping sounds
    let volume=1;
    let filename = sound.src.split('/').pop();
    if (filename === 'balloonInflate.mp3' || filename === 'basketballBounce.mp3') {
        volume = assets.logoVolume.value/100;
    }
    if (filename === 'error.mp3' || filename === 'startup.mp3' || filename === 'fatalError.mp3' || filename === 'warning.mp3') {
        volume = assets.systemVolume.value/100;
    }
    if (filename === 'mouseClick.mp3' || filename === 'mouseClick2.mp3' || filename === 'mouseClick3.mp3' || filename === 'mouseClick4.mp3') {
        volume = assets.buttonVolume.value/100;
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

export function volumeFull() {
    const event = new Event('input');
    assets.volume.forEach(e => {
        if (e.id === 'brightness') return;
        e.value = 100;
        e.dispatchEvent(event);
    });
}