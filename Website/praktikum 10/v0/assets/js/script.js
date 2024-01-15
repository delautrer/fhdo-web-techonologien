const getViewportWidth = () =>
  window.innerWidth || document.documentElement.clientWidth();
console.log(`Die Viewportbreite beträgt: ${getViewportWidth()} Pixel`);

const KURS_TYPEN = ["V", "Ü", "P", "ÜPP", "SV", "T", "S"];

class Kurs {
  constructor(modulId, name, typ, studiengang, semester, termin, lehrperson) {
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
  }
  istValiderTyp(typ) {
    return KURS_TYPEN.includes(typ);
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

class Studiengang {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.kurse = [];
  }
  getKursById(id) {
    return this.kurse.find((kurs) => kurs.id === id);
    // for (let i = 0; i < this.kurse.length; i++) {
    //   if (kurse[i].id === id) {
    //     return kurse[i];
    //   }
    // }
    // return undefined;
  }
  toString() {
    return this.id;
  }
}

const kurs1 = new Kurs(
  "12345",
  "WEB",
  "V",
  "Inf",
  3,
  new Termin(8, 1, "Montag", "A.E.01"),
  new Lehrperson("ABC", "Aabbcc")
);
const kurs2 = new Kurs(
  "123456",
  "BWL",
  "Ü",
  "Lap",
  1,
  new Termin(8, 2, "Dienstag", "A.E.02"),
  new Lehrperson("DEF", "Ddeeff")
);
const kurs3 = new Kurs(
  "42069",
  "MaFi4",
  "ÜPP",
  "DataScience",
  109,
  new Termin(18, 6, "Freitag", "C.3.31"),
  new Lehrperson("GHI", "Gghhii")
);

const studiengang = new Studiengang("WIPB", "Wirtschaft Inf. BPO 2018");
studiengang.kurse = [kurs1, kurs2, kurs3];
const studiengang2 = new Studiengang("TI", "Technische Inf. BPO 2018");
studiengang2.kurse = [kurs1, kurs2, kurs3];
const studiengang3 = new Studiengang("PK", "Praktische Inf. BPO 2018");
studiengang3.kurse = [kurs1, kurs2, kurs3];

const semesterplan = new Semesterplan("TollerPlan", "SoSe 24", studiengang);
const semesterplan2 = new Semesterplan("TollerPlan2", "SoSe 24", studiengang2);
const semesterplan3 = new Semesterplan(
  "TollerPlan",
  "WiSe 24/25",
  studiengang3
);

const semesterplaene = [semesterplan, semesterplan2, semesterplan3];

semesterplan.addKurse([kurs1, kurs2, kurs3]);

studiengang.kurse.sort(function (modulA, modulB) {
  return modulA.modulId - modulB.modulId;
});

semesterplan.kurse.sort((modulA, modulB) => modulA.modulId - modulB.modulId);

const kursAusgabe = (kurs) => {
  console.log(`       ${kurs.modulId}: ${kurs.name}`);
};

console.log(`${studiengang.name} (${studiengang.id}):`);
studiengang.kurse.forEach(kursAusgabe);

console.log(`${semesterplan.name} (${semesterplan.semester}):`);
semesterplan.kurse.forEach(kursAusgabe);

const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    if (!ergebnis[element[eigenschaft]]) {
      ergebnis[element[eigenschaft]] = [];
    }
    ergebnis[element[eigenschaft]].push(element);
    return ergebnis;
  }, {});
