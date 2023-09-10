import  { useContext, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import AppContext from "../../Context/AppContext";

export default function DateRangePicker() {

  const currentDate = new Date();
  const {selectedDate, setSelectedDate} = useContext(AppContext)

  

  return (
    <div className="customDatePickerWidth">
      <DatePicker
        wrapperClassName="datePicker"
        inline={true}
        className="w-[100000px]"
        selected={selectedDate}
        onChange={( date: Date | null) => {
          setSelectedDate(date);
          // console.log("date", date);
        }}
        onMonthChange={(date) => {
          // setSelectedDate(date);
          // setSelectedTime(null);
          // console.log("date", date);
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
        }) => {
          return (
            <div
              className="flex w-full flex-col px-7 bg-[#FFFFFF]"
            >
              <div className="flex justify-between pb-4 pt-2">
                <button
                  onClick={decreaseMonth}
                >
                  <span className="text-[#667085]">{"<"}</span>
                </button>

                <div className="text-[#344054] text-base font-workSans font-semibold ">
                {dayjs(date).format("MMMM YYYY")}
                </div>
                <button
                  onClick={increaseMonth}
                >
                  <span className="text-[#667085]">{">"}</span>
                </button>
              </div>
              <div className="w-full flex justify-evenly gap-3 pb-2">
              <div className="rounded-[0.5rem] w-full shadow-md bg-[#FFF] border border-solid border-[#D0D5DD] py-2 px-2 text-left text-[#101828] text-base font-workSans font-normal flex  items-center ">{dayjs(date).format("MMM D, YYYY")}</div>
              <div
                onClick={() => {setSelectedDate(currentDate);
                  console.log("date",  currentDate);
                }}
               className="rounded-[0.5rem] w-[40%] shadow-md bg-[#FFF] border border-solid border-[#D0D5DD] cursor-pointer py-2 px-2 text-[#344054] text-sm font-workSans  flex justify-center items-center font-medium">Today</div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
