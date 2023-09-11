import { AiOutlineClose } from "react-icons/ai"
import { DatePickerWithPresets } from "../../components/DatePickerWithPresets"
import React, { useContext, useEffect, useRef, useState } from "react"
import AppContext from "../../Context/AppContext"
import {useParams} from "react-router-dom"
import {AiTwotoneBell} from "react-icons/ai"
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import { toast } from "react-toastify"


function EditTask() {
  const [toTime, setToTime] = useState("")
  const [fromTime, setFromTime] = useState("")
  const{id} = useParams();
  const{EditTextsById, date, texts} = useContext(AppContext)
  const item = texts.find((text) => text.id === Number(id))
  const[text, setText] = useState(item?.title)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);





    const handleAddTexts = () =>{
      if(!text){
        toast.warn("Title can not be Empty")
        return
      }
      if(!date){
        toast.warn("Date can not be Empty")
        return
      }
      if(!toTime || !fromTime){
        toast.warn("Time can not be Empty")
        return
      }
      EditTextsById(Number(id), text, fromTime, toTime, date);
    }
  
  const sheetRef = useRef<any>();
  const [expandOnContentDrag, setExpandOnContentDrag] = useState(true);

  useEffect(() => {
    setOpen(true)
  },[])

  return (
    <>
      <div className="block md:hidden">
        <BottomSheet
          open={open}
          skipInitialTransition
          ref={sheetRef}
          defaultSnap={({ maxHeight }) => maxHeight / 2}
          snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight / 10,
            maxHeight / 4,
            maxHeight * 0.6,
          ]}
          className="block md:hidden"
          expandOnContentDrag={expandOnContentDrag}
        >
         <div className="flex flex-col w-full px-4 py-1 border border-t-0 solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
           <div className="w-full flex justify-between items-center">
              <h4 className="font-workSans text-[#101828] font-semibold text-lg">Edit Task</h4>
              <AiOutlineClose onClick={() => {
                  navigate("/");
                }} size={22} color={"#667085"} className="text-[#667085] cursor-pointer"/>
           </div>
           <div className="py-4">
              <textarea value={text} onChange={(e) => {setText(e.target.value)}} className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal">Create Wireframe</textarea>
           </div>

           <div className='flex  gap-3'>
            <div >
            <DatePickerWithPresets/>
            </div>
            <input onChange={(e) => {setFromTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md "/>
            <input onChange={(e) => {setToTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md "/>
           </div>

           <div className="pt-4 flex justify-between ">
            <div className="flex gap-2 items-center cursor-pointer">
            <AiTwotoneBell size={22} className="text-[#667085]"/>
              <p className="text-[#667085] font-inter text-base font-medium">10 minutes before</p>
            </div>

            <AiOutlineClose size={16} className="text-[#667085] cursor-pointer"/>
           </div>
      
           <div className="flex gap-4 w-full justify-center pt-8">
                  <button onClick={() => navigate(`/`)} className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]">
                    <p>Cancel</p>
                  </button>
                  <button onClick={handleAddTexts} className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold ">
                    <p>Save</p>
                  </button>
                </div>
          </div>
        </BottomSheet>
      </div>

      <div className="hidden md:flex flex-col w-full mx-3 px-2 py-5 border border-t-0 solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
           <div className="w-full flex justify-between items-center">
              <h4 className="font-workSans text-[#101828] font-semibold text-lg">Edit Task</h4>
              <AiOutlineClose  onClick={() => {
              navigate("/");
            }} size={22} color={"#667085"} className="text-[#667085] cursor-pointer"/>
           </div>
           <div className="py-4">
              <textarea value={text} onChange={(e) => {setText(e.target.value)}} className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal">Create Wireframe</textarea>
           </div>

           <div className='flex  gap-3'>
            <div >
            <DatePickerWithPresets/>
            </div>
            <input onChange={(e) => {setFromTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md "/>
            <input onChange={(e) => {setToTime(e.target.value)}} type='time' className="border solid border-[#D0D5DD] py-1 px-2 rounded-md "/>
           </div>

           <div className="pt-4 flex justify-between ">
            <div className="flex gap-2 items-center cursor-pointer">
            <AiTwotoneBell size={22} className="text-[#667085]"/>
              <p className="text-[#667085] font-inter text-base font-medium">10 minutes before</p>
            </div>

            <AiOutlineClose size={16} className="text-[#667085] cursor-pointer"/>
           </div>
      
           <div className="flex gap-4 w-full justify-center pt-8">
                  <button onClick={() => navigate(`/`)} className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]">
                    <p>Cancel</p>
                  </button>
                  <button onClick={handleAddTexts} className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold ">
                    <p>Save</p>
                  </button>
                </div>
          </div>
    </>
  );
}

export default EditTask