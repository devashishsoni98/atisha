import React, { useState } from 'react'
import { Calendar, Clock, Search, Filter, Star, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'

const counselors = [
  { 
    id: 1, 
    name: 'Dr. Emily Smith', 
    specialization: 'Career Guidance', 
    qualifications: 'Ph.D. in Psychology, Certified Career Counselor',
    expertise: ['Career Planning', 'Job Search Strategies', 'Interview Preparation'],
    languages: ['English', 'Spanish'],
    rating: 4.8,
    reviews: 127,
    avatar: '/placeholder.svg?height=100&width=100'
  },
  { 
    id: 2, 
    name: 'Prof. Michael Johnson', 
    specialization: 'Academic Advising', 
    qualifications: 'M.Ed. in Higher Education, Certified Academic Advisor',
    expertise: ['Course Selection', 'Study Skills', 'Time Management'],
    languages: ['English', 'French'],
    rating: 4.6,
    reviews: 98,
    avatar: '/placeholder.svg?height=100&width=100'
  },
  { 
    id: 3, 
    name: 'Dr. Sarah Lee', 
    specialization: 'Personal Development', 
    qualifications: 'Ph.D. in Counseling Psychology, Licensed Therapist',
    expertise: ['Stress Management', 'Self-Esteem Building', 'Goal Setting'],
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    reviews: 156,
    avatar: '/placeholder.svg?height=100&width=100'
  },
  { 
    id: 4, 
    name: 'Dr. David Brown', 
    specialization: 'Graduate School Preparation', 
    qualifications: 'Ed.D. in Educational Leadership, Former Admissions Officer',
    expertise: ['Application Strategy', 'Personal Statement Review', 'Interview Preparation'],
    languages: ['English'],
    rating: 4.7,
    reviews: 89,
    avatar: '/placeholder.svg?height=100&width=100'
  },
  { 
    id: 5, 
    name: 'Prof. Lisa Chen', 
    specialization: 'International Student Support', 
    qualifications: 'M.A. in International Education, TESOL Certified',
    expertise: ['Cultural Adjustment', 'Language Support', 'Visa Guidance'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    rating: 4.8,
    reviews: 112,
    avatar: '/placeholder.svg?height=100&width=100'
  },
]

const CounselorCard = ({ counselor, onSelect }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer" onClick={() => onSelect(counselor)}>
    <div className="flex items-start">
      <img src={counselor.avatar} alt={counselor.name} className="w-20 h-20 rounded-full mr-4" />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{counselor.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{counselor.specialization}</p>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{counselor.rating}</span>
          <span className="text-sm text-gray-500 ml-1">({counselor.reviews} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {counselor.expertise.slice(0, 3).map((exp, index) => (
            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{exp}</span>
          ))}
        </div>
        <p className="text-sm text-gray-600">Languages: {counselor.languages.join(', ')}</p>
      </div>
    </div>
  </div>
)

const TimeSlot = ({ time, isAvailable, onSelect }) => (
  <button
    className={`w-full p-2 text-left ${isAvailable ? 'bg-white hover:bg-blue-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'} border rounded`}
    onClick={() => isAvailable && onSelect(time)}
    disabled={!isAvailable}
  >
    <Clock className="inline-block mr-2 h-4 w-4" />
    {time}
  </button>
)

const ConfirmationDialog = ({ isOpen, onClose, counselor, date, time, onConfirm }) => (
  isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Confirm Appointment</h2>
        <p className="mb-4">
          You are booking a session with {counselor?.name} on {date} at {time}.
        </p>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  )
)

const StudentSessionCard = ({ session }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">{session.counselor}</h3>
      <span className={`px-2 py-1 rounded text-sm ${
        session.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 
        session.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 
        'bg-yellow-100 text-yellow-800'
      }`}>
        {session.status}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-2">{session.date} at {session.time}</p>
    <p className="text-sm text-gray-500">{session.topic}</p>
  </div>
)

const StudentRequestCard = ({ request }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold">{request.counselor}</h3>
      <span className={`px-2 py-1 rounded text-sm ${
        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        {request.status}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-2">{request.date} at {request.time}</p>
    <p className="text-sm text-gray-500">{request.topic}</p>
  </div>
)

export default function StudentCounselorBrowsing() {
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterExpertise, setFilterExpertise] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('')
  const [activeTab, setActiveTab] = useState('browse') // 'browse', 'sessions', or 'requests'

  const availableSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: false },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
  ]

  // Mock data for student sessions and requests
  const [studentSessions, setStudentSessions] = useState([
    { id: 1, counselor: 'Dr. Emily Smith', date: '2023-06-20', time: '10:00 AM', topic: 'Career Planning', status: 'Upcoming' },
    { id: 2, counselor: 'Prof. Michael Johnson', date: '2023-06-18', time: '2:00 PM', topic: 'Study Skills', status: 'Completed' },
    { id: 3, counselor: 'Dr. Sarah Lee', date: '2023-06-25', time: '11:00 AM', topic: 'Stress Management', status: 'Upcoming' },
  ])

  const [studentRequests, setStudentRequests] = useState([
    { id: 1, counselor: 'Dr. David Brown', date: '2023-06-22', time: '3:00 PM', topic: 'Graduate School Preparation', status: 'Pending' },
    { id: 2, counselor: 'Prof. Lisa Chen', date: '2023-06-23', time: '1:00 PM', topic: 'International Student Support', status: 'Approved' },
    { id: 3, counselor: 'Dr. Emily Smith', date: '2023-06-24', time: '11:00 AM', topic: 'Career Planning', status: 'Rejected' },
  ])

  const filteredCounselors = counselors.filter(counselor => 
    counselor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterExpertise === '' || counselor.expertise.includes(filterExpertise)) &&
    (filterLanguage === '' || counselor.languages.includes(filterLanguage))
  )

  const handleDateChange = (increment) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + increment)
      return newDate
    })
  }

  const handleBookingConfirm = () => {
    setIsDialogOpen(false)
    const newRequest = {
      id: studentRequests.length + 1,
      counselor: selectedCounselor.name,
      date: selectedDate.toLocaleDateString(),
      time: selectedTime,
      topic: 'New Appointment',
      status: 'Pending'
    }
    setStudentRequests(prev => [...prev, newRequest])
    alert(`Your request with ${selectedCounselor.name} on ${selectedDate.toDateString()} at ${selectedTime} has been sent and is pending approval.`)
    setSelectedCounselor(null)
    setSelectedTime(null)
  }

  const handleAcceptRequest = (id) => {
    //This function is not used anymore.
  }

  const handleRejectRequest = (id) => {
    //This function is not used anymore.
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Student Counseling Portal</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'browse' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Counselors
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'sessions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('sessions')}
          >
            My Sessions
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${activeTab === 'requests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setActiveTab('requests')}
          >
            My Requests
          </button>
        </div>

        {activeTab === 'browse' && (
          <div className="flex flex-col md:flex-row gap-8">
            <section className="md:w-2/3">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <input 
                  type="text"
                  placeholder="Search counselors..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow p-2 border rounded"
                />
                <select 
                  value={filterExpertise} 
                  onChange={(e) => setFilterExpertise(e.target.value)}
                  className="w-full sm:w-[180px] p-2 border rounded"
                >
                  <option value="">All Expertise</option>
                  <option value="Career Planning">Career Planning</option>
                  <option value="Study Skills">Study Skills</option>
                  <option value="Stress Management">Stress Management</option>
                  <option value="Cultural Adjustment">Cultural Adjustment</option>
                </select>
                <select 
                  value={filterLanguage} 
                  onChange={(e) => setFilterLanguage(e.target.value)}
                  className="w-full sm:w-[180px] p-2 border rounded"
                >
                  <option value="">All Languages</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="space-y-6 pr-4 max-h-[calc(100vh-250px)] overflow-y-auto">
                {filteredCounselors.map(counselor => (
                  <CounselorCard
                    key={counselor.id}
                    counselor={counselor}
                    onSelect={setSelectedCounselor}
                  />
                ))}
              </div>
            </section>

            <section className="md:w-1/3">
              {selectedCounselor ? (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-2">{selectedCounselor.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedCounselor.specialization}</p>
                  <h3 className="font-semibold mb-2">Select a Date and Time</h3>
                  <div className="flex items-center justify-between mb-4">
                    <button className="p-2 border rounded" onClick={() => handleDateChange(-1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <h4 className="text-sm font-medium">
                      {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </h4>
                    <button className="p-2 border rounded" onClick={() => handleDateChange(1)}>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, index) => (
                      <TimeSlot
                        key={index}
                        time={slot.time}
                        isAvailable={slot.available}
                        onSelect={(time) => {
                          setSelectedTime(time)
                          setIsDialogOpen(true)
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg p-6">
                  <p className="text-gray-500 text-lg text-center">Select a counselor to view available time slots and book an appointment.</p>
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'sessions' && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">My Sessions</h2>
            {studentSessions.length > 0 ? (
              studentSessions.map(session => (
                <StudentSessionCard key={session.id} session={session} />
              ))
            ) : (
              <p className="text-gray-500 text-center">You don't have any sessions yet.</p>
            )}
          </section>
        )}

        {activeTab === 'requests' && (
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
            {studentRequests.length > 0 ? (
              studentRequests.map(request => (
                <StudentRequestCard key={request.id} request={request} />
              ))
            ) : (
              <p className="text-gray-500 text-center">You don't have any pending requests.</p>
            )}
          </section>
        )}
      </main>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        counselor={selectedCounselor}
        date={selectedDate.toDateString()}
        time={selectedTime}
        onConfirm={handleBookingConfirm}
      />
    </div>
  )
}

