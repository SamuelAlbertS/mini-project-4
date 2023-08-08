import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/slice/auth/slices";
import { resetValidationSchema } from "../../store/slice/auth/validation";

export default function ResetPasswordPage(){

    const dispatch = useDispatch()

    return(
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Verification for reset Password
              </h1>
              <Formik initialValues={{otp : "", password : ""}}
                validate={values=>{
                try{
                    resetValidationSchema.validateSync(values)
                    return{}
                }catch(error){
                    console.log("error",error?.message)
                    return {message : error?.message}
                }  
              }}onSubmit={(values, {setSubmitting})=>{
                    dispatch(resetPassword(values))
                    setSubmitting(false)   
                }}>
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting})=>(    
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                      <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please enter your otp</label>
                      <input type="text" name="otp" id="otp" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your otp" required="" value={values.otp} onChange={handleChange} onBlur={handleBlur}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Input the new password :</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                    </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset!</button>
              </form>)}</Formik>
          </div>
      </div>
  </div>
</section>
    )
}