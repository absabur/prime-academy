import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BookOpen, Video, FileText, ClipboardList } from 'lucide-react';
import LiveClassList from './LiveClassList';
import AssignmentList from './AssignmentList';
import QuizList from './QuizList';

const ModuleContentMain = ({ moduleId, onContentUpdate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentTab = searchParams.get('tab') || 'live-classes';

  const tabs = [
    { key: 'live-classes', label: 'Live Classes', icon: Video },
    { key: 'assignments', label: 'Assignments', icon: FileText },
    { key: 'quizzes', label: 'Quizzes', icon: ClipboardList },
  ];

  const handleTabChange = (tabKey) => {
    setSearchParams({ tab: tabKey });
  };

  return (
    <div className="space-y-md">
      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg border border-black/10 p-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {currentTab === 'live-classes' && <LiveClassList moduleId={moduleId} onContentUpdate={onContentUpdate} />}
        {currentTab === 'assignments' && <AssignmentList moduleId={moduleId} onContentUpdate={onContentUpdate} />}
        {currentTab === 'quizzes' && <QuizList moduleId={moduleId} onContentUpdate={onContentUpdate} />}
      </div>
    </div>
  );
};

export default ModuleContentMain;
