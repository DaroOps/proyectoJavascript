const discover = document.querySelector('.discover')
const player = document.querySelector('.player')
const tracklist = document.querySelector('.tracklist')

const buttonDiscover = document.querySelector('.discover-view')
const buttonPlayer = document.querySelector('.player-view')
const buttonList = document.querySelector('.tracklist-view')


export const initMobile = () => {

    buttonDiscover.addEventListener("click", activeDiscoverView)
    buttonPlayer.addEventListener("click", activePlayerView)
    buttonList.addEventListener("click", activeTracklistView)
    
    
    activeDiscoverView()
}


const activeDiscoverView = () => {
    discover.classList.add('active')
    player.classList.remove('active')
    tracklist.classList.remove('active')
}

const activePlayerView = () => {
    discover.classList.remove('active')
    player.classList.add('active')
    tracklist.classList.remove('active')
}

const activeTracklistView = () => {
    discover.classList.remove('active')
    player.classList.remove('active')
    tracklist.classList.add('active')
}



