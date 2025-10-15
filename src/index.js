import inquirer from "inquirer";
import chalk from "chalk";
import {
  createDeal,
  listDeals,
  searchDeal,
  showDealDetails,
  deleteDeal,
  loadDeals,
} from "./dealManager.js";
import { voteDeal } from "./voteManager.js";
import { showStats } from "./statsManager.js";

console.clear();
console.log(chalk.cyan("========================================"));
console.log(chalk.bold("        MINI-DEALABS - Bons Plans"));
console.log(chalk.cyan("========================================"));
console.log(chalk.gray("Version 1.3.0\n"));

loadDeals();

async function mainMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.yellow("Que souhaitez-vous faire ?"),
      choices: [
        { name: "Voir tous les deals (triés par score)", value: "list" },
        { name: "Afficher les détails d’un deal", value: "details" },
        { name: "Rechercher un deal", value: "search" },
        { name: "Créer un nouveau deal", value: "create" },
        { name: "Noter un deal (Bon / Mauvais)", value: "vote" },
        { name: "Supprimer un deal", value: "delete" },
        { name: "Voir les statistiques", value: "stats" },
        { name: "Quitter", value: "quit" },
      ],
    },
  ]);

  switch (choice) {
    case "list":
      await listDeals();
      break;
    case "details":
      await showDealDetails();
      break;
    case "search":
      await searchDeal();
      break;
    case "create":
      await createDeal();
      break;
    case "vote":
      await voteDeal();
      break;
    case "delete":
      await deleteDeal();
      break;
    case "stats":
      await showStats();
      break;
    case "quit":
      console.log(chalk.red("\nMerci d’avoir utilisé Mini-Dealabs !"));
      process.exit(0);
  }
  console.log();
  await mainMenu();
}

mainMenu();
