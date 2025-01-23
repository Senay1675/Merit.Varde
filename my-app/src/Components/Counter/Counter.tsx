import React, { useState } from 'react';

const Counter = () => {
  const [course, setCourse] = useState('');
  const [point, setPoint] = useState('');
  const [grade, setGrade] = useState('');
  const [courses, setCourses] = useState([]); // State för lagrade kurser

  // Hantera lägg till kurs
  const handleAddCourse = () => {
    if (course && point && grade) {
      const newCourse = {
        course,
        point: parseInt(point, 10),
        grade,
      };

      // Uppdatera listan med den nya kursen
      setCourses((prevCourses) => [...prevCourses, newCourse]);

      // Töm fälten efter tillägg
      setCourse('');
      setPoint('');
      setGrade('');
    } else {
      alert('Fyll i alla fält!');
    }
  };

  return (
    <>
      <div>
        <h2>Counter</h2>
        <div>
          <h3>Lägg till ny kurs</h3>
          <label htmlFor="course">Kurs</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label htmlFor="point">Poäng</label>
          <input
            type="number"
            id="point"
            value={point}
            onChange={(e) => setPoint(e.target.value)}
          />
          <div>
            <label>Betyg:</label>
            {['A', 'B', 'C', 'D', 'E', 'F'].map((gradeOption) => (
              <button
                key={gradeOption}
                style={{
                  backgroundColor: grade === gradeOption ? 'lightblue' : '',
                }}
                onClick={() => setGrade(gradeOption)}
              >
                {gradeOption}
              </button>
            ))}
          </div>
          <button onClick={handleAddCourse}>Lägg till kurs</button>
        </div>

        {/* Lista över kurser */}
        <div>
          <h3>Dina kurser</h3>
          {courses.length === 0 ? (
            <p>Inga kurser tillagda ännu.</p>
          ) : (
            <ul>
              {courses.map((item, index) => (
                <li key={index}>
                  <strong>{item.course}</strong> - {item.point} poäng - Betyg: {item.grade}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Counter;
