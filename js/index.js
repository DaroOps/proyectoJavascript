import {
  AlbumCard,
  BentoFinded,
  MusicPlayer,
  SearchBar,
  TrackCard,
} from "./components/components.js";
import {
  clearTracks,
  eventBus,
  generateTrackCards,
  getAlbumsTracks,
  getBentoAlbumIds,
  getSearch,
  getSuggestions,
  handleTrackChange,
  initMobile,
  insertSuggestions,
  updateTracks,
} from "./global.js";

import './modules/handleTrackChange.js'

// import {getSearch} from "./services/search/getSearch.js";

customElements.define("search-bar", SearchBar);
customElements.define("bento-finded", BentoFinded);
customElements.define("track-card", TrackCard);
customElements.define("album-card", AlbumCard);
customElements.define("music-player", MusicPlayer)

//#region mobile & general init
const indexLoaderManager = () => {
  if (window.innerWidth < 900) {
    // console.log("ON LOAD MOBILE VERSION");
    initMobile()
  }
}

const manageResize = () => {
  if (window.innerWidth < 900) {
    initMobile()
  }
}
//#endregion

window.onload = indexLoaderManager
window.onresize = manageResize


getSearch("nightmare");

getSuggestions();

eventBus.subscribe("trackSuggestions", (data) => {
  // console.log(data);
  insertSuggestions(data);
});

eventBus.subscribe("dataReceived", async (data) => {
  const idList = await getBentoAlbumIds(data);
  if (idList.length > 0) {
    try {
      const albums = await getAlbumsTracks(idList);
      updateTracks(albums);
    } catch (error) {
      console.error("Error loading albums:", error);
    }
  } else {
    clearTracks();
  }
});

eventBus.subscribe('trackClicked', (data) => {
  const musicPlayerElement = document.querySelector("music-player");
  musicPlayerElement.setAttribute("track-name", `${data.track.name}`);
  musicPlayerElement.setAttribute("track-artist", `${data.track.artists[0].name}`);
  musicPlayerElement.setAttribute("img-url", `${data.img}`);
  musicPlayerElement.setAttribute("audio-url", `${data.track.preview_url}`);
});

eventBus.subscribe('suggestionClicked', (track) => {
  const musicPlayerElement = document.querySelector("music-player");
  musicPlayerElement.setAttribute("track-name", `${track.name}`);
  musicPlayerElement.setAttribute("track-artist", `${track.artists[0].name}`);
  musicPlayerElement.setAttribute("img-url", `${track.album.images[0].url}`);
  musicPlayerElement.setAttribute("audio-url", `${track.preview_url}`);
});


eventBus.subscribe('nextTrack', () => handleTrackChange('next'));
eventBus.subscribe('prevTrack', () => handleTrackChange('prev'));
eventBus.subscribe('randTrack', () => handleTrackChange('rand'));


window.addEventListener('load', addmeh());

function addmeh(){
  eventBus.publish('contentFull', null)
}