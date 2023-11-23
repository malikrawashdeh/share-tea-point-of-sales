
import { Button, Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow, colors } from "@/node_modules/@mui/material/index";
import SalesChart from "./SalesChart";
import Excess from "./excess";
import Restock from "./restock";
import Dbutton from "./button";

export default function Manager() {
    return (
        <main >
            {/*Reports*/}
            <Container style ={{backgroundColor: '#fff', height: '150vh', marginTop: '50px'}}>
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
                        height: '10vh',
                        marginBottom: '1rem',
                        marginTop: '1rem'}}>
                    <Dbutton buttonText = "Drinks" destination = "/employees/manager/drinks"></Dbutton>
                    <Dbutton buttonText = "Drinks" destination = "/employees/manager/ingredients"></Dbutton>
                </Container>

                {/*Reports*/}
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                        <Grid item xs={2} sm={6} key={1} style={{color: 'black'}} sx={{ border: 1}}>
                            <h1>Excess Report</h1>
                            <Excess/>
                        </Grid>
                        <Grid item xs={2} sm={6} key={1} style={{color: 'black'}} sx={{ border: 1}}>
                            <h1>Restock Report</h1>
                            <Restock/>
                        </Grid>
                    </Grid>
                </Container>
            

                {/*Chart*/}
                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <SalesChart/>
                </Container>
            </Container>
        </main>
    )
}