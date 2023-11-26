import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { drinks, ingredients } from '@prisma/client';
import { useState } from 'react';

interface FormDialogProps {
    drink: ingredients | undefined,
    handleModalClose(): void,
};

