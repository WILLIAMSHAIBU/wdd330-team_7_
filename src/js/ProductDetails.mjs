// ProductDetails.mjs
// Module for dynamically producing product detail pages

import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    // Update page title
    document.title = `Sleep Outside | ${this.product.Name}`;

    // Update product brand
    const productBrand = document.querySelector('.product-detail h3');
    if (productBrand && this.product.Brand) {
      productBrand.textContent = this.product.Brand.Name;
    }

    // Update product title
    const productTitle = document.querySelector('.product-detail h2');
    if (productTitle && this.product.NameWithoutBrand) {
      productTitle.textContent = this.product.NameWithoutBrand;
    }

    // Update product image
    const productImage = document.querySelector('.product-detail img');
    if (productImage && this.product.PrimaryLarge) {
      // Use PrimaryLarge for product detail images
      const imageUrl = this.product.PrimaryLarge || this.product.Image;
      // Handle API image paths - if it's not a full URL, prepend the base URL
      productImage.src = imageUrl.startsWith('http')
        ? imageUrl
        : `${import.meta.env.VITE_SERVER_URL}${imageUrl}`;
      productImage.alt = this.product.Name;
    }

    // Update product price
    const productPrice = document.querySelector('.product-card__price');
    if (productPrice && this.product.FinalPrice) {
      productPrice.textContent = `$${this.product.FinalPrice.toFixed(2)}`;
    }

    // Update product color
    const productColor = document.querySelector('.product__color');
    if (productColor && this.product.Colors && this.product.Colors.length > 0) {
      productColor.textContent = this.product.Colors[0].ColorName;
    }

    // Update product description
    const productDescription = document.querySelector('.product__description');
    if (productDescription && this.product.DescriptionHtmlSimple) {
      productDescription.textContent = this.product.DescriptionHtmlSimple;
    }

    // Update add to cart button with product ID
    const addToCartButton = document.getElementById('addToCart');
    if (addToCartButton && this.product.Id) {
      addToCartButton.dataset.id = this.product.Id;
    }
  }
}
