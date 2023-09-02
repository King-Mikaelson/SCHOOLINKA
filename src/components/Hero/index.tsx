import React from 'react';
import {FiSettings} from "react-icons/fi"
import{AiOutlinePlus} from "react-icons/ai"
import {useNavigate, Link} from "react-router-dom"


type Props = {}

function Hero({}: Props) {
  const navigate = useNavigate()
  return (
    <div className="w-full mt-20 py-11 pb-6 flex justify-between px-6  lg:px-5.5 items-center">
    <div className='flex gap-1 flex-col'>
    <h1 className='text-[#101828] text-3xl font-workSans font-semibold'>Good morning!</h1>
    <p className='text-[#475467] text-base font-workSans font-normal'>You got some task to do. </p>
    </div>
    <button onClick={() => navigate("/task/add")} className='flex gap-2  px-5 bg-[#3F5BF6] items-center rounded-lg h-fit py-3 justify-between '>
    <AiOutlinePlus className='text-white'/>
    <p className="text-white font-workSans font-semibold text-sm">Create New Task</p>
   </button>
    </div>
  )
}

export default Hero