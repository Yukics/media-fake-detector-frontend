'use client'

import { useState, useCallback } from 'react'
import FileUpload from '@/components/FileUpload'
import ResultDisplay from '@/components/ResultDisplay'
import axios from 'axios'

export default function Home() {
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    setIsLoading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post('/api/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1))
          console.log(`Upload progress: ${percentCompleted}%`)
        },
      })
      setResult(response.data)
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(axios.isAxiosError(error) && error.response?.data.error
        ? error.response.data.error
        : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">AI Media Detector</h1>
      <div className="w-full max-w-2xl">
        <FileUpload onFileSelect={handleFileSelect} />
        {isLoading && (
          <div className="mt-4 text-center" role="status">
            <p>Analyzing...</p>
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" aria-hidden="true"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <ResultDisplay hash={result} />
      </div>
    </main>
  )
}