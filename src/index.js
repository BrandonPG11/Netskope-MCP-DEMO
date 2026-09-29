import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

function createServer() {
  const server = new McpServer({
    name: "Netskope MCP Demo",
    version: "1.0.0"
  });

  server.registerTool(
    "netskope_demo",
    {
      description: "Herramienta de prueba para generar actividad MCP",
      inputSchema: {}
    },
    async () => ({
      content: [
        {
          type: "text",
          text: "Netskope MCP Demo - Tool Call ejecutado correctamente"
        }
      ]
    })
  );

  return server;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return new Response("Netskope MCP Demo OK");
    }

    if (url.pathname !== "/mcp") {
      return new Response("Not Found", { status: 404 });
    }

    const server = createServer();

    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined
    });

    await server.connect(transport);

    return transport.handleRequest(request);
  }
};
