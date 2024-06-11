const calculateBmi = (height: number, weight: number): string => {

  const bmi: number = weight / ((height / 100) * (height / 100));
  
  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'healthy weight';
  } else if (bmi >= 25 && bmi < 30) {
    return 'overweight';
  } else {
    return 'obese';
  }
}

console.log(calculateBmi(180, 120));