//guardar o modificar elementos
import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { closeModal } from "../view/modal";
import { handleGetProductsToStore, handleRenderList } from "../view/store";
import {
  handleGetProductLocalStorage,
  setInLocalStorage,
} from "./persistence/localStorage";

const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
  handleSaveOrModifyElement();
});

const handleSaveOrModifyElement = () => {
  const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categorias = document.getElementById("categoria").value;

  let object = null;
  if (productoActivo) {
    object = {
      ...productoActivo,
      nombre,
      imagen,
      precio,
      categorias,
    };
  } else {
    object = {
      id: new Date().toISOString(),
      nombre,
      imagen,
      precio,
      categorias,
    };
  }
  Swal.fire({
    title: "Correcto!",
    text: "Producto agregado correctamente!",
    icon: "success"
  });

  setInLocalStorage(object);
  handleGetProductsToStore();
  closeModal();
};

//eliminar elemento
export const handleDeleteProduct = () => {
  Swal.fire({
    title: "Desea eliminar el producto?",
    text: "Si lo eliminas sera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  }).then((result) => {
    if (result.isConfirmed) {
      const products = handleGetProductLocalStorage();
      const result = products.filter((el) => el.id != productoActivo.id);

      //setar nuevo array
      localStorage.setItem("products", JSON.stringify(result));
      const newProducts = handleGetProductLocalStorage();
      handleRenderList(newProducts);
      closeModal();
    } else {
        closeModal();
    }
  }); 


};
