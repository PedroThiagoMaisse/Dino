import { execSync } from 'child_process';

export async function GET() {
  let version = 'unknown';
  try {
    version = execSync('git rev-parse HEAD').toString().trim();
  } catch {}

  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version
  });
}