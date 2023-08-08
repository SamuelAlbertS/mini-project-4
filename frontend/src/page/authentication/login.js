import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { login } from "../../store/slice/auth/slices";
import { loginValidationSchema } from "../../store/slice/auth/validation";

export default function LoginPage(){
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const{token, isLoading, error} = useSelector(state => {
        return{
            token : state.auth.token,
            isLoading : state.auth.isLoading,
            error : state.auth.error
        }
    })

    if(token){
        return navigate("/")
    }

    return(
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login 
              </h1>
              <Formik initialValues={{username : "", password: ""}}
                    validate={values => {
                        try{
                            loginValidationSchema.validateSync(values)
                            return{}
                        }catch(error){
                            console.log("error",error?.message)
                            return {message : error?.message}
                        }
                    }}
                    onSubmit={(values, {setSubmitting})=>{
                        dispatch(login(values))
                        setSubmitting(false)
                    }}
                    >
                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div> 
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                      <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your username" required="" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                      {
                        errors.message && (
                            <div className="alert alert-error mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errors.message}</span>
                            </div>
                        )
                    }
                      </div>
                      <a onClick={()=>navigate("/forget")} class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" disabled={isSubmitting||isLoading}>{isSubmitting || isLoading ? <span className="loading loading-spinner"></span> : null}Sign in</button>
              </form>)}
              </Formik>
          </div>
      </div>
  </div>
</section>
    )
}