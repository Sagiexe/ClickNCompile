import { deleteCharacters } from "./UIBuilder.js";

export const LPC_BASE_PRICE = 10; //LPC - Lines Per Click
export const FRIEND_BASE_PRICE = 50;
export const FRIEND_BASE_LPS = 1; //LPS - Lines Per Second

export let numberOfLPCOwned = 0; //LPC - Lines Per Click
export let numberOfFriends = 0;

//A list of all the upgrades the player has
export const upgradesState = {
    syntaxHighlight: false,
};


export const upgrades = [
    {
        id: "buyLpc",
        label: () => `Buy more lines per click (Cost: ${calculateBuildingPrice(10, numberOfLPCOwned)})`,
        cost: () => calculateBuildingPrice(10, numberOfLPCOwned),
        canBuy: (lines) => lines >= calculateBuildingPrice(10, numberOfLPCOwned),
        onBuy: (linesObj, clickPowerObj) => {
            clickPowerObj.value++;
            linesObj.value -= calculateBuildingPrice(10, numberOfLPCOwned);
            numberOfLPCOwned++;
            deleteCharacters(calculateBuildingPrice(10, numberOfLPCOwned - 1));
        },
    },
    {
        id: "buyFriend",
        label: () => `Add friend to project (+1 lps) (Cost: ${calculateBuildingPrice(50, numberOfFriends)})`,
        cost: () => calculateBuildingPrice(50, numberOfFriends),
        canBuy: (lines) => lines >= calculateBuildingPrice(50, numberOfFriends),
        onBuy: (linesObj) => {
            linesObj.value -= calculateBuildingPrice(50, numberOfFriends);
            numberOfFriends++;
            deleteCharacters(calculateBuildingPrice(50, numberOfFriends - 1));
        },
    },
    {
        id: "buySyntax",
        label: () => `Buy Syntax Highlighting (Cost: 200)`,
        cost: () => 200,
        canBuy: (lines) => lines >= 200 && !upgradesState.syntaxHighlight,
        onBuy: (linesObj) => {
            linesObj.value -= 200;
            upgradesState.syntaxHighlight = true;
        },
    },
    //Add more upgrades here 
];

export function calculateBuildingPrice(basePrice, numberOwned) {
    return Math.ceil(basePrice * Math.pow(1.15, numberOwned));
}

export function getLinesPerSecond() {
    return numberOfFriends * 1;
}

