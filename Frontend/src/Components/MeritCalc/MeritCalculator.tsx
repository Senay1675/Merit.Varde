// import React, { useState } from "react";
// import EducationSuggestion from "../EducationSuggestions/EducationSuggestions"; 
// import "./MeritCalculator.css";

// interface Course {
//   id: number;
//   course: string;
//   point: number;
//   grade: string;
// }

// interface EducationSuggestionType {
//   namn: string;
//   beskrivning: string;
//   minMerit: number;
// }

// interface MeritCalculatorProps {
//   courses: Course[];
// }

// const gradeToPoints: Record<string, number> = {
//   A: 20,
//   B: 17.5,
//   C: 15,
//   D: 12.5,
//   E: 10,
//   F: 0,
// };

// // Funktion för att räkna ut meritvärdet
// const calculateMeritValue = (courses: Course[]): number => {
//   if (courses.length === 0) return 0;

//   let totalWeightedPoints = 0;
//   let totalPoints = 0;

//   courses.forEach(({ point, grade }) => {
//     const meritPoints = gradeToPoints[grade] || 0;
//     totalWeightedPoints += meritPoints * point;
//     totalPoints += point;
//   });

//   return totalPoints > 0 ? totalWeightedPoints / totalPoints : 0;
// };

// // Funktion för att hämta utbildningsförslag från backend
// const fetchEducationSuggestions = async (
//   meritValue: number,
//   setError: (msg: string | null) => void
// ): Promise<EducationSuggestionType[]> => {
//   try {
//     const response = await fetch(`http://localhost:3000/utbildningar?meritvärde=${meritValue}`);
//     if (!response.ok) throw new Error("Kunde inte hämta utbildningar.");
//     return await response.json();
//   } catch (error) {
//     setError("Något gick fel vid hämtning av utbildningar.");
//     return [];
//   }
// };

// const MeritCalculator: React.FC<MeritCalculatorProps> = ({ courses }) => {
//   const [meritValue, setMeritValue] = useState<number | null>(null);
//   const [educationSuggestions, setEducationSuggestions] = useState<EducationSuggestionType[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleCalculate = async () => {
//     setLoading(true);
//     setError(null);

//     const result = calculateMeritValue(courses);
//     setMeritValue(result);

//     const suggestions = await fetchEducationSuggestions(result, setError);

//     setEducationSuggestions(suggestions);
//     setLoading(false);
//   };

//   return (
//     <>
//     <div className="merit-container">
//         <h3>Ditt meritvärde: {meritValue !== null ? meritValue.toFixed(2) : "Ej beräknat"}</h3>
//         <button onClick={handleCalculate}>Beräkna Meritvärde</button>

//         {loading && <p>Laddar utbildningar...</p>}
//         {error && <p className="error-text">{error}</p>}
//       </div>

//       <div className="merit-counter">
//       {meritValue !== null && <EducationSuggestion meritValue={meritValue} suggestions={educationSuggestions} />}
//     </div>

//     </>
//   );
// };

// export default MeritCalculator;


import React, { useState } from "react";
import EducationSuggestion from "../EducationSuggestions/EducationSuggestions";

interface Course {
  id: number;
  course: string;
  point: number;
  grade: string;
}

interface MeritCalculatorProps {
  courses: Course[];
  setMeritValue: (value: number) => void;
  setEducationSuggestions: (suggestions: any[]) => void;
}

const gradeToPoints: Record<string, number> = {
  A: 20, B: 17.5, C: 15, D: 12.5, E: 10, F: 0,
};

const calculateMeritValue = (courses: Course[]): number => {
  if (courses.length === 0) return 0;
  let totalWeightedPoints = 0;
  let totalPoints = 0;

  courses.forEach(({ point, grade }) => {
    totalWeightedPoints += (gradeToPoints[grade] || 0) * point;
    totalPoints += point;
  });

  return totalPoints > 0 ? totalWeightedPoints / totalPoints : 0;
};

const fetchEducationSuggestions = async (meritValue: number) => {
  try {
    const response = await fetch(`http://localhost:3000/utbildningar?meritvärde=${meritValue}`);
    if (!response.ok) throw new Error("Kunde inte hämta utbildningar.");
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av utbildningar:", error);
    return [];
  }
};

const MeritCalculator: React.FC<MeritCalculatorProps> = ({ courses, setMeritValue, setEducationSuggestions }) => {
  const [loading, setLoading] = useState(false);
  const [localMeritValue, setLocalMeritValue] = useState<number | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    const merit = calculateMeritValue(courses);
    setMeritValue(merit);
    setLocalMeritValue(merit);
    const suggestions = await fetchEducationSuggestions(merit);
    setEducationSuggestions(suggestions);
    setLoading(false);
  };

  return (
    <div className="merit-container">
      <h3>Beräkna Meritvärde</h3>
      <button onClick={handleCalculate} disabled={loading}>{loading ? "Laddar..." : "Beräkna"}</button>
      <h3>{localMeritValue !== null ? `Ditt meritvärde: ${localMeritValue.toFixed(2)}` : "Ingen beräkning ännu"}</h3>
    </div>
  );
};

export default MeritCalculator;


