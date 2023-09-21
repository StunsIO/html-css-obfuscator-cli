# HTML CSS Obfuscate Code
## Project Overview
The HTML CSS Obfuscate Code project provides a command-line interface tool to obfuscate HTML and CSS files. It allows users to generate hashed class names for CSS selectors and update corresponding HTML elements with the hashed class names. This obfuscation process helps to protect and hide the original structure and class names of HTML and CSS files.

## Usage
To use the tool, run the following command:

```bash
node obfuscate.js ./cssDIR ./htmlDIR
```
Replace ./cssDIR with the path to the directory containing CSS files and ./htmlDIR with the path to the directory containing HTML files.

## CSS Obfuscation
The tool reads the CSS files from the specified directory (cssDIR). It then processes each CSS file, identifying valid CSS patterns and generating a unique hash for each valid class name. The obfuscated CSS information is stored in a JSON file named CSS_HASH.json.

The structure of CSS_HASH.json is as follows:

```json
{
  "type": "class",
  "elementName": "OriginalClassName",
  "elementNewName": "HashedClassName",
  "updatedElement": ".{HashedClassName}"
}
```

The elementName represents the original class name, while elementNewName contains the generated hashed class name. The updatedElement provides the updated class selector that should be used in the CSS files.

The obfuscated CSS files are saved in the same directory as the original CSS files, with the naming convention "FILENAME_hashed.css".

## HTML Obfuscation
The tool also performs obfuscation on HTML files. It reads the HTML files from the specified directory (htmlDIR). It then searches for HTML elements with class or ID attributes that match the original class names from the CSS_HASH.json file. The tool updates these attributes with the corresponding hashed class names.

The obfuscated HTML files are saved in the same directory as the original HTML files, with the naming convention "FILENAME_hashed.html".

Note: The tool ensures that the obfuscated HTML files retain the same structure and content as the original files, with only the class and ID attributes being updated.

## File Structure
The project file structure is as follows:
```markdown
- src
  - obfuscate.js
  - HtmlCssObfuscator.js
```
| File Name            | Description                                             |
|----------------------|---------------------------------------------------------|
| obfuscate.js         | The main entry point of the obfuscation tool.           |
| HtmlCssObfuscator.js | Contains logic for obfuscating HTML and CSS files.       |

## Class Names
The project consists of the following classes:
| Class Name           | Description                                                  |
|----------------------|--------------------------------------------------------------|
| Obfuscate            | Class responsible for obfuscating HTML and CSS files.         |
| Tools                | Class containing utility functions for obfuscation process.  |

## Node.js Libraries Used

The project utilizes the following Node.js libraries:
| Library | Description                                                                                                        |
|---------|--------------------------------------------------------------------------------------------------------------------|
| fs      | The fs library provides functions for interacting with the file system. It is used to read and write files in the obfuscation process.                             |
| path    | The path library provides utilities for working with file and directory paths. It is used to resolve file paths and handle path-related operations in the project. |
| jsdom   | The jsdom library is a pure JavaScript implementation of the W3C DOM and HTML standards. It is used to parse and manipulate HTML documents in the obfuscation process.      |

## Conclusion
The HTML CSS Obfuscate Code project provides a convenient way to obfuscate HTML and CSS files by generating hashed class names and updating corresponding HTML elements. By obfuscating the code, it helps to protect the original structure and class names, adding an extra layer of security to your projects.
