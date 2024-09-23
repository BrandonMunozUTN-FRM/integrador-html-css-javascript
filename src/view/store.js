//STORE


import { setProductoActivo } from "../../main.js";
import { handleGetProductLocalStorage } from "../services/persistence/localStorage.js";
import { openModal } from "./modal.js";

//funcion que se encarga de traer los elementos y llaamr al render
export const handleGetProductsToStore = () => {
  const products = handleGetProductLocalStorage();
  handleRenderList(products);
};

//se encarga de filtrar y renderizar la seccion con todos sus respectivos elementos
export const handleRenderList = (productosIn) => {
  //filtrado de array por categorias
  const burgers = productosIn.filter((el) => el.categorias === "Hamburguesas");
  const papas = productosIn.filter((el) => el.categorias === "Papas");
  const gaseosas = productosIn.filter((el) => el.categorias === "Gaseosas");
  //renderiza los elementos de la seccion
  const renderProductGroup = (productos, title) => {
    if (productos.length > 0) {
      const productosHTML = productos.map((producto, index) => {
        return `
        <div class='containerTargetItem' id='producto-${producto.categorias}-${index}'> 
          <div> 
            <img src=${producto.imagen} />
            <div >
              <h2>${producto.nombre}</h2>
            </div>
            <div class='targetProps'>
            <p><b>Precio:</b> $ ${producto.precio}</p>
            </div>
          </div>
        </div>`;
      });

      //retorna la seccion  con todos los elementos dentro
      return `
      <section class='sectionStore'>
      <div class='containerTitleSection'>
      <h3> ${title}</h3>
      </div>
      <div class='containerPoductStore'>
      ${productosHTML.join("")}
      </div>
      </section>

      `;
    } else {
      return "";
    }
  };

  //renderizar cada uno de los productos dentro de su categoria
  const appContainer = document.getElementById("storeContainer");
  appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

  //añaden los eventos de manera dinamica
  const addEvents = (productosIn) => {
    productosIn.forEach((element, index) => {
      const productContainer = document.getElementById(
        `producto-${element.categorias}-${index}`
      );
      productContainer.addEventListener("click", () => {
        setProductoActivo(element);
        openModal();
      });
    });
  };

  addEvents(burgers);
  addEvents(papas);
  addEvents(gaseosas);
};
