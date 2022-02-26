// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import Button, { Header, MostVotes } from './components/components.js';

// const App = (props) => {
//   const [selected, setSelected] = useState(0);
//   const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

//   const aleatory = (min, maxi) => {
//     var resultado;
//     resultado = Math.floor(Math.random() * (maxi - min + 1)) + min;
//     return resultado;
//   };

//   const handleNextClick = () => {
//     let nextValue;
//     nextValue = aleatory(0, 5);
//     setSelected(nextValue);
//   };

//   const handleVoteClick = () => {
//     let quantity = [...votes];
//     quantity[selected] += 1;
//     setVotes([...quantity]);
//   };

//   const maxVotes = () => votes.reduce((a, b) => (a > b ? a : b));
//   const indexOfMaxVotes = votes.indexOf(maxVotes());
//   console.log('allvotes', ...votes);
//   console.log('maxVotes', maxVotes());
//   console.log('index', indexOfMaxVotes);

//   return (
//     <div>
//       <Header text="Anecdote of the day" />
//       <p>
//         {props.anecdotes[selected]} <br /> has {votes[selected]} votes!{' '}
//       </p>
//       <Button text="vote" handleClick={handleVoteClick} />
//       <Button text="next anecdote" handleClick={handleNextClick} />
//       <Header text="Anecdote with most votes" />
//       <MostVotes value={maxVotes()} text={anecdotes[indexOfMaxVotes]} />
//     </div>
//   );
// };

// const anecdotes = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const { anecdotes } = props;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const goToNextAnecdote = () => {
    // sumar numero a la extension del arreglo por que si no nunca dara el numero maximo
    const aleatoryNumber = Math.floor(Math.random() * 6);
    setSelected(aleatoryNumber);
  };

  //function to do not show repeated anecdote
  // const next = () => {
  //   let newSelected = selected
  //   while (newSelected === selected) {
  //     newSelected = Math.floor(Math.random()*anecdotes.length)
  //   }

  //   setSelected(newSelected)
  // }

  // function to only change anecdote if are ther any most voted
  // let most_voted = 0
  // for (let i = 0; i<anecdotes.length; i++) {
  //   if (votes[i] > votes[most_voted]) {
  //     most_voted = i
  //   }
  // }

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const mostVotes = Math.max(...votes);
  const mostVotesIndex = votes.findIndex((item) => item === mostVotes);

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {anecdotes[selected]} {votes[selected]}
      </div>
      <button onClick={goToNextAnecdote}>next anecdote</button>
      <button onClick={voteAnecdote}>vote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVotesIndex]}
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
