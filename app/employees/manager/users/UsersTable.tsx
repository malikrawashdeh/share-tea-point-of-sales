'use client'

import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from "@mui/material";
import { users } from "@prisma/client";
import React from "react";

interface props {
    users: users[],
    changeUser(newUser: users): void
}

/**
 * Table component to display all users within the database
 * 
 * @param users All users to be displayed in the table
 * @param changeDrink Callback function to change the user selected user 
 * @returns user Table Element
 */
const UsersTable: React.FC<props> = ({users, changeUser}) => {
    return users.length > 0 ? (
            <TableContainer component={Paper} sx={{padding: '1rem'}}>
                <Table sx={{  }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                            onClick = {() => changeUser(row)}
                            key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.password}</TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    ) : (
        <div>No Users Found</div>
    );
}

export default UsersTable;