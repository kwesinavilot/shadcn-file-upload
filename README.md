# shadcn-file-upload

A versatile and customizable file upload component for React, built with shadcn/ui and react-dropzone. This component offers a seamless drag-and-drop experience, multiple layout options, and integrates perfectly with shadcn/ui projects.

## Background

While working on a project using shadcn/ui, I realized there wasn't a drag-and-drop file upload component that fit my needs. So, I decided to create one that not only works well with shadcn/ui but also offers flexibility in terms of layout and functionality. This component is the result of that effort, and I'm excited to share it with the community!

## Features

- 🖱️ Drag and drop file upload
- 📏 Vertical and horizontal layout modes
- 🔢 Single and multiple file upload modes
- 🎨 Customizable text and icons
- 📁 File type and size limit options
- 🎭 Built with shadcn/ui for consistent styling
- 📱 Responsive design

## Installation
For now, copy and paste the `FileUpload` file into your project's components directory or wherever you want it to be and import it as a component where you want it to be used.

## Usage

Here are some examples of how to use the FileUpload component:

### Basic Usage

```jsx
import React from 'react';
import FileUpload from './your/path/to/FileUpload.jsx';

function App() {
  const handleFilesUploaded = (files) => {
    console.log('Uploaded files:', files);
  };

  return (
    <FileUpload
      onFilesUploaded={handleFilesUploaded}
    />
  );
}

export default App;
```

### Vertical Mode with Custom Text (Default)

```jsx
<FileUpload
  mode="vertical"
  defaultText="Drop your files here"
  onFilesUploaded={handleFilesUploaded}
/>
```

### Horizontal Mode

```jsx
<FileUpload
  mode="horizontal"
  defaultText="Drag and drop files here"
  onFilesUploaded={handleFilesUploaded}
/>
```

### Single File Upload

```jsx
<FileUpload
  uploadMode="single"
  onFilesUploaded={handleFilesUploaded}
/>
```

### Multiple File Upload

```jsx
<FileUpload
  uploadMode="multi"
  onFilesUploaded={handleFilesUploaded}
/>
```

### Custom File Types and Size Limit

```jsx
<FileUpload
  acceptedFileTypes={{
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png']
  }}
  maxSize={10 * 1024 * 1024} // 10MB
  onFilesUploaded={handleFilesUploaded}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| mode | 'vertical' \| 'horizontal' | 'vertical' | Layout mode of the component |
| uploadMode | 'single' \| 'multi' | 'single' | Single or multiple file upload mode |
| defaultText | string | 'Upload file' | Text displayed in the upload area |
| maxSize | number | 5 * 1024 * 1024 (5MB) | Maximum file size in bytes |
| acceptedFileTypes | object | { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] } | Object specifying accepted MIME types and their extensions |
| onFilesUploaded | (files: File[] \| File \| null) => void | - | Callback function when files are uploaded or removed |

## Styling

This component is built with shadcn/ui, ensuring it fits seamlessly into your shadcn/ui project. The styling uses Tailwind CSS classes, making it easy to customize if needed.

## Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

We hope you find this component useful for your projects! If you have any questions or need further assistance, please don't hesitate to reach out or open an issue on GitHub.

Happy coding! 🚀