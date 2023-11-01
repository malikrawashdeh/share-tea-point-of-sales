import { Button, Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow } from "@/node_modules/@mui/material/index";
import { useState } from "react";
// import Chart from "./chart";

export default function Manager() {


    return (
        <main >
            {/*Reports*/}
            <Container style ={{backgroundColor: '#fff', height: '100vh', marginTop: '50px'}}>
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                        <TableContainer>

                        </TableContainer>
                    </Grid>
                </Container>

                {/*Chart*/}
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    
                </Container>

                {/*Item Buttons*/}
                <Container style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '10vh'}}>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#000', color: '#fff'}}>Ingredients </Button>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#000', color: '#fff'}}>Drinks</Button>
                </Container>
            </Container>
        </main>
    )
}