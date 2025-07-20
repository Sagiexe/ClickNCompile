import {
    upgrades,
    getLinesPerSecond,
    numberOfLPCOwned,
    numberOfFriends,    
    upgradesState,
} from "./upgrades.js";

import {
    addOne,
    linesObj,
    clickPowerObj,
    syncClickState
} from "./clickManager.js";

import { applySyntaxHighlighting } from "./UIBuilder.js";

// Bind upgrade buttons
upgrades.forEach(upgrade => {
    const btn = document.getElementById(upgrade.id);
    if (btn) {
        btn.addEventListener("click", () => {
            if (upgrade.canBuy(linesObj.value)) {
                upgrade.onBuy(linesObj, clickPowerObj);
                syncClickState();
                updateUI();
                if (upgrade.id === "buySyntax") {
                    applySyntaxHighlighting?.(); // Optional trigger
                }
            }
        });
    }
});

function updateUI() {
    document.getElementById("counter").innerText = "lines: " + linesObj.value;
    document.getElementById("addLines").innerText = "+" + clickPowerObj.value + " lines";

    upgrades.forEach(upgrade => {
        const btn = document.getElementById(upgrade.id);
        if (!btn) return;

        if (upgrade.id === "buySyntax" && upgradesState.syntaxHighlight) {
            btn.style.display = "none";
        } else {
            btn.style.display = "inline-block";
            btn.innerText = upgrade.label();
        }
    });

    document.getElementById("lps").innerText = "Lines Per Second: " + getLinesPerSecond();
}

document.getElementById("addLines").addEventListener("click", () => {
    addOne();
    syncClickState();
    updateUI();
});
document.addEventListener("keyup", () => {
    addOne();
    syncClickState();
    updateUI();
});

setInterval(() => {
    linesObj.value += getLinesPerSecond();
    syncClickState();
    updateUI();
}, 1000);

if (upgradesState.id === "buySyntax") {
    applySyntaxHighlighting();
}
