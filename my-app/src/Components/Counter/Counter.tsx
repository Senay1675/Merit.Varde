

// export default Counter;
import React, { useState } from 'react';

// Definiera en typ för kurser
interface Course {
  id: number;
  course: string;
  point: number;
  grade: string;
}

const Counter: React.FC = () => {
  const [course, setCourse] = useState<string>('');
  const [point, setPoint] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [courses, setCourses] = useState<Course[]>([]);

  // Lägg till en ny kurs
  const handleAddCourse = () => {
    if (course && point && grade) {
      const newCourse: Course = {
        id: Date.now(),
        course,
        point: parseInt(point, 10),
        grade,
      };

      setCourses((prevCourses) => [...prevCourses, newCourse]);

      // Nollställ input-fälten
      setCourse('');
      setPoint('');
      setGrade('');
    } else {
      alert('Fyll i alla fält!');
    }
  };

  // Funktion för att radera en kurs
  const deleteCourse = (id: number) => {
    setCourses((prevCourses) => prevCourses.filter((item) => item.id !== id));
  };

  return (
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
            {courses.map((item) => (
              <li key={item.id}>
                <strong>{item.course}</strong> - {item.point} poäng - Betyg: {item.grade}
                <button onClick={() => deleteCourse(item.id)}>❌</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Counter;

