import { useState } from "react";

function Dashboard() {
  function generateDaysOfWeekForMonth(year: number, month: number) {
    const daysOfWeek = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the given month

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript
      const id = day;
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // Get short-form day name

      daysOfWeek.push({
        id,
        day: dayName,
      });
    }

    return daysOfWeek;
  }
  const year = 2023; // Change to the desired year
  const month = 1; // Change to the desired month (1 = January)

  const daysOfWeekForJanuary = generateDaysOfWeekForMonth(year, month);

  const [selectedItemIndex, setSelectedItemIndex] = useState<null | number>(
    1
  );

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  return (
    <div className="py-1 flex flex-col gap-3 overflow-hidden ">
      <h2 className="font-workSans font-semibold text-[#101828] text-base">
        January 2023
      </h2>

      <div className="flex gap-3 overflow-scroll">
        {daysOfWeekForJanuary.map((item, index) => (
          <div
            onClick={() => handleItemClick(index)}
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
