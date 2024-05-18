export class TrackCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    static get observedAttributes(){
        return ['track-name', 'track-artist', 'img-url']
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
        const trackName=this.getAttribute('track-name') || '';
        const trackArtist=this.getAttribute('track-artist') || '';
        const imgUrl=this.getAttribute('img-url');

        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="../css/trackCard.css">
        <div class="track-container">
            <div class="track-item">
                <div class="img-container skeleton">
                    <img src="${imgUrl}" alt="">
                </div>
                <div class="track-info">
                    <p>${trackName}</p>
                    <small>${trackArtist}</small>
                </div>
            </div>
        </div>
       `;

        const imageContainer = this.shadowRoot.querySelector('.img-container');

        imageContainer.querySelector('img').addEventListener('load', ()=>{
        imageContainer.classList.remove('skeleton');
       })
    }
}



