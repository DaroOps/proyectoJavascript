import { eventBus } from "../global.js";

export const insertSuggestions = (data)=>{
    if (data){
        const target = document.querySelector('.track-suggestions')
        const tracks = data.tracks
        const fragment = document.createDocumentFragment();

        tracks.forEach(track => {
            const trackCard = document.createElement('track-card');
            
            trackCard.setAttribute('track-name', track.name);
            trackCard.setAttribute('track-artist', track.artists[0]?.name);
            trackCard.setAttribute('img-url', track.album.images[0]?.url)

            trackCard.addEventListener("click", () => {
                handleClickCard(track);
              });

            fragment.appendChild(trackCard);
        });

        target.appendChild(fragment)
    }
}

const handleClickCard = (track)=>{
    eventBus.publish('suggestionClicked', track);
  }
