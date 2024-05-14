import {
  AlbumCard,
  BentoFinded,
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

getSearch("nightmare");

getSuggestions();

eventBus.subscribe("trackSuggestions", (data) => {
  console.log(data);
  insertSuggestions(data);
});

eventBus.subscribe("dataReceived", async (data) => {
  const idList = await getBentoAlbumIds(data);
  // console.log("EXISTO!");
  // console.log("EXISTO!", data);
  // console.log("bento IDs", idList);

  generateTrackCards(await getAlbumsTracks(idList), idList[0]);

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
function hacerClicEnElementoAleatorio(tipoDeElemento) {
    var elementos = document.getElementsByTagName(tipoDeElemento);
    if (elementos.length > 0) {
        var indiceAleatorio = Math.floor(Math.random() * elementos.length);
        var elementoAleatorio = elementos[indiceAleatorio];
        elementoAleatorio.click();
    } else {
        console.log("No se encontraron elementos del tipo especificado");
    }
}

function onPageLoad() {
    hacerClicEnElementoAleatorio("album-card");
}

document.addEventListener("load", onPageLoad);

