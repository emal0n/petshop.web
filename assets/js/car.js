function displayCart(){
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartList = document.getElementById('cart');
  const container = document.querySelector('.container-tabela');
  const containerPedido = document.querySelector('.container-pedido');
  const carrinhoVazio = document.querySelector('.container-carrinho-vazio');

  cartList.innerHTML = '';

  if (cart && cart.length > 0){
  cart.forEach((item, index) =>{
    const cartItem = document.createElement('li');
      cartItem.setAttribute('id', 'product');
    const productInfo = document.createElement('div');
      productInfo.classList.add('product-info');
    const productPrice = document.createElement('div');
      productPrice.classList.add('product-price');
    const itemImage = document.createElement('img');
      itemImage.setAttribute('id', 'itemImg');
      itemImage.src = item.image;
      itemImage.alt = item.name;
    const itemName = document.createElement('p');
      itemName.setAttribute('id', 'itemName');
      itemName.textContent = item.name;
    const itemQuantity = document.createElement('input');
      itemQuantity.setAttribute('type', 'number');
      itemQuantity.setAttribute('id', 'itemQnt');
      itemQuantity.setAttribute('min', '1');
      itemQuantity.setAttribute('max', '100');
      itemQuantity.setAttribute('value', '1');
      itemQuantity.setAttribute('readonly', true);
    const increaseButton = document.createElement('button');
      increaseButton.setAttribute('id', 'increaseBtn');
      increaseButton.textContent = '+';
      increaseButton.addEventListener('click', () =>{
        increaseQuantity(itemQuantity);
      });
    const decreaseButton = document.createElement('button');
      decreaseButton.setAttribute('id', 'decreaseBtn');
      decreaseButton.textContent = '-';
      decreaseButton.addEventListener('click', () =>{
        decreaseQuantity(itemQuantity);
      });
    const itemPrice = document.createElement('p');
      itemPrice.setAttribute('id', 'itemPrice');
      itemPrice.textContent = item.price;
    const removeText = document.createElement('p');
      removeText.classList.add('remove-text');
      removeText.textContent = 'Retirar do carrinho';
      removeText.style.cursor = 'pointer';
      removeText.addEventListener('click', () =>{
        removeItem(index);
      });
    const buttonGroup = document.createElement('div');
      buttonGroup.classList.add('button-group');
      buttonGroup.appendChild(decreaseButton);
      buttonGroup.appendChild(itemQuantity);
      buttonGroup.appendChild(increaseButton);
      buttonGroup.appendChild(removeText);
      productInfo.appendChild(itemImage);
      productInfo.appendChild(itemName);
      productPrice.appendChild(itemPrice);
      cartItem.appendChild(productInfo);
      cartItem.appendChild(productPrice);
      cartItem.appendChild(buttonGroup);
      cartList.appendChild(cartItem);
    });
    container.style.display = 'block';
    containerPedido.style.display = 'block';
    carrinhoVazio.style.display = 'none';
  }else{
    cartList.innerHTML = '<p>Carrinho vazio</p>';
    container.style.display = 'none';
    containerPedido.style.display = 'none';
    carrinhoVazio.style.display = 'block';
  }
}

function increaseQuantity(itemQuantity){
  itemQuantity.value = parseInt(itemQuantity.value) + 1;
}

function decreaseQuantity(itemQuantity){
  if (parseInt(itemQuantity.value) > 1){
    itemQuantity.value = parseInt(itemQuantity.value) - 1;
  }
}

function removeItem(index){
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function addToCart(item){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

window.onload = displayCart;

var calculoRealizado = false;

function buscarEndereco(){
var cep = document.getElementById('cep').value;
var url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro){
                    document.getElementById('endereco').innerText = "CEP não encontrado.";
                }else{
                    var endereco = `<div id="end">${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}</div>`;
                    document.getElementById('endereco').innerHTML = endereco;
                    var economico = `<div id="eco"><strong>CORREIOS</strong> <br>
                                        <span class="cor-frete"><strong>R$20,44</strong></span><br> 10 dias úteis</div>`;
                    document.getElementById('economico').innerHTML = economico;
                    var expresso = `<div id="eco"><strong>SEDEX</strong><br>
                                        <span class="cor-frete"><strong>R$35,50</strong></span><br> 7 dias úteis*</div>`;
                    document.getElementById('expresso').innerHTML = expresso;
                    var valorEntrega = document.getElementById('valor-entrega');
                    if (valorEntrega) {
                        valorEntrega.innerText = 'R$20,44';
                    } if(!calculoRealizado){
                      var total = document.querySelector('.content-pre-total p:last-of-type');
                      var totalValue = parseFloat(total.innerText.replace('R$', '').replace(',', '.'));
                      var newTotal = totalValue + 20.44;
                        total.innerText = 'R$' + newTotal.toFixed(2).replace('.', ',');
                      var pricElement = document.getElementById('pric');
                      var pricValue = parseFloat(pricElement.innerText.replace('R$', '').replace(',', '.'));
                      var newPricValue = pricValue + 20.44;
                        pricElement.innerText = 'R$' + newPricValue.toFixed(2).replace('.', ',');
                        calculoRealizado = true;
                    }
                }
            })
            .catch(error => console.error('Erro:', error));
}

  var cupomAplicado = false;
        function aplicarCupom(){
            if (cupomAplicado) {
                var cupomMessage = document.getElementById('cupom-message');
                cupomMessage.innerText = 'Sho10 aplicado';
                return;
            }
            var cupomInput = document.getElementById('cupom-input');
            var cupomValue = cupomInput.value.toUpperCase();
            if (cupomValue === 'SHO10') {
                var total = document.querySelector('.content-pre-total p:last-of-type');
                var totalValue = parseFloat(total.innerText.replace('R$', '').replace(',', '.'));
                var newTotal = totalValue - 10;
                total.innerText = 'R$' + newTotal.toFixed(2).replace('.', ',');
                var stotal = document.querySelector('.box-des p:last-of-type');
                var stotalValue = parseFloat(stotal.innerText.replace('R$', '').replace(',', '.'));
                var snewTotal = stotalValue - 10;
                stotal.innerText = 'R$' + snewTotal.toFixed(2).replace('.', ',');
                var pricElement = document.getElementById('pric');
                var pricValue = parseFloat(pricElement.innerText.replace('R$', '').replace(',', '.'));
                var newPricValue = pricValue - 10;
                pricElement.innerText = 'R$' + newPricValue.toFixed(2).replace('.', ',');
                var cupom = `<div class="content-entrega">
                                <p>Cupom</p>
                                <p id="valor-entrega">-R$10,00</p>
                            </div>`;
                document.getElementById('cupom').innerHTML = cupom;
                var cupomMessage = document.getElementById('cupom-message');
                cupomMessage.innerText = 'Sho10 aplicado';
                var cupomMessageInvalido = document.getElementById('cupom-message2');
                cupomMessageInvalido.innerText = '';
                cupomMessageInvalido.style.display = 'none';
                cupomAplicado = true;
            }else{
                var cupomMessageInvalido = document.getElementById('cupom-message2');
                cupomMessageInvalido.innerText = 'Cupom inválido!';
                return;
            }
}