import chalk from "chalk";
import { deals } from "./dealManager.js";

export function showStats() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal enregistré."));
    return;
  }

  const top = [...deals].sort((a, b) => b.score - a.score).slice(0, 3);
  const byCategory = deals.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  console.log(chalk.bold("\n Top 3 des meilleurs deals :"));
  console.table(top.map((d) => ({ Titre: d.title, Score: d.score })));

  console.log(chalk.bold("\n Nombre total de deals par catégorie :"));
  console.table(
    Object.entries(byCategory).map(([cat, count]) => ({
      Catégorie: cat,
      Total: count,
    }))
  );
}
