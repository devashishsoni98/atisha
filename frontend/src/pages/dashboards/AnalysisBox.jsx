import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalysisBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [selectedChart, setSelectedChart] = useState('weekly');
  const [leaderboardType, setLeaderboardType] = useState('overall');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedActivity, setExpandedActivity] = useState(null);

  // Mock data for demonstration
  const mockActivities = [
    { id: 1, name: 'Math Class', date: '2023-05-01', participants: 25, type: 'Academic', description: 'Advanced calculus topics covered.' },
    { id: 2, name: 'Science Lab', date: '2023-05-03', participants: 20, type: 'Academic', description: 'Experiment on photosynthesis.' },
    { id: 3, name: 'Literature Club', date: '2023-05-05', participants: 15, type: 'Club', description: 'Discussion on Shakespeare\'s sonnets.' },
    { id: 4, name: 'Sports Day', date: '2023-05-07', participants: 50, type: 'Sports', description: 'Annual inter-house sports competition.' },
    { id: 5, name: 'Coding Workshop', date: '2023-05-10', participants: 30, type: 'Workshop', description: 'Introduction to Python programming.' },
    { id: 6, name: 'Art Exhibition', date: '2023-05-12', participants: 40, type: 'Cultural', description: 'Showcase of student artworks.' },
    { id: 7, name: 'Music Recital', date: '2023-05-15', participants: 35, type: 'Cultural', description: 'Performance by the school orchestra.' },
    { id: 8, name: 'Debate Competition', date: '2023-05-18', participants: 22, type: 'Competition', description: 'Inter-school debate on current affairs.' },
  ];

  useEffect(() => {
    setActivities(mockActivities);
    setFilteredActivities(mockActivities);
  }, []);

  useEffect(() => {
    let filtered = activities.filter(activity =>
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType !== 'All') {
      filtered = filtered.filter(activity => activity.type === selectedType);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'participants') {
        return sortOrder === 'asc' ? a.participants - b.participants : b.participants - a.participants;
      }
      return 0;
    });

    setFilteredActivities(filtered);
  }, [searchTerm, activities, sortBy, sortOrder, selectedType]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
  };

  const toggleActivityExpansion = (id) => {
    setExpandedActivity(expandedActivity === id ? null : id);
  };

  // Data for weekly activities chart
  const weeklyData = [
    { name: 'Week 1', activities: 5 },
    { name: 'Week 2', activities: 7 },
    { name: 'Week 3', activities: 4 },
    { name: 'Week 4', activities: 6 },
  ];

  // Data for monthly participants chart
  const monthlyData = [
    { name: 'Jan', participants: 300 },
    { name: 'Feb', participants: 450 },
    { name: 'Mar', participants: 400 },
    { name: 'Apr', participants: 500 },
    { name: 'May', participants: 600 },
  ];

  // Data for class distribution pie chart
  const classDistributionData = [
    { name: 'Math', students: 120 },
    { name: 'Science', students: 100 },
    { name: 'Literature', students: 80 },
    { name: 'History', students: 70 },
    { name: 'Art', students: 50 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Leaderboard data
  const leaderboardData = {
    overall: [
      { id: 1, name: 'John Doe', score: 95 },
      { id: 2, name: 'Jane Smith', score: 92 },
      { id: 3, name: 'Bob Johnson', score: 88 },
      { id: 4, name: 'Alice Williams', score: 85 },
      { id: 5, name: 'Charlie Brown', score: 82 },
    ],
    math: [
      { id: 1, name: 'Jane Smith', score: 98 },
      { id: 2, name: 'John Doe', score: 95 },
      { id: 3, name: 'Alice Williams', score: 90 },
      { id: 4, name: 'Charlie Brown', score: 87 },
      { id: 5, name: 'Bob Johnson', score: 85 },
    ],
    science: [
      { id: 1, name: 'Bob Johnson', score: 96 },
      { id: 2, name: 'John Doe', score: 93 },
      { id: 3, name: 'Charlie Brown', score: 89 },
      { id: 4, name: 'Jane Smith', score: 87 },
      { id: 5, name: 'Alice Williams', score: 84 },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Institute Dashboard</h1> */}

      {/* Search Feature */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search activities..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Activity List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <button
              className={`px-3 py-1 rounded mr-2 ${selectedType === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleTypeFilter('All')}
            >
              All
            </button>
            {Array.from(new Set(activities.map(a => a.type))).map(type => (
              <button
                key={type}
                className={`px-3 py-1 rounded mr-2 ${selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleTypeFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
          <div>
            <button
              className="px-3 py-1 rounded mr-2 bg-gray-200"
              onClick={() => handleSort('date')}
            >
              Sort by Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-200"
              onClick={() => handleSort('participants')}
            >
              Sort by Participants {sortBy === 'participants' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
        <ul className="space-y-2">
          {filteredActivities.map((activity) => (
            <li key={activity.id} className="bg-gray-100 p-2 rounded">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleActivityExpansion(activity.id)}>
                <span className="font-medium">{activity.name}</span>
                <div>
                  <span className="mr-4">{activity.date}</span>
                  <span>{activity.participants} participants</span>
                  <span className="ml-2">{expandedActivity === activity.id ? '▲' : '▼'}</span>
                </div>
              </div>
              {expandedActivity === activity.id && (
                <div className="mt-2 pl-4 border-l-2 border-blue-500">
                  <p><strong>Type:</strong> {activity.type}</p>
                  <p><strong>Description:</strong> {activity.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Charts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${selectedChart === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedChart('weekly')}
          >
            Weekly Activities
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedChart === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedChart('monthly')}
          >
            Monthly Participants
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedChart === 'distribution' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedChart('distribution')}
          >
            Class Distribution
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          {selectedChart === 'weekly' && (
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activities" stroke="#8884d8" />
            </LineChart>
          )}
          {selectedChart === 'monthly' && (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#82ca9d" />
            </BarChart>
          )}
          {selectedChart === 'distribution' && (
            <PieChart>
              <Pie
                data={classDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="students"
              >
                {classDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Leaderboard */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Student Leaderboard</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${leaderboardType === 'overall' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLeaderboardType('overall')}
          >
            Overall
          </button>
          <button
            className={`px-4 py-2 rounded ${leaderboardType === 'math' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLeaderboardType('math')}
          >
            Math
          </button>
          <button
            className={`px-4 py-2 rounded ${leaderboardType === 'science' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setLeaderboardType('science')}
          >
            Science
          </button>
        </div>
        <ul className="space-y-2">
          {leaderboardData[leaderboardType].map((student, index) => (
            <li key={student.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
              <span className="font-medium">{index + 1}. {student.name}</span>
              <span className="text-blue-600 font-semibold">{student.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisBox;
