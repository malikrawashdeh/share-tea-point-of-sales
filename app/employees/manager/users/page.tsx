'use client'

import DrinkTable from "./UsersTable";
import {useEffect, useState } from "react";
import { user_role, users } from "@prisma/client";
import React from "react";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import FormDialog from "./FormDialog";

const Page = () => {
    const [selectedUser, setSelectedUser] = useState<users>();
    const [users, setUsers] = useState<users[]>();
    const [loading, setLoading] = useState(true);

    const dummy_user: users = {
        id: -1,
        name: 'N/A',
        username: 'N/A',
        email: 'N/A',
        password: 'N/A',
        role: user_role.user,
    };

    const changeUser = (newUser: users) => {
        setSelectedUser(newUser);
        console.log(newUser);
    }

    const handleModalClose = () => {
        setSelectedUser(undefined);
    }

    const grabUsers = React.useCallback(async () => {
        setLoading(true);
        const result = await fetch('/api/getUsers/', {});
        const data = await result.json();
        console.log(data);
        setUsers(data.users);
        setLoading(false);
    }, []);

    useEffect(() => {
        grabUsers();
    }, []);

    return !loading ? (
        <main>
            <Container sx={{padding: '0.5rem'}}>
                <Button variant="contained" sx={{marginBottom: '1.5rem'}} style={{backgroundColor: '#ce0e2d'}} onClick={() => {setSelectedUser(dummy_user)}}>
                    Create New User
                </Button>
                <DrinkTable users={users!} changeUser={changeUser}/>
                <FormDialog user={selectedUser} handleModalClose={handleModalClose}/>
            </Container>
        </main>
    ) : (
        <Box 
            sx={{ display: 'flex' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh">
            <CircularProgress sx={{color: 'red'}}/>
        </Box>
    )
}

export default Page;