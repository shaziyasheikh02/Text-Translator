import { useState } from "react";
import axios from "axios";
import TranslationResult from "./TranslationResult.jsx";

export default function TranslatorForm() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("es");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    if (!text) return;
    setLoading(true);
    setTranslated(""); 

    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key":
            "599274bf97mshb1ef11493a9c38bp15e40ajsn8674aea6f204",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: text,
          source: "en",
          target: language,
          format: "text",
        },
      };

      const response = await axios.request(options);


      if (
        response.data &&
        response.data.data &&
        response.data.data.translations &&
        response.data.data.translations[0]
      ) {
        setTranslated(response.data.data.translations[0].translatedText);
      } else {
        setTranslated("Translation failed. Check API response.");
      }
    } catch (err) {
      console.error("Translation error:", err);
      setTranslated("Error translating text. Check your API key and quota.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">🌍 Text Translator</h1>

      <input
        type="text"
        placeholder="Enter text in English"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="hi">Hindi</option>
        <option value="zh-CN">Chinese</option>
        <option value="tel">Telugu</option>
        <option value="mr">Marathi</option>
        <option value="ja">Japanese</option>

      </select>

      <button
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        onClick={translateText}
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      <TranslationResult translated={translated} />
    </div>
  );
}
