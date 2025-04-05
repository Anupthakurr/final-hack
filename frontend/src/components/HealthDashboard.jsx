import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Activity, Heart } from 'lucide-react';

const HealthDashboard = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/api/user/dashboard');

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setCurrentData(newData);
      setData(prevData => {
        const updatedData = [...prevData, newData];
        return updatedData.slice(-10);
      });
    };

    return () => eventSource.close();
  }, []);

  const createGaugeData = (value) => {
    return [
      { name: 'SpO2', value: value },
      { name: 'Remaining', value: 100 - value }
    ];
  };

  // Enhanced color palette for dark theme
  const COLORS = {
    heartRate: '#ff6b6b',
    heartRateGradient: ['#ff6b6b', '#ff8787'],
    oxygen: '#4dabf7',
    oxygenBackground: '#1e2835',
    steps: '#63e6be',
    stepsGradient: ['#63e6be', '#38d9a9'],
    grid: '#2d3748',
    text: '#e2e8f0',
    background: '#1a1a1a'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
          <p className="text-gray-300">{new Date(label).toLocaleTimeString()}</p>
          {payload.map((pld, index) => (
            <p key={index} className="text-white font-semibold">
              {pld.name}: {pld.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gray-900 rounded-xl">
      <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <Activity className="w-6 h-6 text-blue-400" />
        Health Metrics Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Heart Rate Card */}
        <div className="bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-all duration-300 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white flex items-center gap-2 font-bold">
              <Heart className="w-5 h-5 text-red-400" />
              Heart Rate
            </h2>
          </div>
          <div className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <defs>
                    <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.heartRateGradient[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.heartRateGradient[1]} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                  <XAxis 
                    dataKey="timestamp"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    stroke={COLORS.text}
                  />
                  <YAxis domain={[40, 140]} stroke={COLORS.text} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="heart_rate" 
                    stroke={COLORS.heartRate}
                    strokeWidth={3}
                    dot={{ fill: COLORS.heartRate }}
                    fill="url(#heartRateGradient)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Oxygen Saturation Card */}
        <div className="bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-all duration-300 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white flex items-center gap-2 font-bold">
              Oxygen Saturation
            </h2>
          </div>
          <div className="p-4">
            <div className="h-64 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData ? createGaugeData(Number(currentData.oxygen_saturation)) : []}
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={180}
                    endAngle={0}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.oxygen} />
                    <Cell fill={COLORS.oxygenBackground} />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="text-3xl font-bold text-white">
                {currentData?.oxygen_saturation}%
              </div>
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="bg-gray-800 border border-gray-700 hover:bg-gray-750 transition-all duration-300 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-white flex items-center gap-2 font-bold">
              <Activity className="w-5 h-5 text-green-400" />
              Steps per Minute
            </h2>
          </div>
          <div className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <defs>
                    <linearGradient id="stepsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.stepsGradient[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.stepsGradient[1]} stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} />
                  <XAxis 
                    dataKey="timestamp"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                    stroke={COLORS.text}
                  />
                  <YAxis domain={[0, 200]} stroke={COLORS.text} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="steps" 
                    fill="url(#stepsGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Current Values Display */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-6 text-center py-6">
            <div className="space-y-2">
              <div className="text-gray-400 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Heart Rate
              </div>
              <div className="text-3xl font-bold text-white">
                {currentData?.heart_rate || '--'} 
                <span className="text-lg text-gray-400 ml-1">BPM</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-400 flex items-center justify-center gap-2">
                SpO2
              </div>
              <div className="text-3xl font-bold text-white">
                {currentData?.oxygen_saturation || '--'}
                <span className="text-lg text-gray-400 ml-1">%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-400 flex items-center justify-center gap-2">
                <Activity className="w-4 h-4" />
                Steps
              </div>
              <div className="text-3xl font-bold text-white">
                {currentData?.steps || '--'}
                <span className="text-lg text-gray-400 ml-1">/min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;