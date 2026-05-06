import React from 'react';
import { addChildToQuestion, deleteQuestion, updateQuestion } from '../utils/questionUtils';

const QuestionItem = ({ question, setQuestions, depth = 0 }) => {
  const indent = depth * 24;

  const handleFieldChange = (field, value) => {
    setQuestions((prev) => updateQuestion(prev, question.id, { [field]: value }));
  };

  const handleDelete = () => {
    setQuestions((prev) => deleteQuestion(prev, question.id));
  };

  const handleAddChild = () => {
    setQuestions((prev) => addChildToQuestion(prev, question.id));
  };

  const canAddChild = question.type === 'true_false' && question.answer === 'true';

  return (
    <div
      style={{ marginLeft: indent, marginBottom: '12px' }}
      className="question-item"
    >
      <div className="question-row">
        <span className="question-number">{question.number}</span>

        <input
          type="text"
          className="question-input"
          placeholder="Enter your question..."
          value={question.text}
          onChange={(e) => handleFieldChange('text', e.target.value)}
        />

        <select
          className="question-select"
          value={question.type}
          onChange={(e) => handleFieldChange('type', e.target.value)}
        >
          <option value="short_answer">Short Answer</option>
          <option value="true_false">True / False</option>
        </select>

        {question.type === 'true_false' && (
          <select
            className="answer-select"
            value={question.answer || ''}
            onChange={(e) => handleFieldChange('answer', e.target.value)}
          >
            <option value="">-- Answer --</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        )}

        {canAddChild && (
          <button className="btn btn-add-child" onClick={handleAddChild}>
            + Sub-question
          </button>
        )}

        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {question.children && question.children.length > 0 && (
        <div className="children-container">
          {question.children.map((child) => (
            <QuestionItem
              key={child.id}
              question={child}
              setQuestions={setQuestions}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
