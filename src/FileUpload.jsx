import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A React component for uploading files. Supports single and multiple file uploads.
 *
 * @param {Object} props Component props
 * @param {string} [props.layout=vertical] The layout of the component. Can be 'vertical' or 'horizontal'.
 * @param {string} [props.uploadMode=single] The file upload mode. Can be 'single' or 'multi'.
 * @param {string} [props.defaultText='Select or drag and drop your files here'] The text displayed in the upload area when no files are selected.
 * @param {string} [props.otherText='(PDF, DOC, DOCX up to 20MB)'] Additional text displayed below the default text.
 * @param {number} [props.maxSize=20 * 1024 * 1024] The maximum allowed file size in bytes. Files larger than this will be rejected.
 * @param {Object} [props.acceptedFileTypes] An object specifying the accepted file types. The keys are MIME types, and the values are arrays of corresponding file extensions.
 * @param {Function} [props.onFilesUploaded] A callback function that is called when files are uploaded or removed. It receives the following arguments:
 *   - In single mode: A single `File` object when a file is uploaded, or `null` when the file is removed.
 *   - In multi mode: An array of `File` objects.
 * @returns {ReactElement} The component element
 */
const FileUpload = ({
    layout = 'vertical',
    uploadMode = 'single',
    defaultText = 'Select or drag and drop your files here',
    otherText = '(PDF, DOC, DOCX up to 20MB)',
    maxSize = 20 * 1024 * 1024, // 20MB
    acceptedFileTypes = {
        'application/pdf': ['.pdf'],
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onFilesUploaded
}) => {
    // State to manage the uploaded files
    const [files, setFiles] = useState([]);

    // Callback function to handle the selected or dropped files
    const onDrop = useCallback((acceptedFiles) => {
        // Create a new array with the accepted files
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)  // Create a preview URL for the file
        }));

        if (uploadMode === 'single') {
            setFiles(newFiles.slice(0, 1));
            onFilesUploaded(newFiles[0]);
        } else {
            setFiles(prev => [...prev, ...newFiles]);
            onFilesUploaded(newFiles);
        }
    }, [uploadMode, onFilesUploaded]);

    // configure the dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize,
        multiple: uploadMode === 'multi'
    });

    // Removes a file from the list of uploaded files.
    const removeFile = (file) => {
        const newFiles = files.filter(f => f !== file);
        setFiles(newFiles);
        onFilesUploaded(uploadMode === 'single' ? null : newFiles);
    };

    // dynamic styling for the dropzone
    const dropzoneClasses = cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        layout === 'horizontal' ? "flex items-center justify-center space-x-4" : "flex flex-col justify-center items-center space-y-2"
    );

    // renders the dropzone with the provided text
    const renderDropzone = () => (
        <div {...getRootProps({ className: dropzoneClasses })}>
            <input {...getInputProps()} />
            <UploadIcon className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-600">{defaultText}</p>
            <p className="text-xs text-gray-500">{otherText}</p>
        </div>
    );

    // Renders a list of files, displaying each file's name, size, and file extension, 
    // along with a remove button to delete the file
    const renderFileList = () => (
        <div className="mt-4 space-y-2">
            {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 shadow">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center p-5">
                            <span className="text-xs font-medium">{file.name.split('.').pop().toUpperCase()}</span>
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeFile(file)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            {(uploadMode === 'multi' || files.length === 0) && renderDropzone()}
            {renderFileList()}
        </div>
    );
};

export default FileUpload;