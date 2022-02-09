type bmiMsg = string;
let msg = "";

export const calculateBmi = (height: number, weight: number): bmiMsg => {
  const bmiResult = weight / ((height * 0.01) ^ 2);

  if (bmiResult < 18.5) return (msg += "Underweight");
  if (bmiResult >= 18.5 && bmiResult <= 24.9)
    return (msg += "Normal(healthy weight)");
  if (bmiResult >= 25 && bmiResult <= 29.9) return (msg += "Overweight");
  else {
    return (msg += "More Overweight");
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight));
