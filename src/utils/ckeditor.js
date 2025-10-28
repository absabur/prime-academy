export const CUSTOM_COLOR_PALETTE = [
  { color: '#053867', label: 'Primary' },
  { color: '#f7b922', label: 'Secondary' },
  { color: '#ffffff', label: 'White' },
  { color: '#000000', label: 'Black' },
  { color: '#e0e0e0', label: 'Gray' },
  { color: '#e53935', label: 'Red' },
  { color: '#d81b60', label: 'Pink' },
  { color: '#8e24aa', label: 'Purple' },
  { color: '#5e35b1', label: 'Deep Purple' },
  { color: '#3949ab', label: 'Indigo' },
  { color: '#1e88e5', label: 'Blue' },
];


export const CKEDITOR_CONFIG = {
  toolbar: [
    'heading', '|',
    'bold', 'italic', 'link', 'underline', 'strikethrough', '|',
    'bulletedList', 'numberedList', 'blockQuote', '|',
    'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
    'insertTable', 'imageUpload', 'mediaEmbed', '|',
    'outdent', 'indent', '|',
    'undo', 'redo',
  ],
  height: 500,
  width: '100%',
  image: {
    toolbar: [
      'imageTextAlternative', '|',
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      'imageStyle:side'
    ],
    styles: ['full', 'side', 'alignLeft', 'alignCenter', 'alignRight']
  },
  table: {
    contentToolbar: [
      'tableColumn', 'tableRow', 'mergeTableCells',
      'tableProperties', 'tableCellProperties'
    ],
    tableProperties: {
      borderColors: CUSTOM_COLOR_PALETTE,
      backgroundColors: CUSTOM_COLOR_PALETTE
    },
    tableCellProperties: {
      borderColors: CUSTOM_COLOR_PALETTE,
      backgroundColors: CUSTOM_COLOR_PALETTE
    }
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
    ]
  },
  fontFamily: {
    options: [
      'default',
      'Arial, Helvetica, sans-serif',
      'Courier New, Courier, monospace',
      'Georgia, serif',
      'Times New Roman, Times, serif',
      'Verdana, Geneva, sans-serif'
    ]
  },
  fontSize: {
    options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30]
  },
  fontColor: {
    colors: CUSTOM_COLOR_PALETTE
  },
  fontBackgroundColor: {
    colors: CUSTOM_COLOR_PALETTE
  },
};