
import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const[length,setlength]=useState(8);
  const [numberAllowed,setnumberAllowed]=useState(false);
  const [charAllowed,setcharAllowed]=useState(false);
  const [password,setpassword]=useState('');
  const passwordref=useRef(null);
 
  const handlenumber=()=> {
   numberAllowed? setnumberAllowed(false) : setnumberAllowed(true);
  }
  const handlechar=()=> {
    charAllowed? setcharAllowed(false): setcharAllowed(true);
  }
  const handlecopy=useCallback(()=> {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);
  const passwordGenerator= useCallback(()=>{
    let str="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    if(numberAllowed)
      str+="0123456789";
    if(charAllowed)
      str+="!@#$%^&*()-_=+|[]{};:/?.>";
    let pass='';
    for(let i=1;i<length;i++)
    {
      let index=Math.floor(Math.random()* str.length +1);
      pass+=str.charAt(index);
    }
    setpassword(pass);

  },[length,numberAllowed,charAllowed,setpassword]);
  useEffect(()=>{
     passwordGenerator()
  }
   
    ,[length,numberAllowed,charAllowed,passwordGenerator]);


  return (
    <div className="bg-gray-500 w-[550px] h-96 m-auto">
      <div>
        <h1 className="text-center font-bold text-white">Password Generator</h1>
        <input
          type="text"
          placeholder="Password" value={password}
          className="w-80 h-10 ml-20 mt-5 font-semibold" readOnly
          ref={passwordref}
        />
        <button onClick={handlecopy} className='bg-lime-800 text-white px-6 py-6 pt-2 pb-2'>Copy</button>
      </div>

      <div className='flex gap-5 ml-4 mt-6 pb-5 '>
        <input type="range" min="8" max="60" value={length} onChange={(e)=>{setlength(e.target.value)}}   />
        <p className='text-white'>Length: ({length}) </p>
       <input type="checkbox" defaultChecked={numberAllowed} onChange={handlenumber} /><p className='text-white inline' >Number </p>
       <input type="checkbox" defaultChecked={charAllowed} onChange={handlechar} />  <p className='text-white inline' >Special Characters </p>
      </div>
    </div>
  );
}

export default App;
