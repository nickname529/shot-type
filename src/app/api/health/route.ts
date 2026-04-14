import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "ShotType",
    checkedAt: new Date().toISOString()
  });
}
