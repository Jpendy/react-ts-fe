import React, { useState } from 'react'
import { useActiveUser, useLogin, useLogout, useSignup } from '../../providers/AuthProvider'

export default function Signup() {

    const logout = useLogout()
    const login = useLogin()
    const signup = useSignup()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useActiveUser()
    console.log(user)
    return (
        <>

            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit' onClick={() => login({ email, password })}>login</button>
            <button type='submit' onClick={() => signup({ email, password })}>signup</button>

            <button onClick={logout}>logout</button>
        </>
    )
}
