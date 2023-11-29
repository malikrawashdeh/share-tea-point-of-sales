import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { user_role, users } from '@prisma/client';
import { useState } from 'react';

interface FormDialogProps {
    user: users | undefined,
    handleModalClose(): void,
};

const FormDialog: React.FC<FormDialogProps> = ({user, handleModalClose}) => {
  const [newUser, setNewUser] = useState<users>();

  const handle_name = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newUser !== undefined) {
      let tmp = newUser;
      tmp.name = e.target.value;
      setNewUser(tmp);
    }
  }
  const handle_username = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newUser !== undefined) {
      let tmp = newUser;
      tmp.username = e.target.value;
      setNewUser(tmp);
    }
  }
  const handle_email = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newUser !== undefined) {
      let tmp = newUser;
      tmp.email = e.target.value;
      setNewUser(tmp);
    }
  }
  const handle_password = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newUser !== undefined) {
      let tmp = newUser;
      tmp.password = e.target.value;
      setNewUser(tmp);
    }
  }
  const handle_role = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newUser !== undefined) {
      let tmp = newUser;
      tmp.role = user_role[e.target.value as keyof typeof user_role] ?? tmp.role;
      setNewUser(tmp);
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    
    console.log(newUser);

    const response = await fetch('/api/setUser', {
      method: 'POST',
      body: JSON.stringify(newUser),
    })

    handleModalClose();
  }

  React.useEffect(() => {
    if (user !== newUser) {
      setNewUser(user);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Dialog open={!!user} onClose={handleModalClose}>
        <DialogTitle>User Information Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the user attributes as desired:
          </DialogContentText>
          <TextField
            autoFocus
            id="user_name_field"
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.name}
            onChange={(e) => {handle_name(e)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="user_username_field"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.username}
            onChange={(e) => {handle_username(e)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="user_email_field"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.email}
            onChange={(e) => {handle_email(e)}}
          />
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="user_password"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.password}
            onChange={(e) => {handle_password(e)}}
          />
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="user_role"
            label="Role"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={user?.role}
            onChange={(e) => {handle_role(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose}>Cancel</Button>
          <Button onClick={(e) => handleSubmit(e)}>Submit Changes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default FormDialog;