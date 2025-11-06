export function convertToAboutOurValues(data) {
  return (
    data?.length &&
    data?.map((item, index) => ({
      id: item.id,
      category: item.title,
      title: item.title,
      media_type: item.media_type,
      media_type_display: item.media_type_display,
      title: item.title,
      content: item.description,
      button_text: item.button_text,
      button_link: item.button_url,
      image: item.image,
      video_provider: item.video_provider,
      video_provider_display: item.video_provider_display,
      video_url: item.video_url,
      video_id: item.video_id,
      video_thumbnail: item.video_thumbnail,
      order: index,
      is_active: item.is_active,
      is_info_section: true,
      is_icon_section: false,
      has_video: item.has_video,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }))
  );
}
