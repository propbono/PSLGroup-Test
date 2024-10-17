import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { quizzes } from './quizzes';
import { shuffle } from './utils';
import { MultipleChoiceQuiz } from './components/multiple-choice-quiz';
import { Summary } from './components/summary';
import './styles.css';

// The name of the component I should implement suggest the questions
// should be multiple choice answers, however based on the provided totalQuestions
// data all the correct answers where singular not an array. Therfore,
// below implementation is for single answer questions.
// However to make it work with multiple correct answers we would need to make a few changes
// I left those changes in a form of a comments so we can discuss or showcase if
// necassary

const App = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // TODO: Multiple Choice Answers - replace selectedAnswer with selectedAnswers
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuiz = quizzes[currentQuizIndex];
  const currentQuestion = currentQuiz.questions[currentQuestionIndex];

  // TODO: Multiple Choice Answers - add flag for checking if multiple correct answers
  // const isMultipleChoice = Array.isArray(currentQuestion.correctAnswer);

  // TODO: Multiple Choice Answers - Adjusting shuffled answers based on whether
  // it's a multiple-choice question. This should replace shuffledAnswers function below
  // const shuffledAnswers = useMemo(() => {
  //   const answersToShuffle = isMultipleChoice
  //     ? currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer)
  //     : [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];
  //   return shuffle(answersToShuffle);
  // }, [currentQuestionIndex, currentQuizIndex, isMultipleChoice]);
  const shuffledAnswers = useMemo(
    () =>
      shuffle([
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers,
      ]),
    [currentQuestionIndex, currentQuizIndex],
  );

  // TODO: Multiple Choice Answers - Check if the current question is answered correctly,
  // new function to check if answers are correct
  // const isAnswerCorrect = () => {
  //   const correctAnswers = isMultipleChoice
  //     ? currentQuestion.correctAnswer
  //     : [currentQuestion.correctAnswer];

  //   return (
  //     selectedAnswers.length === correctAnswers.length &&
  //     selectedAnswers.every((answer) => correctAnswers.includes(answer))
  //   );
  // };

  // TODO: Multiple Choice Answers - replace onSelectAnswer with below implementation.
  // const onSelectAnswer = (answer) => {
  //   if (!selectedAnswers.includes(answer)) {
  //     setSelectedAnswers([...selectedAnswers, answer]);
  //   } else {
  //     setSelectedAnswers(selectedAnswers.filter((a) => a !== answer));
  //   }
  // };
  const onSelectAnswer = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);

      if (answer === currentQuestion.correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const onQuestionKeyPress = (event, answer) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelectAnswer(answer);
    }
  };

  // TODO: Multiple Choice Answers - replace onNextQuestion with below implementation
  // that utilizes isAnswerCorrect to check proper answers
  // const onNextQuestion = () => {
  //   if (isAnswerCorrect()) {
  //     setCorrectAnswers((prev) => prev + 1);
  //   }
  //   setSelectedAnswers([]);
  //   if (currentQuestionIndex < currentQuiz.questions.length - 1) {
  //     setCurrentQuestionIndex((prev) => prev + 1);
  //   } else {
  //     setIsQuizCompleted(true);
  //   }
  // };
  const onNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleNextQuiz = () => {
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    //TODO: Multiple Choice Answers - replace setSelecterAsnwer with setSelectedAnswers
    // setSelectedAnswers([]);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setCurrentQuizIndex((prev) => (prev + 1) % quizzes.length);
  };

  return (
    <div className="flex flex-col gap-8 m-3 items-center font-sans">
      <h1 className="text-xl font-bold">{currentQuiz.title}</h1>
      {!isQuizCompleted ? (
        <MultipleChoiceQuiz
          quiz={currentQuiz}
          currentQuestion={currentQuestion}
          answers={shuffledAnswers}
          //TODO: Multiple Choice Answers replace the selectedAnswer prop with selectedAnswers
          // and add isAnswerCorrect prop
          // selectedAnswers={selectedAnswers}
          // isAnswerCorrect={isAnswerCorrect}
          selectedAnswer={selectedAnswer}
          onSelectQuestion={onSelectAnswer}
          onNextQuestion={onNextQuestion}
          onSelectQuestionKeyPress={onQuestionKeyPress}
        />
      ) : (
        <Summary
          totalQuestions={currentQuiz.questions.length}
          correctAnswers={correctAnswers}
          onNextQuiz={handleNextQuiz}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
