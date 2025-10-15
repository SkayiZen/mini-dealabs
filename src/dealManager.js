/**
 * @file dealManager.js
 * @description Gère la création, la lecture, la recherche, la suppression et l’affichage détaillé des deals pour le projet Mini-Dealabs.
 * @module dealManager
 */

import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { validatePrice } from "./validators.js";
import { logger } from "./logger.js";

// 📁 Définition des chemins de données
const dataDir = path.resolve("data");
const dataPath = path.join(dataDir, "deals.json");

/**
 * Tableau contenant tous les deals chargés en mémoire.
 * @type {Array<Object>}
 */
export let deals = [];

/**
 * Charge les deals sauvegardés depuis le fichier JSON local.
 * Crée automatiquement le dossier /data et le fichier deals.json s’ils n’existent pas.
 * @function
 * @returns {void}
 */
export function loadDeals() {
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    if (fs.existsSync(dataPath)) {
      const rawData = fs.readFileSync(dataPath, "utf-8");
      deals = JSON.parse(rawData);
      logger.info(`${deals.length} deal(s) chargés depuis deals.json`);
    } else {
      deals = [];
      fs.writeFileSync(dataPath, "[]", "utf-8");
    }
  } catch (err) {
    logger.error(`Erreur lors du chargement des deals : ${err.message}`);
  }
}

/**
 * Sauvegarde la liste actuelle des deals dans le fichier JSON local.
 * @function
 * @returns {void}
 */
export function saveDeals() {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(deals, null, 2), "utf-8");
    logger.info("Sauvegarde effectuée dans deals.json");
  } catch (err) {
    logger.error(`Erreur lors de la sauvegarde : ${err.message}`);
  }
}

/**
 * Crée un nouveau deal à partir des réponses utilisateur (via CLI Inquirer).
 * Enregistre ensuite le deal dans le fichier local et journalise l’action.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function createDeal() {
  try {
    const answers = await inquirer.prompt([
      { name: "title", message: "Titre du deal :" },
      { name: "description", message: "Description :" },
      { name: "initialPrice", message: "Prix initial :", validate: validatePrice },
      { name: "discountPrice", message: "Prix réduit :", validate: validatePrice },
      { name: "link", message: "Lien du deal :" },
      { name: "category", message: "Catégorie :" },
    ]);

    const newDeal = {
      ...answers,
      score: 0,
      createdAt: new Date().toLocaleString(),
    };

    deals.push(newDeal);
    saveDeals();
    logger.info(`Nouveau deal ajouté : ${answers.title}`);
    console.log(chalk.green("\nDeal ajouté avec succès !"));
  } catch (err) {
    logger.error(`Erreur lors de la création : ${err.message}`);
  }
}

/**
 * Affiche la liste des deals triés par score décroissant.
 * Inclut le calcul du pourcentage de réduction entre les prix.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function listDeals() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal enregistré."));
    return;
  }

  console.log(chalk.bold("\nListe des deals triés par score :\n"));

  deals
    .sort((a, b) => b.score - a.score)
    .forEach((deal, i) => {
      const initial = Number(deal.initialPrice);
      const discount = Number(deal.discountPrice);

      let reduction = 0;
      if (initial > 0 && discount > 0 && discount < initial) {
        reduction = Math.round(((initial - discount) / initial) * 100);
      }

      console.log(
        chalk.yellow.bold(`#${i + 1}`),
        chalk.bold(deal.title),
        "\n",
        chalk.gray(deal.description || "Pas de description"),
        "\n",
        chalk.whiteBright(`${initial.toFixed(2)}€ → ${discount.toFixed(2)}€`) +
          (reduction > 0
            ? chalk.green(` (-${reduction}%)`)
            : chalk.dim(" (Aucune réduction)")),
        "\n",
        chalk.cyan(`Catégorie : ${deal.category}`),
        "\n",
        chalk.magenta(`Score : ${deal.score}`),
        "\n",
        chalk.gray(`Ajouté le ${deal.createdAt}`),
        "\n" + chalk.dim("──────────────────────────────────────────────")
      );
    });
}

/**
 * Permet à l’utilisateur de sélectionner une catégorie existante
 * et affiche tous les deals correspondants.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function searchDeal() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal disponible."));
    return;
  }

  const categories = [...new Set(deals.map((d) => d.category))];

  if (categories.length === 0) {
    console.log(chalk.red("Aucune catégorie trouvée dans les deals."));
    return;
  }

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choisissez une catégorie à afficher :",
      choices: [
        ...categories.map((cat) => ({ name: cat, value: cat })),
        new inquirer.Separator(),
        { name: "Retour", value: "back" },
      ],
    },
  ]);

  if (choice === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  const results = deals.filter(
    (d) => d.category.toLowerCase() === choice.toLowerCase()
  );

  if (results.length === 0) {
    console.log(chalk.red("Aucun deal trouvé pour cette catégorie."));
    return;
  }

  console.log(chalk.bold(`\nDeals trouvés dans la catégorie "${choice}" :\n`));

  results
    .sort((a, b) => b.score - a.score)
    .forEach((deal, i) => {
      const initial = Number(deal.initialPrice);
      const discount = Number(deal.discountPrice);
      const reduction =
        initial > 0 && discount > 0 && discount < initial
          ? Math.round(((initial - discount) / initial) * 100)
          : 0;

      console.log(
        chalk.yellow(`#${i + 1}`),
        chalk.bold(deal.title),
        "\n",
        chalk.gray(deal.description || "Pas de description"),
        "\n",
        `${initial.toFixed(2)}€ → ${discount.toFixed(2)}€` +
          (reduction > 0
            ? chalk.green(` (-${reduction}%)`)
            : chalk.dim(" (Aucune réduction)")),
        "\n",
        `Score : ${deal.score}`,
        "\n",
        chalk.gray(`Ajouté le ${deal.createdAt}`),
        "\n" + chalk.dim("----------------------------------------")
      );
    });

  console.log(
    chalk.gray(
      `\nTotal : ${results.length} deal(s) dans la catégorie "${choice}".`
    )
  );
}

/**
 * Affiche les détails complets d’un deal choisi par l’utilisateur.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function showDealDetails() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal enregistré."));
    return;
  }

  const { index } = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Choisissez un deal à afficher :",
      choices: [
        ...deals.map((d, i) => ({
          name: `${d.title} (Score : ${d.score})`,
          value: i,
        })),
        new inquirer.Separator(),
        { name: "Retour", value: "back" },
      ],
    },
  ]);

  if (index === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  const deal = deals[index];
  const initial = Number(deal.initialPrice);
  const discount = Number(deal.discountPrice);
  const reduction =
    initial > 0 && discount > 0 && discount < initial
      ? Math.round(((initial - discount) / initial) * 100)
      : 0;

  console.clear();
  console.log(chalk.cyan("========================================"));
  console.log(chalk.bold(deal.title));
  console.log(chalk.cyan("========================================\n"));

  console.log(`Description : ${deal.description || "Aucune"}`);
  console.log(`Catégorie : ${deal.category}`);
  console.log(`Score : ${deal.score}`);
  console.log(`Prix initial : ${initial.toFixed(2)} €`);
  console.log(`Prix réduit : ${discount.toFixed(2)} €`);
  console.log(
    reduction > 0 ? chalk.green(`Réduction : -${reduction}%`) : "Réduction : 0%"
  );
  console.log(`Date d’ajout : ${deal.createdAt}`);
  console.log(`Lien : ${deal.link || "Aucun lien fourni"}`);

  console.log("\n----------------------------------------\n");

  await inquirer.prompt([
    {
      type: "input",
      name: "back",
      message: chalk.gray("Appuyez sur Entrée pour revenir au menu principal..."),
    },
  ]);
}

/**
 * Supprime un deal choisi par l’utilisateur après confirmation.
 * Met à jour le fichier JSON et journalise l’action.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function deleteDeal() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal à supprimer."));
    return;
  }

  const { index } = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Choisissez un deal à supprimer :",
      choices: [
        ...deals.map((d, i) => ({
          name: `${d.title} (Score : ${d.score})`,
          value: i,
        })),
        new inquirer.Separator(),
        { name: "Retour", value: "back" },
      ],
    },
  ]);

  if (index === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  const deal = deals[index];

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Voulez-vous vraiment supprimer "${deal.title}" ?`,
      default: false,
    },
  ]);

  if (!confirm) {
    console.log(chalk.yellow("\nSuppression annulée."));
    return;
  }

  deals.splice(index, 1);
  saveDeals();

  logger.info(`Deal supprimé : ${deal.title}`);
  console.log(chalk.green(`\n"${deal.title}" a été supprimé avec succès.`));
}
