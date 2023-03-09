import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import { v4 as uuidv4 } from "uuid";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateBook(library) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      {
        name: "bookID",
        message: "Enter book id:",
        type: "input",
      },
    ]);

    let current;

    library.forEach((element) => {
      if (element.id === answers.bookID) {
        current = element;
        // collect the updated information and overwrite the database with the new data
        updateDetails(current, library);
      }
    });
  } catch (err) {
    console.log("Error updating book", err);
  }
}

async function updateDetails(current, library) {
  try {
    const feedbacks = await inquirer.prompt([
      {
        type: "input",
        default: current.bookName,
        name: "bookName",
        message: "Name of the book:",
      },
      {
        type: "input",
        default: current.author,
        name: "author",
        message: "Name of the author:",
      },
      {
        type: "input",
        default: current.numOfPages,
        name: "numOfPages",
        message: "Number of pages:",
      },
    ]);

    current.bookName = feedbacks.bookName;
    current.author = feedbacks.author;
    current.numOfPages = feedbacks.numOfPages;

    await fs.writeFile("library-db.json", JSON.stringify(library), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Successfully updated book!");
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

queryDB(updateBook);
