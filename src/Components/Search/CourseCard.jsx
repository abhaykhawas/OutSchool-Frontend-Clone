import { Search, ChevronDown, Heart, User, Clock, Users } from 'lucide-react';

function CourseCard({ course }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-2/3 m-auto my-2">
        <div className="flex flex-col md:flex-row">
          {/* Course Image */}
          <div className="md:w-1/4 relative">
            <img 
              src={course["course-image"]} 
              alt={course["course-name"]}
              className="w-full h-48 md:h-full object-cover"
            />
            {course["selling-fast"] && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                Selling fast
              </div>
            )}
          </div>
          
          {/* Course Information */}
          <div className="md:w-2/4 p-4 md:p-6 flex flex-col justify-between">
            <div className='flex flex-col justify-between h-full'>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{course["course-name"]}</h3>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart size={24} />
                </button>
              </div>
              
              <p className="mt-2 text-gray-600">{course["course-description"]}</p>
              
              <div className="mt-1 md:mt-4 flex items-center justify-between">
                <div className='flex items-center'>
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={course["creator-profile-pic"]} 
                      alt={course.creator}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{course.creator}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{course["creator-rating"]}</span>
                      <span className="ml-1 text-gray-500">({course["creator-reviews"]})</span>
                    </div>
                  </div>
                </div>
          
                <div className="text-right block relative md:hidden md:absolute">
                  <div className="text-2xl font-bold">{course.currency}{course["price-per-class"].toLocaleString()}</div>
                  <div className="text-gray-500">per class</div>
                </div>
              </div>
            </div>
            
            
          </div>
          
          {/* Course Details */}
          <div className="md:w-1/4 bg-gray-50 p-4 md:p-6 flex flex-col justify-between">
            <div className="text-right hidden absolute md:block md:relative">
              <div className="text-2xl font-bold">{course.currency}{course["price-per-class"].toLocaleString()}</div>
              <div className="text-gray-500">per class</div>
            </div>
            
            <div className="mt-4 space-y-2 flex flex-row justify-evenly items-center md:flex md:flex-col md:items-end">
              <div className="flex items-center justify-between">
                <div className="flex items-center ml-auto">
                  <Users size={18} className="text-gray-500 mr-2" />
                  <span>{course["class-type"]}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center ml-auto">
                  <User size={18} className="text-gray-500 mr-2" />
                  <span>Ages: {`${course["age-group"][0]}-${course["age-group"][course["age-group"].length - 1]}`}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center ml-auto">
                  <Clock size={18} className="text-gray-500 mr-2" />
                  <span>{course["class-frequency-per-week"]}, {course["class-duration-hr"]} hr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


export default CourseCard