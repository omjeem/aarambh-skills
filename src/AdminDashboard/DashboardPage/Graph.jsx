import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useState } from "react"

const chartData = [
    { day: "Jan", value: 23 },
    { day: "Feb", value: 0 },
    { day: "Mar", value: 10 },
    { day: "Apr", value: 20 },
    { day: "May", value: 39 },
    { day: "Jun", value: 78 },
    { day: "Jul", value: 0 },
    { day: "Aug", value: 0 },
    { day: "Sep", value: 0 },
    { day: "Oct", value: 0 },
    { day: "Nov", value: 0 },
    { day: "Dec", value: 0 },
  ]

const Graph = () => {
    return (
        <div className="w-full overflow-x-auto md:overflow-x-visible scrollbar-hide px-4">  
       {/* Learning Statistics */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border-[1px] h-[250px] md:h-[300px] w-[1200px] sm:w-full  border-gray-50 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">Admin revenue this year</h2>
          </div>
          <div className="h-[250px] sm:h-[300px] ">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData} 
                margin={{ top: 5, right: 20, left: 5, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 16 }}
                  interval={0}            
                  textAnchor="end"
                  height={80}
                  padding={{ left: 30}}
                />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#020A47" 
                  dot={{ fill: "#020A47" }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
    )
}

export default Graph
