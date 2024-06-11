type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: Rating;
  ratingDescription: string;
};

const calculateExercises = (dailyExerciseHours: number[], target: number): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;

  let rating: Rating;
  const roundedAverage = Math.round(average);
  if (roundedAverage < target) {
    rating = 1;
  } else if (roundedAverage > target) {
    rating = 3;
  } else {
    rating = 2;
  }

  let ratingDescription: string;
  if (rating === 1) {
    ratingDescription = 'room for improvement';
  } else if (rating === 2) {
    ratingDescription = 'not too bad but could be better';
  } else if (rating === 3) {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));