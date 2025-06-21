import React from 'react'
import { useSelector } from 'react-redux'
import { FcEmptyTrash } from "react-icons/fc";
import Button from '../HomePage/Button';
import { GiEmptyWoodBucket } from "react-icons/gi";

const Cart = () => {
    
    const cart = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const totalItems = useSelector((state)=>state.cart.totalItems);
  
  
    return (
    <div className='text-white p-10 flex flex-col gap-10 w-full justify-start items-center'>
        <h1 className='text-5xl text-white'>Cart</h1>
        {
            (totalItems===0)?
            <div className='flex flex-col justify-center items-center w-full gap-10'>
                <GiEmptyWoodBucket className='text-9xl text-richblack-200'/>
                <p className='text-richblack-300 text-md'>Your cart is empty</p>
                <Button link='/' active={true} text="Browse Course"/>
            </div>:
            <div>

            </div>
        }
    </div>
  )
}

export default Cart