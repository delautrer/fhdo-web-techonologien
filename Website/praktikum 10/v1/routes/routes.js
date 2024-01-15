const express = require("express");

const Kurs = require("../models/kurs");
const Studiengang = require("../models/studiengang");
const Lehrperson = require("../models/lehrperson");
const Termin = require("../models/termin");
const Semesterplan = require("../models/semesterplan");

// [TODO]
// Weitere benoetigte Module einbinden
const {
  holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang,
  ermittleSemesterplanZuId,
  ermittleKursZuStudiengangUndId,
  erstelleSemesterplan,
  holeAlleStudiengaenge,
  ermittleStudiengangZuId,
} = require("../models/persistence");

const router = express.Router();

router.get("/index", (req, res) => {
  // [TODO]
  // Implementieren: Liste der Semesterplaene anzeigen,
  // dabei Gruppierung beachten (nach Semester oder Studiengang,
  // Einstellung als Anfrage/Query-Parameter gegeben)
  const gruppierung = req.query.gruppierung;

  const anzuzeigenePlaene =
    gruppierung === "studiengang"
      ? holePlaeneGruppiertNachStudiengang()
      : holePlaeneGruppiertNachSemester();

  res.render("../views/pages/index.ejs", {
    semesterplaeneListe: Object.entries(anzuzeigenePlaene),
  });
});

router.get("/plan", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Semesterplan mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const planId = req.query.id;
  const semesterplan = ermittleSemesterplanZuId(planId);

  res.render("../views/pages/plan.ejs", {
    semesterplanName: semesterplan.name,
    studiengangName: semesterplan.studiengang.name,
    semesterplanSemester: semesterplan.semester,
    semesterplanKurse: semesterplan.kurse,
  });
});

router.get("/kurs", (req, res, next) => {
  // [TODO]
  // Implementieren: Detailseite zum Kurs mit der gegebenen
  // ID anzeigen (ID als Anfrage/Query-Parameter gegeben)
  const studiengangId = req.query.sid;
  const kursId = req.query.kid;
  const kurs = ermittleKursZuStudiengangUndId(studiengangId, kursId);
  res.render("../views/pages/kurs.ejs", {
    kursModulId: kurs.modulId,
    kursTyp: kurs.typ,
    kursStudiengang: kurs.studiengang,
    kursSemester: kurs.semester,
    kursGruppenbuchstaben: kurs.gruppenbuchstaben,
    lehrpersonId: kurs.lehrperson.id,
    lehrpersonNachname: kurs.lehrperson.nachname,
    terminWochentag: kurs.termin.wochentag,
    terminStunde: kurs.termin.beginn,
    terminDauer: kurs.termin.dauer,
    terminRaum: kurs.termin.raum,
  });
});

router.get("/neu", (req, res) => {
  // [TODO]
  // Schritt 1 des Formulares zum Erstellen eines neuen
  // Semesterplanes anzeigen
  res.render("../views/pages/neu-schritt1.ejs", {
    studiengaenge: holeAlleStudiengaenge(),
  });
});

router.post("/waehleStudiengang", (req, res) => {
  // [TODO]
  // Formular zum Erstellen eines neuen Semesterplanes:
  // Den in Schritt 1 gewaehlten Studiengang ermitteln
  // (ID als Anfrage/Query-Parameter gegeben) und passend
  // dazu Schritt 2 anzeigen (z.B. nur die Kurse, die auch
  // zum gewaehlten Studiengang gehoeren)
  const studiengangId = req.body.id;
  if (!studiengangId) {
    res.redirect("/neu");
  }
  const studiengang = ermittleStudiengangZuId(studiengangId);

  const kurse = studiengang.kurse.filter(
    (kurs) => kurs.studiengang == studiengangId
  );

  res.render("../views/pages/neu-schritt2.ejs", {
    kurse: kurse,
    studiengangName: studiengang.name,
    studiengangId: studiengang.id,
  });
});

router.post("/neu", (req, res) => {
  // [TODO]
  // Schritt 2 wurde durchgefuehrt: Neuen Semesterplan aus
  // den eingebenen Daten erstellt und ueber das Persistenz-
  // Modul sichern. Danach auf die Seite "Liste der Semesterplaene"
  // umleiten.
  const studiengangId = req.body.studiengangId;
  if (!studiengangId) {
    res.redirect("/neu");
  }
  const name = req.body.name;
  const semester = req.body.semester;
  const jahr = req.body.jahr;
  const kurse = req.body.kurse;
  erstelleSemesterplan(name, semester, jahr, studiengangId, kurse);
  res.redirect("/index");
});

router.get("/", (req, res) => {
  res.redirect("/index");
});

module.exports = router;