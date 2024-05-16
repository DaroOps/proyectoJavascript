import {
  AlbumCard,
  BentoFinded,
  MusicPlayer,
  PlaylistTracker,
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
  insertSuggestions,
  updateTracks,
} from "./global.js";

// import {getSearch} from "./services/search/getSearch.js";

customElements.define("playlist-tracker", PlaylistTracker);
customElements.define("search-bar", SearchBar);
customElements.define("bento-finded", BentoFinded);
customElements.define("track-card", TrackCard);
customElements.define("album-card", AlbumCard);
customElements.define("music-player", MusicPlayer)

getSearch("nightmare");

getSuggestions();

eventBus.subscribe("trackSuggestions", (data) => {
  console.log(data);
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

// eventBus.subscribe("albumClicked", async (data) => {
//   const playlistTrackerElement = document.querySelector("playlist-tracker");
//   console.log("clikced album via observer", data);
//   playlistTrackerElement.setAttribute("uri", `${data}`);
// });

eventBus.subscribe('trackClicked', (data) => {
  const musicPlayerElement = document.querySelector("music-player");

  musicPlayerElement.setAttribute("track-name", `${data.track.name}`);
  musicPlayerElement.setAttribute("track-artist", `${data.track.artists[0].name}`);
  musicPlayerElement.setAttribute("img-url", `${data.img}`);
  musicPlayerElement.setAttribute("audio-url", `${data.track.preview_url}`);
});

// function onPageLoad() {

// }

// document.addEventListener("load", onPageLoad);
