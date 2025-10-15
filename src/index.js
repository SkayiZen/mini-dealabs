import inquirer from "inquirer"; // Librairie pour créer des menus et interactions dans la console
import chalk from "chalk"; // Librairie pour styliser et colorer le texte dans la console
import {
  createDeal,
  listDeals,
  searchDeal,
  showDealDetails,
  deleteDeal,
  loadDeals,
} from "./dealManager.js"; // Import des fonctions de gestion des deals
import { voteDeal } from "./voteManager.js"; // Import de la fonction de vote (bon / mauvais deal)
import { showStats } from "./statsManager.js"; // Import de la fonction d'affichage des statistiques

// Efface la console pour un affichage propre au lancement
console.clear();

// Affiche le titre du programme avec un style coloré
console.log(chalk.cyan("========================================"));
console.log(chalk.bold("        MINI-DEALABS - Bons Plans"));
console.log(chalk.cyan("========================================"));
console.log(chalk.gray("Version 1.3.0\n"));

// Chargement des deals sauvegardés depuis le fichier JSON local
loadDeals();

    /*
    Fonction principale du programme.
    Elle affiche un menu interactif permettant à l'utilisateur
    de choisir une action (afficher, créer, voter, supprimer, etc.).
    Après chaque action, le menu est rechargé automatiquement.
    */
async function mainMenu() {
  // Création du menu principal avec Inquirer
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

  // Gestion du choix utilisateur via un switch
  switch (choice) {
    case "list":
      // Affiche la liste de tous les deals triés par score
      await listDeals();
      break;

    case "details":
      // Affiche les détails complets d’un deal spécifique
      await showDealDetails();
      break;

    case "search":
      // Permet de rechercher ou filtrer les deals par catégorie
      await searchDeal();
      break;

    case "create":
      // Crée un nouveau deal (saisie guidée dans la console)
      await createDeal();
      break;

    case "vote":
      // Permet de voter pour un deal (Bon ou Mauvais)
      await voteDeal();
      break;

    case "delete":
      // Supprime un deal choisi après confirmation
      await deleteDeal();
      break;

    case "stats":
      // 📊 Affiche les statistiques (top deals, répartition par catégorie, etc.)
      await showStats();
      break;

    case "quit":
      // 🚪 Quitte proprement l’application
      console.log(chalk.red("\nMerci d’avoir utilisé Mini-Dealabs !"));
      process.exit(0);
  }

  // Ligne vide pour lisibilité dans la console
  console.log();

  // Retourne automatiquement au menu principal après chaque action
  await mainMenu();
}

// Lancement du programme en appelant la fonction principale
mainMenu();
