import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import Card from "@mui/material/Card";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <Card>
        <h1>API Documentation</h1>
        <ReactSwagger spec={spec} />
      </Card>
    </section>
  );
}
