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

module.exports = Semesterplan;
