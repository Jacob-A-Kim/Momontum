const timeScreen = document.querySelector(".time-now");

function getTime(){
  const now = new Date(Date.now());
  const hours = now.getHours();
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  const nowString = `${hours < 10 ? `0${hours}` : hours} : ${mins < 10 ? `0${mins}` : mins} : ${secs < 10 ? `0${secs}` : secs}`;
  return nowString
}
function init() {
    const now = getTime();
    timeScreen.innerText = now;
  }
  setInterval(init, 1000);
  