import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeBook(library) {
  // check if file exists
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
