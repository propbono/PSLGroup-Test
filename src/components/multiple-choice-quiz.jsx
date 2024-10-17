import React from 'react';
import { Button } from './button';
import { AnswerOption } from './answer-option';

const A_CHAR_CODE = 65;

export const MultipleChoiceQuiz = ({
  quiz,
  currentQuestion,
  answers,
  // TODO: Multiple Choice Answers - disable this prop
  selectedAnswer,
  onSelectQuestion,
  onSelectQuestionKeyPress,
  onNextQuestion,
  // TODO: Multiple Choice Answers - Enable this props
  //   isAnswerCorrect,
  //   selectedAnswers,
}) => {
  return (
    <>
      <h2>{currentQuestion.text}</h2>
      <ul className="list-none" role="listbox" aria-labelledby="question-text">
        {answers?.map((answer, index) => (
          <AnswerOption
            key={`${answer}-${index}`}
            // TODO: Multiple Choice Answers - replace the props with below implementation
            // selectedAnswer={selectedAnswers.length > 0}
            // isSelected={selectedAnswers.includes(answer)}
            // isCorrect={
            //   Array.isArray(currentQuestion.correctAnswer)
            //     ? currentQuestion.correctAnswer.includes(answer)
            //     : answer === currentQuestion.correctAnswer
            // }
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
      {/* TODO: Multiple Choice Answers - Replace below block of code with below implementation
      {selectedAnswers.length > 0 && (
        <>
          <p
            role="alert"
            className={isAnswerCorrect() ? 'text-green-400' : 'text-red-400'}
          >
            {isAnswerCorrect() ? 'Correct' : 'Incorrect'}
          </p>
          <Button aria-label="Next question" onClick={onNextQuestion}>
            Next
          </Button>
        </>
      )} */}
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
  );
};
