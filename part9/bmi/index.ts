import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.set('query parser',
  (str: string) => qs.parse(str));

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.send({error: 'malformatted parameters'});
    return;
  }

  const result = calculateBmi(Number(height), Number(weight));

  res.send({weight: Number(weight), height: Number(height), bmi: result});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: { daily_exercises: number[]; target: number } = req.body;

  if (!daily_exercises || !target) {
    res.send({error: 'parameters missing'});
    return;
  }

  if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
    res.send({error: 'malformatted parameters'});
    return;
  }

  const result = calculateExercises({ dailyExerciseHours: daily_exercises, target: target });

  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});