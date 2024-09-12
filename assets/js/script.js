function addToCart(event){
  const product = event.target.parentNode;
  const productName = product.querySelector('.card-name').innerText;
  const productImage = product.querySelector('.produto').src;
  const productPrice = product.querySelector('.card-price').innerText;

  const productData ={
    name: productName,
    image: productImage,
    price: productPrice
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existingProductIndex = cart.findIndex(item => item.name === productName);
  
  if (existingProductIndex !== -1){
    cart[existingProductIndex].quantity += 1;
    showMessage('Adicionado ao carrinho!');
  } else {
    productData.quantity = 1;
    cart.push(productData);
    showMessage('Adicionado ao carrinho!');
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function showMessage(message){
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  document.body.appendChild(messageElement);

  setTimeout(() =>{
    messageElement.classList.add('show');
  }, 100);

  setTimeout(() =>{
    messageElement.classList.remove('show');
    setTimeout(() =>{
      messageElement.remove();
    }, 700);
  }, 1500);
}
