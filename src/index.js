import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { quizzes } from './quizzes';
import { MultipleChoiceQuiz } from './components/multiple-choice-quiz';
import './styles.css';

console.log('Here are the quizzes:', quizzes);

const App = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const handleQuizChange = () => {
    const nextQuizIndex = (currentQuizIndex + 1) % quizzes.length;
    setCurrentQuizIndex(nextQuizIndex);
  };

  return (
    <MultipleChoiceQuiz
      quiz={quizzes[currentQuizIndex]}
      onNextQuiz={handleQuizChange}
    />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
