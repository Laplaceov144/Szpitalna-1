const container = document.querySelector('.events-center');
const url = './utils/database.json';
const hall = document.querySelector('.hall');
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');


// Fetching data from JSON file
const fetchEvents = async () => {
  container.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    container.innerHTML = '<p class="error">there was an error</p>';
  }
};

// Default HTML code added dynamically
const displayEvents = (item) => {
    const eventsList = item.map((event) => {
    const day = event.day;
    const weekday = event.weekday;
    const month = event.month;
    const title = event.title;   
    return `<a class="single-event" href="event.html?id=${day}">
              <div>
                <h4 class="event-date">${weekday}, ${day}/${month}</h4>
                <h2>${title}</h2>
              </div>
            </a>`;
      }).join('');
    container.innerHTML = `<div class="events-container">
           ${eventsList}</div>`;
};


// Hall of fame search engine
hall.addEventListener('click', function(){
  hall.classList.toggle('hidden');
  form.classList.toggle('hidden');
  if(form.classList.contains('hidden')) {
    start();
  }
});

const hallOfFame = (arr) => {
  const lineups = arr.map((item) => {
    return item.lineup;
  });
  const hallOfFame = lineups.flat(1).filter((item) => {
    return item.hallOfFame === 'true';
  });
  form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
    let filteredArtists = hallOfFame.filter((item) => {
      return item.nickname.toLowerCase().includes(inputValue);
      });
    displayArtists(filteredArtists);
  });
}


const displayArtists = (artists) => {
  const artistsList = artists.map((item) => {

  return `<li><a class="artist-img" href="${item.img}" target="_blank"><img src="${item.img}"></a>
  <span class="hall-nickname">${item.nickname}</span>
  <input class="onclick" type="radio" name="test" value="${item}">
  <div class="dropdown">
  <p class="small-bio">${item.bio} </p>
  <div class="links">
  <a target="_blank" class="link" href="${item.sc}"><img class="icon"  src="${item.SCicon}" 
  alt="" onerror='this.remove()'></a>
  <a target="_blank" class="link" href="${item.fb}"><img class="icon fb-icon"  src="${item.FBicon}" 
  alt="" onerror='this.remove()'></a>
  <a target="_blank" class="link" href="${item.ig}"><img class="icon"  src="${item.IGicon}" 
  alt="" onerror='this.remove()'></a>
  <a target="_blank" class="link" href="${item.ra}"><img class="icon"  src="${item.RAicon}" 
  alt="" onerror='this.remove()'></a>
  </div>
  </div>
  </li>`;
  }).join(' ');

  container.innerHTML = `<ul class="hall-results">${artistsList}</ul>`;
};


// The actual final execution of...everything here
let data;
const start = async () => {
data = await fetchEvents();
displayEvents(data);
hallOfFame(data);
return data;
};
start();









