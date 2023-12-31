const container = document.querySelector('.events-center');
const calendar = './utils/calendar.json';
const loadEvents = document.querySelector('.load-events');

// Fetching data from calendar.json
const fetchEvents = async () => {
  container.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(calendar);
    const data = await resp.json();
    return data;
  } catch (error) {
    container.innerHTML = '<p class="error">there was an error</p>';
  }
};

const date = new Date(2023, 5, 15); 
const monthDay = date.getDate();
const month = date.getMonth() + 1;


// Load first 4 upcoming events by default
const fetchUpcomingFour = (calendar) => {
  const upcoming = calendar.filter((event) => {
    return event.day >= monthDay && event.month == month;
  });
  const upcomingFour = upcoming.splice(0,4);
  return upcomingFour;
}



// Loading selected events
const displayEvents = (item) => {
    const eventsList = item.map((event) => {
    const weekday = event.weekday;
    const month = event.month;
    const day = event.day;
    const title = event.title;
    const id = event.id; 
    return `<div class="single-event">
              <h4 class="event-date">${weekday} ${day}.${month}</h4>
              <h2>${title}</h2>
              <a class="arrow-anchors" href="single-event.html?id=${id}">see more ></a>
            </div>`;
      }).join('');
    container.innerHTML = `<div class="events-container">
           ${eventsList}</div>`;
};


// Clear events list before loading more
const clearEvents = () => {
  container.innerHTML = '';
};

// Load the remaining events
let remaining;
const fetchRest = (calendar) => {
  remaining = calendar.filter((event) => {
      return event.month == month;
    });
  return remaining;
}

// Place the dynamic HTML for the rest of the events
const displayRest = (arr) => {
  const restInfo = arr.map((item) => {
    return `<div class="single-event">
              <h4 class="event-date">${item.weekday} ${item.day}.${item.month}</h4>
              <h2>${item.title}</h2>
              <a class="see-more arrow-anchors" href="single-event.html?id=${item.id}">
              see more ></a>
            </div>`;
  }).join(' ');
  container.innerHTML = `${restInfo}`;

};


// The actual final execution of...everything here
let data;
const start = async () => {
data = await fetchEvents();
loadEvents.addEventListener('click', function(){
    clearEvents();
    const remaining = fetchRest(data);
    displayRest(remaining);
    loadEvents.style.display = 'none';
});
const upcomingFour = fetchUpcomingFour(data);
displayEvents(upcomingFour);
return data;
};
start();










