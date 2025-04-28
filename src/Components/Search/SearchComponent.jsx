import { useEffect, useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, ArrowUpDown, BookmarkIcon } from 'lucide-react';
import courses from '../../assets/data'
import CourseCard from './CourseCard';
import { useSearchParams, useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';

export default function SearchAndFilter() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [activeFilter, setActiveFilter] = useState(null);
    const [ageSelections, setAgeSelections] = useState([]);
    const [gradeSelections, setGradeSelections] = useState([]);
    const [subjectSelections, setSubjectSelections] = useState([]);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        let q = searchParams.get("q");
        let age = searchParams.get('age');
        let grade = searchParams.get('grade');
        let subject = searchParams.get('subject');

        if (q){
            setSearch(q)
        }
        if (age){
            setAgeSelections(age.split(',').map(Number))
        }
        if (grade) {
            setGradeSelections(grade.split(',').map(Number))
        }
        if (subject) {
            setSubjectSelections(subject.split(',').map(Number))
        }

        if(!q && !age && !grade && !subject){
            setData(courses)
        }
        else{
            q = q || "";
            age = age ? age.split(',').map(Number) : [];
            grade = grade ? grade.split(',').map(Number) : [];
            subject = subject ? subject.split(',').map(Number) : [];
            let newData = filterCourses(courses, {
                keyword: q, 
                ages: age, 
                grades: grade, 
                subjects: subject
            })
            setData(newData)
        }
    }, [])



    const handleFilterClick = (filter) => {
        if (activeFilter === filter) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filter);
        }
    };

    const handleAgeChange = (age) => {
    if (ageSelections.includes(age)) {
        setAgeSelections(ageSelections.filter(item => item !== age));
    } else {
        setAgeSelections([...ageSelections, age]);
    }
    };

    const handleGradeChange = (grade) => {
        if (gradeSelections.includes(grade)) {
            setGradeSelections(gradeSelections.filter(item => item !== grade));
        } else {
            setGradeSelections([...gradeSelections, grade]);
        }
    };

    const handleSubjectChange = (subject) => {
    if (subjectSelections.includes(subject)) {
        setSubjectSelections(subjectSelections.filter(item => item !== subject));
    } else {
        setSubjectSelections([...subjectSelections, subject]);
    }
    };

    const handleReset = () => {
        setAgeSelections([]);
        setGradeSelections([]);
        setSubjectSelections([]);
        setActiveFilter(null);
        setSearch('')
        navigate('')
        setData(courses)
    };

    // Generate age range from 3 to 18
    const ages = Array.from({ length: 16 }, (_, i) => i + 3);

    // Generate grades from 1st to 12th
    const grades = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    let suffix = 'th';
    if (num === 1) suffix = 'st';
    if (num === 2) suffix = 'nd';
    if (num === 3) suffix = 'rd';
    return num;
    });

    // Subjects list
    const subjects = ['Arts', 'Coding & Tech', 'English', 'Math'];


    function filterCourses(courses, { keyword, ages, grades, subjects }) {
        return courses.filter(course => {
            const matchesKeyword = keyword
                ? course["course-name"].toLowerCase().includes(keyword.toLowerCase()) ||
                  course["course-description"].toLowerCase().includes(keyword.toLowerCase())
                : true;
    
            const matchesAges = ages?.length
                ? course["age-group"].some(age => ages.includes(age))
                : true;
    
            const matchesGrades = grades?.length
                ? course["grade-group"].some(grade => grades.includes(grade))
                : true;
    
            const matchesSubjects = subjects?.length
                ? subjects.some(subject => course.subject.toLowerCase() === subject.toLowerCase())
                : true;
    
            return matchesKeyword && matchesAges && matchesGrades && matchesSubjects;
        });
    }


    function handleSearch(){
        if (search == '' && ageSelections == [] && gradeSelections == [] && subjectSelections == []){
            setData(courses)
            return
        }
        setActiveFilter(null)
        
        const newParams = new URLSearchParams();
        if (search !== ''){
            newParams.set('q', search); 
        }
        if (ageSelections.length !== 0){
            newParams.set('age', ageSelections.toString())
        }
        if (gradeSelections.length !== 0){
            newParams.set('grade', gradeSelections.toString())
        }
        if (subjectSelections.length !== 0){
            newParams.set('subject', subjectSelections.toString())
        }
        
        navigate(`?${newParams.toString()}`);
        const dataCourse = filterCourses(courses, {
            keyword: search,
            ages: ageSelections,
            grades: gradeSelections,
            subjects: subjectSelections
        })
        setData(dataCourse)
    }

    return (
    <>
    <Navbar/>
    <div className="bg-blue-50 p-4 w-full">
        <div className='px-0 md:px-24'>
            {/* Search Bar */}
            <div className="flex items-center justify-between mb-4 max-w-full">
            <div className="flex-grow relative flex items-center bg-white rounded-full shadow-sm overflow-hidden">
                <div className="pl-4">
                <Search size={20} className="text-gray-500" />
                </div>
                <input 
                type="text" 
                placeholder="Any topic or teacher" 
                className="w-full py-3 px-4 focus:outline-none text-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <button className="ml-2 bg-[#4B01D4] text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition" onClick={handleSearch}>
                Search
            </button>
            </div>
            
            {/* Filter Options */}
            <div className="flex items-center flex-wrap gap-2">
            {/* Age Filter */}
            <div className="relative">
                <button 
                className={`flex items-center px-4 py-2 rounded-full border ${
                    ageSelections.length === 0
                    ? (activeFilter === 'age'
                        ? 'border-[#4B01D455] bg-[#4B01D405]'
                        : 'border-gray-300 bg-white')
                    : (activeFilter === 'age'
                        ? 'border-[#4B01D455] bg-[#4B01D405]'
                        : 'border-gray-300 bg-[#4B01D4] text-white')
                }`}
                
                onClick={() => handleFilterClick('age')}
                >
                <span className="mr-2">Age</span>
                <ChevronDown size={16} />
                </button>
                
                {activeFilter === 'age' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 w-64">
                    <h3 className="font-bold text-gray-800 mb-3">Learner age</h3>
                    <div className="grid grid-cols-4 gap-2">
                    {ages.map(age => (
                        <div key={age} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`age-${age}`}
                            checked={ageSelections.includes(age)}
                            onChange={() => handleAgeChange(age)}
                            className="mr-2 h-5 w-5 rounded border-gray-300"
                        />
                        <label htmlFor={`age-${age}`} className="text-gray-700">{age}</label>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
            
            {/* Grade Filter */}
            <div className="relative">
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
            
            {/* Subject Filter */}
            <div className="relative">
                <button 
                className={`flex items-center px-4 py-2 rounded-full border ${
                    subjectSelections.length === 0
                    ? (activeFilter === 'age'
                        ? 'border-[#4B01D455] bg-[#4B01D405]'
                        : 'border-gray-300 bg-white')
                    : (activeFilter === 'age'
                        ? 'border-[#4B01D455] bg-[#4B01D405]'
                        : 'border-gray-300 bg-[#4B01D4] text-white')
                }`}
                onClick={() => handleFilterClick('subject')}
                >
                <span className="mr-2">Subject</span>
                <ChevronDown size={16} />
                </button>
                
                {activeFilter === 'subject' && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-10 w-64">
                    <h3 className="font-bold text-gray-800 mb-3">Subject area</h3>
                    <div className="flex flex-col gap-2">
                    {subjects.map(subject => (
                        <div key={subject} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`subject-${subject}`}
                            checked={subjectSelections.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            className="mr-2 h-5 w-5 rounded border-gray-300"
                        />
                        <label htmlFor={`subject-${subject}`} className="text-gray-700">{subject}</label>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>
            
            {/* Filter Icon */}
            {/* <button className="px-3 py-2 rounded-full border border-gray-300 bg-white">
                <SlidersHorizontal size={20} className="text-gray-700" />
            </button> */}
            
            {/* Reset Button */}
            <button 
                className="px-4 py-2 text-gray-700 hover:text-[#4B01D4]"
                onClick={handleReset}
            >
                Reset
            </button>
            
            {/* Spacer for right-aligned buttons */}
            {/* <div className="flex-grow"></div> */}
            
            {/* Sort and Bookmark Buttons */}
            {/* <button className="p-3 rounded-full border border-gray-300 bg-white">
                <ArrowUpDown size={20} className="text-gray-700" />
            </button> */}
            
            {/* <button className="p-3 rounded-full border border-gray-300 bg-white">
                <BookmarkIcon size={20} className="text-gray-700" />
            </button> */}
            </div>
        </div>
    </div>
    {
        data.map((e,i) => {
            return (
                <CourseCard course={e} key={i}/>
            )
        })
    }

    
    </>
    );
}