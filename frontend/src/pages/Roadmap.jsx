import React, { useEffect } from 'react'
import EngineerRoadmap from '../components/EngineerRoadmap'
import DoctorRoadmap from '../components/DoctorRoadmap'
import CARoadmap from '../components/CARoadmap'
import IASRoadmap from '../components/IASRoadmap'
import { useParams } from 'react-router-dom'

const roadmapDescriptions = {
  engineer: "A guide to becoming a skilled engineer",
  doctor: "The path to medical excellence",
  ca: "Mastering the world of accounting and finance",
  ias: "Preparing for India's elite civil services"
}

export default function Roadmap() {
  const { topic } = useParams()
  const field = topic?.toLowerCase()

  useEffect(() => {
    console.log(topic)
  }, [topic])

  const renderRoadmap = () => {
    switch (field) {
      case 'engineer':
        return <EngineerRoadmap />
      case 'doctor':
        return <DoctorRoadmap />
      case 'ca':
        return <CARoadmap />
      case 'ias':
        return <IASRoadmap />
      default:
        return (
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">
              Please select an available roadmap .
            </h2>
            <p className="mt-2 text-gray-600">
              This Roadmap is not available. 
            </p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8 ">
      <div className="container mx-auto">
        <h1 className="mb-2 text-4xl font-bold text-gray-800 ">
          {field ? `${field.charAt(0).toUpperCase() + field.slice(1)} Roadmap` : 'Roadmaps'}
        </h1>
        {field && roadmapDescriptions[field] && (
          <p className="mb-6 text-lg text-gray-600">
            {roadmapDescriptions[field]}
          </p>
        )}
        {renderRoadmap()}
      </div>
    </div>
  )
}