import { useState } from 'react'

const Button = ({ handleCLick, text }: any) => <button onClick={handleCLick}>{text}</button>;

const StatisticLine = ({text, value}: any) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )};

const Statistics = ({ good, neutral, bad }: any) => {

  const total = good + neutral + bad;
  const average = total !== 0 ? (good - bad) / total : 0;
  const positivePercentage = total !== 0 ? ((good / total) * 100).toFixed(2) + ' %' : '0 %';

  if (total === 0) return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <StatisticLine value={good} text="good" />
          </tr>
          <tr>
            <StatisticLine value={neutral} text="neutral" />
          </tr>
          <tr>
            <StatisticLine value={bad} text="bad" />
          </tr>
          <tr>
            <StatisticLine value={total} text="all" />
          </tr>
          <tr>
            <StatisticLine value={average} text="average" />
          </tr>
          <tr>
            <StatisticLine value={positivePercentage} text="positive" />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (value: number) => setGood(value);
  const setToNeutral = (value: number) => setNeutral(value);
  const setToBad = (value: number) => setBad(value);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleCLick={() => setToGood(good + 1)} text="good" />
      <Button handleCLick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleCLick={() => setToBad(bad + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App