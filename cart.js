let cart = JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [];

function showcart(cart){
    document.querySelector("#cart").innerHTML = "";

    cart.forEach((cart, index) => {
        document.querySelector("#cart").innerHTML += `

        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img id="img" src="${cart.img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" id="title">${cart.title}</h5>
                    <p class="card-text" id="price">R${cart.price}</p>
                    <div>
                        <input type="number" name="Quantity" class="form-control mb-2" id="quantity${index}" min="1" value="${cart.qty}" onchange="updateCart(${index})">
                    <div/>
                    <p>Total = R${parseFloat(cart.qty * cart.price).toFixed(2)}</p>
                    <button class="btn btn-danger mt-2" onclick="removeProduct(${index})">Remove</button>
                </div>
                </div>
            </div>
        </div>
        `;
    });

    document.querySelector("#cart").innerHTML += `
        <h2>Total is = R${calculateTotal()}</h2>

        <div class="d-grid gap-2 mt-4 col-6 mx-auto">
            <button type="button" class="btn btn-primary btn-lg mb-4" onclick="checkout()">Checkout</button>
        </div>
    
        `;
    
}

showcart(cart);


function updateCart(index){
    let qty = document.querySelector(`#quantity${index}`).value;

    cart[index] = { ...cart[index], qty};
    localStorage.setItem("cart", JSON.stringify(cart));
    showcart(cart);
}

function removeProduct(index){
    let warning = "Are you sure you want to remove this item";
    if(confirm(warning) == true){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showcart(cart);
    }
    
}

function calculateTotal(){
    let total = 0;
    cart.forEach((product => {
        total = total + product.price * product.qty;
    }))
    return total.toFixed(2);
}

function checkout(){
    let text = `Your total amount is R${calculateTotal()}.\nAre you sure you want to checkout?`;
    if(calculateTotal() == 0){
        alert("You didn't add anything to cart")
    }else if (confirm(text) == true) {
        localStorage.removeItem("cart");
        alert("You have checked out successfully!");
        location.reload();
    }
}