import validator from "validator";

const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return "Email is required";
  }

  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  return undefined;
};

const validateNumber = (number: string): string | undefined => {
  const isNumeric: boolean = validator.isNumeric(number);
  const isCorrectLength: boolean = validator.isLength(number, { min: 6, max: 6 });

  if (!isNumeric || !isCorrectLength) {
    return "Invalid number format";
  }

  return undefined;
};

export { validateEmail, validateNumber };
