import { Button, Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow, colors } from "@/node_modules/@mui/material/index";
import SalesChart from "./SalesChart";
import Excess from "./excess";
import Restock from "./restock";

export default function Manager() {
    return (
        <main>
            <Container style={{backgroundColor: '#FFFFFF', height: '100%', marginTop: '5rem'}}>
                {/*Item Buttons*/}
                <Container style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '10vh',
                        marginBottom: '2rem',
                        marginTop: '2rem'}}>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#000', color: '#fff'}}>Ingredients </Button>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#000', color: '#fff'}}>Drinks</Button>
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