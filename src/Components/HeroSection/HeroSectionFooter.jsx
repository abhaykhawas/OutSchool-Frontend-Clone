import { Video, Award, CheckSquare, Users } from 'lucide-react';

export default function HeroSectionFooter() {
  return (
    <div className="w-full bg-blue-50 py-4 px-4 min-h-[16vh] flex justify-center items-center">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Live video chat classes */}
          <div className="flex items-center justify-center md:justify-center">
            <div className="bg-red-100 p-2 rounded-md mr-3">
              <Video size={24} className="text-red-500" />
            </div>
            <span className="font-medium text-gray-800">Live video chat classes</span>
          </div>
          
          {/* World class teachers */}
          <div className="flex items-center justify-center md:justify-center">
            <div className="bg-yellow-100 p-2 rounded-md mr-3">
              <Award size={24} className="text-yellow-500" />
            </div>
            <span className="font-medium text-gray-800">World class teachers</span>
          </div>
          
          {/* Flexible learning options */}
          <div className="flex items-center justify-center md:justify-center">
            <div className="bg-green-100 p-2 rounded-md mr-3">
              <CheckSquare size={24} className="text-green-500" />
            </div>
            <span className="font-medium text-gray-800">Flexible learning options</span>
          </div>
          
          {/* Learners ages 3 - 18 */}
          <div className="flex items-center justify-center md:justify-center">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <Users size={24} className="text-blue-500" />
            </div>
            <span className="font-medium text-gray-800">Learners ages 3 - 18</span>
          </div>
        </div>
      </div>
    </div>
  );
}