import React from "react";

function QuestionItem({ question, handleDelete, handlePost }) {
  const { id, prompt, answers, correctIndex } = question;
  const url = 'http://localhost:4000/questions';

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick() {
    fetch(`${url}/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => handleDelete(question))
  }

  function handleChange(e) {
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"correctIndex": parseInt(e.target.value, 10)})
    })
    .then(resp => resp.json())
    .then(data => handlePost(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
