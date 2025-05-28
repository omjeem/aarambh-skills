import React, { useState } from 'react';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import * as XLSX from 'xlsx';

const Notification = ({ message, type }) => (
  <div
    className={`fixed top-4 right-4 z-50 min-w-[300px] p-4 rounded-lg shadow-lg animate-slideIn ${type === 'success'
      ? 'bg-green-50 border-l-4 border-green-500'
      : 'bg-red-50 border-l-4 border-red-500'
      }`}
  >
    <div className="flex items-center space-x-3">
      {type === 'success' ? (
        <IoMdCheckmarkCircle className="text-2xl text-green-500" />
      ) : (
        <MdError className="text-2xl text-red-500" />
      )}
      <p className={`font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}>
        {message}
      </p>
    </div>
  </div>
);

const Quiz = () => {
  const [courses] = useState([
    { id: 1, title: "Python " },
    { id: 2, title: "Web Development" },
    { id: 3, title: "Data Science" },
    { id: 4, title: "Machine Learning" },
    { id: 5, title: "PHP" }
  ]);

  const [selectedCourse, setSelectedCourse] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizLevel, setQuizLevel] = useState('low');
  const [questions, setQuestions] = useState([{
    question: '',
    options: ['', '', '', ''],
    answer: ''
  }]);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });
  const [loading, setLoading] = useState(false);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', show: false });
    }, 3000);
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question: '',
      options: ['', '', '', ''],
      answer: ''
    }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      showNotification('Please upload a valid Excel file (.xlsx or .xls)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        if (jsonData.length === 0) {
          showNotification('Excel file is empty', 'error');
          return;
        }

        const formattedQuestions = jsonData.map(row => {
          // Check if required columns exist
          if (!row.question || !row.optionA || !row.optionB || !row.optionC || !row.optionD || !row.answer) {
            throw new Error('Excel file must contain columns: question, optionA, optionB, optionC, optionD, answer');
          }

          return {
            question: row.question.toString(),
            options: [
              row.optionA.toString(),
              row.optionB.toString(),
              row.optionC.toString(),
              row.optionD.toString()
            ],
            answer: row.answer.toString().toUpperCase()
          };
        });

        setQuestions(formattedQuestions);
        showNotification('Questions imported successfully');
      } catch (error) {
        showNotification(error.message || 'Error parsing Excel file', 'error');
        console.error('Excel parsing error:', error);
      }
    };

    reader.onerror = () => {
      showNotification('Error reading file', 'error');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse || !quizTitle || questions.some(q => !q.question || !q.answer)) {
      showNotification('Please fill all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showNotification('Quiz added successfully');
      // Reset form
      setQuizTitle('');
      setSelectedCourse('');
      setQuizLevel('low');
      setQuestions([{
        question: '',
        options: ['', '', '', ''],
        answer: ''
      }]);
    } catch (error) {
      showNotification('Error adding quiz', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 ">
      {notification.show && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Quiz</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Topic
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2  border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                required
              >
                <option value="">Select a Topic</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Title
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quiz Level
              </label>
              <select
                value={quizLevel}
                onChange={(e) => setQuizLevel(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex justify-center items-center">
              <label className=" text-md   font-medium text-gray-700 ">
                Import from Excel
              </label>
              <div className="ml-4 relative">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleExcelUpload}
                  className="hidden"
                  id="excel-upload"
                />
                <label
                  htmlFor="excel-upload"
                  className="cursor-pointer bg-[#020A47] text-white px-4 py-2 rounded-md hover:bg-[#020A47]/90 flex items-center gap-2"
                >
                  <FaUpload /> Upload Excel
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, questionIndex) => (
              <div key={questionIndex} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-[#020A47]">Question {questionIndex + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => updateQuestion(questionIndex, 'question', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {q.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Option {String.fromCharCode(65 + optionIndex)}
                      </label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correct Answer
                  </label>
                  <select
                    value={q.answer}
                    onChange={(e) => updateQuestion(questionIndex, 'answer', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#020A47] focus:border-[#020A47]"
                    required
                  >
                    <option value="">Select correct answer</option>
                    {q.options.map((_, index) => (
                      <option key={index} value={String.fromCharCode(65 + index)}>
                        {String.fromCharCode(65 + index)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-2 text-[#020A47] hover:text-[#020A47]/80 font-medium"
            >
              <FaPlus className="text-lg" /> Add Question
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#020A47] text-white py-2 px-6 rounded-md hover:bg-[#020A47]/90 disabled:bg-[#020A47]/50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Quiz'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
