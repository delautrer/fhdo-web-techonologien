class Studiengang {
  constructor(id, name, kurse = []) {
    this.id = id;
    this.name = name;
    this.kurse = kurse;
  }
  getKursById(id) {
    return this.kurse.find((kurs) => kurs.id == id);
  }
  toString() {
    return this.id;
  }
}

module.exports = Studiengang;
