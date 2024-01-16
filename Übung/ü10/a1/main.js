const fs = require('fs');

//

fs.writeFile("test.txt", "Hallo WEB1", () => {
    fs.readFile("test.txt",{encoding:"utf-8"} ,(err, data) => {
        console.log("Gelesener Inhalt: " + data);
    });
});

//

console.log("Datei schreiben und lesen:");