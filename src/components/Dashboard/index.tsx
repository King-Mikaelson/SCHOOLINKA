import { useState, useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";

function Dashboard() {
  const{selectedDate, setSelectedDate} = useContext(AppContext)

  function generateDaysOfWeekForMonth(year: number, month: number) {
    const daysOfWeek = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the given month

    // console.log(daysInMonth)

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript
      // console.log(month)
      const id = day;
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // Get short-form day name

      daysOfWeek.push({
        id,
        day: dayName,
        date:date
      });
    }

    return daysOfWeek;
  }
  const year = selectedDate?.getFullYear(); // Change to the desired year
  const month = selectedDate?.getMonth()! + 1; // Change to the desired month (1 = January)

  const daysOfWeekForSelectedMonth = generateDaysOfWeekForMonth(year!, month!);
  // console.log(daysOfWeekForSelectedMonth)

  const [selectedItemIndex, setSelectedItemIndex] = useState<null | number>(
    1
  );

  const handleItemClick = (index: number, date:Date) => {
    setSelectedItemIndex(index);
    setSelectedDate(date)

  };

  useEffect(() => {
    generateDaysOfWeekForMonth(year!, month!) 
  },[month, selectedDate, year])

  return (
    <div className="py-1 flex flex-col gap-3 overflow-hidden ">
      <h2 className="font-workSans font-semibold text-[#101828] text-base">
        {`${selectedDate!.toLocaleDateString("en-US",{ month: "long"})} ${year}`}
      </h2>

      <div className="flex gap-3 overflow-scroll">
        {daysOfWeekForSelectedMonth.map((item, index) => (
          <div
            onClick={() => handleItemClick(index, item.date)}
            key={item.id}
            className={`${
              selectedItemIndex === index
                ? "flex bg-[#3F5BF6] flex-col items-center px-4 py-3 border solid border-[#D0D5DD] rounded-lg  shadow-sm text-white"
                : "flex flex-col items-center px-4 py-3 border solid border-[#D0D5DD] rounded-lg  shadow-sm"
            }`}
          >
            <p
              className={`${
                selectedItemIndex === index
                  ? "font-workSans font-semibold text-white text-sm"
                  : "font-workSans font-semibold text-[#344054] text-sm"
              }`}
            >
              {item.id}
            </p>
            <p
              className={`${
                selectedItemIndex === index
                  ? "font-workSans font-semibold text-white  text-sm"
                  : "font-workSans font-semibold text-[#344054]  text-sm"
              }`}
            >
              {item.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
