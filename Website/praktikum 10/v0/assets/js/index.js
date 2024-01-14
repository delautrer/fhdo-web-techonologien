const section = document.querySelector("main section");

// Label erstellen
let auswahlWrapper = document.createElement("label");
auswahlWrapper.innerText = "Pläne gruppieren nach:";

// Select erstellen
let dropdown = document.createElement("select");
dropdown.name = "gruppieren";

// Optionen erstellen
let option_semester = document.createElement("option");
option_semester.selected = "true";
option_semester.value = "semester";
option_semester.text = "Semester";

let option_studiengang = document.createElement("option");
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
  displaySemesterplaene(event.target.value);
});

// Helferfunktion, zum Löschen aller ChildNodes in einer Node
function deleteAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// Aufruf für das Anzeigen der Pläne bei Pageload
displaySemesterplaene(); // <--- ohne Übergabeparameter: default -> semester

function displaySemesterplaene(gruppierung = option_semester.value) {
  deleteAllChildren(section);
  console.log("Zeige Semesterpläne gruppiert nach " + gruppierung + " an");

  const anzuzeigenePlaene = gruppiereNach(semesterplaene, gruppierung);

  Object.entries(anzuzeigenePlaene).forEach((v) => {
    const semester = v[0];
    const plaene = v[1];

    const heading = document.createElement("h2");
    heading.innerText = semester;
    const liste = document.createElement("ul");

    plaene.forEach((plan) => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = "plan.html";
      a.innerText = `${
        plan.name
      } (${plan.getAnzahlKurse()} Kurse, ${plan.getAnzahlStunden()} Stunden)`;

      li.append(a);
      liste.append(li);
    });

    section.append(heading);
    section.append(liste);
  });
}
