#define startButton 2
#define blue 4
#define red 5
#define green 6
volatile bool startPressed = false;
bool playerLost = false;

void setup() {
  Serial.begin(9600);
    
  pinMode(blue, OUTPUT);
  pinMode(red, OUTPUT);
  pinMode(green, OUTPUT);
  pinMode(startButton, INPUT);
  attachInterrupt(digitalPinToInterrupt(startButton), startInterrupt, RISING);
}


void loop() {
 
  int buttonState = digitalRead(startButton);
  
  if(buttonState == HIGH){
  	writeString("{data:[blue, red, blue, green]}");
  }
  
  if(startPressed) {
    startGame();
    //Tant que le joueur n'a pas perdu :
    int rounds = 3;
//    while(!playerLost){
//      //Générer une séquence aléatoire
//      //Afficher la séquence
//      //Récupérer la réponse du joueur
//      //Traitement de la réponse
//    }
    endGame();
    playerLost = true;
  }
  
  delay(100);
}


void writeString(String stringData) { // Used to serially push out a String with Serial.write()

  for (int i = 0; i < stringData.length(); i++)
  {
    Serial.write(stringData[i]);   // Push each char 1 by 1 on each loop pass
  }

}// end writeString 

void startInterrupt() {
  startPressed = true;
}

void startGame() {
  //Première vague
  digitalWrite(blue, HIGH);
  delay(50);
  digitalWrite(blue, LOW);
  digitalWrite(red, HIGH);
  delay(50);
  digitalWrite(red, LOW);
  digitalWrite(green, HIGH);
  delay(50);
  digitalWrite(green, LOW);
  
  delay(200);

  //Deuxième vague
  digitalWrite(green, HIGH);
  delay(50);
  digitalWrite(green, LOW);
  digitalWrite(red, HIGH);
  delay(50);
  digitalWrite(red, LOW);
  digitalWrite(blue, HIGH);
  delay(50);
  digitalWrite(blue, LOW);
  delay(200);

  blinkAllLights(3);
}

void endGame() {
  blinkAllLights(5);
  //Envoyer le score
}

void blinkAllLights(int nbOfTime){
  for(int i=0; i<=nbOfTime; i++) {
    digitalWrite(blue, HIGH);
    digitalWrite(red, HIGH);
    digitalWrite(green, HIGH);
    delay(100);
    digitalWrite(blue, LOW);
    digitalWrite(red, LOW);
    digitalWrite(green, LOW);
    delay(200);
  }
  delay(800);
}
