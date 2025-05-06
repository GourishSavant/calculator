import React from 'react';
import { Link } from 'react-router-dom'; // Ensure you're using react-router-dom for navigation
import { Button1 } from "../Utils/button.jsx";
function ErrorPage() {
  return (
    <div className="mt-24 text-center">
      <h1 className="text-4xl text-red-600">Something went wrong!</h1>
      
      <div className='pt-12'>
      <Link to="/">
         <Button1 variant="outline" className="text-blue-200 ">
                   GO HOME
                 </Button1>
      </Link>
      </div>
    
    </div>
  );
}

export default ErrorPage;
