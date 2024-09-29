import React from 'react';

export const AnswerOption = ({
  children,
  isSelected,
  isCorrect,
  selectedAnswer,
  ...otherProps
}) => {
  return (
    <li
      className={`p-2 space-x-2 m-3 border border-2 border-transparent cursor-pointer transition-all duration-300 ${
        selectedAnswer
          ? isCorrect
            ? 'border-green-400'
            : isSelected
            ? 'border-red-400 line-through'
            : ''
          : ''
      }`}
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      {...otherProps}
    >
      {children}
    </li>
  );
};
