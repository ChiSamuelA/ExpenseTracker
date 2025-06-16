import { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate()

  // handle login form
  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }

    if(!password){
      setError('Please enter the password');
      return;
    }
    setError("")
    
    // login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { token, user } = response.data;

      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <AuthLayout>
      <div className='justify-center flex-col flex md:h-full h-3/4 lg:w-[78%]'>
        <h3 className='capitalize text-xl font-semibold text-black'>welcome back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6 capitalize'>please enter your details to login</p>

        <form action="" onSubmit={handleLogin} method="post">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder='Enter Your Email'
            type='text'
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder='Min 8 Characters'
            type='password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button className='btn-primary uppercase cursor-pointer' type='submit'>
            login
          </button>

          <p className="mt-3 text-[13px] text-slate-800 capitalize">
            don$apos;t have an account? {" "}
            <Link className='font-medium text-blue-600 underline capitalize' to='/signup'>
              sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login