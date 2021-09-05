const clockTitle = document.querySelector("H1.white-text");
const container = document.querySelector(".container");
const header =document.querySelector("#header");
const back_img =["bsbild_fullhd_01.jpg","back_01.jpg" ,"back_02.jpg","back_03.jpg"];


function backImgChg(){
    const back_imgChg = back_img[Math.floor(Math.random() * back_img.length)];
    console.log(`back_imgChg = ${back_imgChg}`);
    header.style= `background: url(src/img/${back_imgChg}) no-repeat center center;`;
}

backImgChg();

//현재시각을 나타내는 함수
function getClock() {
  const date = new Date();

  let yyyy = date.getFullYear(); //2021//일
  let getMonth = date.getMonth() +1 ; //
  let getDay = date.getDate(); //
  let getHh = date.getHours();
  let getMm = date.getMinutes();
  let getSs = date.getSeconds();

  //현재시각 자리수
  let month = String(getMonth).padStart(2, "0");
  let day = String(getDay).padStart(2, "0");
  let hh = String(getHh).padStart(2, "0");
  let mm = String(getMm).padStart(2, "0");
  let ss = String(getSs).padStart(2, "0");
  
  clockTitle.innerHTML = `${yyyy}.${month}.${day} ${hh}:${mm}:${ss}`;

        if(hh <= "12" ){
            console.log("12보다 크다.");
            //오후
            container.style= `background:none`;
        }else{
            //오전
            console.log("12보다 작다.");

        }
}

//setTimeout(getClock,date.getSeconds);//1초 기다렸다가 한번만 실행.
getClock();
setInterval(getClock, 1000); //1초마다 실행


const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector(".main-screen__name");
const greeting2 = document.querySelector("H2.white-text");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

//로그인
function onLoginSubmit(event) {
    console.log('onLoginSubmit');
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    console.log('paintGreetings');
    greeting2.classList.remove(HIDDEN_CLASSNAME);
    loginForm.style =`display:none;`
    greeting2.innerText = `Hello, ${username}`;
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}




//날씨,위치정보
const metricStatNumber = document.querySelector(".main-header__metric-stat-number");
const metricStatName = document.querySelector(".main-header__metric-name");
const API_KEY = "6c459cdbfaca1b372cfb9237d1f5cbb0";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.dir(position);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            metricStatNumber.innerText = `${Math.round(data.main.temp)}`;
            metricStatName.innerText = data.name;
        });
}

function onGeoError() {
    alert("Can't find you. No weather for you");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);