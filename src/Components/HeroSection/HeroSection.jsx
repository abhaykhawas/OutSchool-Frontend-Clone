import React from 'react'
import TrustPilotReview from '../../assets/TrustPilotReview.png'

function HeroSection() {
  return (
    <div className='h-full px-4 sm:px-6 md:px-8 lg:px-30 xl:px-40'>
    <div className='h-full flex flex-col-reverse sm:flex-row justify-center items-center px-1 sm:px-2 md:px-4 lg:px-10 xl:px-20'>
        <div className="left-hero-section md:text-left text-center w-1/2 mb-35">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Expert educators and tutors<br />
                for your future <span className="text-purple-600">architect.</span>
            </h1>
            <br />
            <button
                className="bg-[#4b01d4] hover:bg-[#380596] text-white font-bold py-2 px-6 rounded-full transition duration-200 cursor-pointer"
                >
                Get Started
            </button>
            <img src={TrustPilotReview} alt="" className='md:w-3/4 w-full mt-5'/>     
        </div>
        <div className="right-hero-section w-1/2">
            <img src="https://images.ctfassets.net/ucy64xj66ql7/5tGVHhcNCTTUmiGTD1lDrJ/8a23423ef1958df2d1de79e068bf8ae9/Property_1_artist.png?w=1080&q=75&fm=webp" className='w-2xl' alt="" />
        </div>
    </div>
    </div>
  )
}

export default HeroSection