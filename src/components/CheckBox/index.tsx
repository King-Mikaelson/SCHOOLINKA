import React, { useState } from 'react'
import { useContext } from 'react'
import AppContext from '../../Context/AppContext'
import {useNavigate} from "react-router-dom"



type Props = {
    item:{
      title:string,
      date:string | Date,
      fromTime:string | number | Date,
      id:number,
      toTime:string | number | Date,
      completed:boolean,
      userId:number
    }

}

export default function CheckBox({item}: Props) {
    const{ToggleTextsCompletedById} = useContext(AppContext)
    const navigate = useNavigate()


    
    const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        ToggleTextsCompletedById(item.id)
        console.log("clicked")
    }



    function convert24to12(inputTime:string) {
      // Split the input time into hours and minutes
      var timeParts = inputTime.split(":");
      var hours = parseInt(timeParts[0]);
      var minutes = parseInt(timeParts[1]);
  
      // Determine AM or PM
      var period = hours < 12 ? "AM" : "PM";
  
      // Convert to 12-hour format
      if (hours === 0) {
          hours = 12; // Midnight
      } else if (hours > 12) {
          hours = hours - 12;
      }
  
      // Return the converted time as a string
      return hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + period;
  }
  

  return (
    <div className="flex  gap-4 items-center relative" onClick={() => navigate(`/task/${item.id}`)}>
    <div onClick={(e) => handleChange(e)} className={`${item.completed ?'checkbox-wrapper outline-none flex items-center justify-center border-[#3F5BF6] border border-solid duration-1000' : "checkbox-wrapper outline-none flex items-center justify-center border-[#D0D5DD] border border-solid duration-1000"}`}>
    <img src="/check.svg"  alt="check" color="#3F5BF6" className={`${item.completed ?' w-[0.875rem] h-[0.875rem]  outline-none duration-1000':'hidden duration-1000'}`}/>
    </div>
    <div >
    <p className={`${item.completed ?'text-[#D0D5DD] font-workSans font-medium text-sm line-through cursor-pointer' :'text-[#101828] font-workSans font-medium text-sm cursor-pointer ' }`}>{item.title}</p>
    <p className={`${item.completed ?'text-[#D0D5DD] font-workSans font-normal text-sm line-through cursor-pointer': 'text-[#475467] font-workSans font-normal text-sm cursor-pointer'}`}>
      {convert24to12(String(item.fromTime))} - {convert24to12(String(item.toTime))}</p>

      {/* <p className="text-[#475467] font-workSans font-normal text-sm py-2 block md:hidden">
                  Today
      </p> */}
    </div>
    </div>
  )
}