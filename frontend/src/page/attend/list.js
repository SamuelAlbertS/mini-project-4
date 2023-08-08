import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getList } from "../../store/slice/attd/slices";

export default function ListPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token, employeeId, list} = useSelector(state => {
        return{
            token : state.auth.token,
            employeeId : state.auth.employeeId,
            list : state.attd.list
        }
    })

    useEffect(()=>{
        console.log(employeeId);
        dispatch(getList(employeeId));
    },[employeeId])

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
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        No
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Clock
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    list ?
                    list?.map((list,index)=>(<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={index}>
                        {index+1}
                    </th>
                    <td class="px-6 py-4">
                        {list.action}
                    </td>
                    <td class="px-6 py-4">
                        {formatDate(list.clock)}
                    </td>
                    </tr>))
                    :
                    <tr>
                    </tr>
                }            
            </tbody>
        </table>
    </div></>)
}
