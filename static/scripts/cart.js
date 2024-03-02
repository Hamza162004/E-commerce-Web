

const cart = JSON.parse(sessionStorage.getItem("items"));



const itemsContainer = document.querySelector(".items-container");


function displayProducts(products) {
    if (products.length > 0) {
      const product_details = products
        .map(
          (product) => 
          `
        <div class="item">
            <div class="image-cont">
            <img src="${product.img}" alt="${product.pname}" class="image"/>
            </div>
            <span class=" pname p3name ">${product.pname}</span>
            <span class="price p3price">Rs.${product.price}</span>
            <div class="quantity-col">
                <button class="minus" onclick="minusqt(this)"><img src="/static/img/minus.png" alt="minus logo"></button>
                <span .bought>${product.buyqt}</span>
                <button class="plus" onclick="plusqt(this)"><img src="/static/img/plus.png" alt="plus logo"></button>
            </div>
            <span class="total">Rs.${product.buyqt*product.price}</span>

            <div class="remove-col">
                <button class="remove" onclick="removefromcart(this)"><img src="/static/img/cross.png" alt="remove img"></button>
            </div>
        </div>
        
        
        `)
        .join("");
  
      itemsContainer.innerHTML = product_details;
    } 
    else {
      itemsContainer.innerHTML = "<h3>No products in your cart</h3>";
    }

}

displayProducts(cart.products);
displayTotal(cart.products);



function totalfun(){
  var tot = 0;
  cart.products.forEach( el => {
      tot += (el.price*el.buyqt);
  })
  return tot;
}



function displayTotal(products){

  var total = totalfun();
  var shipping = 0;
  if(total>=5000){
    shipping = 0;
  }
  else{
    shipping = 200;
  }

  cart.shipping = shipping;

  total += shipping;
  cart.total = total;
  const totalcon = document.getElementById("charges-container");

  if(cart.products.length>0){

    totalcon.innerHTML =(
      `<div class="shipping-container">
      <span class="shipping">Shipping Charges :</span>
      <span class="charges">${shipping}</span>
      </div>
      <div class="total-container">
      <span class="subtotal">SubTotal :</span>
      <span class="totalvalue">${total}</span>
      </div>`
    )
  }
  else {
    totalcon.innerHTML = "<span> </span>";
  }
}





function removefromcart(element){
    var productParent = $(element).closest('div.item');
    var name = $(productParent).find('.pname').text();

    

    cart.products.forEach(el =>{
        if(name == el.pname){
            var index = cart.products.indexOf(el);
            var x = cart.products.splice(index, 1);
        }
    })
    window.sessionStorage.setItem("items", JSON.stringify(cart));
    displayProducts(cart.products);
    displayTotal(cart.products);  

    if(cart.products.length <1){
      document.querySelector('#checkout').disabled = true;
    }
    else{
      document.querySelector('#checkout').disabled = false;
    }
}

function plusqt(element){
  var productParent = $(element).closest('div.item');
  var name = $(productParent).find('.pname').text();
  var pbtn = document.querySelectorAll('.plus')
  cart.products.forEach(el =>{
    if(name == el.pname){
      if(el.quantity > el.buyqt){
        el.buyqt ++;
      }
      else{
        pbtn.disabled = true;
      }
    }
  })
  window.sessionStorage.setItem("items", JSON.stringify(cart));
    displayProducts(cart.products);
    displayTotal(cart.products);
  
}
function minusqt(element){
  var productParent = $(element).closest('div.item');
  var name = $(productParent).find('.pname').text();
  var pbtn = document.getElementsByClassName('minus')
  cart.products.forEach(el =>{
    if(name == el.pname){
      if(el.buyqt >1){
        el.buyqt--;
      }
      else{
        pbtn.disabled = true;
      }
    }
  })
  window.sessionStorage.setItem("items", JSON.stringify(cart));
    displayProducts(cart.products);
      displayTotal(cart.products);
}

function savecart(){
  window.sessionStorage.setItem("items", JSON.stringify(cart));
}

if(cart.products.length <1){
  document.querySelector('#checkout').disabled = true;
  alert("Your cart is empty");
}
else{
  document.querySelector('#checkout').disabled = false;
}

