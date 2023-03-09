// confirms if the database file has been created
import fs from "fs";

export default function dbFileCheck() {
  if (!fs.existsSync("library-db.json")) {
    console.log("creating file");
    fs.writeFileSync("library-db.json", "[]");
  }
}

dbFileCheck();