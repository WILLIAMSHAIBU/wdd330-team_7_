// ProductList.mjs
// Module for dynamically generating product lists

import ProductData from './ProductData.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderProductList(list);
  }

  renderProductList(products) {
    if (!this.listElement) {
      console.error('List element not found');
      return;
    }

    this.listElement.innerHTML = '';

    products.forEach((product) => {
      const productCard = this.createProductCard(product);
      this.listElement.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const li = document.createElement('li');
    li.className = 'product-card';

    const a = document.createElement('a');
    a.href = `product_pages/index.html?product=${product.Id}`;

    const img = document.createElement('img');
    // Use PrimaryMedium for product list images
    const imageUrl = product.PrimaryMedium || product.Image;
    // Handle API image paths - if it's not a full URL, prepend the base URL
    img.src = imageUrl.startsWith('http')
      ? imageUrl
      : `${import.meta.env.VITE_SERVER_URL}${imageUrl}`;
    img.alt = product.NameWithoutBrand || product.Name;

    const brand = document.createElement('h3');
    brand.className = 'card__brand';
    brand.textContent = product.Brand ? product.Brand.Name : '';

    const name = document.createElement('h2');
    name.className = 'card__name';
    name.textContent = product.NameWithoutBrand || product.Name;

    const price = document.createElement('p');
    price.className = 'product-card__price';
    price.textContent = `$${product.FinalPrice.toFixed(2)}`;

    a.appendChild(img);
    a.appendChild(brand);
    a.appendChild(name);
    a.appendChild(price);

    li.appendChild(a);

    return li;
  }
}
