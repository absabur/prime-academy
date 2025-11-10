import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Italic, Strikethrough, Underline, Essentials, Paragraph, Link, List, BlockQuote, Heading, Font, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageResize, ImageStyle, ImageUpload, ImageCaption, MediaEmbed, Indent, IndentBlock, Alignment } from 'ckeditor5';
import { CustomUploadAdapterPlugin } from '../../../utils/ckeditor/uploadAdapter';

const CUSTOM_COLOR_PALETTE = [
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

const CKEDITOR = ({ value, onChange, ...others }) => {
  const editorConfig = {
    licenseKey: 'GPL', // Free/Open Source license
    plugins: [
      Essentials,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Paragraph,
      Link,
      List,
      BlockQuote,
      Heading,
      Font,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      Image,
      ImageToolbar,
      ImageResize, // FREE image resize plugin
      ImageStyle,
      ImageUpload,
      ImageCaption,
      MediaEmbed,
      Indent,
      IndentBlock,
      Alignment,
      CustomUploadAdapterPlugin, // Custom upload adapter
    ],
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'alignment', '|',
      'insertTable', 'uploadImage', 'mediaEmbed', '|',
      'outdent', 'indent', '|',
      'undo', 'redo',
    ],
    // Simple upload configuration
    simpleUpload: {
      uploadUrl: `${import.meta.env.VITE_API_URL}/api/upload-image/`,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      ],
    },
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Courier New, Courier, monospace',
        'Georgia, serif',
        'Times New Roman, Times, serif',
        'Verdana, Geneva, sans-serif',
      ],
    },
    fontSize: {
      options: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
    },
    fontColor: {
      colors: CUSTOM_COLOR_PALETTE,
    },
    fontBackgroundColor: {
      colors: CUSTOM_COLOR_PALETTE,
    },
    image: {
      resizeUnit: 'px',
      resizeOptions: [
        {
          name: 'resizeImage:original',
          value: null,
          label: 'Original',
        },
        {
          name: 'resizeImage:50',
          value: '50',
          label: '50%',
        },
        {
          name: 'resizeImage:75',
          value: '75',
          label: '75%',
        },
      ],
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'resizeImage', // Enable resize
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableProperties',
        'tableCellProperties',
      ],
      tableProperties: {
        borderColors: CUSTOM_COLOR_PALETTE,
        backgroundColors: CUSTOM_COLOR_PALETTE,
      },
      tableCellProperties: {
        borderColors: CUSTOM_COLOR_PALETTE,
        backgroundColors: CUSTOM_COLOR_PALETTE,
      },
    },
    alignment: {
      options: ['left', 'center', 'right', 'justify'],
    },
  };

  return (
    <div className="ckeditor-container" style={{ minHeight: '400px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value || ''}
        onChange={onChange}
        {...others}
      />
    </div>
  );
};

export default CKEDITOR;
