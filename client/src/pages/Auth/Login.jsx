import { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  // handle login form
  const handleLogin = async (e) => {}

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
            placeholder=''
            type='password'
          />
        </form>
      </div>
    </AuthLayout>
  )
}

export default Login