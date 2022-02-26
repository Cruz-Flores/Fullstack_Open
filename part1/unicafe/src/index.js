// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import Header, { Button, Statistics } from './components/components.js';

// const App = () => {
//   const [opinions, setOpinions] = useState({
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   });

//   const handleGoodClick = () =>
//     setOpinions({ ...opinions, good: opinions.good + 1 });

//   const handleNeutralClick = () =>
//     setOpinions({ ...opinions, neutral: opinions.neutral + 1 });

//   const handleBadClick = () =>
//     setOpinions({ ...opinions, bad: opinions.bad + 1 });

//   const all = (op) => Object.values(op).reduce((a, b) => a + b);

//   const hi = (fi, N, num) => {
//     if (N) {
//       return (fi / N) * num;
//     } else {
//       return 0;
//     }
//   };

//   const allOp = all(opinions);
//   const aver =
//     hi(opinions.good, allOp, 1) +
//     hi(opinions.neutral, allOp, 0) +
//     hi(opinions.bad, allOp, -1);
//   const average = parseFloat(aver.toFixed(4));
//   const per = hi(opinions.good, allOp, 100);
//   const percent = parseFloat(per.toFixed(4));

//   return (
//     <div>
//       <Header text="give feedback" />
//       <Button text="good" handleClick={handleGoodClick} />
//       <Button text="neutral" handleClick={handleNeutralClick} />
//       <Button text="bad" handleClick={handleBadClick} />
//       <Header text="statistics" />
//       <Statistics
//         all={allOp}
//         vGood={opinions.good}
//         vNeutral={opinions.neutral}
//         vBad={opinions.bad}
//         vAll={allOp}
//         vAverage={average}
//         vPositive={percent}
//       />
//     </div>
//   );
// };

// ReactDOM.render(<App />, document.getElementById('root'));

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = (props) => {
  const { text, value } = props;
  return (
    <>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </>
  );
};

const Statistics = (props) => {
  const { opinions, all, average, positive } = props;

  return (
    <>
      <h2>statistics</h2>
      <table>
        <Statistic text="good" value={opinions.good} />
        <Statistic text="neutral" value={opinions.neutral} />
        <Statistic text="bad" value={opinions.bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive} />
      </table>
    </>
  );
};

//COURSE OPTIONS//
// const Statistics = ({ good, neutral, bad }) => {
//   const all = good+bad+neutral

//   if (all===0) {
//     return <>
//       <h3>statistics</h3>
//       <p>no feedback given</p>
//     </>
//   }

//   const average = (good - bad ) / all
//   const positive = 100 * (good / all)

//   return (
//     <div>
//       <h3>statistics</h3>
//       <table>
//         <tbody>
//           <StatisticLine text='good' value={good} />
//           <StatisticLine text='neutral' value={neutral} />
//           <StatisticLine text='bad' value={bad} />
//           <StatisticLine text='all' value={all} />
//           <StatisticLine text='average' value={average} />
//           <StatisticLine text='positive' value={positive + '%'} />
//         </tbody>
//       </table>

//     </div>
//   )
// }

const App = () => {
  // save clicks of each button to its own state
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);
  const [opinions, setOpinions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  //se puede usar una funcion que devuelve una funcion o definir los
  //manejadores en el componente

  const handleGoodClick = () =>
    setOpinions({ ...opinions, good: opinions.good + 1 });

  const handleNeutralClick = () =>
    setOpinions({ ...opinions, neutral: opinions.neutral + 1 });

  const handleBadClick = () =>
    setOpinions({ ...opinions, bad: opinions.bad + 1 });

  const all = Object.values(opinions).reduce((a, b) => a + b);

  const average =
    all > 0 ? ((opinions.good - opinions.bad) / all).toFixed(4) : 0;

  const positive = opinions.good > 0 ? (opinions.good * 100) / all : 0;

  return (
    <>
      <h2>give feedback</h2>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      {all === 0 ? (
        'No feedback given'
      ) : (
        <Statistics
          opinions={opinions}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
