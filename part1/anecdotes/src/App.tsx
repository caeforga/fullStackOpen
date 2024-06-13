import { useState } from 'react'

import './App.css'

const Button = ({handleCLick, text}: any) => (
  <button onClick={handleCLick}>
    {text}
  </button>
)

const Counter = (props: any) => (
  <p>has {props.value} votes</p>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

  const setToSelected = () => setSelected(getRandomInt(anecdotes.length));

  const setToVotes = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const maxVotesIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Counter value={votes[selected]} />
      <br />
      <Button handleCLick={() => setToVotes()} text="Vote" />
      <Button handleCLick={() => setToSelected()} text="Next anecdote" />
      <br />
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxVotesIndex]}
      <br />
      <Counter value={votes[maxVotesIndex]}/>
    </div>
  )
}

export default App
