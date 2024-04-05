import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
const About = () => {
  const {auth,setAuth} = useContext(AuthContext)
  return (
    <div className=' pt-60'></div>
  )
}

export default About