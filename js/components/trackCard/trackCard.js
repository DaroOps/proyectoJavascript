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
        const trackName=this.getAttribute('track-name') || 'trackName';
        const trackArtist=this.getAttribute('track-artist') || 'trackArtist';
        const imgUrl=this.getAttribute('img-url') || 'https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1';

        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="../css/trackCard.css">
        <div class="track-container">
            <div class="track-item">
                <img src="${imgUrl}" alt="">
                <div class="track-info">
                    <p>${trackName}</p>
                    <small>${trackArtist}</small>
                </div>
            </div>
        </div>
       `;
    }
}



