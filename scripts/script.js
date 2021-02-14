// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('list') == null){
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('list', JSON.stringify(data)));
    // console.log(localStorage.getItem('list'));
  }
  else {
    console.log('imported');
  }

  if (localStorage.getItem("id_array") != "[]"){
    // console.log("storage not empty");
    // console.log(JSON.parse(localStorage.getItem("id_array")));
  }
  else {
    let id_array = [];
    localStorage.setItem("id_array", JSON.stringify(id_array));
  }
  let arr = JSON.parse(localStorage.getItem('list'));
  let list = document.getElementById('product-list');
  arr.forEach(element => {
    list.appendChild(new ProductItem(element));
  });

});
