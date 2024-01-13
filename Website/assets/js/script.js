const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth();
console.log(`Die Viewportbreite beträgt: ${getViewportWidth()} Pixel`);

class Kurs {
  constructor(modulId, name, typ, studiengang, semester) {
    this.modulId = modulId;
    this.name = name;
    this.typ = typ;
    this.studiengang = studiengang;
    this.semester = semester;
  }
  istValiderTyp(typ) {
    if (
      typ === "V" ||
      typ === "Ü" ||
      typ === "P" ||
      typ === "ÜPP" ||
      typ === "SV" ||
      typ === "T" ||
      typ === "S"
    ) {
      return true;
    }
    return false;
  }
}

class Lehrperson {
  constructor(id, nachname) {
    this.id = id;
    this.nachname = nachname;
  }
}

class Termin {
  constructor(beginn, dauer, wochentag, raum) {
    this.beginn = beginn;
    this.dauer = dauer;
    this.wochentag = wochentag;
    this.raum = raum;
  }
}

class Semesterplan {
  constructor(id, name, semester, studiengang) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.studiengang = studiengang;
  }
  addKurse(kurse) {}
  getAnzahlKurse() {}
  getAnzahlStunden() {}
}

class Studiengang {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  getKursById(id) {}
}
