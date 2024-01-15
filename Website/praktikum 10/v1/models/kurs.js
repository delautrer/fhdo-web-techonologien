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

module.exports = Kurs;
