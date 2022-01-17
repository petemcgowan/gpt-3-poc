import React, { useState, useEffect } from "react";

/*
Given a query and a set of labeled examples, the model will predict the most likely label for the query.

Useful as a drop-in replacement for any ML classification or text-to-label task.

https://beta.openai.com/docs/api-reference/classifications

Basically give it a few "example pairings", and then one without a pairing and it will "figure it out".  Eg.

Facebook: Social media, Technology
Uber: Transportation, Technology, Marketplace
Unilever: Conglomerate, Consumer Goods
Mcdonalds: Food, Fast Food, Logistics, Restaurants
FedEx: Logistics, Transportation
Monkey:  Social media, Technology,
Instagram: ...

*/
export function ClassificationForm(props) {
  const [classification, setClassification] = useState("");
  const [classificationResult, setClassificationResult] =
    useState("Awaiting result...");

  const handleClassificationResult = (event) => {
    setClassificationResult(event.target.value);
  };

  // TODO The issue here is that this example is a "prompt".  A prompt is DERIVED from examples, labels and a query.  So what's actually required is to parse the "prompt" into the examples, labels and query required to call the API with the user's input.  I don't have the required interest in this particular API right now!

  useEffect(() => {
    setClassification(`The following is a list of companies and the categories they fall into

    Facebook: Social media, Technology
    LinkedIn: Social media, Technology, Enterprise, Careers
    Uber: Transportation, Technology, Marketplace
    Unilever: Conglomerate, Consumer Goods
    Mcdonalds: Food, Fast Food, Logistics, Restaurants
    FedEx: Logistics, Transportation
    Monkey:  Social media, Technology,
    Instagram: Social media, Technology,`);
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    (async () => {
      const gptResponse = await props.openai.classification({
        examples: [
          ["A happy moment", "Positive"],
          ["I am sad.", "Negative"],
          ["I am feeling awesome", "Positive"],
        ],
        labels: ["Positive", "Negative", "Neutral"],
        query: "It is a raining day :(",
        search_model: "ada",
        model: "curie",
      });

      setClassificationResult(JSON.stringify(gptResponse.data));
      console.log(gptResponse.data);
    })();

    // alert(`Submitting Classification ${classification}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Classification Type Question:
        <textarea
          value={classification}
          onChange={(e) => setClassification(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit Classification" />
      <textarea
        value={classificationResult}
        onChange={handleClassificationResult}
      />
    </form>
  );
}
