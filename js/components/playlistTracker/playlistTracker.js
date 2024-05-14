import { eventBus } from "../../global.js";

export class PlaylistTracker extends HTMLElement {
    id;
  
    constructor(id) {
      super();
      this.attachShadow({ mode: "open" });
      eventBus.subscribe("albumClicked", this.render.bind(this))
      this.id = id;
    }
    
    connectedCallback() {
        this.render();
    }
    
    static get observedAttributes() {
      return ['uri'];
    }
      
    atrributeChangeCallback(name, oldValue, newValue){
        if(oldValue !== newValue){
            this.render()
            console.log("rerender");
            // this.id = newValue.split(":").pop()
        }
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../css/playlistTracker.css">
        <iframe class="playlist-iframe" src="https://open.spotify.com/embed/album/${this.id}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      `;
    }
  

  }