import React, { useState, useMemo } from 'react';
import { shuffle } from '../utils';
import { Summary } from './quiz-result';
import { Button } from './common-button';
import { AnswerOption } from './answer-opton';

const A_CHAR_CODE = 65;

// TODO: move state to the parent
export const MultipleChoiceQuiz = ({ quiz, onNextQuiz }) => {
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const currentQuestionsAnswers = useMemo(
    () =>
      shuffle([
        currentQuestion.correctAnswer,
        ...currentQuestion.incorrectAnswers,
      ]),
    [currentQuestionIndex],
  );

  const onSelectQuestion = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);

      if (answer === currentQuestion.correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      }
    }
  };

  const onNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleNextQuiz = () => {
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    onNextQuiz();
  };

  const onQuestionKeyPress = (event, answer) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelectQuestion(answer);
    }
  };

  return (
    <div className="flex flex-col gap-8 m-3 items-center font-sans">
      <h1 className="text-xl font-bold">{quiz.title}</h1>
      {!isQuizCompleted ? (
        <>
          <h2>{currentQuestion.text}</h2>
          <ul
            className="list-none"
            role="listbox"
            aria-labelledby="question-text"
          >
            {currentQuestionsAnswers?.map((answer, index) => (
              <AnswerOption
                key={`${answer}-${index}`}
                selectedAnswer={selectedAnswer}
                isSelected={answer === selectedAnswer}
                isCorrect={answer === currentQuestion.correctAnswer}
                onClick={() => onSelectQuestion(answer)}
                onKeyPress={(event) => onQuestionKeyPress(event, answer)}
              >
                <span className="font-semibold">
                  {String.fromCharCode(A_CHAR_CODE + index)}.
                </span>
                <span>{answer}</span>
              </AnswerOption>
            ))}
          </ul>
          {selectedAnswer && (
            <>
              <p
                role="alert"
                className={
                  selectedAnswer === currentQuestion.correctAnswer
                    ? 'text-green-400'
                    : 'text-red-400'
                }
              >
                {selectedAnswer === currentQuestion.correctAnswer
                  ? 'Correct'
                  : 'Incorrect'}
              </p>
              <Button aria-label="Next question" onClick={onNextQuestion}>
                Next
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <Summary
            totalQuestions={quiz.questions.length}
            correctAnswers={correctAnswers}
          />
          <Button aria-label="Next quiz" onClick={handleNextQuiz}>
            Next Quiz
          </Button>
        </>
      )}
    </div>
  );
};
