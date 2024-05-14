import { AlbumCard, BentoFinded, PlaylistTracker, SearchBar, TrackCard} from "./components/components.js";
import { clearTracks, eventBus, getAlbumsTracks, getBentoAlbumIds, getSuggestions, insertSuggestions, updateTracks } from "./global.js";

// import {getSearch} from "./services/search/getSearch.js";

customElements.define("playlist-tracker", PlaylistTracker);
customElements.define("search-bar", SearchBar);
customElements.define("bento-finded", BentoFinded)
customElements.define("track-card", TrackCard)
customElements.define("album-card", AlbumCard)

// console.log(await getSearch("nightmare"))

// getSuggestions();
// eventBus.subscribe('trackSuggestions', (data)=>{
//     console.log(data);
//     insertSuggestions(data);
// });

eventBus.subscribe('dataReceived', async (data) => {
    const idList = await getBentoAlbumIds(data);
    console.log("EXISTO!");
    console.log("EXISTO!", data);
    console.log("bento IDs", idList);
    if (idList.length > 0) {
      try {
        const albums = await getAlbumsTracks(idList);
        updateTracks(albums);
      } catch (error) {
        console.error('Error loading albums:', error);
      }
    } else {
      clearTracks();
    }
  });