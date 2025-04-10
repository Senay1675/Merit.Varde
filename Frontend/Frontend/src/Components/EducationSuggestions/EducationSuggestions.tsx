import React from "react";
import "./EducationSuggestions.css";


// EducationSuggestion tar emot ett meritvärde (meritValue) och en lista av utbildningsförslag (suggestions).
// Den filtrerar sedan ut utbildningar som matchar meritvärdet och visar dem i en lista.

interface Education {
  namn: string;
  beskrivning: string;
  minMerit: number;
}

// Definierar props för EducationSuggestion-komponenten

interface EducationSuggestionProps {
  meritValue: number | null;
  suggestions: Education[];
}

// Funktion för att bestämma meritspann baserat på användarens meritvärde

const getMeritRange = (meritValue: number | null): [number, number] => {
  if (meritValue === null) return [0, 10];

  if (meritValue >= 20) return [20, Infinity];
  if (meritValue >= 18) return [18, 20];
  if (meritValue >= 16) return [16, 18];
  if (meritValue >= 14) return [14, 16];
  if (meritValue >= 12) return [12, 14];
  return [10, 12];
};

const EducationSuggestion: React.FC<EducationSuggestionProps> = ({ meritValue, suggestions }) => {
  if (meritValue === null) return <p>Beräkna ditt meritvärde först.</p>;

    // Hämtar det meritintervall som användarens meritvärde tillhör

  const [minMerit, maxMerit] = getMeritRange(meritValue);

  // Filtrera utbildningar
  const filteredSuggestions = suggestions.filter(
    (utb) => utb.minMerit >= minMerit && (maxMerit === Infinity || utb.minMerit < maxMerit)
  );

  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>
      <p>baserat på ditt meritvärde.</p>
      {filteredSuggestions.length > 0 ? (
        <ul>
          {filteredSuggestions.map((utb, index) => (
            <li key={index}>
              <details>
                <summary>
                  {utb.namn}
                  <span className="arrow"></span>
                </summary>
                <p>{utb.beskrivning}</p>
                <small>(Min merit: {utb.minMerit})</small>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga utbildningar matchar ditt meritvärde.</p>
      )}
    </div>
  );
};

export default EducationSuggestion;
