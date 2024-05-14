const bentoFindeElement = document.querySelector("bento-finded");
const tracksAsideElement = document.querySelector(".album-tracks");

export const clearTracks = () => {
  tracksAsideElement.innerHTML = "";
};

export const updateTracks = (albums) => {
  bentoFindeElement.addEventListener("albumClick", (event) => {
    const albumId = event.detail.albumId;
    console.log("AlbumId Clicked = ", albumId);
    clearTracks();
    const trackCards = generateTrackCards(albums, albumId);
    if (trackCards) {
      tracksAsideElement.appendChild(trackCards);
    }
  });
};

export const generateTrackCards = (albums, albumId) => {
  console.log(albums);
  const fragment = document.createDocumentFragment()
  let selectedAlbum;
  albums.forEach((album) => {
    if (album?.id == albumId) {
      console.log(`COINCIDE ${album.id} || ${albumId}`);
      selectedAlbum = album;
    }
  });

  selectedAlbum?.tracks?.items?.forEach(track => {
    const trackCard = document.createElement("track-card");
        trackCard.setAttribute("track-name", track.name);
        trackCard.setAttribute(
        "track-artist",
        track.artists?.[0]?.name || "Unknown Artist"
        );
        trackCard.setAttribute("img-url", selectedAlbum.images?.[0]?.url || "");
        let [origin, endpoint, id] = track.uri.split(":");
        trackCard.id = id;
        fragment.appendChild(trackCard);
  });

  return fragment
  console.log(fragment);
};

