import { useDispatch } from 'react-redux';
import { createSkill } from '../../../redux/skill/skillAction';
import { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AddSkillDropdown() {
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const dispatch = useDispatch();

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    dispatch(createSkill({ name: newSkill }));
    setShowInput(false);
    setNewSkill('');
  };

  return (
    <div className="relative">
      {!showInput ? (
        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="flex items-center gap-1 bg-primary text-white text-sm font-medium rounded-full px-3 py-1 hover:bg-primary/90"
        >
          <Plus size={14} />
          Add Skill
        </button>
      ) : (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-10">
          <input
            type="text"
            placeholder="Enter new skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-2 py-1 mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowInput(false)}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddSkill}
              className="bg-primary text-white text-sm px-3 py-1 rounded-md hover:bg-primary/90 disabled:opacity-60"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
