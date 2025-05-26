import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const CourseBar = () => {
  // Static data for course status
  const courseData = [
    { name: 'Active', value: 12 },
    { name: 'Upcoming', value: 8 },
    { name: 'Pending', value: 5 },
    { name: 'Private', value: 3 },
    { name: 'Draft', value: 4 },
    { name: 'Inactive', value: 2 }
  ];

  const COLORS = {
    Active: '#00C49F',    // Green
    Upcoming: '#3B82F6',  // Blue
    Pending: '#FF4081',   // Pink
    Private: '#000000',   // Black
    Draft: '#9CA3AF',     // Gray
    Inactive: '#E5E7EB'   // Light Gray
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Course Status</h2>
        <div className="cursor-pointer">→</div>
      </div>
      
      <div className="flex items-center flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2">
          <PieChart width={200} height={200}>
            <Pie
              data={courseData}
              cx={100}
              cy={100}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {courseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </div>
        
        <div className="w-1/2">
          <div className="space-y-3">
            {courseData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[entry.name] }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseBar;
