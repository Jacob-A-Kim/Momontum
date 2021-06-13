const body = document.querySelector("body");

function paintImage(imgNum){
    const img = new Image();
    img.src = `./imgs/bg${imgNum}.jpeg`;
    img.classList.add("bgImg");
    body.appendChild(img);
}

function genRandNum(i){
    return Math.floor(Math.random()*(i));
}

function init(){
    const numOfPic = 5;
    const randNum = genRandNum(numOfPic);
    paintImage(randNum);
}
init();