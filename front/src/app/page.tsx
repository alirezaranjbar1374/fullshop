"use client"
import { useState } from "react";

export default function Home() {
  const [ali,setAli]=useState("ali")
  return (
   <div>
   {ali}
   </div>
  );
}
