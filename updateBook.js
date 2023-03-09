import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateBook(library) {
  // check if file exists
  dbFileCheck();

  try {
    // prompt user for id from the object they want to update
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
        // set current to the element
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
    // prompt the user to change the values of the book
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

    // set the current book data to the new data the user put in
    current.bookName = feedbacks.bookName;
    current.author = feedbacks.author;
    current.numOfPages = feedbacks.numOfPages;

    // write the updated library data to the file
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
