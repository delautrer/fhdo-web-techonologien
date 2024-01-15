const fetcher = require("./scheduleFetcher");

// [TODO]
// Weitere benoetigte Module einbinden
const Kurs = require("../models/kurs");
const Studiengang = require("../models/studiengang");
const Lehrperson = require("../models/lehrperson");
const Termin = require("../models/termin");
const Semesterplan = require("../models/semesterplan");

const lehrangebot = [];
const semesterplaene = [];

/**
 * Initialisiert die Daten der Anwendung, also die verfuegbaren Studiengaenge mit den
 * zugehoerigen Kursen. Die Daten werden zunaechst asynchron über das scheduleFetcher-Modul
 * abgerufen (Nutzung der Promise-API mit "then"). Danach werden die erhaltenen Daten
 * mittels map-Funktion in die Datenstrukturen unserer Anwendung konvertiert. Schliesslich
 * wird jeder erhaltene Datensatz im lehrangebot-Array hinzugefuegt.
 */

const initialisiereLehrangebot = () => {
  fetcher.fetchScheduleData().then((daten) => {
    daten
      .map(
        (stdg) =>
          new Studiengang(
            stdg.sname,
            stdg.name,
            stdg.courses.map(
              (kurs) =>
                new Kurs(
                  kurs.courseId,
                  kurs.name,
                  kurs.courseType,
                  kurs.courseOfStudy,
                  kurs.termId,
                  kurs.studentSet,
                  new Lehrperson(kurs.lecturerId, kurs.lecturerSurname),
                  new Termin(
                    kurs.timeSlotBegin,
                    kurs.timeSlotDuration,
                    kurs.weekday,
                    kurs.roomId
                  )
                )
            )
          )
      )
      .forEach((datensatz) => lehrangebot.push(datensatz));
    console.log("Basisdaten initialisiert.");
  });
};

// [TODO]
// Weitere Funktionen aus der Aufgabenstellung implementieren

const ermittleStudiengangZuId = (id) => {
  return lehrangebot.find((studiengang) => studiengang.id == id);
};

const ermittleKursZuStudiengangUndId = (studiengangId, kursId) => {
  const studiengang = ermittleStudiengangZuId(studiengangId);
  return studiengang.getKursById(kursId);
};

const holeAlleStudiengaenge = () => {
  return lehrangebot;
};

const erstelleSemesterplan = (name, semester, jahr, studiengangId, kurse) => {
  const studiengang = ermittleStudiengangZuId(studiengangId);
  const semesterplan = new Semesterplan(
    name,
    `${semester} ${jahr}`,
    studiengang
  );

  const kurseObj = kurse.map((kursid) =>
    ermittleKursZuStudiengangUndId(studiengangId, kursid)
  );

  semesterplan.addKurse(kurseObj);
  semesterplaene.push(semesterplan);
};

const ermittleSemesterplanZuId = (id) => {
  return semesterplaene.find((semesterplan) => semesterplan.id == id);
};

const holePlaeneGruppiertNachSemester = () => {
  return gruppiereNach(semesterplaene, "semester");
};

const holePlaeneGruppiertNachStudiengang = () => {
  return gruppiereNach(semesterplaene, "studiengang");
};

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});

// [TODO]
// Schnittstelle des Moduls definieren: Lehrangebot-Array und Funktionen
// von aussen zugreifbar machen

module.exports = {
  ermittleKursZuStudiengangUndId: ermittleKursZuStudiengangUndId,
  ermittleStudiengangZuId: ermittleStudiengangZuId,
  holeAlleStudiengaenge: holeAlleStudiengaenge,
  initialisiereLehrangebot: initialisiereLehrangebot,
  erstelleSemesterplan: erstelleSemesterplan,
  ermittleSemesterplanZuId: ermittleSemesterplanZuId,
  holePlaeneGruppiertNachSemester: holePlaeneGruppiertNachSemester,
  holePlaeneGruppiertNachStudiengang: holePlaeneGruppiertNachStudiengang,
  lehrangebot: lehrangebot,
};
