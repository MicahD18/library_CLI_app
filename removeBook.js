import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import { v4 as uuidv4 } from "uuid";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeBook(library) {
  dbFileCheck();

  try {
    // prompt user for id from the object they want to remove
    const answers = await inquirer.prompt([
      {
        name: "bookID",
        message: "Enter book id:",
        type: "input",
      },
    ]);

    // the remaining data after removing the selected book based on the id
    const remnantData = [];

    library.forEach((book) => {
        // if the id !== bookID from the user input
      if (book.id !== answers.bookID) {
        console.log("removing book...");
        // push the books to the array
        remnantData.push(book);
      }
    });

    // write the new remaining data to the file
    fs.writeFile("library-db.json", JSON.stringify(remnantData), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Removed book from library");
    });
  } catch (err) {
    console.log("Error removing book from database", err);
  }
}

queryDB(removeBook);
