import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateUser } from "../../store/slice/auth/slices";
import { updateValidationSchema } from "../../store/slice/auth/validation";

export default function UpdateUser(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {token, username, employeeId, password, email} = useSelector(state => {
      return{
        token : state.auth.token,
        username : state.auth.username,
        password : state.auth.password,
        employeeId : state.auth.employeeId,
        email : state.auth.email
      }
    })

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
                        Update Cashier 
                        </h1>
                        <Formik initialValues={{username : username, password : password, email : email, employeeId : employeeId}}
                        validate={values => {
                          try{
                            updateValidationSchema(values)
                            return{}
                          }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                          }
                        }}
                        onSubmit={(values, {setSubmitting})=>{
                          dispatch(updateUser(values))
                          setSubmitting(false)
                        }}>
                        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
              <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                      <label for="employeeId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">EmployeeId</label>
                      <input type="text" name="employeeId" id="employeeId" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your new phonenumber" required="" value={values.employeeId} disabled="true" onChange={handleChange} onBlur={handleBlur}/>
                    </div>
                    <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your new username" required="" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                    </div>
                    <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                    </div>
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your new email" required="" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                    </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
              </form>)}</Formik>
          </div>
      </div>
        </div>
        </section>
    </>)
}