export function LoadCart(){
    let cartString = localStorage.getItem("cart"); //["item1,item2"]

    if(cartString==null){
        localStorage.setItem("cart","[]")// if odnt have cart string we assign empty arry
        cartString = "[]"
    }

    const cart= JSON.parse(cartString);
    return cart

}

export function addToCart(product,quantity){

    let cart = LoadCart();

    const existingItemIndex = cart.findIndex( // this is a predefine function  
        (item)=>{
            return item.productId == product.productId
        }
    )

    if(existingItemIndex== -1){
        //item is not in the cart
        if(quantity < 1){
            console.log("Quantity must be at least 1");
            return 
        }
        const cartItem = {
            productId: product.productId,
            name: product.name,
            price: product.price,
            labeledPrice:product.labeledPrice,
            quantity:product.quantity,
            images:product.images
        }
        cart.push(cartItem);
    }else{
        //item is in the 
        const existingItem = cart[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity
        if(newQuantity<1){
            cart = cart.filter(
                (item)=>{
                    return item.productId != product.productId
                }
            )
        }else{
            existingItem.quantity = newQuantity
        }
    }

    localStorage.setItem("cart",JSON.stringify(cart));

}