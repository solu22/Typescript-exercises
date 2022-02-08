interface Result_Object {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (
  daily_exercise_hours: Array<number>,
  target: number
): Result_Object => {
  const periodLength = daily_exercise_hours.length;
  const trainingDays = daily_exercise_hours.filter((t) => t !== 0).length;
  const average =
    daily_exercise_hours.reduce((a, b) => a + b, 0) / periodLength;

  if (isNaN(average) || isNaN(target)) {
    throw new Error("Not a valid numbers passed");
  }
  const success = average >= target ? true : false;
  const rating = success ? 3 : average / target > 0.7 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "Target met, good job"
      : rating === 2
      ? "Almost there"
      : "Try again, push yourself more";
  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target,
  };
};

const argv = process.argv.slice(3);
const target = Number(process.argv[2]);
const data = argv.map((d) => Number(d));

try {
  console.log(calculateExercise(data, target));
} catch (error: unknown) {
  let errorMessage = "";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
