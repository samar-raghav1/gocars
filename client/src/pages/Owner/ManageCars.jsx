/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import TitleOwner from '../../components/owner/TitleOwner'

import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const ManageCars = () => {
  const {isOwner , axios ,currency}= useAppContext();


  const [cars,setCars]=useState([]);

  const fetchOwnerCars=async()=>{
    try {
      const {data}=await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const deleteCar=async()=>{
    try {
      const {data}=await axios.post("/api/owner/delete-car");
      if(data.success){
        setCars(data.cars)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  },[isOwner])
 
  return (
    <div className='px-4 py-10 md:px-10 w-full'>
      <TitleOwner title="ManageCars" subTitle="View all listed cars, update their details
      or remove them from the booking platform "/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border
      border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm
        text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
               <th className='p-3 font-medium'>Car</th>
               <th className='p-3 font-medium max-md:hidden'>Category</th>
               <th className='p-3 font-medium'>Price</th>
               <th className='p-3 font-medium max-md:hidden'>Status</th>
               <th className='p-3 font-medium'>Actions</th>

            </tr>
          </thead>
          <tbody>
            {cars.map((car,index)=>(
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={car.image} className='h-12 w-12 aspect-square rounded-md
                  object-cover' alt="" />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{car.brand} {car.model}</p>
                    <p className='font-medium'>{car.seating_capacity} · {car.transmission}</p>
                  </div>
                </td>
                <td className='p-3 max-md:hidden'>
                  {car.category}
                </td>
                <td className='p-3'>
                 {currency} {car.pricePerDay} /day
                </td>
                <td className='p-3 max-md:hidden'>
                 <span className={`px-3 py-1 rounded-full text-sm ${
                  car.isAvaliable ? 'bg-green-100 text-green-500':'bg-red-100 text-red-500'
                 }`}>
                  {car.isAvaliable ? "Avaliable" :"Unavaliable"}
                 </span>
                </td>

                <td className='p-3 flex items-center'>
                  <img src={car.isAvaliable ? assets.eye_close_icon :assets.eye_icon} alt="" 
                  className='cursor-pointer'/>
                  <img onClick={()=>deleteCar()} src={assets.delete_icon} alt="" 
                  className='cursor-pointer'/>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars
