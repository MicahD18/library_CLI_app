import fs from "fs";

export default function queryDB() {
  if (!fs.existsSync("library-db.json")) {
    fs.writeFile("library-db.json", "[]", (data, err) => {
      if (err) {
        console.error("Error writing file", err);
      }
      console.log("Creating file");
      return;
    });
  } else {
    console.log("File already exists");
  }
}

queryDB();