const http = require("http");
const {
  initialisiereLehrangebot,
  lehrangebot,
} = require("../models/persistence");

const server = http.createServer((res, req) => {
  req.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  req.end(`<html><body>
  
  ${lehrangebot
    .map((studiengang) => {
      return `<h1>${studiengang.name} (${studiengang.id})</h1>
            <p>${studiengang.kurse.length} Kurse enthalten:</p>
            <ul>
                ${studiengang.kurse
                  .map((kurs) => {
                    return `<li>${kurs.modulId} ${kurs.name} (${kurs.typ}, ${kurs.lehrperson.nachname})</li>`;
                  })
                  .join("")}
            </ul>
    `;
    })
    .join("")}
  
  </body></html>`);
});

server.listen(8844, function () {
  console.log("Server erfolgreich gestartet");
  initialisiereLehrangebot();
});
