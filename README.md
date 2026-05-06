# Nested Form — Task 5

A dynamic React form where users can add questions and recursively nested sub-questions, with drag-and-drop reordering and local storage persistence.

## Features

### Core
- **Add parent questions** via "Add New Question" button
- **Question types:** Short Answer or True/False
- **Nested sub-questions:** True/False questions answered "True" reveal an "+ Sub-question" button; nesting is unlimited and recursive
- **Auto-numbering:** Hierarchical format — Q1, Q1.1, Q1.1.1, Q2, etc.
- **Delete:** Each question has a Delete button that removes it and all its children
- **Form submission:** Displays all questions in a hierarchical read-only view

### Bonus
- **Local Storage Persistence:** Form state is saved automatically; progress survives page refresh
- **Drag-and-Drop Reordering:** Parent questions can be reordered via drag-and-drop (powered by `@hello-pangea/dnd`)

## Setup & Run

### Prerequisites
- Node.js 16+ and npm

### Install

```bash
cd nested-form
npm install
```

### Run (development)

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build (production)

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── NestedForm.jsx       # Root form with DnD context and local storage
│   ├── QuestionItem.jsx     # Recursive question component
│   └── SubmissionView.jsx   # Read-only hierarchical submission display
├── utils/
│   └── questionUtils.js     # Pure helpers: create, update, delete, numbering
├── App.js
└── App.css                  # All styles
```

## How to Use

1. Click **"+ Add New Question"** to add a parent question.
2. Type your question text and choose a type from the dropdown.
3. For **True/False** questions, select an answer:
   - Selecting **True** reveals **"+ Sub-question"** — click it to add a nested child.
   - Children can themselves be True/False with their own children (unlimited depth).
4. **Drag** the handle icon (⠿) on the left to reorder parent questions.
5. Click **Delete** to remove a question and all its children.
6. Click **Submit Form** to view all questions in hierarchical format.
7. Click **"← Back to Form"** to return to editing.
8. Click **"Clear All"** to reset the form and clear local storage.
