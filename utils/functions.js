export const selector(qs) = document.querySelector(qs);

export const fetchData = = async () => {
  container.innerHTML = '<div class="loading"></div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    container.innerHTML = '<p class="error">there was an error</p>';
  }
};

export const dynamicTile(arr) = arr.map((item) => {
    
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
