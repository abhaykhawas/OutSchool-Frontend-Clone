import React from 'react'
import DropDownImg from '../../../assets/downarrow.svg'
import { useNavigate, useLocation } from 'react-router'


function DropDown() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
    <div className={location.pathname=='/' ? "relative hidden sm:block text-left group w-2xs hover:bg-[#38059615] mx-1 rounded-4xl": "hidden"}>
      <div className="cursor-pointer buttonContainer flex justify-center items-center flex-row flex-wrap">
        <button className=" cursor-pointer bg-transparent text-[#4B01D4] px-4 py-2 rounded font-bold text-[16px]" onClick={() => navigate('/online-class')}>
                Browse 
        </button>
        <img src={DropDownImg} alt="" className=''/>
      </div>
    

      {/* Dropdown Panel */}
      <div className="absolute left-0 top-full mt-0 w-48 bg-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-10">
        <ul className="py-1">
          {/* Option 1 */}
          <li className="relative hover:bg-[#4B01D415] px-4 py-2 cursor-pointer group/option1">
            <span className="block">Coding & Tech</span>

            {/* Submenu A, B, C */}
            <div className="absolute left-full top-[-5px] w-40 bg-white rounded shadow-lg opacity-0 invisible group-hover/option1:visible group-hover/option1:opacity-100 transition duration-200 z-20">
              <ul className="py-1">
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Coding+%26+Tech&grades=1`)}>Grade 1</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Coding+%26+Tech&grades=2`)}>Grade 2</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Coding+%26+Tech&grades=3`)}>Grade 3</a></li>
              </ul>
            </div>
          </li>

          {/* Option 2 */}
          <li className="relative hover:bg-[#4B01D415] px-4 py-2 cursor-pointer group/option2">
            <span className="block">Math</span>

            {/* Submenu D, E, F */}
            <div className="absolute left-full top-[-45px] w-40 bg-white rounded shadow-lg opacity-0 invisible group-hover/option2:visible group-hover/option2:opacity-100 transition duration-200 z-20">
              <ul className="py-1">
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Math&grades=1`)}>Grade 1</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Math&grades=2`)}>Grade 2</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Math&grades=3`)}>Grade 3</a></li>
              </ul>
            </div>
          </li>

          {/* Option 3 */}
          <li className="relative hover:bg-[#4B01D415] px-4 py-2 cursor-pointer group/option3">
            <span className="block">Art</span>

            {/* Submenu G, H, I */}
            <div className="absolute left-full top-[-85px] w-40 bg-white rounded shadow-lg opacity-0 invisible group-hover/option3:visible group-hover/option3:opacity-100 transition duration-200 z-20">
              <ul className="py-1">
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Arts&grades=1`)}>Grade 1</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Arts&grades=2`)}>Grade 2</a></li>
                <li className="hover:bg-[#4B01D415] px-4 py-2"><a onClick={() => navigate(`/online-class?categories=Arts&grades=3`)}>Grade 3</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    {/* <SidebarNavigation/> */}
    </>
  )
}

export default DropDown