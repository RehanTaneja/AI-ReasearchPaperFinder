  import React, { useEffect, useState } from "react";
  import "./ResearchPapers.css"; // Make sure to create this CSS file with the styles above

  const Research = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
      const storedResults = localStorage.getItem("searchResult");
      if (storedResults) {
        setResults(JSON.parse(storedResults)); // Parse the stored JSON
      }
    }, []);


    const handleLinkClick = (paper) => {
    // Step 1: Log the click
    fetch("https://ai-reasearchpaperfinder-311709302102.us-central1.run.app/log-click", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(paper),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Click logged:", data);
  
        // Step 2: Now tell Flask to update the PDF and reload the model
        return fetch("https://ai-reasearchpaperfinder-311709302102.us-central1.run.app/update-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: paper.url }),
        });
      })
        .then((response) => response.json())
        .then((data) => {
        console.log("PDF/model update response:", data);
          
        // Step 3: Redirect to the PDF viewer
          window.location.href = "https://ai-reasearchpaperfinder-311709302102.us-central1.run.app";
        })
        .catch((error) => {
        console.error("Error during click or PDF update:", error);
        });
    };
  
    
    return (
      <div className="research-container">
        <h2>Research Paper Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((paper, index) => (
              <li key={index}>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(paper)
                  }}
                >
                  {paper.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No research papers found</p>
        )}
      </div>
    );
  };

  export default Research;