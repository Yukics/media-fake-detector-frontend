'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid'

type FileUploadProps = {
  onFileSelect: (file: File) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm']
    },
    maxSize: 100 * 1024 * 1024, // 100MB max file size
  })

  return (
    <div
      {...getRootProps()}
      className={`flex items-center justify-center w-full ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      } border-2 border-dashed rounded-lg p-12`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" aria-hidden="true" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          PNG, JPG, GIF up to 10MB (MAX. 800x400px) or MP4, WEBM up to 100MB
        </p>
      </div>
    </div>
  )
}