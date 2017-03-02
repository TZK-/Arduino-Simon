#define startButtonPin 2

#define redPin 5
#define greenPin 6
#define bluePin 7

#define red 0
#define green 1
#define blue 2
volatile bool startPressed = false;


void setup() {
  //Configuration du port série
  Serial.begin(9600);

  //Génère une seed pour le RNG
  randomSeed(analogRead(0));

  //Configure les pins
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  pinMode(startButtonPin, INPUT);
  attachInterrupt(digitalPinToInterrupt(startButtonPin), startInterrupt, RISING);
}


void loop() {
  if(startPressed) {
    bool playerLost = false;
    int currentRound = 2;
    
    startGame();
    //Tant que le joueur n'a pas perdu :
    while(!playerLost){
      currentRound++;
      int sequence[currentRound];

      //Générer et afficher une séquence aléatoire
      for(int i = 0; i < currentRound; i++) {
        sequence[i] = random(3);  //Enregistre 0 ou 1 ou 2 dans le tableau
        blinkLight(sequence[i]);
      }
      
      //Envoyer la séquence au serveur
      sendSequence(sequence);
      
      //Traitement de la réponse du serveur
      while (Serial.available() <= 0) { //On attend que la réponse soit reçue
        delay(10);
      }
      if(Serial.read() == 1) { //le joueur est correct
        blinkAllLights(3);
      }
      else {                  //le joueur s'est trompé
        playerLost = true;
      }
    }
    endGame();
    startPressed = false;
  }
  delay(100);
}

void startInterrupt() {
  startPressed = true;
}

void startGame() {
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

  blinkAllLights(3);
}

void endGame() {
  blinkAllLights(5);
  //Envoyer le score ???
  //TODO
}

void blinkAllLights(int nbOfTime) {
  for(int i=0; i<=nbOfTime; i++) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, HIGH);
    delay(100);
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, LOW);
    delay(200);
  }
  delay(800);
}

void blinkLight(int color) {
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

void sendSequence(int sequence[]) {
  Serial.print("{\"data\":[");
  for(int i = 0; i < sizeof(sequence); i++) {
    switch(sequence[i]) {
      case red:
        Serial.print("\"red\",");
        break;
      case green:
        Serial.print("\"green\",");
        break;
      case blue:
        Serial.print("\"blue\",");
        break;
      default:
        break;
    }
  }
  Serial.println("]}");
}

