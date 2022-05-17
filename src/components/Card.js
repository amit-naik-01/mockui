

function Card({firstname, middlename, lastname, img, mail}){


    return(
        <div style={{border: "solid",borderColor:"grey",borderWidth: "1px", paddingBottom:"10px",width: "50%", textAlign: "center", borderRadius: "20px", margin: "20px"}}>
        <p style={{ fontWeight: "bold" }}>{firstname} {middlename} {lastname}</p>
        {/*<img src={img} layout="fill" alt="" />*/}
        <a href="https://www.gmail.com">{mail}</a>
        </div>
    )

}

export default Card;