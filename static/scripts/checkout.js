var order = JSON.parse(sessionStorage.getItem("items"));

const orderinside = document.getElementById('itemscontainer')


function displayProducts(products) {
    if (products.length > 0) {
      const product_details = products
        .map(
          (product) => 
          `
        
            <div class="image-cont">
            <img src="${product.img}" alt="${product.pname}" class="image"/>
            </div>
            <span class=" pname p3name ">${product.pname}</span>
            <span class="quantitybought">${product.buyqt}</span>
        
        `)
        .join("");
  
      orderinside.innerHTML = product_details;
    } 
    else {
      orderinside.innerHTML = "<h3>No products in your cart</h3>";
    }

}

displayProducts(order.products);

if(order.products.length <1){
  document.querySelector('#confirmbtn').disabled = true;
  alert("Your cart is empty");
}
else{
  document.querySelector('#confirmbtn').disabled = false;
}

// send data of user and cart to server 

const form = document.getElementById("form");


  form.addEventListener("submit", e =>{
    if(order.userinfo.name == "")
    {
      alert("Enter your details  before placing order");
    }
    else{
      e.preventDefault();
  
      postData("http://localhost:80/checkoutpage", order)
            .then((response) => {
                console.log(response);
            })
            .catch((error)=>{
              console.log(error)
            })
      alert("Your order has been placed....Thank you")
      sessionStorage.clear();
      order.products = [];
      displayProducts(order.products)
    }
   
  
  })




async function postData(url = "", data = [] ) {
  const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
  });

  return await response.json();
}

//dont know

function adduserinfo(){
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var tel = document.getElementById('tel').value;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var postalcode = document.getElementById('postalcode').value;

  order.userinfo.name = name;
  order.userinfo.email = email;
  order.userinfo.tel = tel;
  order.userinfo.address = address;
  order.userinfo.city = city;
  order.userinfo.postalcode = postalcode;
}




