import React from 'react';
import { getMessage } from '../messages';

export const Summary = ({ totalQuestions, correctAnswers }) => {
  return (
    <div className="space-y-6">
      <p>
        You got <strong>{correctAnswers}</strong> from{' '}
        <strong>{totalQuestions}</strong> question right!
      </p>
      <p>{getMessage()}</p>
    </div>
  );
};
