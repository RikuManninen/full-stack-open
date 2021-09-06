import React, { useState } from 'react'

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Button = ({text, handler}) => {
  return (
    <button onClick={handler}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = ((good - bad) / all)
  const positive = (good / all) * 100 + " %"

  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handler={addGood} />
      <Button text="neutral" handler={addNeutral} />
      <Button text="bad" handler={addBad} />
      <h1>statistics</h1>
      {good || neutral || bad ?
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        : <p>No feedback given</p>
      }
    </>
  )
}

export default App