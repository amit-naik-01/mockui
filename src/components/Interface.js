
import { useState } from "react";
import Card from "./Card.js";

 
function Interface(){

const [data,setData] = useState([]);

 const handleClick = () => {
 fetch("https://61dddb4af60e8f0017668ac5.mockapi.io/api/v1/Users")
.then(res => res.json())
.then(json => setData(json));
}
return(
    <>
      <div style={{display: "flex", alignItems: "center", justifyContent:"center",marginTop:"10px",}}>
       <button style={{ width: "12rem" ,padding:"8px 10px 8px 10px",borderWidth:"1px",borderRadius:"10px" }} onClick={handleClick} >Get Data</button>
      </div>


      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center", }}>
      {data.map((item) => (
        <Card key = {item.id} 
        firstname = {item.first_name}
        middlename= {item.middle_name}
        lastname={item.last_name} 
        img={item.avatar}
        mail={item.email}
         />
      ))}
      </div>
    </> 
)
}


export default Interface;