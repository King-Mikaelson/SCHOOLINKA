import React, { useContext, useEffect, useRef, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { IoCalendarClearOutline } from "react-icons/io5";
import { AiOutlineClockCircle } from "react-icons/ai";
import AppContext from "../../Context/AppContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";


function ViewTask() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const { DeleteTextsById,texts,  setSelectedTodo} = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<any>();
  const [expandOnContentDrag, setExpandOnContentDrag] = useState(true);

  const item = texts?.find((text) => text.id === Number(id))


  useEffect(() => {
    setSelectedTodo(Number(id))
  },[id])



  useEffect(() => {
    setOpen(true)
  },[])




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

  //   <div className="hidden md:flex flex-col w-full mx-3 px-5 py-5 border solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
  //     <div className="self-end cursor-pointer" onClick={() => navigate(`/`)}>
  //       <GrFormClose size={25} />
  //     </div>

  //     <div className="pt-2">
  //       <h4 className="pt-2 pb-4 font-inter text-lg font-bold text-[#272727]">
  //         {item?.title}
  //       </h4>
  //       <div className="flex gap-2 py-1 items-center">
  //         <IoCalendarClearOutline size={20} color="#3F5BF6" />
  //         <p className="font-workSans text-base text-[#272727] font-medium">
  //          {item?.date}
  //         </p>
  //       </div>

  //       <div className="flex gap-2 py-1 items-center">
  //         <AiOutlineClockCircle size={20} color="#3F5BF6" />
  //         <p className="font-workSans text-base text-[#272727] font-medium">
  //          {convert24to12(String(item?.fromTime))} - {convert24to12(String(item?.toTime))}
  //         </p>
  //       </div>

  //       <div className="flex gap-4 w-full justify-center pt-8">
  //         <button
  //           onClick={() => DeleteTextsById(Number(id))}
  //           className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]"
  //         >
  //           <p>Delete</p>
  //         </button>
  //         <button
  //           onClick={() => navigate(`/task/edit/${id}`)}
  //           className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold "
  //         >
  //           <p>Edit</p>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

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
           <div className="flex flex-col w-full  px-5 py-3">
      <div className="self-end cursor-pointer" onClick={() => navigate(`/`)}>
        <GrFormClose size={25} />
      </div>

      <div className="pt-2">
        <h4 className="pt-2 pb-4 font-inter text-lg font-bold text-[#272727]">
          {item?.title}
        </h4>
        <div className="flex gap-2 py-1 items-center">
          <IoCalendarClearOutline size={20} color="#3F5BF6" />
          <p className="font-workSans text-base text-[#272727] font-medium">
           {`${item?.date}`}
          </p>
        </div>

        <div className="flex gap-2 py-1 items-center">
          <AiOutlineClockCircle size={20} color="#3F5BF6" />
          <p className="font-workSans text-base text-[#272727] font-medium">
           {convert24to12(String(item?.fromTime))} - {convert24to12(String(item?.toTime))}
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center pt-8">
          <button
            onClick={() => DeleteTextsById(Number(id))}
            className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]"
          >
            <p>Delete</p>
          </button>
          <button
            onClick={() => navigate(`/task/edit/${id}`)}
            className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold "
          >
            <p>Edit</p>
          </button>
        </div>
      </div>
    </div>
        </BottomSheet>
      </div>

      <div className="hidden md:flex flex-col w-full mx-3 px-5 py-5 border solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
      <div className="self-end cursor-pointer" onClick={() => navigate(`/`)}>
        <GrFormClose size={25} />
      </div>

      <div className="pt-2">
        <h4 className="pt-2 pb-4 font-inter text-lg font-bold text-[#272727]">
          {item?.title}
        </h4>
        <div className="flex gap-2 py-1 items-center">
          <IoCalendarClearOutline size={20} color="#3F5BF6" />
          <p className="font-workSans text-base text-[#272727] font-medium">
           {`${item?.date}`}
          </p>
        </div>

        <div className="flex gap-2 py-1 items-center">
          <AiOutlineClockCircle size={20} color="#3F5BF6" />
          <p className="font-workSans text-base text-[#272727] font-medium">
           {convert24to12(String(item?.fromTime))} - {convert24to12(String(item?.toTime))}
          </p>
        </div>

        <div className="flex gap-4 w-full justify-center pt-8">
          <button
            onClick={() => DeleteTextsById(Number(id))}
            className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054]"
          >
            <p>Delete</p>
          </button>
          <button
            onClick={() => navigate(`/task/edit/${id}`)}
            className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold "
          >
            <p>Edit</p>
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ViewTask;
