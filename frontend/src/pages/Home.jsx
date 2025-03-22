import React, { useState } from 'react'
import Outputs from './Outputs';

function Home() {

const [file1, setFile1] = useState(null)
const [file2, setFile2] = useState(null)
const [file3, setFile3] = useState(null)

const [submitted, setSubmitted] = useState(false)


async function handleSubmit(e){

  const formdata = new FormData()

  // if (!file1 || !file2 || !file3) {
  //   return alert("Please upload all files")
  // }

  if (!file1) {
    return alert("Please upload all files") 
  }


  formdata.append('file1', file1)
  // formdata.append('file2',file2)
  // formdata.append('file3',file3)

  const r1 = await fetch('/api/upload', {
    method : 'POST',
    body : formdata
  })
  const data = await r1.json()

  console.log(data);
  
    
console.log(file1);
  setSubmitted(true)
}


  return (
    <>
    
    <div className="detailsform">
        <input type="text" />

        <span className='myspan'>
            <p>Balance sheet</p>
            <input type="file" onChange={(e)=>setFile1(e.target.files[0])}/>
        </span>

        <span className='myspan'>
            <p>Profit and Loss statement</p>
            <input type="file" onChange={(e)=>setFile2(e.target.files[0])}/>
        </span>

        <span className='myspan'>
            <p>Cash flow</p>
            <input type="file" onChange={(e)=>setFile3(e.target.files[0])}/>
        </span>
    
    <button onClick={(e)=>handleSubmit(e)}>Submit</button>
    </div>

    {
      submitted && 
      <div className="outputs">
        <Outputs/>
        <Outputs/>
        <Outputs/>
      </div>
    }
    </>
  )
}

export default Home