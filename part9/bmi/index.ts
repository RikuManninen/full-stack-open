import express from 'express';
import qs from 'qs';
import calculateBmi from './bmiCalculator';
import { isNotNumber } from './utils';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});