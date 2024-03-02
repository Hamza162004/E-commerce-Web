var gender;

document.addEventListener("DOMContentLoaded", function () {
    const genderinput = document.getElementById("gender");
    const message = genderinput.value;
  
    gender = message;
});


var data = [];

//women products

async function fetchData() {
  try {
    const response = await fetch('/api/womenproduct');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    var fetcheddata = await response.json()
    
    .then( fdata=>{
        fdata.forEach(el=>{
            if(gender == el.gender){
                data.push(el);
            }
        })
        displayProducts(data);
        displayDropdown(gender);
    })
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

// Call the fetchData function to initiate the request
fetchData();






const productsContainer = document.querySelector(".products");
function displayProducts(products) {
    var availableproduct = [];
    products.forEach(el=>{
        if(el.quantity > 0){
            availableproduct.push(el);
        }
    })
    if (availableproduct.length > 0) {
        
      const product_details = availableproduct
        .map(
          (product) =>
           
                `
        <div class="product">
        <div class="img">
        <img src="${product.img}" alt="${product.pname}" class="image"/>
        </div>
        <div class="product-details">
        <p class=" pname p3name ">${product.pname}</p>
        <div class ="p3belowname">
        <span class="price p3price">Rs.${product.price}</span>
        <div class="product-btn p3product-btn">
        <button  class="prod3-cart" onclick="addtocart(this)">Add to Cart</button>
        
        
        <button  class="prod3-buy">Buy Now</button>
        </div>
        </div>
        </div>
        </div>`
            
          
        )
        .join("");
  
      productsContainer.innerHTML = product_details;
    } 
    else {
      productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
}

const dropdown = document.getElementById('dropdown')
const page = document.getElementById('page')
function displayDropdown(gender){
    if(gender=='women'){
        dropdown.innerHTML = (
            ` <button class="dropbtn"><img src="/static/img/menu.png" alt=""></button>
            <div class="dropdown-content">
                <a href="/product">
                    <img src="/static/img/women/top.png" alt="Top">
                    <span>Tops</span>
                </a>
                <a href="/product">
                    <img src="/static/img/women/skirt.png" alt="skirt">
                    <span>Bottoms</span>
                </a>
                <a href="/product">
                    <img src="/static/img/women/heel.png" alt="">
                    <span>heels</span>
                </a>
            </div>` 
        )
        page.innerHTML = (
            ` <ul>
            <li><a href="/men" >Men</a></li>
            <li><a href="/women" id="presentpage">Women</a></li>
            <li><a href="/teenager">Teenageers</a></li>
             </ul>`
        )
    }
    else{
        dropdown.innerHTML = (
            `<button class="dropbtn"><img src="/static/img/menu.png" alt=""></button>
            <div class="dropdown-content">
                <a href="/menproduct">
                    <img src="/static/img/men/shirt.png" alt="Shirt">
                    <span>Shirts</span>
                </a>
                <a href="/menproduct">
                    <img src="/static/img/men/pant.png" alt="Pants">
                    <span>Bottoms</span>
                </a>
                <a href="/menproduct">
                    <img src="/static/img/men/shoes.png" alt="shoes">
                    <span>shoes</span>
                </a>
            </div>`
        )
        page.innerHTML = (
           ` <ul>
           <li><a href="/men" id="presentpage">Men</a></li>
           <li><a href="/women">Women</a></li>
           <li><a href="/teenager">Teenageers</a></li>
            </ul>`
        )
    }
}


var selected = document.getElementById('sortway').value;


function change(){
    selected = document.getElementById('sortway').value;
    if(selected == 'L_to_H'){
        data.sort(function(a,b){
            return a.price - b.price;
        });
        displayProducts(data);
    }
    else if(selected == 'H_to_L'){
        data.sort(function(a,b){
            if(a.price<b.price){
                return 1;
            }
            else if(a.price > b.price)
            {
                return -1;
            }
            else{
                return 0;
            }
        });
        displayProducts(data);
    }
    else if(selected == 'default'){
        displayProducts(def);
    }
}




function display5(){
    var dis = document.getElementById('products');
    dis.classList.remove('pro3');
    dis.classList.add('pro5');
    var prodname = document.querySelectorAll('.pname');
    prodname.forEach(el => {
        el.classList.add('p5name');
        el.classList.remove('p3name');
    });
    var prodprice = document.querySelectorAll('.price');
    prodprice.forEach(el => {
        el.classList.add('p5price');
        el.classList.remove('p3price');
    });
    var prodbutton = document.querySelectorAll('.product-btn');
    prodbutton.forEach(el => {
        el.classList.add('p5product-btn');
        el.classList.remove('p3product-btn');
    });
}

function display3(){
    var dis = document.getElementById('products');
    dis.classList.remove('pro5');
    dis.classList.add('pro3');
    var prodname = document.querySelectorAll('.pname');
    prodname.forEach(el => {
        el.classList.add('p3name');
        el.classList.remove('p5name');
    });
    var prodprice = document.querySelectorAll('.price');
    prodprice.forEach(el => {
        el.classList.add('p3price');
        el.classList.remove('p5price');
    });
    var prodbutton = document.querySelectorAll('.product-btn');
    prodbutton.forEach(el => {
        el.classList.add('p3product-btn');
        el.classList.remove('p5product-btn');
    });
}

function searchfor(){
    var sproduct = document.getElementById('search').value;
    var copies = [];
    data.forEach(el =>{
        if(sproduct == el.type){
            copies.push(el);
        }
    })
    displayProducts(copies);
}

var cart = {
    products : [],
    userinfo : {
        name : "",
        email : "",
        tel : "",
        address : "",
        city : "",
        postalcode : "",
    },
    shipping : 0,
    total : 0,
};

var cartcontinue =  JSON.parse(sessionStorage.getItem("items"));

const cartbtn = document.getElementById("cartbtn");
  
function addtocart(element){
    var productParent = $(element).closest('div.product');

	var name = $(productParent).find('.pname').text();
    
    if(cartcontinue==null){
        data.forEach(el=>{
            if(el.pname == name){
                cart.products.push(el);
            }
        })
        window.sessionStorage.setItem("items", JSON.stringify(cart));
    }
    else{
        data.forEach(el=>{
            if(el.pname == name){
                cartcontinue.products.push(el);
            }
        })
        window.sessionStorage.setItem("items", JSON.stringify(cartcontinue));
    }
}





  