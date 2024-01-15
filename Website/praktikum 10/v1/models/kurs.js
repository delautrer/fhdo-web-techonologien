const KURS_TYPEN = ["V", "Ü", "P", "ÜPP", "SV", "T", "S", "Org"];

class Kurs {
  constructor(
    modulId,
    name,
    typ,
    studiengang,
    semester,
    gruppenbuchstaben,
    lehrperson,
    termin
  ) {
    if (!this.istValiderTyp(typ)) {
      throw new Error("Ungültiger Kurs-Typ");
    }
    this.modulId = modulId;
    this.name = name;
    this.typ = typ;
    this.studiengang = studiengang;
    this.semester = semester;
    this.termin = termin;
    this.id = modulId + termin.wochentag + termin.beginn + termin.raum;
    this.lehrperson = lehrperson;
    this.gruppenbuchstaben = gruppenbuchstaben;
  }
  istValiderTyp(typ) {
    return KURS_TYPEN.includes(typ);
  }
}

// const kurs1 = new Kurs(
//   "12345",
//   "WEB",
//   "V",
//   "Inf",
//   3,
//   new Termin(8, 1, "Montag", "A.E.01")
// );
// const kurs2 = new Kurs(
//   "123456",
//   "BWL",
//   "Ü",
//   "Lap",
//   1,
//   new Termin(8, 2, "Dienstag", "A.E.02")
// );
// const kurs3 = new Kurs(
//   "42069",
//   "MaFi4",
//   "ÜPP",
//   "DataScience",
//   109,
//   new Termin(18, 6, "Freitag", "C.3.31")
// );

module.exports = Kurs;

// module.exports = {
//   kurs1: kurs1,
//   kurs2: kurs2,
//   kurs3: kurs3,
// };
