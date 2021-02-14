// product-item.js

class ProductItem extends HTMLElement {
  constructor(elem) {
    super();

    // Create the list element
    let listelem = document.createElement('li');
    listelem.setAttribute('class', 'product');

    // Create the image element
    let image = document.createElement('img');
    image.setAttribute('src', elem.image);
    image.setAttribute('alt', elem.description);
    image.setAttribute('width', 200);
    listelem.appendChild(image);

    // Create the image title
    let title = document.createElement('p');
    title.innerHTML = elem.title;
    title.setAttribute('class', 'title');
    listelem.appendChild(title);

    // Create the price tag
    let price = document.createElement('p');
    price.innerHTML = "$"+elem.price;
    price.setAttribute('class', 'price');
    listelem.appendChild(price);
 
    // Create the button
    let button = document.createElement('button');
    button.innerHTML = "Add to Cart";
    button.setAttribute('class', "cart")

    // Retrieve necessary data from storage and html file
    let id_array_outer = JSON.parse(localStorage.getItem("id_array"));
    let counter = document.getElementById('cart-count');

    // If the item was stored in their cart before refresh, reinsert it into cart
    if (id_array_outer.includes(elem.id)){
      // console.log("found item: " +elem.id);
      button.innerHTML = "Remove from Cart";
      button.setAttribute('is_in_cart', 1);
      counter.innerHTML = parseInt(counter.innerHTML) + 1;
    }
    else {  
      button.setAttribute('is_in_cart', 0);
    }
    listelem.appendChild(button);

    // Add stylesheet information
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
     .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
    </style>`;

    // Append to root node
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));
    this.root.appendChild(listelem.cloneNode(true));

    
    // Retrieve the most recent button added to add onclick method
    this.button = this.root.querySelector(".cart");

    this.button.onclick = function(){
      // WE ARE NOW IN THE BUTTON SCOPE - this makes me want to kill myself
      
      // access local storage
      let id_array = JSON.parse(localStorage.getItem("id_array"));

      // item is in the cart and button clicked, want to remove from cart
      if (this.getAttribute('is_in_cart') == '1'){
          // console.log("removing from cart");
          this.innerHTML  = "Add to Cart";
          this.setAttribute('is_in_cart', 0);
          counter.innerHTML = parseInt(counter.innerHTML) - 1;
          id_array.splice(id_array.indexOf(elem.id), 1);
          localStorage.setItem("id_array", JSON.stringify(id_array));
          // console.log(id_array);
      }
      // item not in cart, button clicked, want to add to cart
      else {
          // console.log("adding to cart");
          this.innerHTML = "Remove from Cart";
          this.setAttribute('is_in_cart', 1);
          counter.innerHTML = parseInt(counter.innerHTML) + 1;
          id_array.push(elem.id);
          // console.log(id_array);
          localStorage.setItem("id_array", JSON.stringify(id_array));
      }

      // console.log("id_array after updates: " + JSON.parse(localStorage.getItem("id_array")));

    };
  }

}

customElements.define('product-item', ProductItem);
