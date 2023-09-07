import Dashboard from '../Dashboard'
import {Outlet} from "react-router-dom"
import Pagination from '../Pagination'


function TasksLayout() {

  return (
<div className="md:grid  2xl:grid-cols-[1fr,600px] xl:grid-cols-[850px,1fr] lg:grid-cols-[500px,1fr] md:grid-cols-2  px-6 lg:px-16 md:divide-x-2 gap-2">
   <div className='w-full'>
    <Dashboard/>
   <Pagination/>
    </div>
    <div className='w-full block'>
    <Outlet/>
    </div>
</div>
  )
}

export default TasksLayout