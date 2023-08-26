import React, {useEffect, useState} from "react";
import QuestionItem from './QuestionItem';
function QuestionList() {

  const url = 'http://localhost:4000/questions';

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, [])

  const questionItems = questions.map(questionItem => {
    return <QuestionItem handlePost={handlePost} handleDelete={handleDelete} key={questionItem.id} question={questionItem} />
  })

  function handleDelete(obj) {
    const filteredQuestions = questions.filter(question => question.id !== obj.id)
    setQuestions(filteredQuestions)
  }

  function handlePost(obj) {
    const updatedQuestion = questions.map(question => {
      if (question.id === obj.id) {
        return obj;
      }
      return question;
    })
    setQuestions(updatedQuestion);
  }


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
