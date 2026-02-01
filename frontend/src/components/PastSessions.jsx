import React from 'react'
import {Clock} from "lucide-react"
import SessionCard from './SessionCard';
const PastSessions = () => {
  return <div className="mx-15 mt-10 border p-4  border-green-700 rounded-xl">
    {/* header */}
    <div className="flex items-center gap-3">
      <div className="p-2 border rounded-lg bg-linear-to-br from-teal-500 to-emerald-500 border-emerald-600"><Clock/></div>
      <div className='text-xl font-bold'>My Past Sessions</div>
    </div>

    <div className="mt-5 grid grid-cols-3 gap-3">
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
      <SessionCard/>
    </div>
  </div>;
}

export default PastSessions
