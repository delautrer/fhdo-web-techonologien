const express = require("express");
// [TODO]
// Weitere benoetigte Module einbinden

const router = express.Router();

router.get("/index", (req, res) => {
  // [TODO]
  // Implementieren: Liste der Semesterplaene anzeigen,
  // dabei Gruppierung beachten (nach Semester oder Studiengang,
  // Einstellung als Anfrage/Query-Parameter gegeben)
});

router.get("/plan", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Semesterplan mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
});

router.get("/kurs", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Kurs mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
});

router.get("/neu", (req, res) => {
  // [TODO]
  // Schritt 1 des Formulares zum Erstellen eines neuen
  // Semesterplanes anzeigen
});

router.post("/waehleStudiengang", (req, res) => {
  // [TODO]
  // Formular zum Erstellen eines neuen Semesterplanes:
  // Den in Schritt 1 gewaehlten Studiengang ermitteln
  // (ID als Anfrage/Query-Parameter gegeben) und passend
  // dazu Schritt 2 anzeigen (z.B. nur die Kurse, die auch
  // zum gewaehlten Studiengang gehoeren)
});

router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.
});

router.get("/", (req, res) => {
  // [TODO]
  // Auf die Seite "Liste der Semesterplaene" umleiten.
});

module.exports = router;
