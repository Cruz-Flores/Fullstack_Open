interface MultiplyValues {
  value1: number;
  value2: Array<number>;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  const dates = args.filter((n, i) => i > 1);
  const argsArray = dates.map((n) => Number(n));
  const findString = argsArray.includes(NaN);

  if (!findString) {
    return {
      value1: argsArray[0],
      value2: argsArray.filter((n, i) => i > 0),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Rating = 'bad' | 'roughly' | 'good' | null;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: Rating;
  target: number;
  average: number;
}

const excerciseCalculator = (target: number, days: Array<number>): Result => {
  const average = days.reduce((a, b) => a + b) / days.length;
  const trainingDays = days.filter((day) => day > 0);
  const success = average >= target;
  const rating = (average * 3) / target;
  const ratingDescription =
    rating < 1
      ? 'bad'
      : rating >= 1 && rating <= 1.9
      ? 'roughly'
      : rating >= 2
      ? 'good'
      : null;

  return {
    periodLength: days.length,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(excerciseCalculator(value1, value2));
} catch (e: any) {
  console.log('Error, something bad happened, message: ', e.message);
}
