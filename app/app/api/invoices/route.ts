
export async function GET(request: Request) {
  
  const res = await fetch(
    `https://dev.api.gateway.fleeky.com.br/api/faturas/total-faturas-por-periodo?data_inicio=2023-05-01&data_fim=2030-01-01`,
    {
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.DATA_API_KEY!,
      },
    }
  );
  const product = await res.json();

  return Response.json({ product });
}