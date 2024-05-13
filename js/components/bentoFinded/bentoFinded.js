export class BentoFinded extends HTMLElement{
    id
    constructor(id){
        super();
        this.attachShadow({mode: "open"});
    }
    connectedCallback(){
        
        this.shadowRoot.innerHTML = /*html*/`
        <link rel="stylesheet" href="../css/bentoFinded.css">
        <div class="bento-finded">
            <section class="bento-grid">

                <div class="item-playable-container">
                    <img src="https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1" alt="img">
                    <p>Item Name</p>
                    <small>item-category</small>
                </div>

                <div class="item-playable-container">
                    <img src="https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1" alt="img">
                    <p>Item Name</p>
                    <small>item-category</small>
                </div>

                <div class="item-playable-container">
                    <img src="https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1" alt="img">
                    <p>Item Name</p>
                    <small>item-category</small>
                </div>

                <div class="item-playable-container">
                    <img src="https://i.scdn.co/image/ab67616d00001e02fa258529452f4ed34cc961b1" alt="img">
                    <p>Item Name</p>
                    <small>item-category</small>
                </div>

                
            </section>
        </div>
       `
    }
    // static get observedAttributes(){
    //     return ["uri"];
    // }
    // attributeChangedCallback(name,old,now){
    //     let[nameUri, album, id] = now.split(":")
    //     this.id = id;
    // }
}



