"use client";

import { ClipLoader } from "react-spinners";



const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
     <ClipLoader color="#3498db" size={50} />
    </div>
   );
}

export default Loading;
