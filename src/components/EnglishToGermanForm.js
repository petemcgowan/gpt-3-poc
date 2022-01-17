import React, { useState, useEffect } from "react";

/*
Given a prompt, the model will return one or more predicted completions.  I'm using this one for English to German conversion

https://beta.openai.com/docs/api-reference/completions
*/

export function EnglishToGermanForm(props) {
  const [translatePhrase, setTranslatePhrase] = useState("");

  const [translatePhraseResult, setTranslatePhraseResult] =
    useState("Awaiting result...");

  const handleTranslatePhrase = (event) => {
    setTranslatePhrase(event.target.value);
  };

  useEffect(() => {
    setTranslatePhrase(`English: I do not speak German.
    German: `);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    (async () => {
      console.log("completion:" + translatePhrase);
      const gptResponse = await props.openai.complete({
        // engine: "davinci",
        // prompt:
        //   "English: I do not speak German.\n\nGerman: Ich spreche Deutsch nicht.\n\nEnglish: What a wonderful world\n\n",
        // temperature: 0.5,
        // max_tokens: 100,
        // top_p: 1,
        // frequency_penalty: 0,
        // presence_penalty: 0,
        // stop: ["\n"],

        // Their example, but converted to German (not the playground)  THIS WORKS!
        engine: "davinci",
        prompt:
          "English: I do not speak German.\nGerman: Ich spreche kein Deutsch.\n\nEnglish: See you later!\nGerman: Bis später!\n\nEnglish: Where is a good restaurant?\nGerman: Wo gibt es ein gutes Restaurant?\n\nEnglish: What rooms do you have available?\nGerman:",
        temperature: 0.5,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],

        // From their examples (not the playground)  THIS WORKS
        // engine: "davinci",
        // prompt:
        //   "English: I do not speak French.\nFrench: Je ne parle pas français.\n\nEnglish: See you later!\nFrench: À tout à l'heure!\n\nEnglish: Where is a good restaurant?\nFrench: Où est un bon restaurant?\n\nEnglish: What rooms do you have available?\nFrench: Quelles chambres avez-vous de disponible?\n\nEnglish: What time is breakfast?\nFrench:",
        // temperature: 0.5,
        // max_tokens: 100,
        // top_p: 1.0,
        // frequency_penalty: 0.0,
        // presence_penalty: 0.0,
        // stop: ["\n"],

        /*        engine: "davinci",
        prompt:
          // "English: I do not speak German.\n\nGerman: Ich spreche Deutsch nicht.\n\nEnglish: What a wonderful world\nGerman: ",
          [
            "English: I do not speak German.\n\nGerman: Ich spreche Deutsch nicht.\n\nEnglish: What a wonderful world\nGerman: ",
          ], //hacking for now
        // prompt: translatePhrase,
        maxTokens: 100,
        temperature: 0.5,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        // bestOf: 1,
        // n: 1,
        // stream: false,
        stop: ["\n"],   */
      });
      setTranslatePhraseResult(
        JSON.stringify(gptResponse.data.choices[0].text)
      );
      console.log("gptResponse.data:" + JSON.stringify(gptResponse.data));
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Translate English to German:
        <textarea
          value={translatePhrase}
          onChange={(e) => setTranslatePhrase(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit English to German" />
      <textarea
        value={translatePhraseResult}
        onChange={handleTranslatePhrase}
      />
    </form>
  );
}
