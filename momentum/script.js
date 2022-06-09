import playList from './assets/js/playList.js';

if (localStorage.getItem('Language') == null) {localStorage.setItem('Language', 'English');}

let lang = localStorage.getItem('Language');

//preloader
window.onload = function () {
  document.body.classList.add('loaded-hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded-hiding');
  }, 500);
}

// functions
function getHours() {
  const date = new Date();
  return date.getHours();
};

function timeOfDay() {
  const timesEn = ['night', 'morning', 'afternoon', 'evening'];
  const timesRu = ['ночи', 'утро', 'день', 'вечер'];
  switch(lang) {
    case 'English':
      return timesEn[Math.floor(getHours()/6)];
    case 'Russian':
      return timesRu[Math.floor(getHours()/6)];
  }
};

function getRandomNum() {
  return Math.ceil(Math.random() * 20);
};

// time
function showTime() {
  const time = document.querySelector('.time');
  const dateNow = new Date();
  const options = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false};
  const currentTime = dateNow.toLocaleTimeString('en-US', options);
  time.textContent = currentTime;
  lang = localStorage.getItem('Language');
  if (currentTime == '00:00:00' || currentTime == '06:00:00' || currentTime == '12:00:00' || currentTime == '18:00:00') {setBackground(getRandomNum());}
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
};

showTime();

// date
function showDate() {
  const date = document.querySelector('.date');
  const dateNow = new Date();
  const options = {weekday: 'long', day: 'numeric', month: 'long'};
  switch(lang) {
    case 'English':
      return date.textContent = dateNow.toLocaleDateString('en-US', options);
    case 'Russian':
      date.textContent = dateNow.toLocaleDateString('ru', options);
      date.style = 'text-transform:capitalize';
      break
  }
};

// greeting
function showGreeting() {
  const greeting = document.querySelector('.greeting');
  switch(lang) {
    case 'English':
      return greeting.textContent =`Good ${timeOfDay(lang)},`;
    case 'Russian':
      switch(timeOfDay()) {
        case 'ночи':
          return greeting.textContent =`Доброй ${timeOfDay(lang)},`;
        case 'утро':
          return greeting.textContent =`Доброе ${timeOfDay(lang)},`;
        default:
          return greeting.textContent =`Добрый ${timeOfDay(lang)},`;
      }
  }
};

//name
const name = document.querySelector('.name');

name.onclick = function(e) {
  let setName = name.value;
  name.value = '';
  name.onblur = function() {
  if (name.value.trim() == '') name.value = setName;
  setLocalStorage()
}}

function getLocalStorage() {
  if (localStorage.getItem('name')) name.value = localStorage.getItem('name');
  switch(lang) {
    case 'English':
      if (name.value.trim() == '' || name.value == "[Введите имя]") name.value = "[Enter name]";
      break;
    case 'Russian':
      if (name.value.trim() == '' || name.value == "[Enter name]") name.value = "[Введите имя]";
      break
  }
};

function setLocalStorage() {
  localStorage.setItem('name', name.value);
};

getLocalStorage();

// backgroud
let randomNum = getRandomNum();
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

function setBackground() {
  slidePrev.disabled = true;
  slideNext.disabled = true;
  const img = new Image();
  randomNum < 10 ? randomNum = '0' + randomNum : randomNum;
  img.src = `./assets/img/${timeOfDay(lang = 'English')}/${randomNum}.webp`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
    setTimeout(disableBtn, 1000);
  };
};

function disableBtn() {
  slidePrev.disabled = false;
  slideNext.disabled = false;
}

function getSlideNext() {
  randomNum == 20 ? randomNum = 1 : randomNum++;
  setBackground(randomNum);
};

function getSlidePrev() {
  randomNum == 1 ? randomNum = 20 : randomNum--;
  setBackground(randomNum);
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

setBackground(randomNum);

// weather
const weatherIcon = document.querySelector('.weather-icon');
const weatherError = document.querySelector('.weather-error');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
let langWeather = 'en';

function currentCity() {
  switch(lang) {
    case 'English':
      if (localStorage.getItem('currentCity') == null || localStorage.getItem('currentCity') == 'Минск') localStorage.setItem('currentCity', 'Minsk');
      city.value = localStorage.getItem("currentCity");
      langWeather = 'en';
      break
    case 'Russian':
      if (localStorage.getItem('currentCity') == null || localStorage.getItem('currentCity') == 'Minsk') localStorage.setItem('currentCity', 'Минск');
      city.value = localStorage.getItem("currentCity");
      langWeather = 'ru';
      break
  }
}

currentCity()

city.onclick = function(e) {
  let setCity = city.value;
  city.value = '';
  city.onblur = function() {if (city.value.trim() == '') city.value = setCity;}
}

city.addEventListener('change', () => {
	localStorage.setItem("currentCity", city.value);
	getWeather();
})

function blockWeather() {
  weatherDescription.textContent = '';
	wind.textContent = '';
	humidity.textContent = '';
  weatherIcon.style.display = 'none';
	temperature.style.display = 'none';
}

async function getWeather() {
  lang = localStorage.getItem('Language');

  currentCity();

	let userCity = localStorage.currentCity;

  if (city.value.trim() == '') {
    blockWeather()
    city.value = "[Enter city]";
    weatherError.textContent = 'Please enter a city.';
    return
  };

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&lang=${langWeather}&appid=73afba337f39ea17b4c0be7fb0b43729&units=metric`;
  const res = await fetch(url);
	const data = await res.json();
  
	if (data.cod == "404") {
    blockWeather()
		weatherError.textContent = 'Error! City not found.';
	} else {
		weatherError.textContent = '';
		temperature.style.display = 'block';
		weatherIcon.style.display = 'block';
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent = `${Math.round(data.main.temp)}°C`;
		weatherDescription.textContent = data.weather[0].description;
    switch(lang) {
      case 'English':
        wind.textContent = `Wind speed ${Math.round(data.wind.speed)} m/s`;
		    humidity.textContent = `Humidity ${Math.round(data.main.humidity)} %`;
        break
      case 'Russian':
        wind.textContent = `Скорость ветра ${Math.round(data.wind.speed)} m/s`;
		    humidity.textContent = `Влажность ${Math.round(data.main.humidity)} %`;
        break
    }
	}
}

getWeather();

// quote of the day
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {  
  changeQuote.disabled = true;
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  changeQuote.classList.toggle('change-quote-active');
  const quotes = './assets/json/data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 
  const randomNumQotes = Math.floor(Math.random() * data.length);
  switch(lang) {
    case 'English':
      quote.textContent = data[randomNumQotes]["textEn"];
      author.textContent = data[randomNumQotes]["authorEn"];
      break
    case 'Russian':
      quote.textContent = data[randomNumQotes]["textRu"];
      author.textContent = data[randomNumQotes]["authorRu"];
      break
  }
  setTimeout(disableQuoteBtn, 500);
}

function disableQuoteBtn() {
changeQuote.disabled = false;
}

const qote = document.querySelector('.change-quote');
qote.addEventListener('click',getQuotes);

getQuotes();

// audio player
const playPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playListOl = document.querySelector('.play-list');
const nameSong = document.querySelector('.name-song');
  

let elNumber = 0;

playList.forEach(el => {
  const li = document.createElement('li');
  li.className = `play-item item-${elNumber}`;
  li.textContent = playList[elNumber].title;
  playListOl.append(li);
  const liDiv = document.createElement('button');
  liDiv.className = `play-btn play-btn-${elNumber}`;
  liDiv.id = `${elNumber}`;
  li.prepend(liDiv);
  elNumber++
})  

let isPlay = false;
let number = 0;
const audio = new Audio();
let item = document.querySelector(`.item-${number}`);
item.classList.toggle('item-target');

function itemTarget() {
  let item = document.querySelector(`.item-${number}`);
  item.classList.toggle('item-target');
}

function itemActive() {
  let item = document.querySelector(`.item-${number}`);
  item.classList.toggle('active');
}

function playBtnTarget() {
  let btnTarget = document.getElementById(`${number}`);
  btnTarget.classList.toggle('play-btn-active');
}

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  document.querySelector(".current").textContent = getTimeCodeFromNum(audio.currentTime);
  if (audio.ended) playAudioNext();
}, 500);

audio.addEventListener(
  "loadeddata",
  () => {
    document.querySelector(".length").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
  },
  false
);

function audioSrc() {
  audio.src = playList[number].src;
}

nameSong.textContent = playList[number].title;

audioSrc();

function playAudio() {
  if(!isPlay) {
    audio.play();
    itemTarget();
    isPlay = true;
    play.classList.toggle('pause');
    itemActive();
    playBtnTarget();
  } else {
    itemTarget();
    audio.pause();
    play.classList.toggle('pause');
    isPlay = false;
    itemActive();
    playBtnTarget();
  }
  nameSong.textContent = playList[number].title;
}

function playAudioNext() {
  if (isPlay) {
    itemActive();
    playBtnTarget();
    number == 4 ? number = 0 : number++;
    audio.src = playList[number].src;
    audio.play();
    itemActive();
    playBtnTarget();
  } else {
    itemTarget();
    number == 4 ? number = 0 : number++;
    itemTarget();
    audioSrc()
  }
  nameSong.textContent = playList[number].title;
};

function playAudioPrev() {
  if (isPlay) {
    itemActive();
    playBtnTarget();
    number == 0 ? number = 4 : number--;
    audio.src = playList[number].src;
    audio.play();
    itemActive();
    playBtnTarget();
  } else {
    itemTarget();
    number == 0 ? number = 4 : number--;
    itemTarget();
    audioSrc()
  }
  nameSong.textContent = playList[number].title;
};

Array.from(document.querySelectorAll('.play-btn'), function(el){
  el.onclick = function(){
    if(!isPlay) {
      if (number == this.id) {
        itemTarget();
        playAudio();
        itemTarget();
      } else {
        itemTarget();
        number = this.id;
        audioSrc();
        playAudio();
        itemTarget();
      }
    } else {
      if (number == this.id) {
        itemTarget();
        audio.pause();
        isPlay = false;
        itemActive();
        playBtnTarget();
        play.classList.toggle('pause');
      } else {
        itemActive();
        audio.pause();
        playBtnTarget()
        isPlay = false;
        number = this.id;
        play.classList.toggle('pause');
        audioSrc();
        playAudio();
        itemTarget();
      }
    }
  }
})

const timeline = document.querySelector(".timeline");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

document.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = document.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

const volumeSlider = document.querySelector(".volume-slider");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
}, false)

play.addEventListener('click', playAudio);
playNext.addEventListener('click', playAudioNext);
playPrev.addEventListener('click', playAudioPrev);

//settings
const settings = document.querySelector(".settings-btn");
const setCont = document.querySelector('.settings-container');
const language = setCont.querySelector('.language');
const apps = setCont.querySelector('.apps');

let setTr = true;

function currentSet() {
  switch(lang) {
    case 'English':
      language.textContent = 'Language';
      apps.textContent = 'Apps';
      break
    case 'Russian':
      language.textContent = 'Язык';
      apps.textContent = 'Приложения';
      break
  }
}

currentSet();

function choseLang() {
  const choseLang = document.createElement('div');
  choseLang.classList = 'chose-lang';
  if (lang == 'Russian') choseLang.style = 'left: 172px';
  setCont.append(choseLang)
  const ru = document.createElement('div');
  ru.classList = 'ru-lang';
  ru.textContent = 'ru';
  choseLang.append(ru);
  const en = document.createElement('div');
  en.classList = 'en-lang';
  en.textContent = 'en';
  choseLang.append(en);

  ru.addEventListener('click', function() {
    localStorage.Language = 'Russian';
    currentCity();
    getWeather();
    getQuotes();
    currentTodo();
    currentSet();
    getLocalStorage();
    showDate();
    showGreeting();
    choseLang.style = 'left: 172px';
  });
  en.addEventListener('click', function() {
    localStorage.Language = 'English';
    currentCity();
    getWeather();
    getQuotes();
    currentTodo();
    currentSet();
    getLocalStorage();
    showDate();
    showGreeting();
    choseLang.style = 'left: 144px;';
  });
}

function closeLang() {
  const closeLang = setCont.querySelector('.chose-lang');
  closeLang.remove();
}

language.addEventListener('click', function() {
  if (!setApps) {
    closeApps();
    setApps = true;
  } 
  if (setTr) {
    choseLang();
    setTr = false;
  } else {
    closeLang();
    setTr = true;
  }
}
);

function hideSettings() {
  setCont.classList.toggle('settings-active');
}

let setApps = true;

function choseApps() {
  const choseApps = document.createElement('div');
  choseApps.classList = 'chose-apps';
  setCont.append(choseApps)
  const player = document.createElement('div');
  player.classList = 'set-btn';
  const weather = document.createElement('div');
  weather.classList = 'set-btn';
  const quote = document.createElement('div');
  quote.classList = 'set-btn';
  const todo = document.createElement('div');
  todo.classList = 'set-btn';
  const time = document.createElement('div');
  time.classList = 'set-btn';
  const date = document.createElement('div');
  date.classList = 'set-btn';
  const greeting = document.createElement('div');
  greeting.classList = 'set-btn';
  
  switch(lang) {
    case 'English':
      player.textContent = 'Player';
      weather.textContent = 'Weather';
      quote.textContent = 'Quote';
      todo.textContent = 'Todo';
      time.textContent = 'Time';
      date.textContent = 'Date';
      greeting.textContent = 'Greeting';
      break
    case 'Russian':
      player.textContent = 'Плеер';
      weather.textContent = 'Погода';
      quote.textContent = 'Цитата';
      todo.textContent = 'Дела';
      time.textContent = 'Время';
      date.textContent = 'Дата';
      greeting.textContent = 'Приветствие';
      choseApps.style = 'left: 172px';
      break
  }

  choseApps.append(player);
  choseApps.append(weather);
  choseApps.append(quote);
  choseApps.append(todo);
  choseApps.append(time);
  choseApps.append(date);
  choseApps.append(greeting);

  player.addEventListener('click', function hidePlayer() {
    document.querySelector('.player').classList.toggle('hide');
    player.classList.toggle('text-th');
    if (localStorage.getItem('player') == 'true') {
      localStorage.setItem('player', false);
    } else {
      localStorage.player = true;
    }
  });
  weather.addEventListener('click', function() {
    document.querySelector('.weather').classList.toggle('hide');
    weather.classList.toggle('text-th');
    if (localStorage.getItem('weather') == 'true') {
      localStorage.setItem('weather', false);
    } else {
      localStorage.weather = true;
    }
  });
  quote.addEventListener('click', function() {
    document.querySelector('.quote').classList.toggle('hide');
    document.querySelector('.change-quote').classList.toggle('hide');
    document.querySelector('.author').classList.toggle('hide');
    quote.classList.toggle('text-th');
    if (localStorage.getItem('quote') == 'true') {
      localStorage.setItem('quote', false);
    } else {
      localStorage.quote = true;
    }
  });
  todo.addEventListener('click', function() {
    document.querySelector('.todo-container').classList.toggle('hide');
    document.querySelector('.todo').classList.toggle('hide');
    todo.classList.toggle('text-th');
    if (localStorage.getItem('todo') == 'true') {
      localStorage.setItem('todo', false);
    } else {
      localStorage.todo = true;
    }
  });
  time.addEventListener('click', function() {
    document.querySelector('.time').classList.toggle('hide');
    time.classList.toggle('text-th');
    if (localStorage.getItem('time') == 'true') {
      localStorage.setItem('time', false);
    } else {
      localStorage.time = true;
    }
  });
  date.addEventListener('click', function() {
    document.querySelector('.date').classList.toggle('hide');
    date.classList.toggle('text-th');
    if (localStorage.getItem('date') == 'true') {
      localStorage.setItem('date', false);
    } else {
      localStorage.date = true;
    }
  });
  greeting.addEventListener('click', function() {
    document.querySelector('.greeting-container').classList.toggle('hide');
    greeting.classList.toggle('text-th');
    if (localStorage.getItem('greeting') == 'true') {
      localStorage.setItem('greeting', false);
    } else {
      localStorage.greeting = true;
    }
  });

  if (localStorage.getItem('player') == 'true') {
    player.classList.toggle('text-th');
  }
  if (localStorage.getItem('weather') == 'true') {
    weather.classList.toggle('text-th');
  }
  if (localStorage.getItem('quote') == 'true') {
    quote.classList.toggle('text-th');
  }
  if (localStorage.getItem('todo') == 'true') {
    todo.classList.toggle('text-th');
  }
  if (localStorage.getItem('time') == 'true') {
    time.classList.toggle('text-th');
  }
  if (localStorage.getItem('date') == 'true') {
    date.classList.toggle('text-th');
  }
  if (localStorage.getItem('greeting') == 'true') {
    greeting.classList.toggle('text-th');
  }
}

function closeApps() {
  const closeApps = setCont.querySelector('.chose-apps');
  closeApps.remove();
}

apps.addEventListener('click', function() {
  if (!setTr) {
    closeLang();
    setTr = true;
  } 
  if (setApps) {
    choseApps();
    setApps = false;
  } else {
    closeApps();
    setApps = true;
  }
  
}
);

function settingsActive() {
  settings.classList.toggle('settings-btn-active');
  hideSettings();
}

settings.addEventListener('click', function() {
  if (setApps !== true) {
    closeApps();
    setApps = true;
  } 

  if (setTr !== true) {
    closeLang();
    setTr = true;
  } 
  settingsActive();
});

function hideElements() {
  if (localStorage.getItem('player') == 'true') {
    document.querySelector('.player').classList.toggle('hide');
  }
  if (localStorage.getItem('weather') == 'true') {
    document.querySelector('.weather').classList.toggle('hide');
  }
  if (localStorage.getItem('quote') == 'true') {
    document.querySelector('.quote').classList.toggle('hide');
    document.querySelector('.author').classList.toggle('hide');
    document.querySelector('.change-quote').classList.toggle('hide');
  }
  if (localStorage.getItem('todo') == 'true') {
    document.querySelector('.todo').classList.toggle('hide');
    document.querySelector('.todo-container').classList.toggle('hide');
  }
  if (localStorage.getItem('time') == 'true') {
    document.querySelector('.time').classList.toggle('hide');
  }
  if (localStorage.getItem('date') == 'true') {
    document.querySelector('.date').classList.toggle('hide');
  }
  if (localStorage.getItem('greeting') == 'true') {
    document.querySelector('.greeting-container').classList.toggle('hide');
  }
}

hideElements();

//todo
const todo = document.querySelector(".todo");
const newTodo = document.querySelector(".new-todo");
const todoContainer = document.querySelector(".todo-container");
const todoNothing = document.createElement('div');

function currentTodo() {
  switch(lang) {
    case 'English':
      todo.textContent = 'Todo';
      newTodo.textContent = 'New Todo';
      todoNothing.textContent = 'Nothing Todo!';
      break
    case 'Russian':
      todo.textContent = 'Дела';
      newTodo.textContent = 'Новое Дело';
      todoNothing.textContent = 'Нету дел!'
      break
  }
}

currentTodo();

todoNothing.className = `todo-nothing`;
todoContainer.prepend(todoNothing);

function todoActive() {
  todo.classList.toggle('todo-active');
  todoContainer.classList.toggle('todo-cont-active');
}

let todoNumber = 0;

function setNewTodo() {
  if(todoNumber !== 0) {
    if (localStorage.getItem(`todo-${todoNumber-1}`) == null) return;
  }
  if (todoNumber > 10) return;
  const todoOnDay = document.createElement('label');
  todoOnDay.classList = `todo-list todo-${todoNumber}`; 
  todoContainer.prepend(todoOnDay);
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.value = 1;
  checkbox.id = `${todoNumber}`;
  checkbox.classList = `checkbox checkbox-${todoNumber}`; 
  todoOnDay.prepend(checkbox);
  const todoInput = document.createElement('input');
  todoInput.type = 'text';
  todoInput.setAttribute("maxlength", 40);
  todoInput.value = localStorage.getItem(`todo-${todoNumber}`)
  todoInput.id = `${todoNumber}`;
  todoInput.classList = `todo-input todo-input-${todoNumber}`; 
  todoOnDay.append(todoInput);

  if (todoNumber == 0) document.querySelector(".todo-nothing").remove();
  todoNumber++

  Array.from(document.querySelectorAll('.todo-input'), function(el){
    el.onfocus = function(){
      el.addEventListener('change', () => {
        localStorage.setItem(`todo-${this.id}`, todoInput.value);
        document.querySelector(`.todo-input-${this.id}`).style= "border-bottom: none";
      })
    }
  })
  Array.from(document.querySelectorAll('.checkbox'), function(el){
    el.onfocus = function(){
      el.addEventListener('change', () => {
        document.querySelector(`.todo-input-${this.id}`).classList.toggle('text-th')});
    }
  })
}

let addTodoNum = 0;

function addTodo() {
  if (localStorage.getItem(`todo-${addTodoNum}`) !== null) {
    setNewTodo();
    document.querySelector(`.todo-input-${addTodoNum}`).style= "border-bottom: none";
    addTodoNum++;
    addTodo();
  } else return;

} 

addTodo();
newTodo.addEventListener('click', setNewTodo);
todo.addEventListener('click', todoActive);
