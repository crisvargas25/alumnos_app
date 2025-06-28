import React, { useState, useEffect } from 'react';

interface Student {
  _id: string;
  name: string;
  email: string;
  enrollmentYear: number;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (yearFilter ? student.enrollmentYear === parseInt(yearFilter) : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Student List</h2>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Filter by enrollment year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Enrollment Year</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">{student.enrollmentYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;