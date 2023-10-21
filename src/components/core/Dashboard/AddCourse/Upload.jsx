import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {FiUploadCloud} from "react-icons/fi"
import { useSelector } from "react-redux";
import React from 'react'
import "video-react/dist/video-react.css"
import { Player } from "video-react";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
  getValues
}) => {

  const {course} = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if(file){
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: !video 
    ? {"image/*" : [".jpeg", ".jpg", ".png"]} 
    : {"video/*" : [".mp4"]},
    onDrop,
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  //registered
  useEffect(() => {
    register(name, {required: true})
  },[register])


  //value set
  useEffect(() => {
    setValue(name, selectedFile)
    const currentImgValue = getValues()

    console.log("value set", currentImgValue.courseImage)
  },[selectedFile, setValue])





  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
          {label} 
      </label>
      <div className="flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 bg-richblack-600">
        {previewSource 
          ? (
            <div className="flex w-full flex-col p-6">
              {!video ? (
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover" 
                  />
              ) : (
                <Player aspectRatio="16:9" playsInline src={previewSource} />
              )}
              {!viewData && (
                <button type="button"
                  onClick={() => {
                    setPreviewSource("")
                    setSelectedFile(null)
                    setValue(name, null)
                  }}
                  className="mt-3 text-richblack-400 underline"
                  >
                    Cancel
                </button>
              )}
            </div>
          ):
            (
              <div className="flex w-full flex-col items-center p-6" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Click here to select a file</p>
                <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <FiUploadCloud className="text-2xl text-yellow-50" />
                </div>
          {
            selectedFile && 
              <p>selected file is {selectedFile.name}</p>

          }
            </div>
            )
          }
        </div> 
        {errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )}
    </div>
  )
}

export default Upload