import inquirer from "inquirer";
import chalk from "chalk";
import { deals, saveDeals } from "./dealManager.js";
import { logger } from "./logger.js";

export async function voteDeal() {
  if (deals.length === 0) {
    console.log(chalk.red("Aucun deal à évaluer."));
    return;
  }

  const { index } = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Choisissez un deal à noter :",
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

  if (opinion === "back") {
    console.log(chalk.gray("Retour au menu principal..."));
    return;
  }

  deals[index].score += opinion;
  saveDeals();

  const label = opinion === 1 ? "Bon" : "Mauvais";
  logger.info(`Vote ${label} sur ${deals[index].title}`);
  console.log(
    chalk.cyanBright(
      `Score actuel de "${deals[index].title}" : ${deals[index].score}`
    )
  );
}