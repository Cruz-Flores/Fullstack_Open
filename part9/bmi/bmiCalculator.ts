interface BmiValues {
  valueMass: number;
  valueHeight: number;
}

const parseArguments1 = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      valueMass: Number(args[2]),
      valueHeight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

type Message = 'underweigth' | 'normal range' | 'overweigth' | 'obese' | null;

const bmiCalculator = (mass: number, height: number): Message => {
  const bmi = mass / (height * height);

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

try {
  const { valueMass, valueHeight } = parseArguments1(process.argv);
  console.log(bmiCalculator(valueMass, valueHeight));
} catch (e: any) {
  console.log('Error, something bad happened, message: ', e.message);
}
