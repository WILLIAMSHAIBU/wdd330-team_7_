// ProductList.mjs
// Module for dynamically generating product lists

import ProductData from './ProductData.mjs';

export default class ProductList {
  constructor(category, elementId) {
    this.category = category;
    this.elementId = elementId;
    this.dataSource = new ProductData(category);
  }

  async init() {
    const products = await this.dataSource.getData();
    this.renderProductList(products);
  }

  renderProductList(products) {
    const productListElement = document.getElementById(this.elementId);
    if (!productListElement) {
      console.error(`Element with id '${this.elementId}' not found`);
      return;
    }

    productListElement.innerHTML = '';

    products.forEach((product) => {
      const productCard = this.createProductCard(product);
      productListElement.appendChild(productCard);
    });
  }

  createProductCard(product) {
    const li = document.createElement('li');
    li.className = 'product-card';

    const a = document.createElement('a');
    a.href = `product_pages/index.html?product=${product.Id}`;

    const img = document.createElement('img');
    img.src = product.Image;
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
