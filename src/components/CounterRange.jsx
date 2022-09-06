import React,{useState,useEffect} from 'react'
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';

const CounterRange = ({min_range,max_range,id}) => {

  const [minVal,setMinVal] = useState()
  const [maxVal,setMaxVal] = useState()

  const {authTokens} = useAuth()


  const handleIncreaseMinVal = () =>{
    /*
    minval always less or equal than maxval
     */
    setMinVal(curval => {
        if(curval+1 <= maxVal){
            return curval+1;
        }
        return curval;
    })
  }

  const handleDecreaseMinVal = () =>{
    /*
    minval always bigger or equal to 0
     */
    setMinVal(curval => {
        if(curval-1 >= 0){
            return curval-1;
        }
        return curval;
    })   
  }

  const handleIncreaseMaxVal = () =>{
    setMaxVal(curval => curval+1)
  }

  const handleDecreaseMaxVal = () =>{
    /*
    maxval always bigger or equal than minval
    maxval always bigger or equal to 0
     */
    setMaxVal(curval => {
        if(curval-1 >= 0){
            if(curval-1 >= minVal){
                return curval - 1;
            }
        }
        return curval;
    })   
  }

  const update = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/SensorTypeRange/update/${id}/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${authTokens.token}`
        },
        body:JSON.stringify({
            "min_range": minVal,
            "max_range": maxVal
        })
    })
    const data = await response.json()
    if(response.status === 200){
        setMinVal(data.data.min_range)
        setMaxVal(data.data.max_range)
        toast.success("updata sucssesfuly")
    }else{
        toast.error("fail to updata try later !!!")
    }

  }

  useEffect(()=>{
    setMinVal(min_range)
    setMaxVal(max_range)
  },[])

  return (
    <>
        <Div>
            <div className='container'>
                <h3>min value</h3>
                <div className='Inline'>
                    <Btn onClick={handleIncreaseMinVal}>+</Btn>
                    <h4>{minVal}</h4>
                    <Btn onClick={handleDecreaseMinVal}>-</Btn>
                </div>
            </div>

            <div className='container'>
                <h3>max value</h3>
                <div className='Inline'>
                    <Btn onClick={handleIncreaseMaxVal}>+</Btn>
                    <h4>{maxVal}</h4>
                    <Btn onClick={handleDecreaseMaxVal}>-</Btn>
                </div>
            </div>

            
        </Div>
        <Btn onClick={() => update(id)}>save</Btn>
        <ToastContainer 
             position="bottom-center"
        />
    </>
    
  )
}

export default CounterRange

const Div = styled.div`

    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .container{
        .Inline{
            display: inline-block;
            background-color: #697A21;
            padding: 0.3rem;
        }
    }

  
`;

const Btn = styled.button`

  background-color: #676666;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  cursor: pointer;
  display: block;
  font-size: 14px;
  margin: 0;
  outline: 0;
  padding: 6px 14px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  transition-duration: 0.4s;


&:hover {
  background-color: #697a21;
  text-decoration: none;
  color: black;
  
}

`;

