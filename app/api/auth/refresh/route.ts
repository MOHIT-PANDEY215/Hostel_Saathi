import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const users = [
    { id: 1, name: "Alice" },
  ];

  return NextResponse.json({
    success: true,
    data: users,
  });
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newUser = {
      id: Date.now(),
      name: body.name,
    };

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}