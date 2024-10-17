import React from 'react';
import { getMessage } from '../messages';
import { Button } from './button';

export const Summary = ({ totalQuestions, correctAnswers, onNextQuiz }) => {
  return (
    <>
      <p>
        You got <strong>{correctAnswers}</strong> from{' '}
        <strong>{totalQuestions}</strong> question right!
      </p>
      <p>{getMessage()}</p>
      <Button aria-label="Next quiz" onClick={onNextQuiz}>
        Next Quiz
      </Button>
    </>
  );
};
