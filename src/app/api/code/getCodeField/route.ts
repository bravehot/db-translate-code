import { NextResponse } from "next/server";
import type { InteFieldConfig } from "@/@types/code";

export async function POST(request: Request) {
  const body: InteFieldConfig = await request.json();
  return NextResponse.json({ message: "Hello, Next.js!" });
}

export function GET(request: Request) {
  return NextResponse.json({ message: "Hello, Next.js!" });
}
