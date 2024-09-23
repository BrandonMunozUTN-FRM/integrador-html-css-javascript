import { renderCategories } from "./src/services/categories";
import { handleSearchProductByName } from "./src/services/searchBar";
import { openModal } from "./src/view/modal";
import { handleGetProductsToStore } from "./src/view/store";
import "./style.css";

//APLICACION

export let categoriaActiva = null;
export let setCategoriaActiva = (categoriaIn) => {
  categoriaActiva = categoriaIn;
};

export let productoActivo = null;
export let setProductoActivo = (productoIn) => {
  productoActivo = productoIn;
};

handleGetProductsToStore();
renderCategories();

//HEADER
const buttonAdd = document.getElementById("buttonAddElement");
buttonAdd.addEventListener("click", () => {
  openModal();
});


//buttonSearch
const buttonSearch = document.getElementById("buttonSearch");
buttonSearch.addEventListener("click", () => {
  handleSearchProductByName();

  
});