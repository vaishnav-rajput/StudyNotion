import React from 'react'
import IconBtn from './IconBtn'

const ConfirmatonModal = ({modalData}) => {
  return (
    <div>
        <div>
            <p>
                {modalData.text1}
            </p>
            <p>
                {modalData.text2}
            </p>
            <div className='flex gap-x-2'>
                <button
                    onClick={modalData?.btn1Handler}>
                   {modalData?.btn1Text}
                   </button>
                <button onClick={modalData?.btn2Handler}>
                    {modalData.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmatonModal