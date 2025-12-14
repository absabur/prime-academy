import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SwalUtils from '../../../../../utils/sweetAlert'; // Your utils
import Modal from '../../../../common/Modal'; // Your common modal
import PreNextButtonSection from '../PreNextButtonSection'; // Your next button

// Helper to render content card (defined below)
import {
  createTab,
  createTabContent,
  createTabSection,
  deleteTab,
  deleteTabContent,
  updateTab,
  updateTabContent,
} from '../../../../../redux/courseWizard/courseWizardAction';
import TabAddUpdateForm from './TabAddUpdateForm';
import TabContentAddEditForm from './TabContentAddEditForm';
import TabContentCard from './TabContentCard';

const CourseTabSection = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const detail = defaultValues?.detail;
  const contentSections = detail?.content_sections[0];

  // 1. Initialize State from the JSON structure
  const [tabs, setTabs] = useState(contentSections?.tabs || []);
  const [activeTabId, setActiveTabId] = useState(contentSections?.tabs?.[0]?.id || null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'add_tab' | 'edit_tab' | 'add_content' | 'edit_content'
  const [editingItem, setEditingItem] = useState(null);

  // Sync state if defaultValues change
  useEffect(() => {
    if (contentSections?.tabs) {
      setTabs(contentSections?.tabs);
      if (!activeTabId && contentSections?.tabs.length > 0) {
        setActiveTabId(contentSections?.tabs[0].id);
      }
    }
  }, [activeTabId, contentSections?.tabs, defaultValues]);

  // add a section
  const handelAddSection = async () => {
    const sectionData = {
      course: detail?.id,
      section_name: 'Tab',
      order: 0,
      is_active: true,
    };

    try {
      await dispatch(createTabSection(sectionData)).unwrap();
      SwalUtils.success('Section Create successful. Please Add Other Contain');
    } catch (err) {
      SwalUtils.error(err?.data?.message || err?.message || 'Secction add fail');
    }
  };

  // handel add and edit tab
  const handelAddTab = async (data) => {
    const tabDataWithSection = { ...data, section: contentSections?.id };
    const tabId = data.id;
    if (tabId) {
      try {
        await dispatch(updateTab({ id: tabId, itemData: data })).unwrap();
        setModalOpen(false);
        setEditingItem(null);
        SwalUtils.success('Tab Update Succesfull ');
      } catch (err) {
        SwalUtils.error(err?.message || err?.message?.data || 'Tab Update Error');
      }
    } else {
      try {
        await dispatch(createTab(tabDataWithSection)).unwrap();
        setModalOpen(false);
        SwalUtils.success('Tab Create Succesfull Please Add Content');
      } catch (err) {
        SwalUtils.error(err?.message || err?.message?.data || 'Tab Add Error');
      }
    }
  };

  // handel Delete Tab
  const handleDeleteTab = async (tabId) => {
    SwalUtils.confirm(async () => {
      await dispatch(deleteTab(tabId)).unwrap();
      SwalUtils.success('Tab deleted');
    }, 'Are you sure? This will delete all contents inside.');
  };

  const handelTabContent = async (data, id) => {
    if (id) {
      try {
        await dispatch(updateTabContent({ id: id, itemData: data })).unwrap();
        setModalOpen(false);
        setEditingItem(null);
        SwalUtils.success('Tab Content Update Succesfull ');
      } catch (err) {
        SwalUtils.error(err?.message || err?.message?.data || 'Tab Content Update Error');
      }
    } else
      try {
        await dispatch(createTabContent(data)).unwrap();
        setModalOpen(false);
        SwalUtils.success('Tab Create Succesfull Please Add Content');
      } catch (err) {
        SwalUtils.error(err?.message || err?.message?.data || 'Tab Add Error');
      }
  };

  const handelDeleteContent = (contentId) => {
    SwalUtils.confirm(async () => {
      await dispatch(deleteTabContent(contentId)).unwrap();
      SwalUtils.success('Tab deleted');
    }, 'Are you sure? This will delete all contents inside.');
  };

  const handleToggleActive = (id, currentStatus, type) => {
    // type = 'tab' or 'content'
    // dispatch update...
    SwalUtils.success(`${type} status updated`);
  };

  // --- Derived State ---
  const activeTab = tabs.find((t) => t.id === activeTabId);
  const activeContents = activeTab?.contents || [];

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-6 space-y-6">
      {contentSections ? (
        <>
          {' '}
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Course Tabs & Content</h2>
            <button
              onClick={() => {
                setModalType('add_tab');
                setModalOpen(true);
              }}
              className="text-sm flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Plus size={16} /> Add New Tab
            </button>
          </div>
          {/* 2. Tabs Navigation (Horizontal Scrollable) */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-100 no-scrollbar">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`
              group relative flex items-center gap-2 px-5 py-2.5 rounded-t-lg cursor-pointer border-b-2 transition-all whitespace-nowrap select-none
              ${
                activeTabId === tab.id
                  ? 'border-primary text-primary bg-blue-50/50 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }
            `}
              >
                <span>{tab.tab_name}</span>

                {/* Tab Actions (Edit/Delete) - Visible on hover or active */}
                <div
                  className={`flex items-center gap-1 ml-2 ${activeTabId === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(tab);
                      setModalType('edit_tab');
                      setModalOpen(true);
                    }}
                    className="p-1 hover:bg-white rounded-full text-gray-400 hover:text-primary"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTab(tab.id);
                    }}
                    className="p-1 hover:bg-white rounded-full text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* 3. Active Tab Content Area */}
          <div className="min-h-[300px] bg-gray-50/50 rounded-lg p-4 border border-dashed border-gray-200">
            {activeTab ? (
              <div className="space-y-4">
                {/* Header for the specific tab */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                    Content for: <span className="text-gray-800">{activeTab.tab_name}</span>
                  </span>
                  {/* Add Content Button */}
                  <button
                    onClick={() => {
                      setModalType('add_content');
                      setModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors shadow-sm"
                  >
                    <Plus size={16} /> Add Content
                  </button>
                </div>

                {/* Content List */}
                <div className="grid gap-4">
                  {activeContents.length > 0 ? (
                    activeContents.map((content) => (
                      <TabContentCard
                        key={content.id}
                        content={content}
                        onEdit={() => {
                          setEditingItem(content);
                          setModalType('edit_content');
                          setModalOpen(true);
                        }}
                        onDelete={() => handelDeleteContent(content.id)}
                        onToggleStatus={() =>
                          handleToggleActive(content.id, content.is_active, 'content')
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-3">
                        <Plus size={24} />
                      </div>
                      <p>No content in this tab yet.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">Please create or select a tab.</div>
            )}
          </div>
        </>
      ) : (
        <>
          {' '}
          <div>
            <h2 className="text-xl font-bold border-b border-black/10 text-primary py-sm mb-4">
              Tab Section
            </h2>

            <button
              onClick={handelAddSection}
              className="p-3 flex gap-xs justify-center items-center border-2 border-black/30 rounded-lg w-full border-dashed text-black/30 hover:border-primary hover:text-primary"
            >
              <Plus size={15} />
              Add Tab Section
            </button>
          </div>
        </>
      )}

      <PreNextButtonSection className={'mt-xl'} isForm={false} />

      {/* Modals Container */}
      {modalOpen && (
        <Modal setModal={setModalOpen} noClose={true}>
          {/* Load different form based on modalType ('add_tab' vs 'add_content') */}
          {modalType === 'add_tab' && (
            <TabAddUpdateForm
              onCancel={() => setModalOpen(false)}
              onSubmit={handelAddTab}
              formTitle="Add Tab"
            />
          )}

          {modalType === 'edit_tab' && (
            <TabAddUpdateForm
              onCancel={() => setModalOpen(false)}
              onSubmit={handelAddTab}
              defaultValues={editingItem}
              formTitle="Update Tab"
            />
          )}

          {modalType === 'add_content' && (
            <TabContentAddEditForm
              onCancel={() => setModalOpen(false)}
              tab_id={activeTab?.id}
              formTitle="Add Tab Content"
              onSubmit={handelTabContent}
            />
          )}

          {modalType === 'edit_content' && (
            <TabContentAddEditForm
              onCancel={() => setModalOpen(false)}
              tab_id={activeTab?.id}
              formTitle="Update Tab Content"
              onSubmit={handelTabContent}
              defaultValues={editingItem}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default CourseTabSection;
