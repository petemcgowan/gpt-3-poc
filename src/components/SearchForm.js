import React, { useState } from "react";

/*
Given a query and a set of documents or labels, the model ranks each document based on its semantic similarity to the provided query.

https://beta.openai.com/docs/api-reference/searches
*/

export function SearchForm(props) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("Awaiting result...");

  const handleSearchResult = (event) => {
    setSearchResult(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    (async () => {
      const gptResponse = await props.openai.search({
        engine: "davinci",
        documents: ["White House", "hospital", "school"],
        query: "the president",
      });

      setSearchResult(JSON.stringify(gptResponse.data));
      console.log(gptResponse.data);
    })();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search Type Question:
        <textarea value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <input type="submit" value="Submit Search" />
      <textarea value={searchResult} onChange={handleSearchResult} />
    </form>
  );
}
