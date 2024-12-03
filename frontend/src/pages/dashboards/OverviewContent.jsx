import React from 'react';
import { CalendarDays, Trophy, ArrowRight, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OverviewContent({ studentData }) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-5xl font-semibold text-blue-800">Welcome back, {studentData?.name || 'Student'}</h2>
          {/* <p className="text-xl text-blue-600">Level 1: Awareness Phase</p> */}
          <p className="text-2xl pt-4 font-bold text-black">Keep going! You're one step closer to discovering your dream career!</p>
        </div>
        <div className="text-right">
          {/* <div className="font-semibold text-blue-800">75% Complete</div> */}
          {/* <div className="w-[120px] bg-blue-200 rounded-full h-2 mt-1"> */}
            {/* <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div> */}
          {/* </div> */}
        </div>
      </div>

      {/* Level Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">Level Progress</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 w-full">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="text-xl font-medium text-blue-800">Level 1</div>
                  <div className="text-lg text-blue-600">Awareness</div>
                </div>
                <span className="text-xl font-semibold text-blue-800">75% Completed</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Current Tasks */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Current Tasks</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-blue-800">Complete Foundational Course: Basics of Biology</div>
                  <div className="text-sm text-blue-600">In Progress</div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">Resume</button>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-blue-800">Take Career Aptitude Test</div>
                  <div className="text-sm text-blue-600">Not Started</div>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors">Start Now</button>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-blue-800">Attend Virtual Career Fair</div>
                  <div className="text-sm text-blue-600">Completed</div>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors">Review</button>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links & Upcoming */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
                <Link className='flex items-center justify-start px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors' to='/roadmaps'>
              <button className=" flex items-center justify-center font-bold">
                <BookOpen className="mr-2 h-4 w-4" />
                Explore Careers
              </button>
                </Link>
                <Link className='flex items-center justify-start px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors' to='/quiz'>
              <button className=" flex items-center justify-center font-bold">
              <Target className="mr-2 h-4 w-4" />
                Take Career Quiz
              </button>
                </Link>
                <Link className='flex items-center justify-start px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors' to='/interactive-contents'>
              <button className=" flex items-center justify-center font-bold">
              <CalendarDays className="mr-2 h-4 w-4" />
                Interactive Content 
              </button>
                </Link>
                <Link className='flex items-center justify-start px-3 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors' to='/onboarding'>
              <button className=" flex items-center justify-center font-bold">
              <Trophy className="mr-2 h-4 w-4" />
                Onboarding
              </button>
                </Link>
              
             
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Tasks & Events</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <CalendarDays className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">Exploring Creative Arts Workshop</div>
                  <div className="text-sm text-blue-600">Dec 5, 3 PM</div>
                </div>
              </div>
              <div className="flex gap-4">
                <CalendarDays className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">Career Counseling Session</div>
                  <div className="text-sm text-blue-600">Dec 7, 2 PM</div>
                </div>
              </div>
              <div className="flex gap-4">
                <CalendarDays className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-800">Submit Personal Statement</div>
                  <div className="text-sm text-blue-600">Dec 10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

