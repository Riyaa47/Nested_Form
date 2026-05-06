import React from 'react';

const renderQuestions = (questions, depth = 0) =>
  questions.map((q) => (
    <div key={q.id} style={{ marginLeft: depth * 20 }} className="submission-item">
      <p>
        <strong>{q.number}</strong> {q.text || <em>(no text)</em>}
        <span className="submission-type">
          [{q.type === 'short_answer' ? 'Short Answer' : `True/False — ${q.answer || 'unanswered'}`}]
        </span>
      </p>
      {q.children && q.children.length > 0 && renderQuestions(q.children, depth + 1)}
    </div>
  ));

const SubmissionView = ({ questions, onBack }) => (
  <div className="submission-view">
    <h2>Form Submission</h2>
    <p className="submission-subtitle">Hierarchical view of all questions:</p>
    <div className="submission-content">
      {questions.length === 0 ? (
        <p className="empty-msg">No questions were submitted.</p>
      ) : (
        renderQuestions(questions)
      )}
    </div>
    <button className="btn btn-back" onClick={onBack}>
      ← Back to Form
    </button>
  </div>
);

export default SubmissionView;
