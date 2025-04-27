import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router'; // Note: it's 'react-router-dom', not 'react-router'
import courses from '../../assets/data';
import { ChevronDown } from 'lucide-react';

export default function OnlineClass() {
  const [activeFilter, setActiveFilter] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get initial filters from URL query parameters
  const initialCategories = searchParams.get('categories') ? searchParams.get('categories').split(',') : [];
  const initialGrades = searchParams.get('grades') ? searchParams.get('grades').split(',').map(Number) : [];
  
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [gradeSelections, setGradeSelections] = useState(initialGrades);
  
  const categories = ["Coding & Tech", "Math", "Arts", 'English', 'Music'];

  const grades = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    return num;
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    }
    
    if (gradeSelections.length > 0) {
      params.set('grades', gradeSelections.join(','));
    }
    
    // Update the URL without navigating
    setSearchParams(params);
  }, [selectedCategories, gradeSelections, setSearchParams]);

  const handleFilterClick = (filter) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleGradeChange = (grade) => {
    if (gradeSelections.includes(grade)) {
      setGradeSelections(gradeSelections.filter(item => item !== grade));
    } else {
      setGradeSelections([...gradeSelections, grade]);
    }
  };
  
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter courses based on both categories and grades
  const filteredCourses = courses.filter(course => {
    // Category filter
    const categoryMatch = selectedCategories.length === 0 || 
                         selectedCategories.includes(course.subject);
    
    // Grade filter
    const gradeMatch = gradeSelections.length === 0 || 
                      course["grade-group"].some(grade => gradeSelections.includes(grade));
    
    return categoryMatch && gradeMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore some of the top categories we have to offer</h1>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategories.includes(category) 
                ? 'bg-[#4B01D4] text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grade Filter */}
      <div className="relative mb-5">
            <button 
            className={`flex items-center px-4 py-2 rounded-full border ${
                gradeSelections.length === 0
                  ? (activeFilter === 'age'
                      ? 'border-[#4B01D455] bg-[#4B01D405]'
                      : 'border-gray-300 bg-white')
                  : (activeFilter === 'age'
                    ? 'border-[#4B01D455] bg-[#4B01D405]'
                    : 'border-gray-300 bg-[#4B01D4] text-white')
              }`}
            onClick={() => handleFilterClick('grade')}
            >
            <span className="mr-2">Grade</span>
            <ChevronDown size={16} />
            </button>
            
            {activeFilter === 'grade' && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 w-64">
                <h3 className="font-bold text-gray-800 mb-3">Learner grade</h3>
                <div className="grid grid-cols-4 gap-2">
                {grades.map(grade => (
                    <div key={grade} className="flex items-center">
                    <input
                        type="checkbox"
                        id={`grade-${grade}`}
                        checked={gradeSelections.includes(grade)}
                        onChange={() => handleGradeChange(grade)}
                        className="mr-2 h-5 w-5 rounded border-gray-300"
                    />
                    <label htmlFor={`grade-${grade}`} className="text-gray-700">{grade}</label>
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={course["course-image"]} 
                alt={course["course-name"]} 
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 text-purple-500 hover:text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex flex-col justify-between">
              <h3 className="font-bold text-lg mb-1">{course.subject}: {course["course-name"]}</h3>
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                <span className="ml-2 text-sm">{course.creator}</span>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm font-medium">{course["creator-rating"]}</span>
                  <span className="ml-1 text-sm text-gray-500">({course["creator-reviews"]})</span>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <div>
                  <span className="font-medium">Ages</span>
                  <p>{Math.min(...course["age-group"])}-{Math.max(...course["age-group"])}</p>
                </div>
                <div>
                  <span className="font-medium">Grades</span>
                  <p>{Math.min(...course["grade-group"])}-{Math.max(...course["grade-group"])}</p>
                </div>
                <div>
                  <span className="font-medium">Mins</span>
                  <p>{Math.round(course["class-duration-hr"] * 60)}</p>
                </div>
                <div>
                  <span className="font-medium">{course.currency === "USD" ? "$" : "₹"}{course["price-per-class"]}</span>
                  <p>Per class</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}