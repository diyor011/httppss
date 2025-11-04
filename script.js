const search = document.querySelector('.search');
const sortAsc = document.getElementById('sortAsc');
const sortDesc = document.getElementById('sortDesc');
const sortTprice = document.getElementById('sortTprice')
const sortLprice = document.getElementById('sortLprice')
const productList = document.getElementById('productList');

async function getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();

      allProducts = products;
      renderProducts(allProducts);
    } 
    catch (error) {
      console.error(error + ' — xatolik');
      
    } 
    finally {
      console.log('ishladim');
    }
  }

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <div class="price">$${item.price}</div>
      `;
      productList.appendChild(div);
    });
  }

getProducts();

search.addEventListener('input', (e) => {
    let text = e.target.value.toLowerCase(); 
    let filtered = allProducts.filter(item =>
      item.title.toLowerCase().includes(text)
    );
    renderProducts(filtered);
  });

sortAsc.addEventListener('click', () => {
  const sorted = [...allProducts].sort((a, b) => a.title.localeCompare(b.title));
  renderProducts(sorted);
});

sortDesc.addEventListener('click', (e) => {
    const sorted = [...allProducts].sort((a, b) => b.title.localeCompare(a.title));
    renderProducts(sorted)
  })

sortTprice.addEventListener('click', () => {
  const sorted = [...allProducts].sort((a, b) => b.price - a.price);
  renderProducts(sorted);
});

sortLprice.addEventListener('click', (e) => {
    const sorted = [...allProducts].sort((a,b) => a.price - b.price);
    renderProducts(sorted)
  })
