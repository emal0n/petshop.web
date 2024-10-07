function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart');
  const container = document.querySelector('.container-tabela');
  const containerPedido = document.querySelector('.container-pedido');
  const carrinhoVazio = document.querySelector('.container-carrinho-vazio');

  cartList.innerHTML = '';

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const cartItem = document.createElement('li');
      cartItem.id = 'product';

      cartItem.innerHTML = `
        <div class="product-info">
          <img id="itemImg" src="${item.image}" alt="${item.name}">
          <p id="itemName">${item.name}</p>
        </div>
        <div class="product-price">
          <p id="itemPrice">${item.price}</p>
        </div>
        <div class="button-group">
          <button id="decreaseBtn" onclick="decreaseQuantity(${index})">-</button>
          <input type="number" id="itemQnt" value="1" min="1" max="100" readonly>
          <button id="increaseBtn" onclick="increaseQuantity(${index})">+</button>
          <p class="remove-text" style="cursor:pointer;" onclick="removeItem(${index})">Retirar do carrinho</p>
        </div>
      `;

      cartList.appendChild(cartItem);
    });

    container.style.display = 'block';
    containerPedido.style.display = 'block';
    carrinhoVazio.style.display = 'none';
  } else {
    cartList.innerHTML = '<p>Carrinho vazio</p>';
    container.style.display = 'none';
    containerPedido.style.display = 'none';
    carrinhoVazio.style.display = 'block';
  }
}

function increaseQuantity(index) {
  const quantityInput = document.querySelector(`#cart li:nth-child(${index + 1}) input`);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity(index) {
  const quantityInput = document.querySelector(`#cart li:nth-child(${index + 1}) input`);
  if (parseInt(quantityInput.value) > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex(i => i.name === item.name);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

window.onload = displayCart;

let calculoRealizado = false;

function addToCart(event) {
  const product = event.target.parentNode;
  const productData = {
    name: product.querySelector('.card-name').innerText,
    image: product.querySelector('.produto').src,
    price: product.querySelector('.card-price').innerText,
    quantity: 1
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = cart.findIndex(item => item.name === productData.name);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push(productData);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  showMessage('Adicionado');
}

function showMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;
  document.body.appendChild(messageElement);

  setTimeout(() => messageElement.classList.add('show'), 100);
  setTimeout(() => {
    messageElement.classList.remove('show');
    setTimeout(() => messageElement.remove(), 700);
  }, 1500);
}

function buscarEndereco() {
  const cep = document.getElementById('cep').value;
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        document.getElementById('endereco').innerText = "CEP não encontrado.";
      } else {
        document.getElementById('endereco').innerHTML = `<div id="end">${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}</div>`;
        document.getElementById('economico').innerHTML = `<div id="eco"><strong>CORREIOS</strong> <br><span class="cor-frete"><strong>R$20,44</strong></span><br> 10 dias úteis</div>`;
        document.getElementById('expresso').innerHTML = `<div id="eco"><strong>SEDEX</strong><br><span class="cor-frete"><strong>R$35,50</strong></span><br> 7 dias úteis*</div>`;
        
        const valorEntrega = document.getElementById('valor-entrega');
        if (valorEntrega) {
          valorEntrega.innerText = 'R$20,44';
        }
        if (!calculoRealizado) {
          updateTotal(20.44);
          calculoRealizado = true;
        }
      }
    })
    .catch(error => console.error('Erro:', error));
}

function updateTotal(freight) {
  const totalElement = document.querySelector('.content-pre-total p:last-of-type');
  const totalValue = parseFloat(totalElement.innerText.replace('R$', '').replace(',', '.')) + freight;
  totalElement.innerText = `R$${totalValue.toFixed(2).replace('.', ',')}`;

  const pricElement = document.getElementById('pric');
  const pricValue = parseFloat(pricElement.innerText.replace('R$', '').replace(',', '.')) + freight;
  pricElement.innerText = `R$${pricValue.toFixed(2).replace('.', ',')}`;
}

let cupomAplicado = false;

function aplicarCupom() {
  if (cupomAplicado) {
    document.getElementById('cupom-message').innerText = 'Sho10 aplicado';
    return;
  }

  const cupomInput = document.getElementById('cupom-input').value.toUpperCase();
  if (cupomInput === 'SHO10') {
    updateTotal(-10);
    document.getElementById('cupom').innerHTML = `<div class="content-entrega"><p>Cupom</p><p id="valor-entrega">-R$10,00</p></div>`;
    document.getElementById('cupom-message').innerText = 'Sho10 aplicado';
    document.getElementById('cupom-message2').innerText = '';
    cupomAplicado = true;
  } else {
    document.getElementById('cupom-message2').innerText = 'Cupom inválido!';
  }
}
