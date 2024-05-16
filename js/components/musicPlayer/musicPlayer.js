export class MusicPlayer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.isPlaying= false;
        this.isRandom= false;
        this.isRepeated= false;
        this.audioElement;
        // eventBus.subscribe('trackClicked', this.render.bind(this));
    }

    static get observedAttributes(){
        return ['track-name', 'track-artist', 'img-url', 'audio-url']
    }

    connectedCallback(){
        this.render()
       
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue !== newValue){
            this.render();
            
        }
    }

    render(){
        const trackName=this.getAttribute('track-name') || 'trackName';
        const trackArtist=this.getAttribute('track-artist') || 'trackArtist';
        const imgUrl=this.getAttribute('img-url') || 'https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1';
        const trackAudio=this.getAttribute('audio-url') || 'https://p.scdn.co/mp3-preview/26d19b78d0470a426e3c5c80a0a1ec215f48521e?cid=f6a40776580943a7bc5173125a1e8832';

        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="../css/musicPlayer.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />

        <div class="music-player">
            <img src="${imgUrl}" alt="track">

            <div class="player-track-info">
                <strong>${trackName}</strong>
                <small>${trackArtist}</small>
            </div>

            <input id="progress" class="progress" type="range" value="0" step="0.1" min="0" max="100" />
            <audio id="audio" src=${trackAudio}></audio>
            
            <div class="control">
				<div class="btn btn-repeat">
					<i class="fas fa-redo"></i>
				</div>
				<div class="btn btn-prev">
					<i class="fas fa-step-backward"></i>
				</div>
				<div class="btn btn-toggle-play">
					<i class="fas fa-pause icon-pause"></i>
					<i class="fas fa-play icon-play"></i>
				</div>
				<div class="btn btn-new">
					<i class="fas fa-step-forward"></i>
				</div>
				<div class="btn btn-random">
					<i class="fas fa-random"></i>
				</div>
			</div>
        </div>
       `;

       this.managAddEvent();
    }

    managAddEvent(){       
        const btnPlay = this.shadowRoot.querySelector('.btn.btn-toggle-play')
        const progress = this.shadowRoot.querySelector(".progress");
        const audio = this.shadowRoot.querySelector('audio');

        btnPlay.addEventListener('click', ()=>{
     
     
            this.isPlaying = !this.isPlaying
                 if(this.isPlaying) {
                     btnPlay.classList.add('playing') 
                     audio.play()
                 }else{
                     btnPlay.classList.remove('playing')
                     audio.pause()
                 }
     
            audio.ontimeupdate = function() {
             const progressPercent = Math.floor(
               (this.currentTime / audio.duration) * 100
             );
             progress.value = progressPercent;
           };
            
            console.log("isPlaying", this.isPlaying);
        })
    }
    
}



