import AppContext from "../../Context/AppContext";
import { Item } from "../../../src/types/types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";

function MyTasks({ currentItems }: any) {
  const { ToggleTextsCompletedById, selectedTodo, selectedDate, formatDate } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: number
  ) => {
    e.stopPropagation();
    ToggleTextsCompletedById(item);
    console.log("clicked");
  };

  function convert24hrsto12hrs(inputTime: string) {
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

  dayjs.extend(updateLocale);

  dayjs.extend(calendar);

  dayjs.updateLocale("en", {
    calendar: {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      lastDay: "[Yesterday]",
      lastWeek: "[Last week]",
      nextWeek: "[Next week]",
      sameElse: "dddd",
    },
  });

  return (
    <div className="pb-4 pt-8">
      <h2 className="text-[#101828] text-base font-workSans font-semibold">
        MyTasks
      </h2>

      <div className="flex flex-col gap-5 py-4">
        {currentItems.length > 0 ? (
          currentItems?.map((item: Item, index: number) => (
            <div
              key={item.id}
              onClick={() => {
                navigate(`/task/${item.id}`);
              }}
              className={`${
                selectedTodo === item.id
                  ? " grid grid-cols-[50px,1fr,100px]  lg:flex lg:px-6 px-3 py-4 bg-[#EAEDFE] border-[#EAECF0] solid border-b items-center"
                  : " lg:flex  lg:px-6 px-3 py-4 bg-[#F9FAFB] border-[#EAECF0] solid border-b items-center grid grid-cols-[50px,1fr,100px] "
              }`}
            >
              <div
                onClick={(e) => handleChange(e, item.id)}
                className={`${
                  item.completed
                    ? "checkbox-wrapper outline-none flex items-center justify-center border-[#3F5BF6] border border-solid duration-1000 self-center md:mr-4   w-[1.25rem] h-[1.25rem] bg-white rounded-[0.375rem]"
                    : "checkbox-wrapper outline-none flex items-center justify-center border-[#D0D5DD] border border-solid duration-1000 self-center md:mr-4 w-[1.25rem] h-[1.25rem] bg-white rounded-[0.375rem]"
                }`}
              >
                <img
                  src="/check.svg"
                  alt="check"
                  color="#3F5BF6"
                  className={`${
                    item.completed
                      ? " w-[0.875rem] h-[0.875rem]  outline-none duration-1000"
                      : "hidden duration-1000"
                  }`}
                />
              </div>
              <div className="self-start w-full h-full flex flex-col gap-1">
                <p
                  className={`${
                    item.completed
                      ? "text-[#D0D5DD] font-workSans font-medium text-sm line-through cursor-pointer"
                      : "text-[#101828] font-workSans font-medium text-sm cursor-pointer "
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`${
                    item.completed
                      ? "text-[#D0D5DD] font-workSans font-normal text-sm line-through cursor-pointer"
                      : "text-[#475467] font-workSans font-normal text-sm cursor-pointer"
                  }`}
                >
                  {convert24hrsto12hrs(String(item.fromTime))} -{" "}
                  {convert24hrsto12hrs(String(item.toTime))}
                </p>
              </div>
              <div className="self-center ml-auto">
                <p className="text-[#475467] font-workSans font-normal text-sm lg:whitespace-nowrap">
                  {dayjs(item.date).calendar()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#101828] font-workSans font-medium text-xl cursor-pointer py-10  flex justify-center items-center">
            <p>There are no Tasks for {`${formatDate(selectedDate!)}.`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTasks;
