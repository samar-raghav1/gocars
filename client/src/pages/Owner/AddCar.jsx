import React, { useState } from 'react'
import TitleOwner from '../../components/owner/TitleOwner'
import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const AddCar = () => {
  const {currency,axios }= useAppContext();
  const [image,setImage]= useState('');
  const [car,setCar]= useState('');
  const [isLoading,setIsLoading]=useState(false);
  // eslint-disable-next-line no-unused-vars
  const [data,setData]=useState({
    brand:'',
    model:'',
    year:0,
    pricePerDay:0,
    category:'',
    transmission:'',
    fuel_type:'',
    seating_capacity:0,
    location:'',
    description:''

  });

  const onSubmitHandler=async(e)=>{
  
     e.preventDefault();
     if(isLoading){
      return null;
     }
     setIsLoading(true);
   try {
    const formData=new FormData();
    formData.append('image',image);
    formData.append('carData',JSON.stringify(car))
    const {data}=await axios.post('/api/owner/add-car',formData);
     if(data.success){
      toast.success(data.message)
      setImage(null)
      setCar({
        brand:'',
        model:'',
        year:0,
        pricePerDay:0,
        category:'',
        transmission:'',
        fuel_type:'',
        seating_capacity:0,
        location:'',
        description:''
      })
     }
     else{
      
      toast.error(data.message)
     }
   } catch (error) {
    console.log(error);
    
    toast.error(error.message)
   }finally{
    setIsLoading(false)
  }

  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <TitleOwner title="Owner AddCar" subTitle="Add your car " />

      <form onSubmit={onSubmitHandler} 
      className=' flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image" >
            <img src={image ? URL.createObjectURL(image): assets.upload_icon} alt=""
            className='h-14 rounded cursor-pointer'/>
            <input type="file"  id="car-image"  accept='image/*' hidden onChange={(e)=>setImage(e.target.files[0])}/>
          </label>
              <p className='text-sm text-gray-500'>upload a picture of your car</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
              <label>Brand</label>
              <input type="text" placeholder='e.g. BMW, Mercedes, Audi ... ' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none
              ' value={car.brand} onChange={(e)=>setCar({...car,brand:e.target.value})}/>
          </div>
          <div className='flex flex-col w-full'>
              <label>Model</label>
              <input type="text" placeholder=' eg. X5,E-Class, ...' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none
              ' value={car.model} onChange={(e)=>setCar({...car,model:e.target.value})}/>
          </div>

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
            <div className='flex flex-col w-full'>
              <label>Year</label>
              <input type="number" placeholder='YYYY'  required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none
              ' value={car.year} onChange={(e)=>setCar({...car,year:e.target.value})}/>
          </div>
            <div className='flex flex-col w-full'>
              <label>Daily Price {currency}</label>
              <input type="number" placeholder='0'  required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none
              ' value={car.pricePerDay} onChange={(e)=>setCar({...car,pricePerDay:e.target.value})}/>
          </div>
            <div className='flex flex-col w-full'>
              <label>Category</label>
              <select value={car.category} onChange={e=>setCar({...car , category:e.target.value})}
                className='px-3 py-3 mt-1 border-borderColor border rounded-md outline-none'>
                <option value="">Select a category</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
              </select>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 '>
          <div className='flex flex-col w-full'>
              <label>Transmission</label>
              <select value={car.transmission} onChange={e=>setCar({...car , transmission:e.target.value})}
                className='px-3 py-3 mt-1 border-borderColor border rounded-md outline-none'>
                <option value="">Select a transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
          </div>
          <div className='flex flex-col w-full'>
              <label>Fuel Type</label>
              <select value={car.fuel_type} onChange={e=>setCar({...car , fuel_type:e.target.value})}
                className='px-3 py-3 mt-1 border-borderColor border rounded-md outline-none'>
                <option value="">Select a Fuel type</option>
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
          </div>
          <div className='flex flex-col w-full'>
              <label>Seating Capacity</label>
              <input type="number" placeholder='0'  required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none
              ' value={car.seating_capacity} onChange={(e)=>setCar({...car,seating_capacity:e.target.value})}/>
          </div>

        </div>

        <div className='flex flex-col w-full'>
              <label>Location</label>
              <input  value={car.location} onChange={e=>setCar({...car , location:e.target.value})}
                className='px-3 py-3 mt-1 border-borderColor border rounded-md outline-none' 
                placeholder='eg.Delhi' />

        </div>

        <div className='flex flex-col w-full'>
              <label>Description</label>
              <input  value={car.description} onChange={e=>setCar({...car , description:e.target.value})}
                className='px-3 py-3 mt-1 border-borderColor border rounded-md outline-none' 
                placeholder='about your car' />
        </div>

        <button type='submit' className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary
        text-white rounded-md font-medium w-max cursor-pointer  '>
         <img src={assets.tick_icon} alt="" />{isLoading ? 'Listing...':' List your car'}
        </button>
      </form>
    </div>
  )
}

export default AddCar
