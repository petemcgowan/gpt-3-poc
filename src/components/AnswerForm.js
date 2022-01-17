import React, { useState } from "react";

/*
Given a question, a set of documents, and some examples, the API generates an answer to the question based on the information in the set of documents.

This is useful for question-answering applications on sources of truth, like company documentation or a knowledge base.

https://beta.openai.com/docs/api-reference/answers
*/

export function AnswerForm(props) {
  const [answer, setAnswer] = useState("");
  const [answerResult, setAnswerResult] = useState("Awaiting result...");

  const handleAnswerResult = (event) => {
    setAnswerResult(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    (async () => {
      const gptResponse = await props.openai.answers({
        documents: ["Puppy A is happy.", "Puppy B is sad."],
        question: "which puppy is happy?",
        search_model: "ada",
        model: "curie",
        examples_context: "In 2017, U.S. life expectancy was 78.6 years.",
        examples: [
          ["What is human life expectancy in the United States?", "78 years."],
        ],
        max_tokens: 5,
        stop: ["\n", "<|endoftext|>"],
      });

      setAnswerResult(JSON.stringify(gptResponse.data));
      console.log(gptResponse.data);
    })();

    alert(`Submitting Answer ${answer}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Answer Type Question:
        <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </label>
      <input type="submit" value="Submit Answer" />
      <textarea value={answerResult} onChange={handleAnswerResult} />
    </form>
  );
}
