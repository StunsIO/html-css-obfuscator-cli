const fs = require("fs");
const path = require("path");

const Classes = require("./classes.js");

const cssDIR = process.argv[2];
const htmlDIR = process.argv[3];

fs.access(cssDIR, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`CSS directory '${cssDIR}' does not exist.`);
    return;
  }

  fs.access(cssDIR, fs.constants.R_OK, (err) => {
    if (err) {
      console.error(`CSS directory '${cssDIR}' is not readable.`);
      return;
    }

    console.log(`CSS directory '${cssDIR}' is valid.`);
  });
});

fs.access(htmlDIR, fs.constants.F_OK, (err) => {
  if (err) {
    console.error(`HTML directory '${htmlDIR}' does not exist.`);
    return;
  }

  fs.access(htmlDIR, fs.constants.R_OK, (err) => {
    if (err) {
      console.error(`HTML directory '${htmlDIR}' is not readable.`);
      return;
    }

    console.log(`HTML directory '${htmlDIR}' is valid.`);
  });
});

const Obfuscate = new Classes.Obfuscate(cssDIR, htmlDIR);
Obfuscate.cssObfuscate();
Obfuscate.htmlObfuscate();
