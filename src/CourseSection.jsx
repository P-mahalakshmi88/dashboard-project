import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FiEdit3, FiCheck } from "react-icons/fi";
import pythonImage from './python.jpg';
import jsImage from './javas.jpg';
import dataScienceImage from './ds.jpg';
import mlImage from './ML.jpg';
import aiImage from './AI.jpg';

const maxDescriptionLength = 50;

const initialCourses = [
  {
    id: 1,
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    subtitle: 'Master Python by building 100 projects in 100 days.',
    description: 'Learn data science, automation, build websites, games, and apps!',
    enrolled: '1,386,663 students enrolled in this course',
    createdBy: 'Dr. Angela Yu',
    lastUpdated: '09/2024',
    content: [
      'Day 1 - Python Basics: Variables, Data Types, and Control Flow',
      'Day 10 - Building Web Applications with Flask',
      'Day 50 - Data Analysis with Pandas and NumPy',
      'Day 75 - Machine Learning Models with Scikit-Learn',
      'Day 100 - Capstone Project: Build a Full Python App'
    ],
    whatYouWillLearn: [
      "Master Python by building 100 unique projects over 100 days.",
      "Program in Python professionally.",
      "Create a portfolio of 100 Python projects.",
      "Use Python for data science and machine learning.",
      "Build GUIs and Desktop applications with Python.",
      "Learn automation, game, app, and web development, data science, and machine learning using Python.",
      "Learn Selenium, Beautiful Soup, Flask, Pandas, and more.",
      "Build websites and web apps with Python.",
      "Create games like Blackjack, Pong, and Snake."
    ],
    requirements: [
      "Basic programming knowledge is beneficial.",
      "Computer with Python installed.",
      "Internet connection for accessing online resources.",
    ],
    image: pythonImage,
  },
  {
    id: 2,
    title: '100 Days of Code: The Complete JavaScript Developer Bootcamp',
    subtitle: 'Master JavaScript by building 100 projects in 100 days.',
    description: 'Become a professional JavaScript developer and build projects with modern JS libraries!',
    enrolled: '745,322 students enrolled in this course',
    createdBy: 'Maximilian Schwarzmüller',
    lastUpdated: '10/2024',
    content: [
      'Day 1 - JavaScript Basics: Variables, Data Types, and Control Flow',
      'Day 10 - DOM Manipulation and Events',
      'Day 50 - Building Single Page Applications with React',
      'Day 75 - Full-Stack JavaScript with Node.js and Express',
      'Day 100 - Capstone Project: Build a Complete MERN App'
    ],
    whatYouWillLearn: [
      "Master JavaScript by building 100 unique projects over 100 days.",
      "Understand core JavaScript concepts and programming paradigms.",
      "Create a portfolio of JavaScript projects to apply for developer jobs.",
      "Use JavaScript with libraries like React, Node.js, and Express.",
      "Build front-end applications and user interfaces.",
      "Learn back-end development with Node.js.",
      "Understand asynchronous programming, promises, and APIs.",
      "Develop full-stack applications with JavaScript.",
      "Work with databases and server-side applications."
    ],
    requirements: [
      "Basic knowledge of HTML and CSS.",
      "Familiarity with programming concepts is recommended.",
      "A computer with a modern web browser and an internet connection."
    ],
    image: jsImage,
  },
  {
    id: 3,
    title: 'Data Science and Machine Learning Bootcamp with R',
    subtitle: 'Learn Data Science and Machine Learning using R Programming.',
    description: 'Master data science with R by completing hands-on projects!',
    enrolled: '345,212 students enrolled in this course',
    createdBy: 'Jose Portilla',
    lastUpdated: '10/2024',
    content: [
      'Introduction to R and RStudio',
      'Data Visualization with ggplot2',
      'Machine Learning Algorithms in R',
      'Data Wrangling with dplyr and tidyr',
      'Capstone Project: Data Analysis and Visualization'
    ],
    whatYouWillLearn: [
      "Master R programming for data science.",
      "Visualize data using ggplot2.",
      "Understand and implement machine learning algorithms.",
      "Clean and manipulate data using dplyr.",
      "Create impressive visualizations and dashboards."
    ],
    requirements: [
      "Basic understanding of statistics.",
      "A computer with R and RStudio installed.",
      "Internet connection for accessing online resources."
    ],
    image: dataScienceImage,
  },
  {
    id: 4,
    title: 'Machine Learning A-Z: Hands-On Python & R in Data Science',
    subtitle: 'Learn Machine Learning from A to Z using Python and R.',
    description: 'Master machine learning concepts and algorithms!',
    enrolled: '578,334 students enrolled in this course',
    createdBy: 'Kirill Eremenko',
    lastUpdated: '10/2024',
    content: [
      'Introduction to Machine Learning',
      'Regression and Classification Algorithms',
      'Clustering and Association Learning',
      'Neural Networks and Deep Learning',
      'Capstone Project: Build a Machine Learning Model'
    ],
    whatYouWillLearn: [
      "Understand key machine learning concepts.",
      "Implement regression, classification, and clustering algorithms.",
      "Build neural networks for deep learning.",
      "Apply machine learning techniques on real-world data."
    ],
    requirements: [
      "Basic programming knowledge in Python or R.",
      "A computer with Python and R installed.",
      "Internet connection for accessing online resources."
    ],
    image: mlImage,
  },
  {
    id: 5,
    title: 'Artificial Intelligence A-Z: Learn How To Build An AI',
    subtitle: 'Learn how to create AI solutions from scratch!',
    description: 'Explore the fascinating world of Artificial Intelligence!',
    enrolled: '234,567 students enrolled in this course',
    createdBy: 'Hadelin de Ponteves & Kirill Eremenko',
    lastUpdated: '10/2024',
    content: [
      'Introduction to AI and its Applications',
      'Building AI with Python',
      'Natural Language Processing (NLP)',
      'Computer Vision Basics',
      'Capstone Project: Build Your Own AI'
    ],
    whatYouWillLearn: [
      "Understand the basics of AI and its applications.",
      "Create AI models using Python.",
      "Implement natural language processing techniques.",
      "Explore computer vision and its applications."
    ],
    requirements: [
      "Basic programming knowledge is helpful.",
      "A computer with Python installed.",
      "Internet connection for accessing online resources."
    ],
    image: aiImage,
  }
];

const CourseOverview = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditingLearnings, setIsEditingLearnings] = useState(false);
  const [editedLearnings, setEditedLearnings] = useState([]);
  const [originalLearnings, setOriginalLearnings] = useState([]);
  const [isEditingRequirements, setIsEditingRequirements] = useState(false);
  const [editedRequirements, setEditedRequirements] = useState([]);
  const [originalRequirements, setOriginalRequirements] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const componentRef = useRef();

  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setEditedLearnings(course.whatYouWillLearn);
    setOriginalLearnings(course.whatYouWillLearn);
    setEditedRequirements(course.requirements);
    setOriginalRequirements(course.requirements);
    setActiveIndex(null);
  };

  const handleBack = () => {
    setSelectedCourse(null);
    setIsEditingLearnings(false);
    setIsEditingRequirements(false);
    setActiveIndex(null);
    setShowDeleteConfirmation(false);
  };

  const handleEditLearningsClick = () => {
    setIsEditingLearnings(true);
  };

  const handleEditRequirementsClick = () => {
    setIsEditingRequirements(true);
  };

  const handleCancelLearningsClick = () => {
    setEditedLearnings(originalLearnings);
    setIsEditingLearnings(false);
    setActiveIndex(null);
  };

  const handleCancelRequirementsClick = () => {
    setEditedRequirements(originalRequirements);
    setIsEditingRequirements(false);
  };

  const handleSubmitLearningsClick = () => {
    setSelectedCourse({ ...selectedCourse, whatYouWillLearn: editedLearnings });
    setIsEditingLearnings(false);
  };

  const handleSubmitRequirementsClick = () => {
    setSelectedCourse({ ...selectedCourse, requirements: editedRequirements });
    setIsEditingRequirements(false);
  };

  const handleLearningChange = (index, value) => {
    const updatedLearnings = [...editedLearnings];
    updatedLearnings[index] = value;
    setEditedLearnings(updatedLearnings);
  };

  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...editedRequirements];
    updatedRequirements[index] = value;
    setEditedRequirements(updatedRequirements);
  };

  const handleLearningSelect = (index) => {
    setActiveIndex(index);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: selectedCourse ? selectedCourse.title : "Course Overview",
  });

  const handleDeleteCourse = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCourse = () => {
    alert("Course deleted!");
    setShowDeleteConfirmation(false);
    setSelectedCourse(null);
  };

  const cancelDeleteCourse = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="container mx-auto mb-6" ref={componentRef}>
      <div>
        {!selectedCourse ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCourses.map((course, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={course.image} alt={course.title} className="mb-4 rounded-lg" />
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p>
                  {course.description && course.description.length > maxDescriptionLength
                    ? `${course.description.substring(0, maxDescriptionLength)}...`
                    : course.description}
                </p>
                <p className="text-purple-500 hover:underline cursor-pointer" onClick={() => handleViewCourse(course)}>
                  View Course
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-200 p-8 rounded-lg shadow-lg h-full flex flex-col items-start space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
              {selectedCourse.subtitle && <h3 className="text-lg font-semibold">{selectedCourse.subtitle}</h3>}
              <p className="text-gray-700 text-justify mb-4 border-l-4 border-purple-500 pl-4">{selectedCourse.description}</p>
            </div>
            <div className="text-gray-800">
              <p>{selectedCourse.enrolled}</p>
              <p>Created by: {selectedCourse.createdBy}</p>
              <p>Last Updated: {selectedCourse.lastUpdated}</p>
            </div>

            <div className="relative mt-6 rounded-lg p-4 bg-white shadow-md w-1/2 min-h-[400px] border-black border-2">
              <h4 className="text-lg font-semibold mb-2">What You’ll Learn:</h4>
              <ul className="list-inside space-y-2">
                {editedLearnings.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => handleLearningSelect(index)}
                    className={`text-gray-800 mb-2 flex items-start border-b cursor-pointer p-2 rounded-md min-h-[48px] w-[500px]
                      ${activeIndex === index ? 'bg-purple-100 border-purple-500' : ''}`}
                  >
                    {isEditingLearnings ? (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleLearningChange(index, e.target.value)}
                        className="border w-full rounded-md p-2"
                      />
                    ) : (
                      <span className="flex items-center">
                        <FiCheck className="mr-2 text-green-500" />
                        {item}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {isEditingLearnings ? (
                <div className="flex justify-end space-x-4 mt-4">
                  <button onClick={handleSubmitLearningsClick} className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                  <button onClick={handleCancelLearningsClick} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                </div>
              ) : (
                <button
                  onClick={handleEditLearningsClick}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <FiEdit3 size={18} />
                </button>
              )}
            </div>

            {selectedCourse.requirements && (
              <>
                <div className="relative mt-6 rounded-lg p-4 bg-white shadow-md w-1/2 border-black border-1.5">
                  <h4 className="text-lg font-semibold mb-2 flex items-center">
                    Requirements:
                    <button onClick={handleEditRequirementsClick} className="ml-2 text-gray-500 hover:text-gray-700">
                      <FiEdit3 size={18} />
                    </button>
                  </h4>
                  <ul className="list-disc list-inside space-y-2">
                    {isEditingRequirements ? (
                      editedRequirements.map((req, index) => (
                        <li key={index} className="text-gray-800">
                          <input
                            type="text"
                            value={req}
                            onChange={(e) => handleRequirementChange(index, e.target.value)}
                            className="border w-full rounded-md p-2"
                          />
                        </li>
                      ))
                    ) : (
                      selectedCourse.requirements.map((req, index) => (
                        <li key={index} className="text-gray-800">{req}</li>
                      ))
                    )}
                  </ul>
                  {isEditingRequirements && (
                    <div className="flex justify-end space-x-4 mt-4">
                      <button onClick={handleSubmitRequirementsClick} className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
                      <button onClick={handleCancelRequirementsClick} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
                    </div>
                  )}
                </div>
              </>
            )}

            <h4 className="text-lg font-semibold mt-4 mb-2">Course Content:</h4>
            <div className="space-y-4">
              {selectedCourse.content.map((item, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-md bg-white shadow-sm hover:shadow-md transition duration-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-black">Danger Zone</h4>
              <div className="bg-red-50 border border-red-200 p-4 rounded-md mt-2">
                <h5 className="text-black font-bold">Delete this Course</h5>
                <p className="text-black text-sm mb-4">
                  Once you delete a course, there is no going back. Please be certain.
                </p>
                {showDeleteConfirmation ? (
                  <div className="flex space-x-4">
                    <button
                      onClick={confirmDeleteCourse}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={cancelDeleteCourse}
                      className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleDeleteCourse}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                  >
                    Delete Course
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleBack}
              className="mt-6 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
            >
              Back to Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseOverview;
