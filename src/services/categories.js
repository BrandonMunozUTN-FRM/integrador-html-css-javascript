//render de la vista categorias

import { categoriaActiva } from "../../main";
import { handleRenderList } from "../view/store";
import { handleGetProductLocalStorage } from "./persistence/localStorage";

const handlerFilterProductsByCategory = (categoryIn) => {
  const products = handleGetProductLocalStorage();

  switch (categoryIn) {
    case categoriaActiva:
      handleRenderList(products);
      break;
    case "Hamburguesas":
    case "Papas":
    case "Gaseosas":
      const result = products.filter((el) => el.categorias === categoryIn);
      handleRenderList(result);

    default:
      break;
    case "mayorPrecio":
      const resultPrecioMayor = products.sort((a, b) => b.precio - a.precio);
      handleRenderList(resultPrecioMayor);
      break;
    case "menorPrecio":
      const resultPrecioMenor = products.sort((a, b) => a.precio - b.precio);
      handleRenderList(resultPrecioMenor);
      break;
    case "Todo":
      handleRenderList(products);
      break;
  }
};

export const renderCategories = () => {
  const ulList = document.getElementById("listFilter");
  //creamos los elementos dentro de la lista
  ulList.innerHTML = `
    <li id="Todo"> Todos los productos </li>
    <li id="Hamburguesas"> Hamburguesas </li>
    <li id="Papas"> Papas </li>
    <li id="Gaseosas"> Gaseosas </li>
    <li id="mayorPrecio"> Mayor precio </li>
    <li id="menorPrecio"> Menor precio </li>
    `;

  //añadimos dinamicamente el evento click
  const liElement = ulList.querySelectorAll("li");
  liElement.forEach((liElement) => {
    liElement.addEventListener("click", () => {
      handleClick(liElement);
    });
  });

  //verificamos y manejamos el estilo del elemento actuvo
  const handleClick = (elemento) => {
    handlerFilterProductsByCategory(elemento.id);
    liElement.forEach((el) => {
      if (el.classList.contains("liActive")) {
        el.classList.remove("liActive");
      } else {
        if (elemento === el) {
          el.classList.add("liActive");
        }
      }
    });
  };
};
