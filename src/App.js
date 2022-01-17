import aiLogo from "./OpenAI_Logo.svg.png";

import "./App.css";
// import dotenv from "dotenv";
import { CompletionsForm } from "./components/CompletionsForm";
import { SearchForm } from "./components/SearchForm";
import { AnswerForm } from "./components/AnswerForm";
import { ClassificationForm } from "./components/ClassificationForm";
import { EnglishToGermanForm } from "./components/EnglishToGermanForm";

function App() {
  // dotenv.config();
  const OpenAI = require("openai-api");

  // Load your key from an environment variable or secret management service
  // (do not include your key directly in your code)
  // const REACT_APP_OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  console.log(
    "REACT_APP_OPENAI_API_KEY:" + process.env.REACT_APP_OPENAI_API_KEY
  );

  // const openai = new OpenAI(OPENAI_API_KEY);
  const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);
  // original dimensions of ai image: 1280 × 243
  const styles = { width: 640, height: 122 };

  return (
    <div className="App">
      <header className="App-header">
        <img src={aiLogo} className="App-logo" alt="logo" style={styles} />
      </header>
      {/* Completion API call */}
      <CompletionsForm openai={openai} />
      {/* Search API call */}
      <SearchForm openai={openai} />
      {/* Answers API call */}
      <AnswerForm openai={openai} />
      {/* Classification API call */}
      <ClassificationForm openai={openai} />
      {/* English To German API call */}
      <EnglishToGermanForm openai={openai} />
    </div>
  );
}

export default App;
