import axios from "axios"
const API = "https://emkc.org/api/v2/piston";
const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

export const execute = async (language, code) => {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language]
    if (!languageConfig) {
       return {
         success: false,
         error: `Unsupported language: ${language}`,
       };
    }

    const response = await axios.post(
      `${API}/execute`,
      {
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

     if (!response.statusText=="OK") {
       return {
         success: false,
         error: `HTTP error! status: ${response.status}`,
       };
     }

     const output = response.data.run.output || "";
     const stderr = response.data.run.stderr || "";

     if (stderr) {
       return {
         success: false,
         output: output,
         error: stderr,
       };
     }

     return {
       success: true,
       output: output || "No output",
     };
  } catch (error) {
    console.log("Error in executing code,",error)
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
