import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import BatchForm from './BatchForm';
import BatchList from './BatchList';
import PrimaryButton from '../../../../common/PrimaryButton';
import SwalUtils from '../../../../../utils/sweetAlert';
import {
  createCourseBatch,
  deleteCourseBatch,
  updateCourseBatch,
} from '../../../../../redux/courses/courseBatchActions';
import { singelCourse } from '../../../../../redux/courseWizard/courseWizardAction';
import PreNextButtonSection from '../PreNextButtonSection';

export default function CourseBatches({ defaultValues }) {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { loadingBatches } = useSelector((state) => state.course);
  const [searchParams, setSearchParams] = useSearchParams();
  const batches = defaultValues?.batches || [];
  const [showForm, setShowForm] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const courseId = defaultValues?.id;
  const courseSlug = slug || defaultValues?.slug;

  const handleCreateBatch = async (batchData) => {
    if (!courseId) {
      SwalUtils.error('Please save the course first before adding batches');
      return;
    }
    const submitData = {
      ...batchData,
      course: courseId,
    };
    try {
      await dispatch(createCourseBatch(submitData)).unwrap();
      setShowForm(false);
      setEditingBatch(null);
      SwalUtils.success('New Batch Succesfully Created');
      if (courseSlug) {
        await dispatch(singelCourse(courseSlug)).unwrap();
      }
    } catch (error) {
      console.error('Failed to create batch:', error);
    }
  };

  const handleUpdateBatch = async (batchData) => {
    if (!editingBatch?.id) {
      SwalUtils.error('Invalid batch data');
      return;
    }
    try {
      await dispatch(
        updateCourseBatch({
          id: editingBatch.id,
          batchData,
          courseSlug,
        })
      ).unwrap();
      setShowForm(false);
      setEditingBatch(null);
      SwalUtils.success('Course Update Sucessfull');
      if (courseSlug) {
        await dispatch(singelCourse(courseSlug)).unwrap();
      }
    } catch (error) {
      console.error('Failed to update batch:', error);
    }
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setShowForm(true);
  };

  const handleDelete = async (batch) => {
    const deleteCourse = async () => {
      try {
        await dispatch(
          deleteCourseBatch({
            id: batch.id,
            courseSlug,
          })
        ).unwrap();
        // Refetch course data
        if (courseSlug) {
          await dispatch(singelCourse(courseSlug)).unwrap();
        }
        SwalUtils.success('Batch deleted successfully');
      } catch (error) {
        console.error('Failed to delete batch:', error);
      }
    };
    SwalUtils.confirm(deleteCourse, 'Yes, I want this course delete');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBatch(null);
  };

  const handleNext = () => {
    if (!batches || batches.length === 0) {
      SwalUtils.warning('Please create at least one batch before proceeding');
      return;
    }

    setSearchParams((prevParams) => {
      prevParams.set('step', '4');
      return prevParams;
    });
  };

  return (
    <div className="space-y-md">
      {/* Header */}
      <div className="bg-white p-md rounded-lg shadow-around-sm">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-primary">Course Batches</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage batches for this course. Create multiple batches with different start dates and
              enrollment periods.
            </p>
          </div>
          {!showForm && (
            <PrimaryButton
              onClick={() => setShowForm(true)}
              text="Add Batch"
              minWidth="fit"
              icon={<Plus className="w-4 h-4" />}
            />
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <BatchForm
          onSubmit={editingBatch ? handleUpdateBatch : handleCreateBatch}
          onCancel={handleCancel}
          defaultValues={editingBatch}
          isEdit={!!editingBatch}
          loading={loadingBatches}
        />
      )}

      {/* Batch List */}
      {!showForm && <BatchList batches={batches} onEdit={handleEdit} onDelete={handleDelete} />}

      {/* Navigation Buttons */}
      {!showForm && (
        <div className="bg-white p-md rounded-lg shadow-around-sm">
          <PreNextButtonSection onNext={handleNext} />
        </div>
      )}
    </div>
  );
}
