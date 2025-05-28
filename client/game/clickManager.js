var i = 0;
var clickPower = 1;

function addOne() {
    i += clickPower;
    document.getElementById("counter").innerHTML = i;
}

document.addEventListener('keyup', function(event) {
    addOne(); 
});


function addClickPower() {
    clickPower++;
    document.getElementById('lpc').innerText = clickPower;
}
