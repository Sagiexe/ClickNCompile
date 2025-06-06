//TODO:FIX LAGGY BUTTONS UPDATE IT WTF IS THE DELAY EVEN COMING FROM
import { typeNextCharacter, deleteCharacters } from "./UIBuilder.js";
var lines = 0;
var clickPower = 1;

const LPC_BASE_PRICE = 10;
var numberOfLPCOwned = 0;

const FRIEND_BASE_LPS = 1;
const FRIEND_BASE_PRICE = 50;
var numberOfFriends = 0;

document.getElementById("addLines").addEventListener("click", addOne);
document.getElementById("buyLpc").addEventListener("click", addClickPower);
document.getElementById("buyFriend").addEventListener("click", addFriend);

function updateUI() {
    document.getElementById("counter").innerText = "lines: " + lines;
    
    document.getElementById("addLines").innerText = "+" + clickPower + " lines";
    
    let newLPCPrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    document.getElementById("buyLpc").innerText = "Buy more lines per click (Cost: " + newLPCPrice + ")";

    let newFriendPrice = calculateBuildingPrice(FRIEND_BASE_PRICE, numberOfFriends);
    document.getElementById("buyFriend").innerText = "Add friend to project (+1 lpc) (Cost: " + newFriendPrice +  ")";

    document.getElementById("lps").innerText = "Lines Per Second: " + getLinesPerSecond();

}

function addOne() {
    lines += clickPower; 
    for (let i = 0; i < clickPower; i++) {
        typeNextCharacter();
      }
    updateUI();

}
document.addEventListener('keyup', function(event) {
    addOne(); 
});

function addClickPower() {

    let purchasePrice = calculateBuildingPrice(LPC_BASE_PRICE, numberOfLPCOwned);
    
    if(purchasePrice <= lines){
        clickPower++;
        lines -= purchasePrice;
        numberOfLPCOwned++;

        deleteCharacters(purchasePrice); 
    }
}
function addFriend(){
    let purchasePrice = calculateBuildingPrice(FRIEND_BASE_PRICE, numberOfFriends);
    
    if(purchasePrice <= lines){
        lines -= purchasePrice;
        numberOfFriends++;

        deleteCharacters(purchasePrice); 
    }
}

function calculateBuildingPrice(basePrice, numberOfBuildingsOwned){
    return Math.ceil(basePrice * Math.pow(1.15, numberOfBuildingsOwned));
}


function getLinesPerSecond() {
    return numberOfFriends * FRIEND_BASE_LPS;
}

setInterval(() => {
    lines += getLinesPerSecond();
    updateUI();
},1000);




