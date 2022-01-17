import React, { useState } from "react";

/*
Given a prompt, the model will return one or more predicted completions.

Can also return the probabilities of alternative tokens at each position.

https://beta.openai.com/docs/api-reference/completions
*/

export function CompletionsForm(props) {
  const [completion, setCompletion] = useState("");
  const [completionResult, setCompletionResult] =
    useState("Awaiting result...");

  const handleCompletionResult = (event) => {
    setCompletionResult(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    (async () => {
      console.log("completion:" + completion);
      const gptResponse = await props.openai.complete({
        engine: "davinci",
        prompt: completion,
        maxTokens: 10,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ["\n", "testing"],
      });
      setCompletionResult(
        JSON.stringify(completion + gptResponse.data.choices[0].text)
      );
      console.log("gptResponse.data:" + JSON.stringify(gptResponse.data));
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Completion Type Question:
        <textarea
          value={completion}
          onChange={(e) => setCompletion(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit Completion" />
      <textarea value={completionResult} onChange={handleCompletionResult} />
    </form>
  );
}
