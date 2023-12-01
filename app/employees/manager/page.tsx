'use client'

import { Button, Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow, colors, Paper } from "@/node_modules/@mui/material/index";
import Typography from "@mui/material/Typography";
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SalesChart from "./SalesChart";
import Excess from "./excess";
import Restock from "./restock";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Link from "next/link";
import Subheader from "@/components/Subheader";
import BarEchart from "@/components/charts/BarEchart";

export default function Manager() {
    const [beginDateReports, setBeginDateReports] = useState<Dayjs | null>(dayjs('2023-09-01'));
    const [endDateReports, setEndDateReports] = useState<Dayjs | null>(dayjs(new Date()));

    const [beginDateChart, setBeginDateChart] = useState<Dayjs | null>(dayjs('2023-09-01'));
    const [endDateChart, setEndDateChart] = useState<Dayjs | null>(dayjs(new Date()));

    return (
        <main>
            <Container maxWidth="sm">
                <Paper sx={{padding: '1rem'}}>
                    {/*Item Buttons*/}
                    <Subheader text="Tables"/>
                    <Container style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        marginTop: '1rem',
                        }}>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#ce0e2d', color: '#ffffff'}}>
                    <Link href="/employees/manager/drinks">
                        Drinks
                    </Link> 
                    </Button>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#ce0e2d', color: '#ffffff'}}>
                    <Link href="/employees/manager/ingredients">
                        Ingredients
                    </Link> 
                    </Button>
                    <Button style={{margin: '0 auto', border: '2px solid #000', backgroundColor: '#ce0e2d', color: '#ffffff'}}>
                    <Link href="/employees/manager/users">
                        Users
                    </Link> 
                    </Button>
                </Container>
                </Paper>
            </Container>
            <Container maxWidth="md">
                <Paper sx={{padding: '1rem', my:'2rem'}}>
                    <Subheader text="Reports"/>
                    {/*Report Date*/}

                    <Container style={{display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '10vh',
                            marginBottom: '1rem',
                            marginTop: '1rem'}}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DateField
                                label="Beign Date"
                                value={beginDateReports}
                                onChange={(newValue) => setBeginDateReports(newValue)}
                                />
                                <DateField
                                label="End Date"
                                value={endDateReports}
                                onChange={(newValue) => setEndDateReports(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Container>

                    {/*Reports*/}
                    <Container style={{alignItems:'center', justifyContent:'center'}}>
                        <Grid container spacing={{  }} columns={{ xs: 4, sm: 8, md: 12 }} style={{padding: '1rem',}}>
                            <Grid item xs={2} sm={6} key={1} style={{}} sx={{ border: 1}}>
                                <h1>Excess Report</h1>
                                <Excess beginDate={beginDateReports!}/>
                            </Grid>
                            <Grid item xs={2} sm={6} key={1} style={{}} sx={{ border: 1}}>
                                <h1>Restock Report</h1>
                                <Restock/>
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
            </Container>
            <Container maxWidth="md">
                <Paper sx={{padding: '1rem', my:'2rem'}}>
                    <Subheader text="Drink Sales"/>
                    {/*Chart*/}
                    <Container style={{display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        marginTop: '1rem'}}>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateField', 'DateField']}>
                                    <DateField
                                    label="Beign Date"
                                    value={beginDateChart}
                                    onChange={(newValue) => setBeginDateChart(newValue)}
                                    />
                                    <DateField
                                    label="End Date"
                                    value={endDateChart}
                                    onChange={(newValue) => setEndDateChart(newValue)}
                                    />
                            </DemoContainer>
                        </LocalizationProvider>
                </Container>

                <Container style={{alignItems:'center', justifyContent:'center'}}>
                    <BarEchart beginDate={beginDateChart} endDate={endDateChart}/>
                </Container>
                </Paper>
            </Container>
        </main>
    )
}