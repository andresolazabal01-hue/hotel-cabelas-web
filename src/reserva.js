// Puente entre los botones repartidos por el sitio y el modal, que vive
// una sola vez en App. Un evento evita tener que pasar props por todo
// el árbol solo para abrirlo.
export const EVENTO_RESERVA = "cabelas:abrir-reserva";

export const TIPOS = [
  "Tipo 1 (2 camas matrimoniales)",
  "Tipo 2 (1 cama matrimonial)",
  "Tipo 3 (Cama Queen size)",
  "El Triángulo (Apartamento)",
];

// tipo es opcional: si viene, el modal abre con ese tipo ya elegido.
export function abrirReserva(tipo) {
  window.dispatchEvent(
    new CustomEvent(EVENTO_RESERVA, { detail: { tipo: tipo ?? "" } }),
  );
}
