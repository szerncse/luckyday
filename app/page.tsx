'use client'
import { InvalidEvent, useState } from 'react'
import Image from 'next/image'

interface contentInter {
  name: string;
  desc : string;
  keyword ?: string;
  index ?: string
}
interface today{
  title: string;
  date: string;
  content: contentInter[]

}


export default function Home() {
const [gender, setGender] = useState<string>("");
const [birthDate, setBirthDate] = useState<string>("");
const [month ,setMonth] = useState<string>("1"); 
const [time, setTime] = useState<string>(""); 

const [resultToday, setResultToday] = useState<today | null>(null); 
const [resultTomorrow, setResultTomorrow] = useState(null); 
const [resultMonth, setResultMonth] = useState(null);


const fetchData = async () =>{
  const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}&time=${time}`);
  const data = await res.json();
  setResultToday(data.result.day);
  setResultTomorrow(data.result.tomorrow);
  setResultMonth(data.result.month)

  console.log(data)
}

const birthChange = ((e: React.ChangeEvent<HTMLInputElement>)=>{
  const value = e.target.value;
  if(value.length <= 8 && /^[0-9]*$/.test(value)){
    setBirthDate(value)
  }
})


  return (

  <>
  <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
  
{/* <Image width={300} height={300} className='mb-5 mt-5' src="/Images/sky.png" alt="하늘"  /> */}
  <div className='border-2 bg-[#DDF2FF]] border-blue-500 p-8 rounded-md shadow-lg space-y-4'>
 
  <div className="flex items-center space-x-4">
    <span className="font-bold">성별</span>
    <button  className={`px-2 py-1 text-white rounded-md ${gender === "m" ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"}`} onClick={()=> setGender("m")}>남자</button>
    <button  className={`px-2 py-1 text-white rounded-md ${gender === "f" ? "bg-blue-500" : "bg-blue-400 hover:bg-blue-500"}`} onClick={()=> setGender("f")}>여자</button>
  </div>

  <div className="flex items-center space-x-4">
    <span className="font-bold">생년월일</span>
    <input className="border-2 border-blue-500 rounded-md p-1" type="text" onChange={birthChange}  value={birthDate} placeholder='생년월일(8자리)' />
  </div>

  <div className="flex items-center space-x-4">
    <span className="font-bold">달</span>
    <select className="border-2 border-blue-500 rounded-md p-1" value={month} onChange={(e)=> setMonth(e.target.value)}>
      <option value="1">양력</option>
      <option value="2">음력 평달</option>
      <option value="3">음력 윤달</option>
    </select>
  </div>

  <div className="flex items-center space-x-4">
    <span className="font-bold">시간</span>
    <select className="border-2 border-blue-500 rounded-md p-1" value={time} onChange={(e)=> setTime(e.target.value)}>
      <option value="">모름</option>
      <option value="0">23:30 ~ 01:29</option>
      <option value="1">01:30 ~ 03:29</option>
      <option value="2">03:30 ~ 05:29</option>
      <option value="3">05:30 ~ 07:29</option>
      <option value="4">07:30 ~ 09:29</option>
      <option value="5">09:30 ~ 11:29</option>
      <option value="6">11:30 ~ 13:29</option>
      <option value="7">13:30 ~ 15:29</option>
      <option value="8">15:30 ~ 17:29</option>
      <option value="9">17:30 ~ 19:29</option>
      <option value="10">19:30 ~ 21:29</option>
      <option value="11">21:30 ~ 23:29</option>
    </select>
  </div>
  <button type="button" className="text-white bg-blue-400 hover:bg-blue-500  focus:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" onClick={fetchData}>확인</button>

  <div>
    {/* <p className="font-bold">성별 : {gender}</p>
    <p className="font-bold">생년월일 : {birthDate}</p>
    <p className="font-bold">달: {month}</p>
    <p className="font-bold">시간: {time}</p> */}
    
    
  {resultToday && (
    <>
      <h2 className="font-bold text-2xl">{resultToday.title}</h2>
      <p>{resultToday.date}</p>
      {resultToday.content.map((item, idx) => (
        <div key={idx}>
          <h3 className='text-bold text-lg'>{item.name}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
     </>
    )}
    </div>
  </div>
</div>

  </>
  )
}
