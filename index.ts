import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";
const app = express();
app.use(express.json());


app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.json({ error: "malformed parameters" });
  }

  try {
    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  } catch (error: unknown) {
    console.log(error);
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercise,
    target,
  }: { daily_exercise: Array<number>, target: number } = req.body;

  if (daily_exercise.length ===0 || !target) {
    res.json({ error: "missing parameters" });
    return;
  }

  if (!daily_exercise || !target) {
    res.json({ error: "malformatted parameters" });
  }

  const result = calculateExercise(daily_exercise, target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
