import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import Card from "@mui/material/Card";

import dynamic from "next/dynamic";
const SwaggerUI = dynamic(import('swagger-ui-react'), {ssr: false})

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <Card>
        <h1>API Documentation</h1>
        <SwaggerUI spec={spec} />
      </Card>
    </section>
  );
}
