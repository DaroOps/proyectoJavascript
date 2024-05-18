import { eventBus } from "../global.js";

const tracksAsideElement = document.querySelector(".album-tracks");

export const clearTracks = () => {
  tracksAsideElement.innerHTML = "";
};

export const updateTracks = (albums) => {
  eventBus.subscribe("albumClicked", async (id) => {
    // console.log("sure im work in here too", id);
    clearTracks();
    const trackCards = generateTrackCards(albums, id);
    if (trackCards) {
      tracksAsideElement.appendChild(trackCards);
    }
  });
};

export const generateTrackCards = (albums, albumId) => {
  // console.log(albums);
  const fragment = document.createDocumentFragment();
  let selectedAlbum;
  albums.forEach((album) => {
    if (album?.id == albumId) {
      console.log(`COINCIDE ${album.id} || ${albumId}`);
      selectedAlbum = album;
    }
  });

  selectedAlbum?.tracks?.items?.forEach((track) => {
    const trackCard = document.createElement("track-card");
    trackCard.setAttribute("track-name", track.name);
    trackCard.setAttribute(
      "track-artist",
      track.artists?.[0]?.name || "Unknown Artist"
    );
    trackCard.setAttribute("img-url", selectedAlbum.images?.[0]?.url || "");
    let [origin, endpoint, id] = track.uri.split(":");
    trackCard.id = id;
    trackCard.addEventListener("click", () => {
      handleClickCard(track, selectedAlbum.images?.[0]?.url);//here im passing the whole track for the music player
    });
    
    fragment.appendChild(trackCard);
  });

  // console.log(fragment);
  fragment.querySelector('track-card').click()

  return fragment;
};

const handleClickCard = (track, img) => {
  eventBus.publish('trackClicked', { track, img: img });
}