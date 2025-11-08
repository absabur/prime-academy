export function singleCourseModuleDataConversion(arr) {
  return arr?.map((item, index) => {
    if (item?.is_active) {
      return {
        id: `accordionInputblock-14--block-timeline-1-${index + 1}`, // generate new ID pattern
        active: false, // map is_active → active
        description: item.short_description || '', // map short_description → description
        heading: item.title || '', // map title → heading
        title: `MODULE ${index + 1}`, // add sequential course title
      };
    }
  });
}
