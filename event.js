const url = './utils/database.json';
const eventDOM = document.querySelector('.event');
const tabTitle = document.querySelector('title');
const subHall = document.querySelector('.sub-hall');

// Fetching data from database.json
let thisEvent;
const fetchEvent = async () => {
  try {
    eventDOM.innerHTML = '<h4 class="event-loading">Loading... </h4>';
    const params = new URLSearchParams(window.location.search); 
    const day = params.get('id'); 
    const response = await fetch(`${url}?id=${day}`);
    const data = await response.json();
    thisEvent = data.find((event) => {
      return event.day === day;
    });
    return thisEvent;
    } catch (error) {
    eventDOM.innerHTML =
      '<p class="error">There was a problem loading the event data. Please try again later </p>';
    }
};

// Adding the HTML code dynamically
const displayEvent = (event) => {
  const title = event.title;
  tabTitle.innerText = title;
  const description = event.description;
  const lineup = event.lineup;
  const artistsList = lineup.map((item) => {
    
    return `<li><a class="artist-img" href="${item.img}" target="_blank"><img src="${item.img}"></a>
    <a class="artist-nick">${item.nickname}</a>
    <div class="artist-info"><p class="small-bio">${item.bio} </p>
    <div class="links">
    <a target="_blank" class="link" href="${item.sc}"><img class="icon"  src="${item.SCicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.fb}"><img class="fb-icon"  src="${item.FBicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.ig}"><img class="icon"  src="${item.IGicon}" 
    alt="" onerror='this.remove()'></a>
    <a target="_blank" class="link" href="${item.ra}"><img class="icon"  src="${item.RAicon}" 
    alt="" onerror='this.remove()'></a>
    </div></div>
    </li>`;
  }).join(' ');
  
  title.innerText = `${title}`;
  eventDOM.innerHTML = `<div class="event-wrapper">
        <div class="event-info">
           <h3>${title}</h3>
           <p>
            ${description}
           </p>
          <ul class="lineup">${artistsList}</ul>  
        </div>
        </div>`;
};


// Inserting all of the content, defined by the dynamically added HTML, to be actually visible on the web page.
const start = async () => {
  const data = await fetchEvent();
  displayEvent(data);
};
start();


