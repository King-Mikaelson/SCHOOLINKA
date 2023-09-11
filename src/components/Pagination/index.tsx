import {
  useContext,
  useState,
} from "react";
import AppContext from "../../Context/AppContext";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import MyTasks from "../MyTasks";


function PaginatedItems({ itemsPerPage }: any) {
  const { sortArray,page,setPage,returnFilteredDates} = useContext(AppContext);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = returnFilteredDates()?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(returnFilteredDates()?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: any }) => {
    const newOffset = (event.selected * itemsPerPage) % returnFilteredDates()?.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    // console.log(itemOffset)
    // setPage?.(event.selected)
    // event.selected = page
  };

  return (
    <>
      <MyTasks currentItems={currentItems} />
      <ReactPaginate
      // forcePage={Number(page)}
        breakLabel="..."
        nextLabel={
          <div className="flex gap-2 items-center cursor-pointer">
            <p>Next</p>
            <AiOutlineArrowRight />
          </div>
        }
        onPageChange={(event) => handlePageClick(event)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <div className="flex gap-2 items-center cursor-pointer">
            <AiOutlineArrowLeft />
            <p>Previous</p>
          </div>
        }
        renderOnZeroPageCount={null}
        pageClassName="flex justify-center items-center font-sans  text-[#1D2939] text-sm font-medium"
        pageLinkClassName="flex gap-1 items-center font-sans  text-[#1D2939] text-sm font-medium"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="flex gap-2 items-center cursor-pointer"
        nextLinkClassName="flex gap-2 items-center cursor-pointer"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="flex justify-between items-center pb-24 pt-7 border-t solid border-spacing-28 gap-1"
        activeClassName="text-[#1D2939] shadow-sm bg-[#F9FAFB] py-2 px-4 flex justify-center items-center rounded-full cursor-pointer"
      />
    </>
  );
}

export default function Pagination() {
  return <PaginatedItems itemsPerPage={7} />;
}