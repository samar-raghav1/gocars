import React from 'react'
import Hero from '../components/Hero'
import FeaturedVehicles from '../components/FeaturedVehicles'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedVehicles/>
      <Banner/>
      <Testimonial/>
      <NewsLetter/>
     
    </div>
  )
}

export default Home
