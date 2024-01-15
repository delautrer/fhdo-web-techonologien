const section = document.querySelector("main section");

// Label erstellen
let auswahlWrapper = document.createElement("label");
auswahlWrapper.innerText = "Pläne gruppieren nach:";

// Select erstellen
let dropdown = document.createElement("select");
dropdown.name = "gruppieren";

// Optionen erstellen
let option_semester = document.createElement("option");

const queryParams = location.href.split("?")[1];
const gruppierung = queryParams?.split("=")[1];
console.log(queryParams, gruppierung);

if (gruppierung && gruppierung != "studiengang") {
  option_semester.selected = "true";
}
option_semester.value = "semester";
option_semester.text = "Semester";

let option_studiengang = document.createElement("option");
if (gruppierung && gruppierung == "studiengang") {
  option_studiengang.selected = "true";
}
option_studiengang.value = "studiengang";
option_studiengang.text = "Studiengang";

// Optionen zum Select hinzufügen
dropdown.append(option_semester);
dropdown.append(option_studiengang);

// Select zu Label hinzufügen
auswahlWrapper.append(dropdown);

// Label (mit Select) zum Main hinzufügen vor der Section
section.before(auswahlWrapper);

// EventListener auf "change" hören lassen, und dann bei Änderungen die Pläne anzeigen zu lassen
dropdown.addEventListener("change", (event) => {
  console.log("Gruppierung geändert zu: " + event.target.value);
  location.href = `${location.href.split("?")[0]}?gruppierung=${
    event.target.value
  }`;
});
