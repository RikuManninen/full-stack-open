import { parseArgs } from "./utils";

const calculateBmi = (height: number, weight: number): string => {

  const bmi: number = weight / ((height / 100) * (height / 100));
  
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'healthy weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'overweight';
  } else {
    return 'obese';
  }
}

try {
  const [ height, weight ] = parseArgs(process.argv.slice(2));
  console.log(calculateBmi(height, weight));
} catch (e: unknown) {
  let errorMessage = 'Something bad happened.';
  if (e instanceof Error) {
    errorMessage += ' Error: ' + e.message;
  }
  console.log(errorMessage);
}