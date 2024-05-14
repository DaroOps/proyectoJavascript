import { eventBus } from "../../global.js";

export class PlaylistTracker extends HTMLElement {
    id;
  
    constructor(id) {
      super();
      this.attachShadow({ mode: "open" });
      eventBus.subscribe("albumClicked", this.render.bind(this))
      
    }
    
    connectedCallback() {
        this.render();
        
       
    }
    
    static get observedAttributes() {
      return ['uri', 'id'];
    }
      
    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue !== newValue){
            this.render(newValue)
            // console.log("rerender", newValue);
        }
    }
  
    render(id="5y6w2N9XrhP93lAZwfXmT8") {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../css/playlistTracker.css">
      <iframe class="playlist-iframe" src="https://open.spotify.com/embed/album/${id}" frameborder="0" allowtransparency="true"></iframe>
      `;
    }
  

  }