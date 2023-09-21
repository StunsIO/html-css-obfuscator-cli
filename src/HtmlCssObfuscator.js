const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
class Obfuscate {
  constructor(css, html) {
    this.cssPath = css;
    this.htmlPath = html;
    this.idPattern = /#-?[_a-zA-Z]+[_a-zA-Z0-9-]*\s*((?=\{)|(?=,))/gim;

    this.classPattern =
      /\.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}(?![^()]*\))/gim;
    this.extPattern = /\.[^/.]+$/;
    this.cssClasses = [];
    this.cssIds = [];
    this.jsonCol = {};
  }
  cssObfuscate() {
    const ToolsClass = new Tools();

    ToolsClass.getFilePaths(this.cssPath).map((eachFile) => {
      if (!eachFile.endsWith(".css")) return;
      if (eachFile.endsWith("_hashed.css")) return;
      const filePath = path.dirname(eachFile);

      console.log(`Read file: ${eachFile}`);
      let cssContent = fs.readFileSync(eachFile, { encoding: "utf8" });
      if (cssContent.match(this.idPattern)) {
        cssContent.match(this.idPattern).forEach((line) => {
          let trimmedLine = line.trim();
          const GetName = trimmedLine.split(" ")[0].substring(1);
          if (GetName in this.jsonCol) {
            if (true) {
              let hash1 = ToolsClass.getKeyByValue(this.jsonCol, "id", GetName);
              if (!hash1[0]) return;

              let hash2 = hash1[0].elementNewName;
              cssContent = cssContent.replace(`#${GetName}`, `#${hash2}`);
            }
            return;
          } else {
            if (true) {
              trimmedLine = trimmedLine.replace(/[()\[\]{},]/g, "");
              this.cssIds.push(GetName);
              let hash = ToolsClass.generateRandomString();
              cssContent = cssContent.replace(`#${GetName}`, `#${hash}`);

              this.jsonCol[GetName] = {
                type: "id",
                elementName: GetName,
                elementNewName: hash,
                updatedElement: `#${hash}`,
              };
            }
          }
        });
      }
      if (cssContent.match(this.classPattern)) {
        cssContent.match(this.classPattern).forEach((line) => {
          let trimmedLine = line.trim();
          const GetName = trimmedLine.split(" ")[0].substring(1);
          if (GetName in this.jsonCol) {
            if (true) {
              let hash1 = ToolsClass.getKeyByValue(
                this.jsonCol,
                "class",
                GetName
              );
              if (!hash1[0]) return;
              let hash2 = hash1[0].elementNewName;
              cssContent = cssContent.replace(`.${GetName}`, `.${hash2}`);
            }
            return;
          } else {
            if (trimmedLine.match(this.classPattern)) {
              const className = trimmedLine.split(" ")[0].substring(1);
              this.cssClasses.push(GetName);
              let hash = ToolsClass.generateRandomString();
              cssContent = cssContent.replace(`.${GetName}`, `.${hash}`);
              this.jsonCol[GetName] = {
                type: "class",
                elementName: GetName,
                elementNewName: hash,
                updatedElement: `.${hash}`,
              };
            }
          }
        });
      }
      const cssFileHashedName =
        ToolsClass.getFileNameAndExt(eachFile) + "_hashed.css";
      fs.writeFileSync(cssFileHashedName, cssContent, {
        encoding: "utf8",
      });
      fs.renameSync(cssFileHashedName, `${filePath}/${cssFileHashedName}`);
    });
    fs.writeFileSync("CSS_HASH.json", JSON.stringify(this.jsonCol), {
      encoding: "utf8",
    });
    console.log("CSS_Hash File Saved!");
  }
  htmlObfuscate() {
    const ToolsClass = new Tools();

    ToolsClass.getFilePaths(this.htmlPath).map((eachFile) => {
      if (!eachFile.endsWith(".html")) return;

      if (eachFile.endsWith("_hashed.html")) return;
      console.log(`Read file: ${eachFile}`);

      const inputContent = fs.readFileSync(eachFile, { encoding: "utf8" });

      const dom2 = new JSDOM(inputContent, {
        encoding: "UTF-8",
      });
      const allElements2 = dom2.window.document.querySelectorAll(`[class]`);
      if (allElements2) {
        allElements2.forEach((element) => {
          const elementClasses1 = element.classList;

          if (elementClasses1.length > 0) {
            elementClasses1.forEach((className) => {
              const className2 = className.trim();

              let jj = ToolsClass.getKeyByValue(
                this.jsonCol,
                "class",
                className2
              );

              const findHash = jj[0];

              if (!findHash || !findHash.elementNewName) return;

              const hashGet = findHash.elementNewName;

              elementClasses1.replace(className2, hashGet);

              return;
            });
          }
        });
      }

      const allElements1 = dom2.window.document.querySelectorAll(`[id]`);

      if (allElements1) {
        allElements1.forEach((element) => {
          const elementOne = element;
          let elementClasses = element.getAttribute("id");

          if (elementClasses) {
            let elementID = elementClasses;
            let jj = ToolsClass.getKeyByValue(this.jsonCol, "id", elementID);
            if (!jj || !jj[0] || !jj[0].elementNewName) return;
            const hashGet = jj[0].elementNewName;
            elementOne.setAttribute("id", hashGet);

            return;
          }
        });
      }

      const getLinksHead = dom2.window.document.head.querySelectorAll(
        'link[rel="stylesheet"]'
      );
      if (getLinksHead && getLinksHead.length > 0) {
        let filePathArray = [];
        let fileCssPath = ToolsClass.getFilePaths(this.cssPath).map((dd) => {
          if (dd.endsWith("_hashed.css.css") || dd.endsWith("_hashed.css"))
            return;
          filePathArray.push(ToolsClass.getFileNameAndExt(dd));
        });

        getLinksHead.forEach((link) => {
          const linkURL = link.getAttribute("href");
          const getFile2 = ToolsClass.getFileNameAndExt(linkURL);
          if (filePathArray.includes(getFile2) && getFile2.endsWith(".css")) {
            const dirPath = ToolsClass.getDirPath(linkURL);
            link.setAttribute(
              "href",
              dirPath + "/" + ToolsClass.extTrim(getFile2) + "_hashed.css"
            );
          }
        });
      }
      const finalHTML = dom2.serialize();
      fs.writeFileSync(
        ToolsClass.extTrim(eachFile) + "_hashed.html",
        finalHTML,
        {
          encoding: "utf8",
        }
      );
    });
  }
}
class Tools {
  generateRandomString(length = 15) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getKeyByValue(object, type, value) {
    let gg = Object.values(object);
    let mm = Object.values(gg);
    let kk = mm.filter((zz) => zz.elementName == value && zz.type == type);
    return kk;
  }
  getKeyFromHash(object, type, value) {
    let gg = Object.values(object);
    let mm = Object.values(gg);
    let kk = mm.filter((zz) => zz.elementNewName == value && zz.type == type);
    return kk;
  }

  getAllType(object, type) {
    let gg = Object.values(object);
    let mm = Object.values(gg);
    let kk = mm.filter((zz) => zz.type == type);
    return kk;
  }
  getFilePaths(directoryPath) {
    const fileNames = fs.readdirSync(directoryPath);
    const filePaths = fileNames.map((fileName) =>
      path.join(directoryPath, fileName)
    );
    return filePaths;
  }
  extTrim(fileName) {
    return fileName.replace(this.extPattern, "");
  }
  getFileNameAndExt(filePath) {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath);
    return fileName;
  }
  getDirPath(filePath) {
    return path.dirname(filePath);
  }
}
module.exports = { Obfuscate, Tools };
