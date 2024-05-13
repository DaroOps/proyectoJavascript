export class SearchBar extends HTMLElement {
  id;
  constructor(id) {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
        <link rel="stylesheet" href="/css/searchbar.css">
        <div class="search-header">
        <input placeholder="Search" class="search-header__input" type="text" />
        <button class="search-header__button">
            <svg
            fill="none"
            viewBox="0 0 18 18"
            height="18"
            width="18"
            class="search-header__icon"
            >
            <path
                fill="#a7a7a7"
                d="M7.132 0C3.197 0 0 3.124 0 6.97c0 3.844 3.197 6.969 7.132 6.969 1.557 0 2.995-.49 4.169-1.32L16.82 18 18 16.847l-5.454-5.342a6.846 6.846 0 0 0 1.718-4.536C14.264 3.124 11.067 0 7.132 0zm0 .82c3.48 0 6.293 2.748 6.293 6.15 0 3.4-2.813 6.149-6.293 6.149S.839 10.37.839 6.969C.839 3.568 3.651.82 7.132.82z"
            ></path>
            </svg>
        </button>
        </div>
       `;
  }
  // static get observedAttributes(){
  //     return ["uri"];
  // }
  // attributeChangedCallback(name,old,now){
  //     let[nameUri, album, id] = now.split(":")
  //     this.id = id;
  // }
}

{
  /* <iframe class="playlist-iframe" src="https://open.spotify.com/embed/playlist/${this.id}" frameborder="0" allowtransparency="true"  allow="encrypted-media"></iframe> */
}
