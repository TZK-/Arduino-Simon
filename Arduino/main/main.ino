#define startButtonPin 2

#define buzzerPin 4

#define redPin 5
#define greenPin 6
#define bluePin 7

#define red 0
#define green 1
#define blue 2

volatile bool startPressed = false;
bool playerLost = false;

//Définis un élément d'une liste chainée
typedef struct node {
    int val;
    struct node* next;
} node_t;

void setup() {
  //Configuration du port série
  Serial.begin(9600);

  //Génère une seed pour le RNG
  randomSeed(analogRead(13));

  //Configure les pins
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(startButtonPin, INPUT);
  attachInterrupt(digitalPinToInterrupt(startButtonPin), startInterrupt, RISING);
}

void loop() {
  if(startPressed) {
    bool playerLost = false;
    int currentRound = 2;

    //Definition de l'élément HEAD
    node_t* headSequence = new node_t;
    headSequence->val = random(3);
    
    //Définition de l'élément current
    node_t* current = headSequence;

    //Génération d'une séquence aléatoire dans une liste chainée
    for(int i = 0; i < currentRound - 1; i++) {
      current->next = new node_t;               //Ajout d'un élément
      current = current->next;                  //Itération
      current->val = random(3);                 //Enregistrement de 0 ou 1 ou 2 dans current
    }

    //Définition de l'élément TAIL
    node_t* tailSequence = current;
    //Pas besoin de terminer la liste ici, un autre élément vas être rajouté
    
    startGame();
    //Tant que le joueur n'a pas perdu :
    while(!playerLost){
      currentRound++;

      //Incrémenter la séquence aléatoire
      tailSequence->next = new node_t;          //Ajout d'un élément
      tailSequence = tailSequence->next;        //Itèration
      tailSequence->val = random(3);            //Enregistrement de 0 ou 1 ou 2 dans TAIL
      tailSequence->next = NULL;                //On termine la liste

      //Afficher la séquence aléatoire
      current = headSequence;
      while (current != NULL) {
        blinkLight(current->val);
        current = current->next;
      }
      
      //Envoyer la séquence au serveur
      sendSequence(headSequence);
      
      //Traitement de la réponse du serveur
      int readByte;
      while ((readByte = Serial.read()) == -1) { //On attend que la réponse soit reçue
        delay(100);
      }

      if(readByte == '1') { //le joueur est correct
        blinkAllLights(3);
      }
      else {                  //le joueur s'est trompé
        playerLost = true;
        blinkAllLights(5);
      }
    }
    startPressed = false;
  }
  delay(100);
}

void startInterrupt() {
  startPressed = true;
}

void startGame() {

  tone(buzzerPin, 100, 100);
  
  //Première vague
  digitalWrite(redPin, HIGH);
  delay(50);
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, HIGH);
  delay(50);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
  delay(50);
  digitalWrite(bluePin, LOW);

  tone(buzzerPin, 100, 100);
  delay(200);
  
  //Deuxième vague
  digitalWrite(bluePin, HIGH);
  delay(50);
  digitalWrite(bluePin, LOW);
  digitalWrite(greenPin, HIGH);
  delay(50);
  digitalWrite(greenPin, LOW);
  digitalWrite(redPin, HIGH);
  delay(50);
  digitalWrite(redPin, LOW);
  delay(200);

  tone(buzzerPin, 100, 100);
  
  blinkAllLights(3);
}

void blinkAllLights(int nbOfTime) {
  for(int i=0; i<=nbOfTime; i++) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, HIGH);
    
    tone(buzzerPin, 100, 100);
    delay(100);
    
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, LOW);
    delay(200);
  }
  delay(800);
}

void blinkLight(int color) {
  tone(buzzerPin, 100, 100);
  switch(color) {
    case red:
      digitalWrite(redPin, HIGH);
      delay(500);
      digitalWrite(redPin, LOW);
      break;
    case green:
      digitalWrite(greenPin, HIGH);
      delay(500);
      digitalWrite(greenPin, LOW);
      break;
    case blue:
      digitalWrite(bluePin, HIGH);
      delay(500);
      digitalWrite(bluePin, LOW);
      break;
    default:
      break;
  }
  delay(1000);
}

void sendSequence(node_t* head) {
  node_t* current = head;
  while (current != NULL) {
    Serial.write(current->val + 1);
    current = current->next;
  }
  Serial.write(0);
}
