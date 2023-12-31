const calendar = './utils/calendar.json';
const artistsDB = './utils/artists.json';
const eventDOM = document.querySelector('.this-event');
const tabTitle = document.querySelector('title');
const subHall = document.querySelector('.sub-hall');
const restContainer = document.querySelector('.remaining-eight');

const date = new Date(2023, 5, 15); 
const monthDay = date.getDate();
const month = date.getMonth() + 1;
const weekday = date.getDay();

// Fetching event data from calendar.json
let thisEvent;
const fetchEvent = async () => {
  try {
    eventDOM.innerHTML = '<h4 class="event-loading">Loading... </h4>';
    const params = new URLSearchParams(window.location.search); 
    const id = params.get('id'); 
    const response = await fetch(`${calendar}?id=${id}`);
    const data = await response.json();
    thisEvent = data.find((event) => {
      return event.id === id;
    });
    return thisEvent;
    } catch (error) {
    eventDOM.innerHTML =
      '<p class="error">There was a problem loading the event data. Please try again later </p>';
    }
};

const fetchArtists = async () => {
  eventDOM.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(artistsDB);
    const data = await resp.json();
    return data;
  } catch (error) {
    eventDOM.innerHTML = '<p class="error">there was an error</p>';
  }
};

// Adding the HTML code dynamically
const displayEvent = async (event) => {
  const title = event.title;
  tabTitle.innerText = title;
  const weekday = event.weekday;
  const month = event.month;
  const day = event.day;
  const lineup = event.lineup;
  const tax = event.tax;
  const allArtists = await fetchArtists();
  const currentArtists = allArtists.filter((item) => {
    return lineup.includes(item.nickname);
  });
  const artistsList = currentArtists.map((item) => {
    return `<div class="single-artist"><h4 class="artist-info">${item.nickname}</h4>
            <div class="links">
            <a target="_blank" class="link" href="${item.sc}"><img class="icon sc-icon"  src="${item.SCicon}" 
            alt="" onerror='this.remove()'></a>
            <a target="_blank" class="link" href="${item.fb}"><img class="icon fb-icon"  src="${item.FBicon}" 
            alt="" onerror='this.remove()'></a>
            <a target="_blank" class="link" href="${item.ig}"><img class="icon ig-icon"  src="${item.IGicon}" 
            alt="" onerror='this.remove()'></a>
            <a target="_blank" class="link" href="${item.ra}"><img class="icon ra-icon"  src="${item.RAicon}" 
            alt="" onerror='this.remove()'></a>
            </div>
            </div>`
  }).join('');

  
  title.innerText = `${title}`;
  eventDOM.innerHTML = `<div class="event-wrapper">
        <div class="event-info">
        <a class="arrow-anchors back" href="index.html">< back</a>
          <section class="basic-info">
          <h4 class="single-event-date">${weekday} ${day}.${month}</h4>
          <p class="event-title">${title}</p>
          </section>
          <img class="inner-banner" src="${event.banner}">
           
          <ul class="lineup">${artistsList}</ul>  
        </div>
        <h4 class="tax">TAX: ${tax} PLN</h4>
        </div>`;
};




// Inserting all of the content, defined by the dynamically added HTML, to be actually visible on the web page.
const start = async () => {
  const data = await fetchEvent();
  displayEvent(data);
  // const restOfData = await fetchRemainingEight(calendar);
  // displayEvents(restOfData);
};
start();


