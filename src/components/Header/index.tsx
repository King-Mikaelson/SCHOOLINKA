import {FiSettings} from "react-icons/fi";
import {BsBell} from "react-icons/bs"
type Props = {}


function Header({}: Props) {
  return (
    <div className="fixed z-30 top-0 w-full py-6 flex justify-between px-6 lg:px-5.5  border-b solid border-[#EAECF0] bg-white">
    <h1 className="font-inter text-2xl font-bold text-black">ToDo</h1>
    <div className="flex items-center gap-8">
      <FiSettings size={20} color="#667085"/>
       <BsBell size={20} color="#667085"/>
        <img alt="dropdown img" src="/Dropdown.svg"/>
    </div>
    </div>
  )
}

export default Header