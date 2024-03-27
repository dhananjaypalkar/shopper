function LoadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function(res){
        return res.json();
    })
    .then(function(categories){
        categories.unshift("all");
        categories.map(function(category){
            var option = document.createElement("option");
            option.text = category.toUpperCase();
            option.value = category;
            document.getElementById("lstCategories").appendChild(option);
        })
    })
}

function LoadProducts(url){
    document.querySelector("main").innerHTML = "";
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(products){
        products.map(function(product){
             var card = document.createElement("div");
             card.className = "card m-2 p-2";
             card.style.width = "200px";
             card.innerHTML = `
                <img src=${product.image} class="card-img-top" height="150">
                <div class="card-header" style="height:140px; overflow:auto">
                    <p>${product.title}</p>
                </div>
                <div class="card-body">
                    <dl>
                        <dt>Price</dt>
                        <dd>${product.price}</dd>
                        <dt>Rating</dt>
                        <dd>${product.rating.rate} <span class="bi bi-star-fill text-success"></span> [${product.rating.count}] </dd>
                    </dl>
                </div>
                <div class="card-footer">
                    <button onclick="AddClick(${product.id})" class="btn btn-danger w-100">
                        <span class="bi bi-cart3"></span>
                        Add to Cart
                    </button>
                </div>
             `;
             document.querySelector("main").appendChild(card);
        })
    })
}

function bodyload(){
    LoadCategories();
    LoadProducts("https://fakestoreapi.com/products");
    GetCount();
}
function CategoryChanged(){
    var categoryName = document.getElementById("lstCategories").value;
    if(categoryName=="all"){
        LoadProducts("https://fakestoreapi.com/products");
    } else {
        LoadProducts(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}
function NavClick(){
    LoadProducts("https://fakestoreapi.com/products");
}
var cartItems = [];
function GetCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
}
function AddClick(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(res){
        return res.json();
    })
    .then(function(product){
        cartItems.push(product);
        alert(`${product.title}\nAdded to Cart`);
        GetCount();
    })
}
function ShowCart(){
    document.querySelector("tbody").innerHTML = "";
    cartItems.map(function(item){
        var tr = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdImage = document.createElement("td");

        tdTitle.innerHTML= item.title;
        tdPrice.innerHTML = item.price;
        tdImage.innerHTML = `<img src=${item.image} width="50" height="50">`;

        tr.appendChild(tdTitle);
        tr.appendChild(tdImage);
        tr.appendChild(tdPrice);

        document.querySelector("tbody").appendChild(tr);
    })
}