import SelectBatch from '../../common/SelectBatch';

const batches = [
  'AI Agent for programmers 4',
  'MERN Stack Development',
  'Python Django Development',
  'Data Science with Python',
  'Machine Learning Foundations',
];

const WorkshopDropdown = () => {
  return <SelectBatch batches={batches} />;
};

export default WorkshopDropdown;
