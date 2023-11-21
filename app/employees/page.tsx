import Login from "../../components/Login";
import { Container } from "@mui/material";

export default function Employees() {
  return (
    // create me centered container with h1 and p
    <Container maxWidth="sm">
      <h1>Employees</h1>
      <p>You can see this page because you are logged in</p>
    </Container>
  );
}
