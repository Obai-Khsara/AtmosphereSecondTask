import { useForm } from "react-hook-form"


// The below regular expression for email validation format
const regEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// The below regular expression for password complexity validation
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const Form = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        // To make errors appear on touching the input fields
        mode: "onTouched"
    })

    // To get the value of the password field for comparing with confirm password field for validations
    const password = watch("Password")

    const onSubmit = (data) => {
        alert("Registration Successful")
        console.log(
            "Name is " + data.Name +"\n"
            +"Email is " + data.Email + "\n"
            + "Password is " + data.Password + "\n"
        )
        // To clear the inputs fileds after form submission
        reset()
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-gray-400 w-[80%] mx-auto mt-10 p-3 border-2 border-blue-700 rounded-2xl'>

            <h1 className='text-center text-2xl'>Registration Form</h1>
            <hr className='my-2 w-36 border border-blue-700 mx-auto' />

            <label className='block mt-2 text-white text-2xl'>Name</label>
            <input
                {...register("Name", { required: "Name is required"},)}
                className= {`w-full border mt-1 rounded-lg pl-4 py-0.5 outline-0 border-${errors.Name? 'red-500':'blue-700'}`}
                type="text" placeholder='Enter Your Full Name' />
            {errors.Name && <span className='text-red-500'>{errors.Name.message}</span>}

            <label className='block mt-2 text-white text-2xl'>Email</label>
            <input
                {...register("Email",{required: {value: true, message: "Email address is required"},
                    pattern: {value: regEmail, message: "Email should be in valid format"}})}
                className={`w-full border border-${errors.Email? 'red-500':'blue-700'} mt-1 rounded-lg pl-4 py-0.5 outline-0`}
                type="email" placeholder='Enter Your Email'/>
            {errors.Email && <span className='text-red-500'>{errors.Email.message}</span>}    

            <label className='block mt-2 text-white text-2xl'>Password</label>
            <input
                {...register("Password",
                    { required: {value: true, message: "Password  is required"},
                    minLength: {value: 8 , message: "Password must be at least 8 characters"},
                    pattern: {value: passwordRegex, message: "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"}})}
                className={`w-full border border-${errors.Password? 'red-500':'blue-700'} mt-1 rounded-lg pl-4 py-0.5 outline-0`}
                type="password" placeholder='Enter Your Password' />
            {errors.Password && <span className='text-red-500'>{errors.Password.message}</span>}

            <label className='block mt-2 text-white text-2xl'>Confirm Password</label>
            <input
                {...register("Confirmpassword", {
                    required: {value: true, message: "Confirm password is required"},
                    validate: (value) => value === password || "Confirm password does not match password"
                })}
                className={`w-full border border-${errors.Confirmpassword? 'red-500':'blue-700'} mt-1 rounded-lg pl-4 py-0.5 outline-0`}
                type="password" placeholder='Confirm Your Password' />
            {errors.Confirmpassword && <span className='text-red-500'>{errors.Confirmpassword.message}</span>}

            <button className='bg-blue-700 text-gray-400 text-2xl mt-5 p-1.5 border
                rounded-lg cursor-pointer block w-fit mx-auto'
                type="submit">
                Register
            </button>
        </form>
    )
}

export default Form