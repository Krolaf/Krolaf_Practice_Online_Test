// Déclaration des variables pour le plateau
let board; // Référence au canvas du plateau
let boardWidth = 500; // Largeur du plateau (500 pixels)
let boardHeight = 500; // Hauteur du plateau (500 pixels)
let context; // Contexte de dessin 2D du canvas

// Déclaration des variables pour le joueur
let playerWidth = 80; // Largeur du joueur (500 pixels pour les tests, 80 pixels en temps normal)
let playerHeight = 10; // Hauteur du joueur (10 pixels)
let playerVelocityX = 10; // Vitesse de déplacement du joueur, se déplace de 10 pixels à chaque déplacement

let player = {
    x : boardWidth/2 - playerWidth/2, // Position horizontale du joueur, centré sur le plateau
    y : boardHeight - playerHeight - 5, // Position verticale du joueur, en bas du plateau avec un espace de 5 pixels
    width: playerWidth, // Largeur du joueur
    height: playerHeight, // Hauteur du joueur
    velocityX : playerVelocityX // Vitesse de déplacement du joueur (déplacement horizontal)
}


// Déclaration des variables pour la balle
let ballWidth = 25; // Largeur de la balle (15 pixels)
let ballHeight = 25; // Hauteur de la balle (15 pixels)
let ballVelocityX = 2; // Vitesse de déplacement horizontal de la balle (2 pixels)
let ballVelocityY = 1; // Vitesse de déplacement vertical de la balle (1 pixel)

let ball = {
    x : boardWidth/2, // Position horizontale initiale de la balle, centrée sur le plateau
    y : boardHeight/2, // Position verticale initiale de la balle, centrée sur le plateau
    width: ballWidth, // Largeur de la balle
    height: ballHeight, // Hauteur de la balle
    velocityX : ballVelocityX, // Vitesse de déplacement horizontal de la balle
    velocityY : ballVelocityY // Vitesse de déplacement vertical de la balle
}

// Déclaration des variables pour les blocs
let blockArray = []; // Tableau pour stocker les blocs
let blockWidth = 50; // Largeur des blocs (50 pixels)
let blockHeight = 10; // Hauteur des blocs (10 pixels)
let blockColumns = 8; // Nombre de colonnes de blocs
let blockRows = 3; // Nombre initial de lignes de blocs (ajoute plus de blocs)
let blockMaxRows = 10; // Nombre maximum de lignes de blocs
let blockCount = 0; // Compteur de blocs pour suivre le nombre restant

let blockX = 15; // Position horizontale initiale des blocs
let blockY = 45; // Position verticale initiale des blocs

let score = 0; // Score du joueur
let gameOver = false; // Variable pour indiquer si le jeu est terminé

window.onload = function() {
    board = document.getElementById("board"); // Récupération du canvas du plateau
    board.height = boardHeight; // Définition de la hauteur du canvas
    board.width = boardWidth; // Définition de la largeur du canvas
    context = board.getContext("2d"); // Obtention du contexte de dessin 2D pour le canvas (pour dessiner dans le canvas)

    // Dessiner le joueur initialement
    context.fillStyle = "red"; // Couleur rouge pour le joueur
    context.fillRect(player.x, player.y, player.width, player.height); // Dessiner le joueur

    requestAnimationFrame(update); // Démarrer l'animation du jeu
    document.addEventListener("keydown", movePlayer); // Ajouter un écouteur d'événement pour gérer le déplacement du joueur en fonction des touches appuyées

    // Créer les blocs
    createBlocks();
}


function update() {
    requestAnimationFrame(update); // Demande une nouvelle mise à jour de l'animation

    // Arrêter le dessin si le jeu est terminé
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height); // Efface le contenu du canvas pour préparer un nouveau rendu

    // Dessiner le joueur
    context.fillStyle = "red"; // Couleur rouge pour le joueur
    context.fillRect(player.x, player.y, player.width, player.height); // Dessiner le joueur

    // Dessiner la balle
context.fillStyle = "green"; // Couleur verte pour la balle
ball.x += ball.velocityX; // Met à jour la position horizontale de la balle selon sa vitesse
ball.y += ball.velocityY; // Met à jour la position verticale de la balle selon sa vitesse

// Créer un effet de relief en utilisant des dégradés radiaux
const gradient = context.createRadialGradient(
  ball.x + ball.width / 2, ball.y + ball.height / 2, 0,
  ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2
);
gradient.addColorStop(0, "rgb(120, 200, 50)");// Couleur verte pomme au centre de la balle

gradient.addColorStop(1, "rgb(0, 20, 0)");// Couleur plus foncée de vert sur le bord de la balle pour simuler l'ombre


context.fillStyle = gradient;
context.beginPath(); // Commencer un nouveau chemin pour dessiner le cercle
context.arc(ball.x + ball.width / 2, ball.y + ball.height / 2, ball.width / 2, 0, 2 * Math.PI); // Dessiner un cercle avec centre (ball.x + ball.width / 2, ball.y + ball.height / 2), rayon ball.width / 2, et angle de début 0 et angle de fin 2 * Math.PI (dessine un cercle complet)
context.closePath(); // Fermer le chemin

context.fill(); // Appliquer le remplissage pour dessiner le cercle (la balle)



    // Rebond de la balle sur le joueur
    if (topCollision(ball, player) || bottomCollision(ball, player)) {
        ball.velocityY *= -1; // Inverse la direction verticale de la balle
    } else if (leftCollision(ball, player) || rightCollision(ball, player)) {
        ball.velocityX *= -1; // Inverse la direction horizontale de la balle
    }

    if (ball.y <= 0) { 
        // Si la balle touche le plafond
        ball.velocityY *= -1; // Inverse la direction verticale de la balle
    } else if (ball.x <= 0 || (ball.x + ball.width >= boardWidth)) {
        // Si la balle touche la droite ou la gauche
        ball.velocityX *= -1; // Inverse la direction horizontale de la balle
    } else if (ball.y + ball.height >= boardHeight) {
        // Si la balle touche le sol, afficher le message "Game Over" et mettre fin au jeu
        context.fillStyle = "red"; // Définit la couleur du texte
        context.font = "60px sans-serif";//taille et police
        context.fillText("Game Over: ", 85,350)//position du message (x 10,y400)
        context.fillStyle = "skyblue";
        context.font = "20px sans-serif";
        context.fillText("Appuyez sur 'Espace' pour recommencer", 70, 400);
        gameOver = true; // Mettre la variable gameOver à true pour indiquer que le jeu est terminé
    }

    //blocks
    context.fillStyle = "rgb(80, 0, 190)"; // Définir la couleur de remplissage pour les blocs à "purple" (violet)

    for (let i = 0; i < blockArray.length; i++) {
        let block = blockArray[i]; // Récupérer le bloc actuel à l'index i dans le tableau blockArray

        // Vérifier si le bloc n'est pas déjà cassé (break = false)
        if (!block.break) {
            // Vérifier les collisions de la balle avec le bloc

            if (topCollision(ball, block) || bottomCollision(ball, block)) {
                block.break = true; // Le bloc casse (disparaît)
                ball.velocityY *= -1; // La balle change de direction verticale (rebondit)

                score += 100; // Augmenter le score de 100 points
                blockCount -= 1; // Décrémenter le nombre de blocs restants

            } else if (leftCollision(ball, block) || rightCollision(ball, block)) {
                block.break = true; // Le bloc casse (disparaît)
                ball.velocityX *= -1; // La balle change de direction horizontale (rebondit)

                score += 100; // Augmenter le score de 100 points
                blockCount -= 1; // Décrémenter le nombre de blocs restants
            }

            context.fillRect(block.x, block.y, block.width, block.height); // Dessiner le bloc
        }
    }

    //next level
    if (blockCount == 0) {
        score += 100 * blockRows * blockColumns; // Bonus de points pour avoir terminé le niveau
        blockRows = Math.min(blockRows + 1, blockMaxRows); // Augmenter le nombre de lignes de blocs pour le prochain niveau, avec une limite maximale (blockMaxRows)
        createBlocks(); // Créer de nouveaux blocs pour le prochain niveau
    }

    //score
    context.fillStyle = "red";
    context.font = "30px sans-serif"; // Définir la police pour afficher le score
    context.fillText(score, 10, 35); // Dessiner le score à la position (10, 25) dans le canvas

}
// Fonction pour vérifier si une position xPosition est en dehors des limites du plateau de jeu
function outOfBounds(xPosition) {
    return (xPosition < 0 || xPosition + playerWidth > boardWidth);
}

// Fonction pour gérer le déplacement du joueur en fonction des touches fléchées et de la touche "Espace"
// Fonction pour gérer le déplacement du joueur en fonction des touches fléchées
function movePlayerWithKeys(e) {
    if (gameOver) {
        // Si le jeu est terminé (gameOver est vrai)...
        if (e.code == "Space") {
            // ...et si la touche "Espace" est pressée, réinitialise le jeu
            resetGame();
            console.log("RESET");
        }
        return; // Quitte la fonction sans faire d'autre action si le jeu est terminé
    }

    // Si le jeu n'est pas terminé, gère le déplacement du joueur en fonction des touches fléchées gauche/droite
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        // Calcul de la prochaine position horizontale du joueur vers la gauche
        let nextplayerX = player.x - player.velocityX;
        // Vérification si le déplacement vers la gauche ne fait pas sortir le joueur du plateau
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX; // Met à jour la position horizontale du joueur
        }
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        // Calcul de la prochaine position horizontale du joueur vers la droite
        let nextplayerX = player.x + player.velocityX;
        // Vérification si le déplacement vers la droite ne fait pas sortir le joueur du plateau
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX; // Met à jour la position horizontale du joueur
        }
    }
}

// Fonction pour gérer le déplacement du joueur en fonction des touches fléchées et de la touche "Espace"
function movePlayer(e) {
    if (gameOver) {
        // Si le jeu est terminé (gameOver est vrai)...
        if (e.code == "Space") {
            // ...et si la touche "Espace" est pressée, réinitialise le jeu
            resetGame();
            console.log("RESET");
        }
        return; // Quitte la fonction sans faire d'autre action si le jeu est terminé
    }

    // Si le jeu n'est pas terminé, gère le déplacement du joueur en fonction des touches fléchées gauche/droite ou A/D
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        // Calcul de la prochaine position horizontale du joueur vers la gauche
        let nextplayerX = player.x - player.velocityX;
        // Vérification si le déplacement vers la gauche ne fait pas sortir le joueur du plateau
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX; // Met à jour la position horizontale du joueur
        }
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        // Calcul de la prochaine position horizontale du joueur vers la droite
        let nextplayerX = player.x + player.velocityX;
        // Vérification si le déplacement vers la droite ne fait pas sortir le joueur du plateau
        if (!outOfBounds(nextplayerX)) {
            player.x = nextplayerX; // Met à jour la position horizontale du joueur
        }
        // player.x += player.velocityX;  // Version alternative pour déplacer le joueur
    }
}



// Fonction pour détecter la collision entre deux objets a et b (utilisée pour la collision entre la balle et les blocs)
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   
           a.x + a.width > b.x &&   
           a.y < b.y + b.height &&  
           a.y + a.height > b.y;    
}

// Fonction pour vérifier si la balle entre en collision avec un bloc par le haut
function topCollision(ball, block) { 
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

// Fonction pour vérifier si la balle entre en collision avec un bloc par le bas
function bottomCollision(ball, block) { 
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}

// Fonction pour vérifier si la balle entre en collision avec un bloc par la gauche
function leftCollision(ball, block) { 
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}

// Fonction pour vérifier si la balle entre en collision avec un bloc par la droite
function rightCollision(ball, block) { 
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}


// Fonction pour créer les blocs du jeu
function createBlocks() {
    blockArray = []; // Vide le tableau blockArray pour préparer un nouvel ensemble de blocs

    // Double boucle pour créer les blocs en fonction du nombre de colonnes (blockColumns) et de lignes (blockRows)
    for (let c = 0; c < blockColumns; c++) { // Boucle pour les colonnes
        for (let r = 0; r < blockRows; r++) { // Boucle pour les lignes
            let block = {
                x : blockX + c*blockWidth + c*10, // Coordonnée x du bloc, espacement de 10 pixels entre les colonnes
                y : blockY + r*blockHeight + r*10, // Coordonnée y du bloc, espacement de 10 pixels entre les lignes
                width : blockWidth, // Largeur du bloc
                height : blockHeight, // Hauteur du bloc
                break : false // Propriété indiquant si le bloc est cassé (initialisé à false, non cassé)
            }
            blockArray.push(block); // Ajoute le bloc créé dans le tableau blockArray
        }
    }

    blockCount = blockArray.length; // Met à jour le nombre total de blocs (blockCount) avec la longueur du tableau blockArray
}

// Fonction pour réinitialiser le jeu
function resetGame() {
    gameOver = false; // Remet la variable gameOver à false pour indiquer que le jeu n'est pas terminé

    // Réinitialise les propriétés du joueur à leur état initial
    player = {
        x : boardWidth/2 - playerWidth/2, // Position horizontale initiale du joueur, centrée sur le plateau
        y : boardHeight - playerHeight - 5, // Position verticale initiale du joueur, en bas du plateau avec un espace de 5 pixels
        width: playerWidth, // Largeur du joueur
        height: playerHeight, // Hauteur du joueur
        velocityX : playerVelocityX // Vitesse de déplacement du joueur (déplacement horizontal)
    }

    // Réinitialise les propriétés de la balle à leur état initial
    ball = {
        x : boardWidth/2, // Position horizontale initiale de la balle, centrée sur le plateau
        y : boardHeight/2, // Position verticale initiale de la balle, centrée sur le plateau
        width: ballWidth, // Largeur de la balle
        height: ballHeight, // Hauteur de la balle
        velocityX : ballVelocityX, // Vitesse de déplacement horizontal de la balle
        velocityY : ballVelocityY // Vitesse de déplacement vertical de la balle
    }

    blockArray = []; // Vide le tableau blockArray pour supprimer les blocs actuels
    blockRows = 3; // Réinitialise le nombre initial de lignes de blocs à 3 (vous pouvez changer cette valeur si vous le souhaitez)
    score = 0; // Réinitialise le score du joueur à 0
    createBlocks(); // Appelle la fonction createBlocks() pour créer de nouveaux blocs pour le prochain niveau
}