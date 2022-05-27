import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
  const {id,first_name, last_name ,email } = data;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle style={{display:"flex",justifyContent:"center"}} id="alert-dialog-title">
          {id?"Update User":"Add New User"}
        </DialogTitle>
        <DialogContent>
          <form >
             <TextField id="firstName" defaultValue={first_name} onChange={e=>onChange(e)} placeholder="First Name" label="First Name" size="small" style={{margin:"0 0 5px 0"}}  fullWidth/> 
             <TextField id="lastName" defaultValue={last_name} onChange={e=>onChange(e)} placeholder="Last Name" label="Last Name" size="small" style={{margin:"5px 0 5px 0"}}  fullWidth/> 
             <TextField id="email" defaultValue={email} onChange={e=>onChange(e)} placeholder="Email" label="Email" size="small" style={{margin:"5px 0 0 0"}}  fullWidth/> 
          </form>  
        </DialogContent>
        <DialogActions  style={{display:"flex",justifyContent:"center",margin:"0 0 10px 0"}}>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={()=>handleFormSubmit()}>{id?"Update":"Submit"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  