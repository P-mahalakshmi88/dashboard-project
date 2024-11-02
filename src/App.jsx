import React from "react";
import CourseOverview from "./CourseSection"; // Adjust the path if necessary
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-purple-600">Mentor Dashboard</h1>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Add Course
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Upload Session
            </button>
           
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          <CourseOverview />
        </section>
      </main>
    </div>
  );
};

export default App;
