const BG = document.querySelector(".body");


function handleBG(){
        BG.style.backgroundColor = "black";
}

function init(){
    BG.addEventListener("click",handleBG);
}
init();