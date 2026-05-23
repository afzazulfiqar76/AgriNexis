import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'

const GRADIENT_BUTTON =
  'bg-gradient-to-r from-purple-600 to-fuchsia-500 shadow-md shadow-purple-200/60 hover:from-purple-700 hover:to-fuchsia-600'

export function PlantImageUploadCard() {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  function handleDragOver(event) {
    event.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave() {
    setIsDragging(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
  }

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  return (
    <article>
      <label
        htmlFor="plant-image-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-12 transition-colors ${
          isDragging
            ? 'border-purple-300 bg-violet-50/60'
            : 'border-violet-200 bg-white hover:border-purple-300 hover:bg-violet-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          id="plant-image-upload"
          type="file"
          accept="image/png,image/jpeg"
          className="sr-only"
        />

        <span className="flex size-[4.5rem] items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-200/50">
          <Camera className="size-8" strokeWidth={2} aria-hidden="true" />
        </span>

        <h2 className="mt-5 text-lg font-bold text-gray-900">Upload Plant Image</h2>
        <p className="mt-1.5 text-center text-sm text-gray-500">
          Click to upload or drag and drop
        </p>
        <p className="mt-0.5 text-xs text-gray-400">PNG, JPG up to 10MB</p>
      </label>

      <button
        type="button"
        onClick={openFilePicker}
        className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/30 ${GRADIENT_BUTTON}`}
      >
        <Camera className="size-4" strokeWidth={2} aria-hidden="true" />
        Take Photo Now
      </button>
    </article>
  )
}
