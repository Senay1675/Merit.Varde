// import React, { useState } from "react";
// import MeritCalculator from "../MeritCalc/MeritCalculator";
// import "./counter.css"


// interface Course {
//   id: number;
//   course: string;
//   point: number;
//   grade: string;
// }

// const Counter: React.FC = () => {
//   const [course, setCourse] = useState<string>("");
//   const [point, setPoint] = useState<string>("");
//   const [grade, setGrade] = useState<string>("");
//   const [courses, setCourses] = useState<Course[]>([]);

//   const handleAddCourse = () => {
//     if (course && point && grade) {
//       const newCourse: Course = {
//         id: Date.now(),
//         course,
//         point: parseInt(point, 10),
//         grade,
//       };

//       setCourses((prevCourses) => [...prevCourses, newCourse]);

//       setCourse("");
//       setPoint("");
//       setGrade("");
//     } else {
//       alert("Fyll i alla fält!");
//     }
//   };

//   const deleteCourse = (id: number) => {
//     setCourses((prevCourses) => prevCourses.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="counter-container">
//       <h2>Kurshanterare</h2>

//       <div className="input-section">
//         <h3>Lägg till ny kurs</h3>
//         <label htmlFor="course">Kurs</label>
//         <input
//           type="text"
//           id="course"
//           value={course}
//           onChange={(e) => setCourse(e.target.value)}
//         />
//         <label htmlFor="point">Poäng</label>
//         <input
//           type="number"
//           id="point"
//           value={point}
//           onChange={(e) => setPoint(e.target.value)}
//         />

//         <div className="grade-buttons">
//           <label>Betyg:</label>
//           {["A", "B", "C", "D", "E", "F"].map((gradeOption) => (
//             <button
//               key={gradeOption}
//               className={`grade-btn ${grade === gradeOption ? "selected" : ""}`}
//               onClick={() => setGrade(gradeOption)}
//             >
//               {gradeOption}
//             </button>
//           ))}
//         </div>

//         <button className="add-btn" onClick={handleAddCourse}>
//           Lägg till kurs
//         </button>
//       </div>

//       <div className="course-list">
//         <h3>Dina kurser</h3>
//         {courses.length === 0 ? (
//           <p>Inga kurser tillagda ännu.</p>
//         ) : (
//           <ul>
//             {courses.map((item) => (
//               <li key={item.id} className="course-item">
//                 <span>
//                   <strong>{item.course}</strong> - {item.point} poäng - Betyg:{" "}
//                   {item.grade}
//                 </span>
//                 <button className="delete-btn" onClick={() => deleteCourse(item.id)}>
//                   ❌
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <MeritCalculator courses={courses} />
//     </div>
//   );
// };

// export default Counter;


import React, { useState } from "react";
import MeritCalculator from "../MeritCalc/MeritCalculator";
import EducationSuggestion from "../EducationSuggestions/EducationSuggestions";
import "./counter.css";

interface Course {
  id: number;
  course: string;
  point: number;
  grade: string;
}

const Counter: React.FC = () => {
  const [course, setCourse] = useState<string>("");
  const [point, setPoint] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [meritValue, setMeritValue] = useState<number | null>(null);
 
  const [educationSuggestions, setEducationSuggestions] = useState<any[]>([]);

  const handleAddCourse = () => {
    if (course && point && grade) {
      const newCourse: Course = {
        id: Date.now(),
        course,
        point: parseInt(point, 10),
        grade,
      };

      setCourses((prev) => [...prev, newCourse]);
      setCourse("");
      setPoint("");
      setGrade("");
    } else {
      alert("Fyll i alla fält!");
    }
  };

  const deleteCourse = (id: number) => {
    setCourses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="main-container">
      <div className="counter-container">
        <h2>Kurshanterare</h2>
        <div className="input-section">
          <h3>Lägg till ny kurs</h3>
          <label htmlFor="course">Kurs</label>
          <input type="text" id="course" value={course} onChange={(e) => setCourse(e.target.value)} />
          <label htmlFor="point">Poäng</label>
          <input type="number" id="point" value={point} onChange={(e) => setPoint(e.target.value)} />

          <div className="grade-buttons">
            <label>Betyg:</label>
            {["A", "B", "C", "D", "E", "F"].map((g) => (
              <button key={g} className={grade === g ? "selected" : ""} onClick={() => setGrade(g)}>
                {g}
              </button>
            ))}
          </div>

          <button className="add-btn" onClick={handleAddCourse}>
            Lägg till kurs
          </button>
        </div>

        <div className="course-list">
          <h3>Dina kurser</h3>
          {courses.length === 0 ? <p>Inga kurser tillagda ännu.</p> : (
            <ul>
              {courses.map((item) => (
                <li key={item.id} className="course-item">
                  <span>
                    <strong>{item.course}</strong> - {item.point} poäng - Betyg: {item.grade}
                  </span>
                  <button className="delete-btn" onClick={() => deleteCourse(item.id)}>❌</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <MeritCalculator courses={courses} setMeritValue={setMeritValue} setEducationSuggestions={setEducationSuggestions} />
      </div>

      <div className="suggestions-container">
        <EducationSuggestion meritValue={meritValue} suggestions={educationSuggestions} />
      </div>
    </div>
  );
};

export default Counter;
