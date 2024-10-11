'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactDropzone = require('react-dropzone');
var lucideReact = require('lucide-react');
var button = require('@/components/ui/button');
var utils = require('@/lib/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FileUpload = ({
  mode = 'vertical',
  uploadMode = 'single',
  defaultText = 'Upload file',
  maxSize = 5 * 1024 * 1024,
  // 5MB
  acceptedFileTypes = {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  },
  onFilesUploaded
}) => {
  const [files, setFiles] = React.useState([]);
  const onDrop = React.useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    if (uploadMode === 'single') {
      setFiles(newFiles.slice(0, 1));
      onFilesUploaded(newFiles[0]);
    } else {
      setFiles(prev => [...prev, ...newFiles]);
      onFilesUploaded(newFiles);
    }
  }, [uploadMode, onFilesUploaded]);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = reactDropzone.useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxSize,
    multiple: uploadMode === 'multi'
  });
  const removeFile = file => {
    const newFiles = files.filter(f => f !== file);
    setFiles(newFiles);
    onFilesUploaded(uploadMode === 'single' ? null : newFiles);
  };
  const dropzoneClasses = utils.cn("border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors", isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400", mode === 'horizontal' ? "flex items-center justify-center space-x-4" : "flex flex-col justify-center items-center space-y-2");
  const renderDropzone = () => /*#__PURE__*/React__default["default"].createElement("div", getRootProps({
    className: dropzoneClasses
  }), /*#__PURE__*/React__default["default"].createElement("input", getInputProps()), /*#__PURE__*/React__default["default"].createElement(lucideReact.UploadIcon, {
    className: "w-8 h-8 text-gray-400"
  }), /*#__PURE__*/React__default["default"].createElement("p", {
    className: "text-sm text-gray-600"
  }, defaultText), /*#__PURE__*/React__default["default"].createElement("p", {
    className: "text-xs text-gray-500"
  }, "(PDF, DOC, DOCX up to 5MB)"));
  const renderFileList = () => /*#__PURE__*/React__default["default"].createElement("div", {
    className: "mt-4 space-y-2"
  }, files.map((file, index) => /*#__PURE__*/React__default["default"].createElement("div", {
    key: index,
    className: "flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    className: "w-8 h-8 bg-gray-300 rounded flex items-center justify-center p-5"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    className: "text-xs font-medium"
  }, file.name.split('.').pop().toUpperCase())), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "flex flex-col space-y-1"
  }, /*#__PURE__*/React__default["default"].createElement("p", {
    className: "text-sm font-medium truncate max-w-xs"
  }, file.name), /*#__PURE__*/React__default["default"].createElement("p", {
    className: "text-xs text-gray-500"
  }, (file.size / 1024).toFixed(2), " KB"))), /*#__PURE__*/React__default["default"].createElement(button.Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => removeFile(file)
  }, /*#__PURE__*/React__default["default"].createElement(lucideReact.Trash2, {
    className: "w-4 h-4"
  })))));
  return /*#__PURE__*/React__default["default"].createElement("div", null, (uploadMode === 'multi' || files.length === 0) && renderDropzone(), renderFileList());
};

exports["default"] = FileUpload;
//# sourceMappingURL=index.js.map
