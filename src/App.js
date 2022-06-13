import React from 'react';
import {useState, useEffect, useCallback} from 'react'
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";   

import { Card } from 'primereact/card';
import { Slider } from 'primereact/slider';
import { InputNumber } from 'primereact/inputnumber';
import { Chart } from 'primereact/chart';

 

function App() {

  const [principal, setPrincipal] = useState(3000000);
  const [interest, setInterest] = useState(9);
  const [tenure, setTenure] = useState(25);
  const [emi, setEmi] = useState(0);
  const [extraInterest, setExtraInterest] = useState(0)

  const [chartData, setChartData] = useState({
    labels: ['Principle', 'Interest Payable'],
    datasets: [
      {
        data: [300, 50],
        backgroundColor: [
            "#FF6384",
            "#36A2EB",
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
        ]
    }]
});

const [lightOptions] = useState({
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        }
    }
});

const EMIVal2 = useCallback( () => {
  let interest1 = interest/1200;
  let term = tenure*12;
  let top = Math.pow((1+interest1),term);
  let bottom = top - 1;
  let ratio = top/bottom;
  let EMI = principal * interest1 * ratio;
  let Total = EMI*term;
  const EMIObj = {
    EMI:EMI.toFixed(0),
    Total:Total.toFixed(0)
  };
  setEmi(EMI.toFixed(0));
  setExtraInterest(Total.toFixed(0) - principal)
  setChartData({
    labels: ['Principle', 'Interest Payable'],
    datasets: [
      {
        data: [principal, Total.toFixed(0) - principal],
        backgroundColor: [
            "#FF6384",
            "#36A2EB",
        ],
        hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
        ]
    }]
})
  // return JSON.stringify(EMIObj)
  
},[interest, principal, tenure])

  useEffect(() => {
    EMIVal2()
  
  }, [principal, tenure, interest, EMIVal2])
  

  



  return (
    <div className="App">
      <body style={{display:'flex', justifyContent:'center'}}>
        <Card title="Emi Calculator" style={{ width: '80rem', marginBottom: '2em'}}>
          <div style={{display:'flex', justifyContent:'space-between', flexDirection:'row' }}>
            <div style={{display:'flex', justifyContent:'center',flexDirection:'column', width:'40rem'}}>
              <div style={{ marginTop: '50px'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                  <p>Principal</p>
                  <InputNumber value={principal} onValueChange={(e) => setPrincipal(e.value)} mode="currency" currency="INR" locale="en-IN" min={0} max={50000000} minFractionDigits={0} />
                </div>
                <Slider value={principal} onChange={(e) => setPrincipal(e.value)} min={0} max={50000000} />
              </div>
              <div style={{ marginTop: '50px'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                  <p>Interest Rate</p>
                  <InputNumber value={interest} onValueChange={(e) => setInterest(e.value)} min={0} max={15} minFractionDigits={0} suffix={"%"}/>
                </div>
                <Slider value={interest} onChange={(e) => setInterest(e.value)} min={0} max={15} />
              </div>
              <div style={{ marginTop: '50px'}}>
                <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                  <p>LOAN TERM (Years)</p>
                  <InputNumber value={tenure} onValueChange={(e) => setTenure(e.value)} min={0} max={30} minFractionDigits={0} suffix={" Years"}/>
                </div>
                <Slider value={tenure} onChange={(e) => setTenure(e.value)} min={0} max={30} />
              </div>
            </div>
            <div style={{width:'30rem', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
              <Chart type="doughnut" data={chartData} options={lightOptions} style={{ position: 'relative', width: '50%' }} />
              <div style={{display:'flex', flexDirection:'row'}}>
                <div style={{border:'1px solid black', borderRadius: 10, padding: '5px', margin:'10px'}}>
                  <p>Monthly EMI</p>
                  <p>{emi.toLocaleString('EN-IN')} / Month</p>
                </div>
                <div style={{border:'1px solid black', borderRadius: 10, padding: '5px',  margin:'10px'}}>
                  <p>Principle</p>
                  <p>{principal.toLocaleString('EN-IN')}</p>
                </div>
                <div style={{border:'1px solid black', borderRadius: 10, padding: '5px',  margin:'10px'}}>
                  <p>Interest Payable</p>
                  <p>{extraInterest.toLocaleString('EN-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </body>
    </div>
  );
}

export default App;
