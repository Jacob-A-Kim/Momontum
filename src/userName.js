const form = document.querySelector(".js-userName-form"),
input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");
const USERNAME = 'username';
const appearCN = 'appear',
disappearCN = 'disappear';

function saveUserNameLS(text) {
    localStorage.setItem(USERNAME, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const userInput = input.value;
    saveUserNameLS(userInput);
    paintGreeting(userInput);
}

function askName(){
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.replace(appearCN, disappearCN);
    greetings.classList.replace(disappearCN, appearCN);
    greetings.innerText = `Hello ${text}`;
}

function loadUserNameLS() {
    const loadedUsername = localStorage.getItem(USERNAME);
    if(loadedUsername !== null){
        paintGreeting(loadedUsername);
    }else{
        askName();
    }
}

function init(){
    loadUserNameLS();
}
init();