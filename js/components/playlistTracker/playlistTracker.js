export class PlaylistTracker extends HTMLElement{
    id
    constructor(id){
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        
        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="/css/playlistTracker.css">
        <iframe class="playlist-iframe" src="https://open.spotify.com/embed/playlist/${this.id}" frameborder="0" allowtransparency="true"  allow="encrypted-media"></iframe>
       `
    }
    static get observedAttributes(){
        return ["uri"];
    }
    attributeChangedCallback(name,old,now){
        let[nameUri, album, id] = now.split(":")
        this.id = id;
    }
}



