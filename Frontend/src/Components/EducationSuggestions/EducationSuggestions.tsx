// import React from "react";
// import "./EducationSuggestions.css";  // ⬅️ Lägg till denna rad för att importera CSS

// interface Education {
//   namn: string;
//   beskrivning: string;
//   minMerit: number;
// }

// interface EducationSuggestionProps {
//   meritValue: number | null;
//   suggestions: Education[];
// }

// const getMeritRange = (meritValue: number | null): [number, number] => {
//   if (meritValue === null) return [0, 10];

//   if (meritValue >= 20) return [20, Infinity];
//   if (meritValue >= 18) return [18, 20];
//   if (meritValue >= 16) return [16, 18];
//   if (meritValue >= 14) return [14, 16];
//   if (meritValue >= 12) return [12, 14];
//   return [10, 12];
// };

// const EducationSuggestion: React.FC<EducationSuggestionProps> = ({ meritValue, suggestions }) => {
//   if (meritValue === null) return <p>Beräkna ditt meritvärde först.</p>;

//   const [minMerit, maxMerit] = getMeritRange(meritValue);

//   // Filtrering sker här!
//   const filteredSuggestions = suggestions.filter(
//     (utb) => utb.minMerit >= minMerit && (maxMerit === Infinity || utb.minMerit < maxMerit)
//   );

//   return (
//     <div className="education-suggestions">
//       <h3>Utbildningsförslag</h3>
//       {filteredSuggestions.length > 0 ? (
//         <ul>
//           {filteredSuggestions.map((utb, index) => (
//             <li key={index}>
//               <strong>{utb.namn}</strong> {utb.beskrivning} (Min merit: {utb.minMerit})
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Inga utbildningar matchar ditt meritvärde.</p>
//       )}
//     </div>
//   );
// };

// export default EducationSuggestion;


import React from "react";
import "./EducationSuggestions.css";

interface Education {
  namn: string;
  beskrivning: string;
  minMerit: number;
}

interface EducationSuggestionProps {
  meritValue: number | null;
  suggestions: Education[];
}

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

  const [minMerit, maxMerit] = getMeritRange(meritValue);

  // Filtrera utbildningar
  const filteredSuggestions = suggestions.filter(
    (utb) => utb.minMerit >= minMerit && (maxMerit === Infinity || utb.minMerit < maxMerit)
  );

  return (
    <div className="education-suggestions">
      <h3>Utbildningsförslag</h3>
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
