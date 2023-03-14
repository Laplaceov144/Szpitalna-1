import selector from '.utils/functions.js';
import fetchData from '.utils/functions.js';
import dynamicTile from '.utils/functions.js';

const url = './utils/database.json';
const container = selector('.residents-container');

// Filtering resident DJs
const residents = (arr) => {
    const lineups = arr.map((item) => {
      return item.lineup;
    });
    const residents = lineups.flat(1).filter((item) => {
      return item.resident === 'true';
    });
    return residents;
}

// Displaying residents' info
const displayResidents = (arr) => {
    
    const residents = dynamicTile;

  container.innerHTML = `${residents}`;

}

// Inserting everything dynamically in 'residents.html'
const start = async () => {
    const data = await fetchData();
    displayResidents(residents(data));    
};
  start();
