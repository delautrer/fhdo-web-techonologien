// const kurs = require("../../../v1/models/kurs");
// const kurs1 = kurs.kurs1;
// const kurs2 = kurs.kurs2;
// const kurs3 = kurs.kurs3;

export default class Studiengang {
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

// const studiengang1 = new Studiengang("WIPB", "Wirtschaft Inf. BPO 2018");
// studiengang1.kurse = [kurs1, kurs2, kurs3];
// const studiengang2 = new Studiengang("TI", "Technische Inf. BPO 2018");
// studiengang2.kurse = [kurs1, kurs2, kurs3];
// const studiengang3 = new Studiengang("PK", "Praktische Inf. BPO 2018");
// studiengang3.kurse = [kurs1, kurs2, kurs3];

// studiengang.kurse.sort(function (modulA, modulB) {
//   return modulA.modulId - modulB.modulId;
// });

// module.exports = {
//   Studiengang: Studiengang,
//   studiengang1: studiengang1,
//   studiengang2: studiengang2,
//   studiengang3: studiengang3,
// };
