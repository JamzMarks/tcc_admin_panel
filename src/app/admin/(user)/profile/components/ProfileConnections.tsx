

import { SimpleSection } from '@/components/ui/sections/SimpleSection';
import { FaGoogle, FaGithub } from 'react-icons/fa';
export const ProfileConnections = ({
  googleConnected,
  githubConnected,
}: {
  googleConnected: boolean;
  githubConnected: boolean;
}) => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-2 gap-2 align-middle items-center'>
        <button className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-red-400">
          <FaGoogle className="text-red-500" />
          {googleConnected ? "Desvincular Google" : "Vincular Google"}
        </button>
        <p className='text-gray-500'>Vinculado data</p>
      </div>
      <div className='grid grid-cols-2 gap-2 align-middle items-center'>
        <button className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer bg-black text-white">
        <FaGithub className="text-white" />
        {githubConnected ? "Desvincular GitHub" : "Vincular GitHub"}
      </button>
        <p className='text-gray-500'>Vinculado data</p>
      </div>
      
      
    </div>
  );
};
