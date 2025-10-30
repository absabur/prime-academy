// Helper function to get initials from name
export const getInitials = (firstName, lastName) => {
  const f = firstName ? firstName[0] : '';
  const l = lastName ? lastName[0] : '';
  return `${f}${l}`.toUpperCase();
};
