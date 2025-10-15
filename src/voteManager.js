import inquirer from "inquirer"; // Librairie pour créer des menus interactifs dans la console
import chalk from "chalk"; // Permet de colorer et styliser le texte affiché
import { deals, saveDeals } from "./dealManager.js"; // Importation des deals et de la fonction de sauvegarde
import { logger } from "./logger.js"; // Importation du logger pour tracer les actions

/*
 * Permet à l'utilisateur de voter pour un deal existant.
 * L'utilisateur peut attribuer un "Bon deal" (+1) ou un "Mauvais deal" (-1),
 * ce qui modifie le score du deal correspondant.
 */
export async function voteDeal() {
  // Vérifie s'il existe des deals à évaluer
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal à évaluer."));
    return;
  }

  // Affiche une liste de deals à choisir pour voter
  const { index } = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Choisissez un deal à noter :",
      choices: [
        // Génère une liste des deals existants avec leur score
        ...deals.map((d, i) => ({
          name: `${d.title} (Score : ${d.score})`,
          value: i,
        })),
        new inquirer.Separator(),
        { name: "Retour", value: "back" }, // Option pour revenir sans voter
      ],
    },
  ]);

  // Si l'utilisateur choisit "Retour", on quitte la fonction
  if (index === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  // Demande à l'utilisateur son avis sur le deal choisi
  const { opinion } = await inquirer.prompt([
    {
      type: "list",
      name: "opinion",
      message: "Que pensez-vous de ce deal ?",
      choices: [
        { name: "Bon deal", value: 1 },
        { name: "Mauvais deal", value: -1 },
        { name: "Retour", value: "back" },
      ],
    },
  ]);

  // Gestion du retour sans action
  if (opinion === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  // Mise à jour du score du deal selon le vote (+1 ou -1)
  deals[index].score += opinion;

  // Sauvegarde des données mises à jour dans le fichier JSON
  saveDeals();

  // Création d'un libellé lisible pour le log
  const label = opinion === 1 ? "Bon" : "Mauvais";

  // Journalisation de l'action dans les logs
  logger.info(`Vote ${label} sur ${deals[index].title}`);

  // Affichage du score mis à jour à l'utilisateur
  console.log(
      chalk.cyanBright(
          `Score actuel de "${deals[index].title}" : ${deals[index].score}`
      )
  );
}
