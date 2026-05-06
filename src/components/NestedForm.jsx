import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import QuestionItem from './QuestionItem';
import SubmissionView from './SubmissionView';
import { createQuestion, buildNumbering } from '../utils/questionUtils';

const STORAGE_KEY = 'nested_form_questions';

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const NestedForm = () => {
  const [questions, setQuestions] = useState(loadFromStorage);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  }, [questions]);

  const numberedQuestions = buildNumbering(questions);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, createQuestion()]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...questions];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setQuestions(reordered);
  };

  const handleClearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setQuestions([]);
  };

  if (submitted) {
    return (
      <SubmissionView
        questions={buildNumbering(questions)}
        onBack={() => setSubmitted(false)}
      />
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Dynamic Nested Form</h1>
        <p className="form-subtitle">
          Add questions and sub-questions dynamically. True/False questions with answer
          "True" can have nested sub-questions.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="root-questions">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {numberedQuestions.map((q, index) => (
                  <Draggable key={q.id} draggableId={q.id} index={index}>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={`draggable-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                      >
                        <span
                          className="drag-handle"
                          {...dragProvided.dragHandleProps}
                          title="Drag to reorder"
                        >
                          ⠿
                        </span>
                        <QuestionItem
                          question={q}
                          setQuestions={setQuestions}
                          depth={0}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {questions.length === 0 && (
          <div className="empty-state">
            <p>No questions yet. Click "Add New Question" to get started.</p>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-add" onClick={handleAddQuestion}>
            + Add New Question
          </button>
          <div className="form-actions-right">
            <button
              type="button"
              className="btn btn-clear"
              onClick={handleClearStorage}
              title="Clear all questions and local storage"
            >
              Clear All
            </button>
            <button type="submit" className="btn btn-submit">
              Submit Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NestedForm;
