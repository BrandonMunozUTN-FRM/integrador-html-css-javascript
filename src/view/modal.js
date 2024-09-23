import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

const buttonCancel = document.getElementById("cancelButton");
buttonCancel.addEventListener("click", () => {
  closeModal();
});

//funciones abrir cerrar modal
export const openModal = () => {
  const modal = document.getElementById("modalPopUP");
  modal.style.display = "flex";
  const deleteButton = document.getElementById("delButton");

  if (productoActivo) {
    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }
  if (productoActivo) {
    const nombre = document.getElementById("nombre"),
      imagen = document.getElementById("img"),
      precio = document.getElementById("precio"),
      categorias = document.getElementById("categoria");

    categorias.value = productoActivo.categorias;
    imagen.value = productoActivo.imagen;
    precio.value = productoActivo.precio;
    nombre.value = productoActivo.nombre;
  }
};

export const closeModal = () => {
  const modal = document.getElementById("modalPopUP");
  modal.style.display = "none";
  setProductoActivo(null);
  resetModal();
};

const resetModal = () => {
  const nombre = document.getElementById("nombre"),
    imagen = document.getElementById("img"),
    precio = document.getElementById("precio"),
    categorias = document.getElementById("categoria");

  categorias.value = "Seleccione una categoria";
  imagen.value = "";
  precio.value = 0;
  nombre.value = "";
};

const deleteButton = document.getElementById("delButton");
deleteButton.addEventListener("click", () => {
  handleButtonDelete();
});
const handleButtonDelete = () => {
  handleDeleteProduct();
};
