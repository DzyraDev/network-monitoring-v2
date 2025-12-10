export const dynamic = "force-dynamic"; // Force dynamic rendering
export const revalidate = 0; // No caching
import { NextResponse } from "next/server";

// export async function GET(request) {
//   // WebSocket upgrade request
//   if (request.headers.get('upgrade') === 'websocket') {
//     // In production, you might want to proxy to your WebSocket server
//     // or use a service like Pusher, Ably, or Socket.io
    
//     return NextResponse.json(
//       { error: 'WebSocket server is separate' },
//       { status: 400 }
//     );
//   }
  
//   return NextResponse.json(
//     { message: 'WebSocket endpoint' },
//     { status: 200 }
//   );
// }
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return new Response(JSON.stringify({ error: "IP is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Simulasi delay network
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 500));

    // Simulasi status (70% online, 30% offline)
    const isOnline = Math.random() > 0.3;

    const response = {
      ip,
      status: isOnline ? "online" : "offline",
      uptime: isOnline ? Math.floor(Math.random() * 30) + 70 : 0,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Ping failed",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }


  
}


