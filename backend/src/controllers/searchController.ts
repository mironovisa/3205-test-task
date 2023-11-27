import { readDatabase } from "../services/dbService";
import { validateEmail, validateNumber } from "../middleware/validation";

interface DatabaseEntry {
  email: string;
  number: string;
}

interface SearchResult {
  error?: string;
  data?: DatabaseEntry[];
}

export const search = async (email: string, number: string): Promise<SearchResult> => {
  let db: DatabaseEntry[] = [];
  try {
    db = await readDatabase();
  } catch (error) {
    return { error: "Error reading the database" };
  }

  const emailError: string | undefined = validateEmail(email);
  if (number) {
    const numberError: string | undefined = validateNumber(number);
    if (numberError) {
      return { error: numberError };
    }
  }

  if (emailError) {
    return { error: emailError };
  }

  const filteredResults: DatabaseEntry[] = db.filter((entry) => {
    const emailMatch = email ? entry.email === email : true;
    const numberMatch = number ? entry.number === number : true;
    return emailMatch && numberMatch;
  });

  if (filteredResults.length > 0) {
    console.log("Filtered results:", filteredResults);
    return { data: filteredResults };
  } else {
    console.log("No match found for the combination.");
    return { error: "No match for the combination, check your data" };
  }
};
