import fs from "fs";

let library = [];

// creates db file if it doesn't exist
export default async function queryDB(queryFunction) {
  try {
    if (fs.existsSync("library-db.json")) {
      await fs.readFile("library-db.json", (err, data) => {
        // read data
        library = JSON.parse(data.toString());
        console.log(library);

        if (err) {
          console.error("ERROR:", err);
          return;
        }

        if (queryFunction && !err) {
          queryFunction(library);
        }
      });
    } else {
      // if external function exists, but there is an error
      if (queryFunction) {
        queryFunction(library);
        return;
      }
    }
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
}
