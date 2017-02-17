#define BUTTON 2

void setup() {
	Serial.begin(9600);

	pinMode(BUTTON, INPUT);
}


void loop() {
 
	int buttonState = digitalRead(BUTTON);
  
	if(buttonState == HIGH){
		writeString("{data:[blue, red, blue, green]}");
	}

	delay(100);
}


void writeString(String stringData) { // Used to serially push out a String with Serial.write()

  for (int i = 0; i < stringData.length(); i++)
  {
    Serial.write(stringData[i]);   // Push each char 1 by 1 on each loop pass
  }

}// end writeString 
