/**
 * Vérifie qu'un prix entré par l'utilisateur est valide.
 * @function validatePrice
 * @param {string|number} value - La valeur saisie par l'utilisateur.
 * @returns {true|string} Retourne `true` si la valeur est valide,
 */
export function validatePrice(value) {
  // Convertit la valeur en nombre
  const num = Number(value);

  // Vérifie que la valeur est bien un nombre positif
  // Si non valide -> renvoie un message d'erreur, sinon true
  return isNaN(num) || num <= 0 ? "Veuillez entrer un prix valide." : true;
}
