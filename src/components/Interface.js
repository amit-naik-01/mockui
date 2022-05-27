import { useState } from "react";
import * as React from 'react';
import { useEffect } from "react";
import { GridActionsCellItem,DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import moment from "moment";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useMemo,useCallback } from "react";
import FormDialog from "./FormDialog";





/* user-information modal styling */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  fontWeight: 'bold',
  transform: "translate(-50%, -50%)",
  height:350,
  width: 350,
  justifyContent:"center",
  bgcolor: 'background.paper',
  border: "1px solid #808080",
  boxShadow: 24,
  p: 4,
  'borderRadius':'10px',
};


const initialValue = { first_name:"",last_name:"", email:""}



function Interface() {
  const [data, setData] = useState(null);
  const apiUrl = "https://61dddb4af60e8f0017668ac5.mockapi.io/api/v1/Users";

  let [uData, setUserData] = useState({});                    /*onrowclick user information state*/
  const [formData,setFormData] =useState(initialValue);     /*add new user and edit user state */
                
  const [open, setOpen] = useState(false);                    /* info pop handle  */
  const handleClose = () => setOpen(false);
  
  
 
  /* for new user and edit user dialog handle */
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({})
  };


  /*getting data and storing in the json object*/
  const getUsers = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => setData(json))
  }
  
  
  
  useEffect(() => {
    getUsers()
  }, []);



  const columns = useMemo(
    (data) =>{ return [
      {
        field: 'actions',
        headerName:"Actions",
        type: 'actions',
        width: 140,
        align:'center',
        renderHeader: () => (<strong>{'Actions'}</strong>),
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
            />
            ,
            <GridActionsCellItem
            icon={<ModeEditRoundedIcon />}
            label="Edit"
            onClick={() => {handleUpdate(params)}}
          />,
        ],
      },
    { field: "first_name", headerName: "First Name", width: 200,renderHeader: () => (<strong>{'First Name'}</strong>),},
    { field: "last_name", headerName: "Last Name", width: 190,renderHeader: () => (<strong>{'Last Name'}</strong>),},
    { field: "email", headerName: "Mail", width: 250,renderHeader: () => (<strong>{'Mail'}</strong>),},
    { field: "city", headerName: "City", width: 200,renderHeader: () => (<strong>{'City'}</strong>),},
    { field: "zip", headerName: "Zip Code", width: 200 , renderHeader: () => (<strong>{'Zip'}</strong>),},
  ]});


  /* Tracking Input*/
  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value,id)
    setFormData({ ...formData, [id]: value });
  }


  /* DataGrid onRowClick onclick handle*/
  const handleOpen = (e) => {
    console.log(e); 
    setUserData({
    createdAt: e.row.createdAt,
    first_name: e.row.first_name,
    middle_name: e.row.middle_name,
    last_name: e.row.last_name,
    avatar: e.row.avatar,
    email: e.row.email,
    zip: e.row.zip,
    city: e.row.city,
    state: e.row.state,
    country: e.row.country,
    id: e.row.id
  })
  setOpen(true);
  };
  
  /*delete user with react-confirm popup */
  const deleteUser = useCallback(
    (id) => () => {
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {fetch(apiUrl+'/'+id,{method:"DELETE"}).then(resp => resp.json()).then(resp => getUsers())},
          },
          {
            label: 'No',
            onClick: () =>''
          }
        ]
      });
    },
    [],
  ); 

  


  
 /* handle onclick in edit button and open  */
  const handleUpdate = (oldData) => {
    setFormData({first_name: oldData.row.first_name,
      last_name: oldData.row.last_name,
      email: oldData.row.email,
      id: oldData.id});
    handleClickOpenDialog();
  } 


  /* on edit and on submit  */
  const handleFormSubmit = () => {
    if(formData.id){
      fetch(apiUrl + `/${formData.id}`, {
      method: "PUT", body: JSON.stringify(formData), headers: {
      'content-type': "application/json"
      }}).then(resp => resp.json())
      .then(resp => {
        handleCloseDialog()
        getUsers()
      })  
    }else{
      /* on submit of new user */
      fetch(apiUrl, {
      method: "POST", body: JSON.stringify(formData), headers: {
      'content-type': "application/json"
      }}).then(resp => resp.json())
      .then(resp => {
          handleCloseDialog()
          getUsers()      
      })
    }
  }
  
  
  
  
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 35px 0 35px",
          alignItems: "center",
        }}
      >
        <h1 style={{ justifyContent: "flex-start" }}>Users</h1>
        <Button
          onClick={handleClickOpenDialog}
          style={{ justifyContent: "flex-end", height: "40px" }}
          variant="outlined"
        >
        Add New User
        </Button>
      </div>
      
      <div style={{ height: "1000px", marginBottom: "50px"}}>
        {data && (
          <div style={{ height: "100%", width: "100%", }}>
            <DataGrid
              style={{ display: "flex", margin: "0 35px 0 35px" }}
              rows={data}
              columns={columns}
              pageSize={100}
              onRowClick={handleOpen}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"   
            >
            <Box sx={style}>
                 <Typography style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <img src={uData.avatar} alt="" style={{display:"flex", margin:"auto",justifyContent:"center",borderRadius:"100px"}}/> 
                 </Typography>
                 <Typography id="modal-modal-title" variant="h6" component="h2" style={{display:'flex',marginTop:"25px", alignItems:'center',justifyContent:'center'}}>
                 {uData.first_name} {uData.middle_name} {uData.last_name}
                 </Typography>
                 <Typography id="modal-modal-description" style={{display:'flex',margin:"", alignItems:'center',justifyContent:'center'}}>
                 {uData.email} 
                 </Typography>
                 <Typography style={{display:'flex',marginLeft:"20px", alignItems:'center',justifyContent:'center'}}>{uData.country}</Typography>
                 <Typography style={{display:'flex',marginLeft:"20px", alignItems:'center',justifyContent:'center'}}>{uData.state} </Typography>
                 <Typography style={{display:'flex',marginLeft:"20px", alignItems:'center',justifyContent:'center'}}>{uData.city}</Typography>
                 <Typography style={{display:'flex',marginLeft:"20px", alignItems:'center',justifyContent:'center'}}>{uData.zip} </Typography>
                 <Typography style={{display:'flex',marginLeft:"20px", alignItems:'center',justifyContent:'center'}}>Date created: {moment(uData.createdAt).format('MMMM Do YYYY, h:mm:ss a')} </Typography>
            </Box>
            </Modal>  
          </div>
        )}
        <FormDialog open={openDialog} handleClose={handleCloseDialog} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit}/>        
      </div>   
    </>
  );
}


export default Interface;