# 🛒 Mini-Dealabs

### 🧠 Projet final – Bonne pratique de développement  
**Durée :** 4 heures  
**Auteur :** Roro
**Année :** 2025  
**Langage :** Node.js  

---

## 🎯 Objectif

Le projet **Mini-Dealabs** consiste à créer une **application console (CLI)** en **Node.js** permettant de gérer des **bons plans (“deals”)** avec un **système de votes**, des **statistiques** et une **sauvegarde persistante**, tout en appliquant les bonnes pratiques de développement vues en cours :

- Structure claire et modulaire  
- Validation des données  
- Gestion d’erreurs et logs avec Winston  
- Formatage automatique du code avec ESLint & Prettier  
- Documentation complète générée par **JSDoc**

---

## 🚀 Fonctionnalités principales

| Fonctionnalité | Description |
|----------------|-------------|
| **Créer un deal** | Ajoute un bon plan (titre, description, prix initial/réduit, lien, catégorie) |
| **Lister les deals** | Affiche tous les deals triés par score, avec pourcentage de réduction |
| **Filtrer par catégorie** | Liste automatiquement les catégories existantes |
| **Afficher les détails** | Montre toutes les infos d’un deal (prix, réduction, lien, date, etc.) |
| **Voter Bon / Mauvais** | Permet de noter un deal (+1 ou –1) |
| **Supprimer un deal** | Supprime un deal après confirmation |
| **Voir les statistiques** | Top 3 des deals + répartition par catégorie |
| **Sauvegarde automatique** | Persistance locale dans `data/deals.json` |
| **Documentation JSDoc** | Génération automatique de la documentation HTML |

---

## ⚙️ Installation et utilisation

### 1️⃣ Cloner le projet
Dans **__bash__**
git clone https://github.com/<votre-compte>/mini-dealabs.git
cd mini-dealabs

### 2️⃣ Installer les dépendances
npm install

### 3️⃣ Lancer l’application
node src/index.js

### 4️⃣ Générer la documentation
npx jsdoc -c jsdoc.json

Pour ouvrir:
docs/index.html

📦 Prérequis
Avant de lancer le projet, assure-toi d’avoir installé :
> Node.js ≥ 18
> npm (inclus avec Node.js)

### 📂 Structure du projet
mini-dealabs/
│
├── src/
│   ├── index.js            # Menu principal (CLI)
│   ├── dealManager.js      # Gestion des deals (CRUD)
│   ├── voteManager.js      # Gestion des votes Bon/Mauvais
│   ├── statsManager.js     # Statistiques (top deals, catégories)
│   ├── validators.js       # Validation des entrées utilisateur
│   ├── logger.js           # Configuration du logger Winston
│   ├── data/
│   │   └── deals.json      # Sauvegarde locale des deals
│   └── logs/
│       └── app.log         # Historique des logs
│
├── docs/                   # Documentation HTML (générée par JSDoc)
├── jsdoc.json              # Configuration de la documentation
├── .eslintrc.json          # Configuration ESLint
├── .prettierrc             # Configuration Prettier
├── package.json            # Dépendances et scripts npm
└── README.md               # Documentation du projet

### 🧰 Outils et dépendances
Outil / Librairie	Utilisation
Node.js	Environnement d’exécution
Inquirer	Menus et prompts interactifs dans la console
Chalk	Mise en couleur des textes
Winston	Gestion et journalisation des logs
ESLint / Prettier	Formatage et bonnes pratiques de code
JSDoc	Génération automatique de documentation HTML
FS / Path (natifs)	Lecture/écriture des fichiers JSON

### 💻 Exemple d’utilisation
========================================
        MINI-DEALABS - Bons Plans
========================================
Version 1.3.0

? Que souhaitez-vous faire ?
> Voir tous les deals (triés par score)
  Afficher les détails d’un deal
  Créer un nouveau deal
  Noter un deal (Bon / Mauvais)
  Supprimer un deal
  Voir les statistiques
  Quitter

### Exemple d’affichage d’un deal
#1 Clavier Logitech K120
Clavier simple et robuste
29.99 € → 19.99 € (-33 %)
Catégorie : Informatique
Score : 5
Ajouté le 14/10/2025 13:22:19
──────────────────────────────────────────────

### 🧾 Gestion des logs et persistance
> Toutes les actions sont journalisées dans src/logs/app.log
> Les données sont sauvegardées automatiquement dans src/data/deals.json
> Le fichier JSON est chargé automatiquement au démarrage

Exemple :
[2025-10-14 13:27:42] INFO - Nouveau deal ajouté : Casque HyperX Cloud II
[2025-10-14 13:28:01] INFO - Vote Bon sur Clavier Logitech K120

### 📘 Documentation du projet
La documentation technique du code est générée automatiquement avec JSDoc.
🔹 Générer la documentation
- npx jsdoc -c jsdoc.json
🔹 Ouvrir la documentation
Ouvre le fichier :
- docs/index.html

### 💡 Bonnes pratiques respectées

✔️ Structure modulaire et lisible
✔️ Validation des entrées et gestion d’erreurs
✔️ Utilisation d’ESLint + Prettier
✔️ Journalisation centralisée via Winston
✔️ Documentation JSDoc complète
✔️ Persistance locale via fichiers JSON
✔️ Séparation des responsabilités entre modules

### 🔮 Améliorations futures
- Modifier un deal existant (édition)
- Ajouter un système de commentaires
- Trier les deals par réduction ou par date
- Créer un mode administrateur protégé
- Export CSV / PDF
- Version web via Express + base de données (SQLite / MongoDB)