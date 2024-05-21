import { useForm, Controller } from 'react-hook-form';
import 'primeicons/primeicons.css';
import { signInUser } from "../services/auth"; // Assuming this fetches user
import { useNavigate } from 'react-router-dom'; // For navigation
import 'primeicons/primeicons.css';
import React, { useState } from "react";

function LogInForm() {

  

  const { control, handleSubmit, reset } = useForm();
  const [authState, setAuthState] = useState({ status: 'idle', error: null });
  const navigate = useNavigate(); // For navigation

  const onSubmit = async (data) => {
    setAuthState({ status: 'loading', error: null }); // Set loading state
    try {
      const user = await signInUser(data.email, data.password); // Call login
      console.log('Logged in user:', user);
      reset({ email: '', password: '' }); // Reset form
      navigate('/'); // Redirect to homepage on success
    } catch (error) {
      // Handle different error types
      if (error.code === 'auth/user-not-found') {
        setAuthState({ status: 'failed', error: 'Invalid email or password' }); // Specific error
        navigate('/signup'); // Redirect to signup on invalid user
      } else {
        console.error("Error Logging in:", error);
        setAuthState({ status: 'failed', error: 'An error occurred' }); // Generic error
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-22rem'>
      <div>
        <p>
          <label className='text-color'>Email*</label>
        </p>

        <Controller
          name="email"
          control={control}
          defaultValue=""
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
          <label className='text-color'>Password*</label>
        </p>

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 8, message: 'Your password must be at least 8 characters' }
          }}
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className="col-12 py-3 border-round border-400 outline-none border-solid hover:border-blue-400"
              placeholder='Enter password'
              required
              minLength={8}
            />
          )}
        />
      </div>

      <button
        type="submit"
        className='border-none bg-primary bg-transparent py-3 cursor-pointer col-12 mt-5 button-redius'
        disabled={authState.status === 'loading'} // Disable button on loading
      >
        {authState.status === 'loading' ? 'Loading...' : 'LOGIN'}
      </button>

      {authState.status === 'failed' && (
        <p className="text-red-500">{authState.error}</p>
      )}

      <div className="pb-6 px-0 md:px-0 md:pb-6 mt-0 mr-6 md:mr-6 md:mt-0 ">
        <p className="text-xs md:ml-8 hide-on-small-screen">
          Don't have an account? <a href="/signup" className="no-underline text-skyblue hide-on-small-screen">SignUp</a>
        </p>
      </div>
    </form>
  );
}

export default LogInForm;
