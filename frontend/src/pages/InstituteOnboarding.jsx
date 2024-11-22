import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  School,
  Book,
  MessageCircle,
  Users,
  HelpCircle,
  Calendar,
  ArrowRight,
} from "lucide-react";

import CommunicationTools from "../components/instittute/CommunicationTools.jsx";
import CollaborationOpportunities from "../components/instittute/CollabrationOpptunities.jsx";
import TrainingAndSupportCounselor from "../components/instittute/TrainingAndSupportCounselor.jsx";
import WeeklyActivities from "../components/instittute/WeeklyActivities.jsx";
import SchoolProfileOverview from "../components/instittute/SchoolProfileOverview.jsx";
import ResourceLibrary from "../components/instittute/ResourceLibrary.jsx";
import { Link } from "react-router-dom";

export default function InstituteOnborading() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      label: "School Profile",
      icon: <School className="w-4 h-4" />,
      component: SchoolProfileOverview,
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Book className="w-4 h-4" />,
      component: ResourceLibrary,
    },
    {
      id: "communication",
      label: "Communication",
      icon: <MessageCircle className="w-4 h-4" />,
      component: CommunicationTools,
    },
    {
      id: "collaboration",
      label: "Collaboration",
      icon: <Users className="w-4 h-4" />,
      component: CollaborationOpportunities,
    },
    {
      id: "support",
      label: "Support",
      icon: <HelpCircle className="w-4 h-4" />,
      component: TrainingAndSupportCounselor,
    },
    {
      id: "activities",
      label: "Activities",
      icon: <Calendar className="w-4 h-4" />,
      component: WeeklyActivities,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          School Dashboard
        </h1>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex justify-center gap-4 p-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {tabs.find((tab) => tab.id === activeTab)?.component()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-lg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
          <Link
            to="/dashboard/institute/1"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Go to Full Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
