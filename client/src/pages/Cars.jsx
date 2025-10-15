/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets} from '../assets/assets'
import CarCards from '../components/CarCards';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Cars = () => {
  const [input,setInput]=useState("");
  const [searchParams]=useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars,axios}=useAppContext();
  const isSearchData=pickupDate&&pickupLocation&&returnDate
  const [filteredCars,setFilteredCars]=useState([]);

  const applyFIlter=async()=>{
    if(input === ''){
      setFilteredCars(cars)
      return null
    }
    const filtered = cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)
  }

  const serachCarAvailability = async()=>{
    const {data}=await axios.post('/api/bookings/check-availability',
      {location:pickupDate , pickupLocation, returnDate}  )
      if(data.success){
        setFilteredCars(data.availableCars)
        if(data.availableCars.length === 0){
          toast("No car available")
          
        }
        return null
      }

  }
  useEffect(()=>{
    isSearchData && serachCarAvailability()
  },[])
  useEffect(()=>{
    cars.length >0 && !isSearchData && applyFIlter()
  },[input,cars])
  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
    <Title title="Available Cars" subTitle="Browse our selection of premium
    vehicles available for your next adventure." />

    <div className='flex items-center g-white px-4 mt-6 max-w-140 w-full h-12
    rounded-full shadow'>
      <img src={assets.search_icon} alt=""  className='w-4.5 h-.5 mr-2'/>
      <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Search by make, model, or features'
      className='w-full h-full outline-none text-gray-500' />
      <img src={assets.filter_icon} alt=""  className='w-4.5 h-.5 ml-2'/>
    </div>
      </div>


      <div className='px-6 md:px-16 xl:px-32 mt-10'>
        <p className='text-gray-500 px-20 max-w-7xl mx-auto'>Showing {filteredCars.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
        mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car,index)=>(
            <div key={index}>
              <CarCards car={car}/>

            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default Cars
