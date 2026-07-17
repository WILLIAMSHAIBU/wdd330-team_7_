import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = 'tents';
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const productList = new ProductList(category, dataSource, listElement);
productList.init();
