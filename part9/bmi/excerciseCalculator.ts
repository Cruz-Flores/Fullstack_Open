interface MultiplyValues {
  value1: number;
  value2: Array<number>;
}

const calculatorArgumentsParser = (
  target: number,
  days: Array<number>
): MultiplyValues => {
  const findString = days.includes(NaN);

  if (!findString && !isNaN(target)) {
    return {
      value1: target,
      value2: days,
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

const calculatorFunctions = {
  calculatorArgumentsParser,
  excerciseCalculator,
};

export { calculatorFunctions };
