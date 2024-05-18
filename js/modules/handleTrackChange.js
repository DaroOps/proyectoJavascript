import { eventBus } from "../global.js";

const playListTrack = document.querySelector(".album-tracks")
let index = 0

eventBus.subscribe('albumClicked', ()=>{index=0})//reset The Playlist index
eventBus.subscribe('trackClicked', ({track})=>{
    for (let playListIndex = 0; playListIndex < playListTrack.children.length; playListIndex++) {
        if(track.id === playListTrack.children[playListIndex].id){
           index = playListIndex
          //  console.log(index);
           break
        }
    }
})

export const handleTrackChange = (direction) => {
  const children = Array.from(playListTrack.children);
  const maxIndex = children.length - 1;

  if (direction === 'next') {
    index = (index + 1) % children.length;
  } else if (direction === 'prev') {
    index = (index - 1 + children.length) % children.length;
  }
  else if(direction === 'rand'){
    index = Math.floor(Math.random() * children.length);
  }

  // console.log('current track', index);
  children[index].click();
};