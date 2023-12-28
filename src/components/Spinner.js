import React from 'react'
import spinner from './spinner.gif'

const Spinner =()=>{

    return (
      <div className='text-center mx-2 my-5'>
        <img src={spinner} alt="loading.." />
      </div>
    )
  }


export default Spinner
