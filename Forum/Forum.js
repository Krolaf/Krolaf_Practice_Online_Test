// Variable pour stocker le pseudo de l'utilisateur
let username = "";

// Fonction appelée lorsque l'utilisateur clique sur "Commencer"
function startChat() {
  // Récupérer l'élément d'entrée pour le pseudo par son ID
  const usernameInput = document.getElementById("username");
  // Obtenir la valeur saisie par l'utilisateur (le pseudo)
  username = usernameInput.value;

  // Vérifier si le pseudo n'est pas vide avant de poursuivre
  if (username !== "") {
    // Désactiver l'entrée du pseudo pour empêcher les changements
    usernameInput.disabled = true;

    // Désactiver le bouton "Commencer" pour éviter de recommencer l'enregistrement du pseudo
    document.querySelector(".chat-header button").disabled = true;

    // Créer le message système qui indique que l'utilisateur s'est enregistré avec son pseudo
    const systemMessage = "Vous vous êtes enregistré en tant que: " + username;

    // Appeler la fonction appendMessage() pour ajouter le message système à la boîte de chat
    // Le deuxième argument (true) indique qu'il s'agit d'un message système
    appendMessage(systemMessage, true);
  }
}

// Fonction appelée lorsque l'utilisateur clique sur "Envoyer"
function sendMessage() {
  // Récupérer l'élément de saisie du message par son ID
  const messageInput = document.getElementById("message");
  // Obtenir la valeur saisie par l'utilisateur (le message)
  const message = messageInput.value;

  // Vérifier si le message n'est pas vide avant de le traiter
  if (message !== "") {
    // Obtenir l'heure actuelle au format HH:mm (heures:minutes) en utilisant la fonction toLocaleTimeString()
    // Les options { hour: '2-digit', minute: '2-digit' } indiquent que nous voulons afficher les heures et les minutes avec deux chiffres (ex: 02:30 au lieu de 2:30)
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Formater le message en incluant le pseudo de l'utilisateur et l'heure actuelle
    const formattedMessage = `${username} (${timestamp}): ${message}`;

    // Appeler la fonction appendMessage() pour ajouter le message formaté à la boîte de chat
    // Le deuxième argument (false) indique que ce n'est pas un message système, mais un message envoyé par l'utilisateur
    appendMessage(formattedMessage, false);

    // Vider le champ de saisie du message pour la prochaine saisie
    messageInput.value = "";
  }
}

// Fonction pour ajouter un message à la boîte de chat
function appendMessage(message, isSystemMessage) {
  // Créer un élément div pour afficher le message
  const messageElement = document.createElement("div");

  // Ajouter le contenu du message au div créé
  messageElement.textContent = message;

  // Si c'est un message système, mettre le texte en italique pour le distinguer
  if (isSystemMessage) {
    messageElement.style.fontStyle = "italic";
  }

  // Récupérer l'élément qui contient les messages du chat par son ID
  const chatMessages = document.getElementById("chatMessages");

  // Ajouter le nouveau message à la boîte de chat
  chatMessages.appendChild(messageElement);

  // Faire défiler la boîte de chat vers le bas pour afficher le nouveau message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}



function toggleDropChat(event) {
    // Empêche le comportement par défaut du lien
    event.preventDefault();
  
    // Récupère le contenu du dropdown à partir de l'élément cliqué
    var dropdownContent = event.target.nextElementSibling;
  
    // Vérifie si le dropdown est affiché ou caché
    if (dropdownContent.style.display === "block") {
      // Le dropdown est affiché, on le cache
      dropdownContent.style.display = "none";
    } else {
      // Le dropdown est caché, on l'affiche
      dropdownContent.style.display = "block";
    }
  }