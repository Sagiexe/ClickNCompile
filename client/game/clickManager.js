import { typeNextCharacter } from "./UIBuilder.js";

// Exported so external files can track & update these
export let lines = 0;
export let clickPower = 1;

// Simple reactive objects for shared state
export const linesObj = { value: lines };
export const clickPowerObj = { value: clickPower };

// Update internal values after external mutation
export function syncClickState() {
    lines = linesObj.value;
    clickPower = clickPowerObj.value;
}

export function addOne() {
    linesObj.value += clickPowerObj.value;
    for (let i = 0; i < clickPowerObj.value; i++) {
        typeNextCharacter();
    }
}
