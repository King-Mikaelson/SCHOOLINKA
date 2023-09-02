import React, { useState, useContext } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineCalendarToday } from "react-icons/md";
import { AiOutlineClockCircle, AiOutlineClose } from "react-icons/ai";
import { DatePickerWithPresets } from "../DatePickerWithPresets";
import AppContext from "../../Context/AppContext";
import {useNavigate, Link} from "react-router-dom"


type Props = {};


function ViewTask({}: Props) {
    return (
      <div className="flex flex-col w-full mx-3 px-5 py-5 border solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
        <div className="self-end">
          <GrFormClose size={25} />
        </div>
  
        <div className="pt-2">
          <h4 className="pt-2 pb-4 font-inter text-lg font-bold text-[#272727]">Create a Wireframe</h4>
          <div className="flex gap-2 py-1 items-center">
            <IoCalendarClearOutline size={20} color="#3F5BF6" />
            <p className="font-workSans text-base text-[#272727] font-medium">20th January 2023</p>
          </div>
  
          <div className="flex gap-2 py-1 items-center">
            <AiOutlineClockCircle size={20} color="#3F5BF6"  />
            <p className="font-workSans text-base text-[#272727] font-medium">8:00 - 10:00 AM</p>
          </div>
  
          <div className="flex gap-4 w-full justify-center pt-8">
            <button className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]">
              <p>Delete</p>
            </button>
            <button className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold ">
              <p>Edit</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

function AddTask({}: Props) {
    const[text, setText] = useState("Create Wireframe")
    const [toTime, setToTime] = useState("")
    const [fromTime, setFromTime] = useState("")
    const{date, setDate, addText, texts}=useContext(AppContext)
    const navigate = useNavigate()


  const handleAddTexts = () =>{
    if(!text){
      alert("Title can not be Empty")
      return
    }
    if(!date){
      alert("Date can not be Empty")
      return
    }
    if(!toTime && !fromTime){
      alert("Time can not be Empty")
      return
    }
    addText(text, fromTime, toTime, date);
    setToTime("");
    setFromTime("");
    console.log(text)
    console.log(fromTime)
    console.log(toTime)
    console.log(date)
    setText("");
    setDate(undefined)
  }

  console.log(texts)
  return (
    <div className="flex flex-col w-full mx-3 px-5 py-5 border border-t-0 solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
     <div className="w-full flex justify-between items-center">
        <h4 className="font-workSans text-[#101828] font-semibold text-lg">Add Task</h4>
        <AiOutlineClose onClick={() => {navigate("/")}} size={22} color={"#667085"} className="text-[#667085] cursor-pointer"/>
     </div>
     <div className="py-4">
        <textarea value={text} onChange={(e) => {setText(e.target.value)}} className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal"></textarea>
     </div>


     <div className='flex justify-between w-full'>
            <div>
            <DatePickerWithPresets/>
            </div>
            <input  onChange={(e) => {setFromTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"/>
            <input  onChange={(e) => {setToTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"/>
           </div>

     <div className="flex gap-4 w-full justify-center pt-8">
            <button onClick={() => {navigate("/")}} className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054] cursor-pointer">
              <p>Cancel</p>
            </button>
            <button onClick={handleAddTexts} className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold cursor-pointer ">
              <p>Add</p>
            </button>
          </div>
    </div>
  );
}

export default AddTask;
