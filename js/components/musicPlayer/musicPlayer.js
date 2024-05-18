import { formatTime, eventBus } from "../../global.js";

export class MusicPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.isPlaying = false;
        this.isRandom = false;
        this.isRepeated = false;
        this.audioElement = null;
    }

    static get observedAttributes() {
        return ['track-name', 'track-artist', 'img-url', 'audio-url'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const trackName = this.getAttribute('track-name') || "";
        const trackArtist = this.getAttribute('track-artist') || "";
        const imgUrl = this.getAttribute('img-url') || "";
        const trackAudio = this.getAttribute('audio-url') || "";

        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="css/musicPlayer.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
        <div class="music-player">
            <div class="img-container skeleton">
                <img loading="lazy" src="${imgUrl}" alt="">
            </div>
            <div class="player-track-info">
                <strong>${trackName}</strong>
                <small>${trackArtist}</small>
            </div>
            <div class="progress-container">
                <span id="progress-min">-:--</span>
                <input id="progress" class="progress" type="range" value="0" step="0.1" min="0" max="100" />
                <audio id="audio" src="${trackAudio}"></audio>
                <span id="progress-max">-:--</span>
            </div>
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
                <div class="btn btn-next">
                    <i class="fas fa-step-forward"></i>
                </div>
                <div class="btn btn-random">
                    <i class="fas fa-random"></i>
                </div>
            </div>
        </div>
        `;

        this.setupEventListeners();
        this.togglePlay();
        this.updateUIState();
    }

    setupEventListeners() {
        const btnPlay = this.shadowRoot.querySelector('.btn.btn-toggle-play');
        const progress = this.shadowRoot.querySelector(".progress");
        const audio = this.shadowRoot.querySelector('audio');
        const progressMin = this.shadowRoot.querySelector("#progress-min");
        const progressMax = this.shadowRoot.querySelector("#progress-max");
        const btnLoop = this.shadowRoot.querySelector(".btn.btn-repeat");
        const btnRand = this.shadowRoot.querySelector(".btn.btn-random");
        const btnPrev = this.shadowRoot.querySelector(".btn.btn-prev");
        const btnNext = this.shadowRoot.querySelector(".btn.btn-next");

        progress.addEventListener("input", () => {
            const seekTime = audio.duration * (progress.value / 100);
            audio.currentTime = seekTime;
        });

        audio.addEventListener('timeupdate', () => {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.value = progressPercent;
            progressMin.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener("ended", () => {
            if (this.isRepeated) {
                audio.play();
            } else if (this.isRandom) {
                eventBus.publish('randTrack', null);
            } else {
                btnNext.click();
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            progressMin.textContent = "0:00";
            progressMax.textContent = formatTime(audio.duration);
        });

        btnPlay.addEventListener('click', () => {
            this.togglePlay();
        });

        btnLoop.addEventListener('click', () => {
            // console.log(this.isRepeated);
            this.toggleRepeat();
            // console.log(this.isRepeated);
        });

        btnRand.addEventListener('click', () => {
            this.toggleRandom();
        });

        btnPrev.addEventListener('click', () => {
            if(this.isRepeated) {this.toggleRepeat()};
            eventBus.publish('prevTrack', null);
        });

        btnNext.addEventListener('click', () => {
            if(this.isRepeated) {this.toggleRepeat()};

            if(!this.isRandom){
                eventBus.publish('nextTrack', null);
            }
            else{
                eventBus.publish('randTrack', null);
            }   
        });
    }

  togglePlay() {
        const btnPlay = this.shadowRoot.querySelector('.btn.btn-toggle-play');
        const audio = this.shadowRoot.querySelector('audio');

        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            btnPlay.classList.add('playing');
            audio.play();
        } else {
            btnPlay.classList.remove('playing');
            audio.pause();
        }
    }

    toggleRepeat() {
        const btnLoop = this.shadowRoot.querySelector(".btn.btn-repeat");
        const audio = this.shadowRoot.querySelector('audio');

        if (this.isRandom) {
           this.toggleRandom()
        }
     
        this.isRepeated = !this.isRepeated;
        btnLoop.classList.toggle('active', this.isRepeated);
        audio.loop = this.isRepeated;
    }

    toggleRandom() {
        const btnRand = this.shadowRoot.querySelector(".btn.btn-random");

        if (this.isRepeated) {
           this.toggleRepeat()
        }

        this.isRandom = !this.isRandom;
        btnRand.classList.toggle('active', this.isRandom);
    }

    updateUIState() {
        const btnRand = this.shadowRoot.querySelector('.btn.btn-random');
        const btnLoop = this.shadowRoot.querySelector('.btn.btn-repeat');

        btnRand.classList.toggle('active', this.isRandom);
        btnLoop.classList.toggle('active', this.isRepeated);
    }
}