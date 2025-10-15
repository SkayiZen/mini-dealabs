import chalk from "chalk"; // Librairie pour colorer le texte dans la console
import { deals } from "./dealManager.js"; // Importation de la liste des deals existants

/**
 * Affiche les statistiques générales sur les deals.
 * - Le top 3 des deals les mieux notés (par score)
 * - Le nombre de deals par catégorie
 */
export function showStats() {
  // Vérifie s'il y a au moins un deal enregistré
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal enregistré."));
    return;
  }

  // Trie les deals par score décroissant et prend les 3 premiers
  const top = [...deals].sort((a, b) => b.score - a.score).slice(0, 3);

  // Regroupe les deals par catégorie et compte combien il y en a dans chacune
  const byCategory = deals.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  // Affiche le top 3 des meilleurs deals
  console.log(chalk.bold("\n Top 3 des meilleurs deals :"));
  console.table(
      top.map((d) => ({
        Titre: d.title,
        Score: d.score,
      }))
  );

  // Affiche le nombre total de deals regroupés par catégorie
  console.log(chalk.bold("\n Nombre total de deals par catégorie :"));
  console.table(
      Object.entries(byCategory).map(([cat, count]) => ({
        Catégorie: cat,
        Total: count,
      }))
  );
}
