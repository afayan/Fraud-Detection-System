import React, { isValidElement, useState } from 'react'
import Outputs from './Outputs';

function Home() {

const [file1, setFile1] = useState(null)
const [file2, setFile2] = useState(null)
const [file3, setFile3] = useState(null)

const [submitted, setSubmitted] = useState(false)

function validateCSV(file) {
  if (!file) return false;
  const validMimeType = file.type === "text/csv";
  const validExtension = file.name.toLowerCase().endsWith(".csv");

  if (!validMimeType && !validExtension) {
    alert(`Invalid file: ${file.name}. Please upload a CSV file.`);
    return false;
  }
  return true;
}


async function handleSubmit(e){

  const formdata = new FormData()

  // if (!file1 || !file2 || !file3) {
  //   return alert("Please upload all files")
  // }

  if (!file1) {
    return alert("Please upload all files") 
  }

  if (!validateCSV(file1)) {
    return alert("CSV file required")
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

    <div className='toprow'>
    <div className="detailsform">

  
        <span className='myspan'>
            <p>Balance sheet</p>
            <input type="file" onChange={(e)=>setFile1(e.target.files[0])}/>
        </span>

        <button onClick={(e)=>handleSubmit(e)}>Submit</button>
   
    </div>

    
    <span className='detailstopcontainer'>
        <div className='detailstop'>
          <p>78</p>
        </div>
        <div className='detailstop'>
          <p>78</p>
        </div>
        <div className='detailstop'>
          <p>78</p>
        </div>

    </span>

    </div>
    

    <div className="middlerow">

      <div className='leftmiddle'>
        
        <div className="circle">

        </div>

      </div>

      <Outputs/>
    </div>

    <div className="lastrow">
      <h3>AI response</h3>
      <p className="reply">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus reiciendis neque, corporis voluptatibus sunt officiis pariatur veniam dolorem ipsam tempora?</p>
    </div>

    {
      // submitted && 
      // <div className="outputs">
      //   <Outputs/>
      //   <Outputs/>
      //   <Outputs/>
      // </div>
    }
    </>
  )
}

export default Home