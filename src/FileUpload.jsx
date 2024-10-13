import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A React component for uploading files. Supports single and multiple file uploads with validation.
 *
 * @param {Object} props Component props
 * @param {string} [props.layout=vertical] The layout of the component. Can be 'vertical' or 'horizontal'.
 * @param {string} [props.uploadMode=single] The file upload mode. Can be 'single' or 'multi'.
 * @param {string} [props.defaultText='Select or drag and drop your files here'] The text displayed in the upload area when no files are selected.
 * @param {string} [props.otherText='(PDF, DOC, DOCX up to 20MB)'] Additional text displayed below the default text.
 * @param {number} [props.maxSize=20 * 1024 * 1024] The maximum allowed file size in bytes. Files larger than this will be rejected.
 * @param {Object} [props.acceptedFileTypes] An object specifying the accepted file types. The keys are MIME types, and the values are arrays of corresponding file extensions.
 * @param {Function} props.onFilesUploaded A callback function that is called when files are uploaded or removed.
 * @param {Object} [props.zodSchema] A Zod schema for file validation.
 * @param {string|string[]} [props.errors] External errors to display.
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
    onFilesUploaded,
    zodSchema,
    errors: externalErrors
}) => {
    const [files, setFiles] = useState([]);
    const [internalErrors, setInternalErrors] = useState(null);

    /**
     * Validates a file using the provided Zod schema.
     * If the schema is not provided, this function does nothing.
     * If the file is invalid, it logs the error and returns the first error message.
     * If the file is valid, it returns null.
     * 
     * @param {File} file The file to validate
     * @returns {string|null} The error message if the file is invalid, or null if it is valid
     */
    const validateFile = (file) => {
        if (!file) {
            return "No file selected";
        }

        if (zodSchema) {
            try {
                zodSchema.parse({ file: file });
                return null;
            } catch (error) {
                console.log("Validation error:", error);
                return error.errors[0]?.message || "Invalid file";
            }
        }

        return null;
    };


    /**
     * Handles the files dropped into the component.
     * Validates the files using the provided Zod schema.
     * If the schema is not provided, this function does nothing.
     * If the files are invalid, it logs the error and sets the internal error state.
     * If the files are valid, it updates the component's state with the new files and calls the onFilesUploaded callback.
     * 
     * @param {File[]} acceptedFiles The files dropped into the component
     */
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            setInternalErrors("No valid files were dropped");
            return;
        }

        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));

        let validationError = null;
        if (uploadMode === 'single') {
            validationError = validateFile(newFiles[0]);

            if (!validationError) {
                setFiles(newFiles.slice(0, 1));
                onFilesUploaded(newFiles[0]);
                setInternalErrors(null);
            } else {
                setInternalErrors(validationError);
            }
        } else {
            // Validate all files
            const errors = newFiles.map(validateFile).filter(Boolean);

            if (errors.length === 0) {
                setFiles(prev => [...prev, ...newFiles]);
                onFilesUploaded(newFiles);
                setInternalErrors(null);
            } else {
                setInternalErrors(errors[0]); // Display only the first error
            }
        }
    }, [uploadMode, onFilesUploaded, zodSchema]);

    // Configure the dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize,
        multiple: uploadMode === 'multi'
    });

    /**
     * Removes a file from the list of selected files.
     * @param {File} file - The file to remove
     */
    const removeFile = (file) => {
        const newFiles = files.filter(f => f !== file);
        setFiles(newFiles);
        onFilesUploaded(uploadMode === 'single' ? null : newFiles);
        setInternalErrors(null);
    };

    // dynamic styling 
    const dropzoneClasses = cn(
        "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : (internalErrors || externalErrors) ? "border-red-500" : "border-gray-300 hover:border-gray-400",
        layout === 'horizontal' ? "flex items-center justify-center space-x-4" : "flex flex-col justify-center items-center space-y-2"
    );

    /**
     * Renders the dropzone component with the configured styles, default text, and optional errors.
     * @returns {JSX.Element} The rendered dropzone component
     */
    const renderDropzone = () => (
        <>
            <div {...getRootProps({ className: dropzoneClasses })}>
                <input {...getInputProps()} />
                <UploadIcon className="w-8 h-8 text-gray-400" />
                <p className="text-sm text-gray-600">{defaultText}</p>
                <p className="text-xs text-gray-500">{otherText}</p>
            </div>

            {(internalErrors || externalErrors) && (
                <p className="text-xs font-medium text-red-500 mt-2">
                    {internalErrors || (Array.isArray(externalErrors) ? externalErrors.join(', ') : externalErrors)}
                </p>
            )}
        </>
    );

    /**
     * Renders the list of files that have been selected.
     * This includes the file name, size, and an option to remove the file.
     * @returns {JSX.Element} The rendered file list component
     */
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