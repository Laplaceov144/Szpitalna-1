import selector, dynamicTile from '.utils/functions.js';

const url = './utils/database.json';
const eventDOM = selector('.event');
const tabTitle = selector('title');
const subHall = selector('.sub-hall');

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
  const artistsList = dynamicTile(item);
  
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


