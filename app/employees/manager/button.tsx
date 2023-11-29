"use-client";
import { Button } from "@/node_modules/@mui/material/index";
import Link from 'next/link'

interface dbuttonProps{
    buttonText: string;
    destination: string;
}

export default function Dbutton ({ buttonText, destination }: dbuttonProps ): JSX.Element {
    return (
        <Link href={destination} passHref>
            <Button 
                style={{ margin: '0 auto', border: '2px solid #000', backgroundColor: '#000', color: '#fff' }}>
                {buttonText}
            </Button>
        </Link>
    );
} 