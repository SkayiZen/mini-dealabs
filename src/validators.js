export function validatePrice(value) {
  const num = Number(value);
  return isNaN(num) || num <= 0 ? "Veuillez entrer un prix valide." : true;
}