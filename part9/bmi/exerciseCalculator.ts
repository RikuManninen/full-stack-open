import { parseArgs } from "./utils";

type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
}

interface Args {
  target: number;
  dailyExerciseHours: number[];
}

export const calculateExercises = ({ dailyExerciseHours, target }: Args): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((hours) => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;

  let rating: Rating;
  let ratingDescription: string;

  const roundedAverage = Math.round(average);
  
  if (roundedAverage < target) {
    rating = 1;
    ratingDescription = 'room for improvement';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'excellent';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const parsed: number[] = parseArgs(process.argv.slice(2));
  const args: Args = {
    target: parsed[0],
    dailyExerciseHours: parsed.slice(1),
  };
  console.log(calculateExercises(args));
} catch (e: unknown) {
  let errorMessage = "Something bad happened.";
  if (e instanceof Error) {
    errorMessage += " Error: " + e.message;
  }
  console.log(errorMessage);
}
