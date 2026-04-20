export const global = {
    enter: '',
    parse: '',
    nameofUser: '',
    curMode: 'json',
    lastClicked: '',
    modChanged: false,
    saveLog: [],
    memLog: [],
    elements: [],
    dangerElements: [],
    openSite: false,
    changeBright: false,
    memory: null,
    balloonGame: null,
    bedBallGame: null,
    times: {
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
    },
    blankDef: {
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
    },
    balloonHas: ['anyHitNoSurface', 'anyHitNoGround', 'handsOnlyNoGround', 'handsOnlyNoSurface', 'feetOnlyNoGround', 'anyHitStrikeFloor'],
    bedballHas: ['anyHitNoBed', 'handsOnlyNoBed', 'anyHitNoSurface']
}