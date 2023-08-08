import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clockIn, clockOut } from "../../store/slice/attd/slices";

export default function AbsentPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formattedDate, setFormattedDate] = useState("")
    
    const {employeeId, token} = useSelector(state => {
        return{
            token : state.auth.token,
            employeeId : state.auth.employeeId
        }
    })

    useEffect(()=>{
        const interval = setInterval(() => {
            const currentDate = new Date();
            const formatted = formatDate(currentDate);
            setFormattedDate(formatted);
          }, 1000);
      
          return () => {
            clearInterval(interval);
          };
    },[])

    const formatDate = (date) => {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        };
    
        return date.toLocaleString(undefined, options);
    };

    if(!token){
        return navigate("/login")
    }

    return(
        <>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate("/")}>
            Go To Home
        </button>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Absent Page
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <h1>Current Time : {formattedDate}</h1>
                  </div>
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                     focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700
                      dark:focus:ring-red-900" onClick={()=>dispatch(clockIn({employeeId : employeeId}))}>Clock In</button>
                <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
                     focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
                      dark:focus:ring-green-800" onClick={()=>dispatch(clockOut({employeeId : employeeId}))}>Clock Out</button>
              </form>
          </div>
      </div>
  </div>
</section></>
    )
}