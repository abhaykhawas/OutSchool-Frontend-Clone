import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import HeroSection from '../Components/HeroSection/HeroSection'
import HeroSectionFooter from '../Components/HeroSection/HeroSectionFooter'

function Home() {
  return (
    <div>
      <div className='shadow-custom-soft'>
        <Navbar/>
      </div>
      <div className='h-[75vh] hero-background relative'>
        <div className='h-full'>
          <img src="https://outschool.com/_next/static/media/home_hero_top_left.b132f55a.svg" alt="" className='absolute w-10' />
          <img src="https://outschool.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome_hero_bottom_left.c207601d.webp&w=256&q=75" alt="" className='absolute bottom-0 left-0'/>
          <HeroSection/>
          <HeroSectionFooter/>
        </div>
      </div>
        
    </div>
  )
}

export default Home