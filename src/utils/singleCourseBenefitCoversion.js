export function convertBenefitsArray(arr) {
  return arr?.map((item) => {
    if (item?.is_active) {
      return {
        id: item.id, // generate unique UUID
        image: item.icon || '',
        title: item.title || '',
        content: item.text || '',
      };
    }
  });
}
