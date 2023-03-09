import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import { v4 as uuidv4 } from "uuid";

export default async function addBook(library) {
  try {
    const answers = await inquirer.prompt([
      {
        name: "bookName",
        message: "Enter the name of your book:",
        type: "input",
      },
      {
        name: "numOfPages",
        message: "Number of pages:",
        type: "input",
      },
    ]);

    const book = {
      id: uuidv4(),
      bookName: answers.bookName,
      numOfPages: answers.numOfPages,
    };

    library.push(book);

    console.log(library);

    // if the file exists, call the createBook method
    if (fs.existsSync("library-db.json")) {
      createBook(library);
    } else {
      fs.appendFile("library-db.json", "[]", (err) => {
        if (err) {
          console.log("Failed to create library-db.json");
          return;
        }
        createBook(library);
      });
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
}

async function createBook(library) {
  await fs.writeFile("library-db.json", JSON.stringify(library), (err) => {
    if (err) {
      console.log("Error writing data to file", err);
    }
    console.log("Saved!");
  });
}

queryDB(addBook);
