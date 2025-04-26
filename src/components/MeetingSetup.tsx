import { useCall } from '@stream-io/video-react-sdk';
import React from 'react'

function MeetingSetup({onSetupComplete}: { onSetupComplete: () => void }) {

    const call =useCall();
    if (!call) return null;
    const handleJoin = async() => {
        
        await call.join();
        onSetupComplete();
    }
  return (
    <div>
      
    </div>
  )
}

export default MeetingSetup
