import { useState, useContext, useRef, useEffect } from "react";
import { AiOutlineClose, AiTwotoneBell } from "react-icons/ai";
import { DatePickerWithPresets } from "../../components/DatePickerWithPresets";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "react-spring-bottom-sheet";
import { toast } from "react-toastify";

function AddTask() {
  const [text, setText] = useState("Create Wireframe");
  const [toTime, setToTime] = useState("");
  const [fromTime, setFromTime] = useState("");
  const { date, setDate, addText, texts } = useContext(AppContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleAddTexts = () => {
    if (!text) {
      toast.warn("Title can not be Empty");
      return;
    }
    if (!date) {
      toast.warn("Date can not be Empty");
      return;
    }
    if (!toTime || !fromTime) {
      toast.warn("Time can not be Empty");
      return;
    }
    addText(text, fromTime, toTime, date);
    setToTime("");
    setFromTime("");
    setText("");
    setDate(undefined);
  };

  const sheetRef = useRef<any>();
  const [expandOnContentDrag, setExpandOnContentDrag] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, []);
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
              <h4 className="font-workSans text-[#101828] font-semibold text-lg">
                Add Task
              </h4>
              <AiOutlineClose
                onClick={() => {
                  navigate("/");
                }}
                size={22}
                color={"#667085"}
                className="text-[#667085] cursor-pointer"
              />
            </div>
            <div className="py-4">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal"
              ></textarea>
            </div>

            <div className="flex justify-between w-full">
              <div>
                <DatePickerWithPresets />
              </div>
              <input
                onChange={(e) => {
                  setFromTime(e.target.value);
                }}
                type="time"
                className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
              />
              <input
                onChange={(e) => {
                  setToTime(e.target.value);
                }}
                type="time"
                className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
              />
            </div>

            <div className="pt-4 flex justify-between ">
              <div className="flex gap-2 items-center cursor-pointer">
                <AiTwotoneBell size={22} className="text-[#667085]" />
                <p className="text-[#667085] font-inter text-base font-medium">
                  10 minutes before
                </p>
              </div>

              <AiOutlineClose
                size={16}
                className="text-[#667085] cursor-pointer"
              />
            </div>

            <div className="flex gap-4 w-full justify-center pt-8">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054] cursor-pointer"
              >
                <p>Cancel</p>
              </button>
              <button
                onClick={() => {
                  handleAddTexts();
                  navigate("/");
                }}
                className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold cursor-pointer "
              >
                <p>Add</p>
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>

      <div className="hidden md:flex flex-col w-full mx-3 px-5 py-5 border border-t-0 solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
        <div className="w-full flex justify-between items-center">
          <h4 className="font-workSans text-[#101828] font-semibold text-lg">
            Add Task
          </h4>
          <AiOutlineClose
            onClick={() => {
              navigate("/");
            }}
            size={22}
            color={"#667085"}
            className="text-[#667085] cursor-pointer"
          />
        </div>
        <div className="py-4">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal"
          ></textarea>
        </div>

        <div className="flex justify-between w-full">
          <div>
            <DatePickerWithPresets />
          </div>
          <input
            onChange={(e) => {
              setFromTime(e.target.value);
            }}
            type="time"
            className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
          />
          <input
            onChange={(e) => {
              setToTime(e.target.value);
            }}
            type="time"
            className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
          />
        </div>

        <div className="pt-4 flex justify-between ">
          <div className="flex gap-2 items-center cursor-pointer">
            <AiTwotoneBell size={22} className="text-[#667085]" />
            <p className="text-[#667085] font-inter text-base font-medium">
              10 minutes before
            </p>
          </div>

          <AiOutlineClose size={16} className="text-[#667085] cursor-pointer" />
        </div>

        <div className="flex gap-4 w-full justify-center pt-8">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054] cursor-pointer"
          >
            <p>Cancel</p>
          </button>
          <button
            onClick={handleAddTexts}
            className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold cursor-pointer "
          >
            <p>Add</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTask;







































// import { useState, useContext, useRef, useEffect } from "react";
// import { AiOutlineClose, AiTwotoneBell } from "react-icons/ai";
// import { DatePickerWithPresets } from "../DatePickerWithPresets";
// import AppContext from "../../Context/AppContext";
// import { useNavigate } from "react-router-dom";
// import Sheet, { SheetRef } from 'react-modal-sheet';
// function AddTask() {
//   const [text, setText] = useState("Create Wireframe");
//   const [toTime, setToTime] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const { date, setDate, addText, texts } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);

//   const handleAddTexts = () => {
//     if (!text) {
//       alert("Title can not be Empty");
//       return;
//     }
//     if (!date) {
//       alert("Date can not be Empty");
//       return;
//     }
//     if (!toTime && !fromTime) {
//       alert("Time can not be Empty");
//       return;
//     }
//     addText(text, fromTime, toTime, date);
//     setToTime("");
//     setFromTime("");
//     console.log(text);
//     console.log(fromTime);
//     console.log(toTime);
//     console.log(date);
//     setText("");
//     setDate(undefined);
//   };

//   console.log(texts);
//   const ref = useRef<SheetRef>();
//   const snapTo = (i: number) => ref.current?.snapTo(i);

//   useEffect(() => {
//     setOpen(true)
//   },[])
//   return (
//     <>
//       <div className="block md:hidden">
//       <Sheet
//         ref={ref}
//         isOpen={open}
//         onClose={() => setOpen(false)}
//         snapPoints={[600, 400, 100, 0]}
//         initialSnap={1}
//         onSnap={snapIndex =>
//           console.log('> Current snap point index:', snapIndex)
//         }
//         className="block md:hidden"
//       >
//          <Sheet.Container className=" rounded-lg">
//           <Sheet.Content className=" rounded-lg">
//           <div className="flex flex-col w-full px-6 py-6  rounded-[0.5rem] ">
//             <div className="w-full flex justify-between items-center">
//               <h4 className="font-workSans text-[#101828] font-semibold text-lg">
//                 Add Task
//               </h4>
//               <AiOutlineClose
//                 onClick={() => {
//                   navigate("/");
//                 }}
//                 size={22}
//                 color={"#667085"}
//                 className="text-[#667085] cursor-pointer"
//               />
//             </div>
//             <div className="py-4">
//               <textarea
//                 value={text}
//                 onChange={(e) => {
//                   setText(e.target.value);
//                 }}
//                 className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal"
//               ></textarea>
//             </div>

//             <div className="flex justify-between w-full">
//               <div>
//                 <DatePickerWithPresets />
//               </div>
//               <input
//                 onChange={(e) => {
//                   setFromTime(e.target.value);
//                 }}
//                 type="time"
//                 className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
//               />
//               <input
//                 onChange={(e) => {
//                   setToTime(e.target.value);
//                 }}
//                 type="time"
//                 className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
//               />
//             </div>

//             <div className="pt-4 flex justify-between ">
//               <div className="flex gap-2 items-center cursor-pointer">
//                 <AiTwotoneBell size={22} className="text-[#667085]" />
//                 <p className="text-[#667085] font-inter text-base font-medium">
//                   10 minutes before
//                 </p>
//               </div>

//               <AiOutlineClose
//                 size={16}
//                 className="text-[#667085] cursor-pointer"
//               />
//             </div>

//             <div className="flex gap-4 w-full justify-center pt-8">
//               <button
//                 onClick={() => {
//                   navigate("/");
//                 }}
//                 className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054] cursor-pointer"
//               >
//                 <p>Cancel</p>
//               </button>
//               <button
//                 onClick={() => {setOpen(true); handleAddTexts()}}
//                 className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold cursor-pointer "
//               >
//                 <p>Add</p>
//               </button>
//             </div>
//           </div>
//           </Sheet.Content>
//         </Sheet.Container>
//       </Sheet>
//       </div>

//       <div className="hidden md:flex flex-col w-full mx-3 px-5 py-5 border border-t-0 solid border-[#F2F4F7] rounded-[0.5rem] shadow-xl">
//         <div className="w-full flex justify-between items-center">
//           <h4 className="font-workSans text-[#101828] font-semibold text-lg">
//             Add Task
//           </h4>
//           <AiOutlineClose
//             onClick={() => {
//               navigate("/");
//             }}
//             size={22}
//             color={"#667085"}
//             className="text-[#667085] cursor-pointer"
//           />
//         </div>
//         <div className="py-4">
//           <textarea
//             value={text}
//             onChange={(e) => {
//               setText(e.target.value);
//             }}
//             className="border solid border-[#D0D5DD] shadow-sm rounded-[0.5rem] bg-[#F9FAFB] w-full h-[9rem] px-4 py-4 text-[#667085] font-workSans text-base font-normal"
//           ></textarea>
//         </div>

//         <div className="flex justify-between w-full">
//           <div>
//             <DatePickerWithPresets />
//           </div>
//           <input
//             onChange={(e) => {
//               setFromTime(e.target.value);
//             }}
//             type="time"
//             className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
//           />
//           <input
//             onChange={(e) => {
//               setToTime(e.target.value);
//             }}
//             type="time"
//             className="border solid border-[#D0D5DD] py-1 px-2 rounded-md"
//           />
//         </div>

//         <div className="pt-4 flex justify-between ">
//           <div className="flex gap-2 items-center cursor-pointer">
//             <AiTwotoneBell size={22} className="text-[#667085]" />
//             <p className="text-[#667085] font-inter text-base font-medium">
//               10 minutes before
//             </p>
//           </div>

//           <AiOutlineClose size={16} className="text-[#667085] cursor-pointer" />
//         </div>

//         <div className="flex gap-4 w-full justify-center pt-8">
//           <button
//             onClick={() => {
//               navigate("/");
//             }}
//             className="border solid border-[#D0D5DD] py-2 px-4 w-full shadow-sm rounded-[0.5rem] font-inter text-base font-semibold text-[#344054] cursor-pointer"
//           >
//             <p>Cancel</p>
//           </button>
//           <button
//             onClick={handleAddTexts}
//             className="w-full py-2 bg-[#3F5BF6] border solid border-[#3F5BF6] shadow-sm rounded-[0.5rem] px-4 text-white font-workSans text-sm font-semibold cursor-pointer "
//           >
//             <p>Add</p>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddTask;
