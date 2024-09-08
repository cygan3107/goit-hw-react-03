import { useEffect, useState } from "react";
import "./App.css";
import { Description } from "./Description/Description";
import { Options } from "./Options/Options";
import { Feedback } from "./Feedback/Feedback";
import { Notification } from "./Notification/Notification";

export default function App() {
  const [rate, setRate] = useState(() => {
    const savedRate = window.localStorage.getItem("saved-rate");

    if (savedRate !== null) {
      return JSON.parse(savedRate);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem("saved-rate", JSON.stringify(rate));
  });

  const clearState = () =>
    setRate({
      good: 0,
      neutral: 0,
      bad: 0,
    });

  const updateFeedback = (feedbackType) => {
    setRate((prevRate) => ({
      ...prevRate,
      [feedbackType]: prevRate[feedbackType] + 1,
    }));
  };

  const totalFeedback = rate.good + rate.neutral + rate.bad;

  return (
    <>
      <Description />
      <Options variant="good" updateRate={updateFeedback}>
        Good
      </Options>
      <Options variant="neutral" updateRate={updateFeedback}>
        Neutral
      </Options>
      <Options variant="bad" updateRate={updateFeedback}>
        Bad
      </Options>
      {totalFeedback > 0 && <Options updateRate={clearState}>Reset</Options>}
      {totalFeedback > 0 ? (
        <>
          <Feedback>Good: {rate.good}</Feedback>
          <Feedback>Neutral: {rate.neutral}</Feedback>
          <Feedback>Bad: {rate.bad}</Feedback>
          <Feedback>Total: {totalFeedback}</Feedback>
          <Feedback>
            Positive:{" "}
            {Math.round(((rate.good + rate.neutral) / totalFeedback) * 100)}%
          </Feedback>
        </>
      ) : (
        <Notification />
      )}
    </>
  );
}
