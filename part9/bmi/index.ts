import express from 'express';
import { bmiFunctions } from './bmiCalculator';
import { calculatorFunctions } from './excerciseCalculator';
const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const args = Object.values(req.query) as Array<string>;

  try {
    const { valueWeight, valueHeight } = bmiFunctions.bmiArgumentsParser(args);
    const bmi = bmiFunctions.bmiCalculator(valueWeight, valueHeight);
    const result = { valueHeight, valueWeight, bmi };
    res.send(result);
  } catch (e: any) {
    res.send({ error: e.message });
  }

  res.send('Hello Full Stack!');
});

app.post('/excercises', (req, res) => {
  const body = req.body;
  const { days, target } = body;

  try {
    const { value1, value2 } = calculatorFunctions.calculatorArgumentsParser(
      target,
      days
    );
    const result = calculatorFunctions.excerciseCalculator(value1, value2);
    res.send(result);
  } catch (e: any) {
    res.send({ error: e.message });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
