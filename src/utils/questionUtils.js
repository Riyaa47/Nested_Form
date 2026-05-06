import { v4 as uuidv4 } from 'uuid';

export const createQuestion = () => ({
  id: uuidv4(),
  text: '',
  type: 'short_answer',
  answer: null,
  children: [],
});

export const addChildToQuestion = (questions, targetId) =>
  questions.map((q) => {
    if (q.id === targetId) {
      return { ...q, children: [...q.children, createQuestion()] };
    }
    return { ...q, children: addChildToQuestion(q.children, targetId) };
  });

export const deleteQuestion = (questions, targetId) =>
  questions
    .filter((q) => q.id !== targetId)
    .map((q) => ({ ...q, children: deleteQuestion(q.children, targetId) }));

export const updateQuestion = (questions, targetId, fields) =>
  questions.map((q) => {
    if (q.id === targetId) {
      const updated = { ...q, ...fields };
      if (fields.type === 'short_answer') {
        updated.answer = null;
        updated.children = [];
      }
      if (fields.answer === 'false') {
        updated.children = [];
      }
      return updated;
    }
    return { ...q, children: updateQuestion(q.children, targetId, fields) };
  });

export const buildNumbering = (questions, prefix = '') =>
  questions.map((q, i) => {
    const num = prefix ? `${prefix}.${i + 1}` : `Q${i + 1}`;
    return { ...q, number: num, children: buildNumbering(q.children, num) };
  });
