import fs from "fs";

const dbPath: string = "./db/db.json";

export const readDatabase = async (): Promise<any[]> => {
  try {
    const data: string = fs.readFileSync(dbPath, "utf8");
    const db: any[] = JSON.parse(data);
    return db;
  } catch (err) {
    return [];
  }
};
