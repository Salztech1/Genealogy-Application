import { useForm, Controller } from 'react-hook-form';
import 'primeicons/primeicons.css';
import { createUser, sendVerificationEmail } from '../services/auth'; 
import { useNavigate } from 'react-router-dom'; 
import React from 'react';

function SignUpForm() {
  const { control, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const { email, password, name } = data;

    try {
      const user = await createUser({ email, password, username: name });
      await sendVerificationEmail(user); 

      reset({
        name: '',
        password: '',
        email: '',
      });

      console.log('User created and verification email sent:', user);
      
      alert("A verification email has been sent to your address. Please check your inbox, verify your account, and then log in.");

      navigate('/login', { state: { email } }); // Redirect to sign-in page with email
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const validateConfirmPassword = (value) => {
            const password = watch('password'); 
            return value === password || "Passwords do not match";
        };
    


  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className=' w-22rem'>
            <div>
                <p>
                    <label className='text-color'>Email*</label>
                </p>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => (
                        <input
                            type="email"
                            {...field}
                            className="col-12 py-3 border-round border-400 outline-none border-solid hover:border-blue-400"
                            placeholder='Enter admin email address'
                            required
                        />
                    )}
                />
            </div>

            <div>
                <p>
                    <label className='text-color'>Full Name*</label>
                </p>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Full Name is required' }}
                    render={({ field }) => (
                        <input
                            type="text"
                            {...field}
                            className="col-12 py-3 border-round border-400 outline-none border-solid hover:border-blue-400 "
                            placeholder='Enter your full name'
                            required
                        />
                    )}
                />
            </div>


            <div>
                <p>
                    <label className='text-color'>Password*</label>
                </p>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: 'Password is required', minLength: { value: 8, message: 'Your password must be at least 8 characters' }
                    }}
                    render={({ field }) => (
                        <input type="password" {...field} className="col-12 py-3 border-round border-400 outline-none border-solid hover:border-blue-400" placeholder='Enter password' required minLength={8} />
                    )}
                />
            </div>
            <div>
                <p>
                    <label className='text-color'>Confirm Password*</label>
                </p>
                <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                        required: 'Confirm Password is required',
                        validate: validateConfirmPassword
                    }}
                    render={({ field }) => (
                        <input
                            type="password"
                            {...field}
                            className="col-12 py-3 border-round border-400 outline-none border-solid hover:border-blue-400"
                            placeholder='Confirm password'
                            required
                        />
                    )}
                />
            </div>

            

            <button type="submit" className="col-12 mt-5  border-none bg-primary bg-transparent py-3 cursor-pointer button-redius  ">Create Account</button>

            

            <div className="pb-6 px-0 md:px-0 md:pb-6  mt-0 mr-6 md:mr-6 md:mt-0 hide-on-small-screen  ">
                <p className="text-xs md:ml-8">Already have an account? <a href="/login" className="no-underline text-skyblue">Login</a></p>
            </div>
        </form>
  );
}

export default SignUpForm



