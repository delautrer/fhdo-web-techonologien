const kurs = require("../../../v1/models/kurs");
const kurs1 = kurs.kurs1;
const kurs2 = kurs.kurs2;
const kurs3 = kurs.kurs3;

class Semesterplan {
  static idCounter = 1;
  constructor(name, semester, studiengang) {
    this.id = Semesterplan.idCounter++;
    this.name = name;
    this.semester = semester;
    this.studiengang = studiengang;
    this.kurse = [];
  }
  addKurse(kurse) {
    // this.kurse = this.kurse.concat(kurse);
    for (let i = 0; i < kurse.length; i++) {
      this.kurse.push(kurse[i]);
    }
  }
  getAnzahlKurse() {
    return this.kurse.length;
  }
  getAnzahlStunden() {
    return this.kurse.reduce((sum, kurs) => sum + kurs.termin.dauer, 0);
  }
}

const semesterplan1 = new Semesterplan("TollerPlan", "SoSe 24", studiengang);
const semesterplan2 = new Semesterplan("TollerPlan2", "SoSe 24", studiengang2);
const semesterplan3 = new Semesterplan(
  "TollerPlan",
  "WiSe 24/25",
  studiengang3
);

const semesterplaene = [semesterplan, semesterplan2, semesterplan3];
semesterplan.addKurse([kurs1, kurs2, kurs3]);

semesterplan.kurse.sort((modulA, modulB) => modulA.modulId - modulB.modulId);

module.exports = {
  Semesterplan: Semesterplan,
  semesterplan1: semesterplan1,
  semesterplan2: semesterplan2,
  semesterplan3: semesterplan3,
  semesterplaene: semesterplaene,
};
