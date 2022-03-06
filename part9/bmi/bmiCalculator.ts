interface BmiValues {
  valueWeight: number;
  valueHeight: number;
}

const bmiArgumentsParser = (args: Array<string>): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      valueWeight: Number(args[0]),
      valueHeight: Number(args[1]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Message = 'underweigth' | 'normal range' | 'overweigth' | 'obese' | null;

const bmiCalculator = (weight: number, height: number): Message => {
  const bmi = weight / (height * height);

  switch (true) {
    case bmi < 18.5:
      return 'underweigth';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'normal range';
    case bmi >= 25 && bmi <= 30:
      return 'overweigth';
    case bmi > 30:
      return 'obese';
    default:
      return null;
  }
};

const bmiFunctions = {
  bmiCalculator,
  bmiArgumentsParser,
};

export { bmiFunctions };
