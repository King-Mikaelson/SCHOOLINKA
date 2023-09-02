import CheckBox from "../CheckBox";
import {
  useContext,
  useState,
} from "react";
import AppContext from "../../Context/AppContext";
import { Item } from "../../../src/types/types";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

function MyTasks({ currentItems }: any) {


  return (
    <div className="pb-4 pt-8">
      <h2 className="text-[#101828] text-base font-workSans font-semibold">
        MyTasks
      </h2>

      <div className="flex flex-col gap-5 py-4">
        {currentItems &&
          currentItems?.map((item: Item, index: number) => (
            <div
              key={index}
              className="w-full flex justify-between px-6 py-4 bg-[#F9FAFB] border-[#EAECF0] solid border-b items-center "
            >
              <CheckBox item={item} />
              <div>
                <p className="text-[#475467] font-workSans font-normal text-sm">
                  Today
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyTasks
