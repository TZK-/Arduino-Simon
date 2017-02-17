# Arduino-Simon

Le but est de recréer le jeu du Simon avec un Arduino interfacé avec un serveur web pour les intéractions homme/machine.

## Cahier des charges

### Description

Le jeu éclaire une des trois couleurs parmis le rouge, le bleu et le vert, et produit un son associé à celle-ci. 
Le joueur doit alors appuyer sur la touche de la couleur qui vient de s'allumer dans un délai assez court.

Le jeu répète la même couleur et le même son, puis ajoute au hasard une nouvelle couleur. Le joueur doit reproduire cette nouvelle séquence. Chaque fois que le joueur reproduit correctement la séquence, le jeu ajoute une nouvelle couleur.

### Principe

On démarre le jeu en appuyant sur un interrrupteur sur l'Arduino. 

Une séquence formée de trois couleurs est ensuite affichée et l'utilisateur doit la reproduire en cliquant sur des boutons de la même couleur, sur la page web, dans un temps imparti.

Si le schéma est identique à celui généré par l'arduino, ce dernier rajoute au schéma précédent une couleur aléatoire. Et ainsi de suite jusqu'à ce qu'une erreur soit commise ou que le temps soit écoulé.

A la fin de la partie, un score est publié sur la page web et à travers un réseau social de type twitter. Le score correspond au nombre de séquences réussites.

### Liste des tâches

- Montage électronique sur l'arduino(Yohan):
	- Mise en place des LED et de l'émetteur sonore
- Programmation arduino:
	- Affichage des séquences de jeu via des LEDs de couleurs (Yohan + Thibault)
	- Envoi des données au serveur (Thibault)
	- Gestion des réponses (gagné / perdu) (Yohan)
- Programmation du serveur Web
	- Réception des séquences générées par l'arduino (Thibault)
	- Envoi de la séquence entrée par l'utilisateur à l'arduino (Gwenaël)
	- Gestion de partie (gagnée, perdue -> envoi des résultats) (Gwenaël + Enzo)
- Programmation de l'interface homme/machine (Enzo)

### Equipe

Gwenaël Cruz - Yohan Garde - Thibault Granada - Enzo Muhlinghaus
