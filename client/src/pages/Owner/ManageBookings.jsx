/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import TitleOwner from '../../components/owner/TitleOwner';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const ManageBookings = () => {
  const {currency , axios}=useAppContext();
  const [bookings,setBookings]=useState([]);

  const fetchOwnerBookings=async()=>{
    try {
      const {data} = await axios.get('/api/bookings/owner')
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }
  const changeBookingStatus=async(bookingId,status)=>{
    try {
      const {data} = await axios.post('/api/bookings/change-status',{bookingId , status})
      if(data.success){
        toast.success(data.message);
        fetchOwnerBookings()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchOwnerBookings()
  },[])

  return (
    <div className='px-4 py-10 md:px-10 w-full'>
      <TitleOwner title="ManageBookings" subTitle="Tracl all customer bookings, approve or
      cancel requests, and manage booking statuses. "/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border
      border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm
        text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
               <th className='p-3 font-medium'>Car</th>
               <th className='p-3 font-medium max-md:hidden'>Date </th>
               <th className='p-3 font-medium'>Total</th>
               <th className='p-3 font-medium max-md:hidden'>Payment</th>
               <th className='p-3 font-medium'>Actions</th>
               
            </tr>
          </thead>
          <tbody>
            {bookings.map((bookings,index)=>(
              <tr key={index} className='border-t border-borderColor text-gray-500'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={bookings.car.image} alt="" className='h-12 w-12 aspect-square rounded-md
                  object-cover' />
                  <p>{bookings.car.brand} {bookings.car.model}</p>
                </td>

                <td className='p-3 max-md:hidden'>
                  {bookings.pickupDate.split('T')[0]} to {bookings.returnDate.split('T')[0]}
                </td>

                <td className='p-3'>
                  {currency} {bookings.price}
                </td>

                <td className='p-3 max-md:hidden'>
                  <span className='bg-gray-100 px-3 py-1 rounded-full text-sm'>offline</span>
                </td>

                <td className='p-3 '>
                  {bookings.status ==="pending" ? (
                    <select onChange={(e)=>changeBookingStatus(bookings._id , e.target.value)}
                     className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor
                    rounded-md outline-none' value={bookings.status}>
                      <option value="pending">Pending</option>
                      <option value="canceled">Canceled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ):(
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold 
                      ${bookings.status === 'confirmed' ?'bg-green-100 text-green-500':'bg-red-100 text-red-500'}`}>{bookings.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings
