import React, { useState } from 'react'
import SignUp from '../components/SignUp'
import Login from '../components/Login'

const AuthPage = () => {

    const [authType, setAuthType] = useState("signup")

  return (
    <div className='bg_authpage'>
        {
            authType==="signup" ?<SignUp setAuthType={setAuthType} />:<Login setAuthType={setAuthType} />
        }
    </div>
  )
}

export default AuthPage