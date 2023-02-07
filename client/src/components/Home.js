import React from 'react'
import SlideNev from './SlideNev'
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Users from './user/User';



export default function Home() {
    
  return (
        <>  
        <Box sx={{display:'flex'}} m='1%' mt='5%'>
            <SlideNev/>
            <Users/>
            </Box>
        </>
  )
}
