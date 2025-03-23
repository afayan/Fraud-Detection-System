import React, { isValidElement, useState } from 'react'
import Outputs from './Outputs';

function Home() {

const [file1, setFile1] = useState(null)
const [submitted, setSubmitted] = useState(false)
const [fraudData, setFraudData] = useState(null)
const [totalTransactions, setTotalTransactions] = useState(0)
const [fraudulentTransactions, setFraudulentTransactions] = useState(0)
const [fraudPercentage, setFraudPercentage] = useState(0)
const [AIresponse, setAIResp] = useState('')

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
  setFraudData(data.data)
  
  // Calculate statistics
  if (data.data && data.data.predictions) {
    const predictions = data.data.predictions
    setTotalTransactions(predictions.length)
    const fraudCount = predictions.filter(p => p.predicted_isFraud === 1).length
    setFraudulentTransactions(fraudCount)
    setFraudPercentage(((fraudCount / predictions.length) * 100).toFixed(1))


    setAIResp(data?.ai)
  }
  
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
          <p>{totalTransactions}</p>
          <h4>Total Transactions</h4>
        </div>
        <div className='detailstop'>
          <p>{fraudulentTransactions}</p>
          <h4>Fraudulent Transactions</h4>
        </div>
        <div className='detailstop'>
          <p>{fraudPercentage}%</p>
          <h4>Fraud Percentage</h4>
        </div>

    </span>

    </div>
    

    <div className="middlerow">

      <div className='leftmiddle'>

        <span >
          <p>{totalTransactions} Total transactions</p>
          <p>{fraudulentTransactions} Fraud transactions</p>
        </span>
        
        <div className="circle">
            <h1>{fraudPercentage}%</h1>
            <p>Fraud percentage</p>
        </div>

      </div>

      <Outputs fraudData={fraudData}/>
    </div>

    <div className="lastrow">
      <h3>AI response</h3>
      <p className="reply">{AIresponse}</p>
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