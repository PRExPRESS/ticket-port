// app/api/set-user/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user } = await request.json();
    if (!user || typeof user !== "object") {
      return NextResponse.json(
        { error: "User data is required and must be an object" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    
    cookieStore.set("username", user.username || "", { path: "/" });
    cookieStore.set("user-role", user.role || "", { path: "/" });
    cookieStore.set("uid", user.uid || "", { path: "/" });
    cookieStore.set("email", user.email || "", { path: "/" });


    return NextResponse.json(
      { message: "User data set successfully" +`${cookieStore.get("user")?.value}` },
      { status: 200 },
      
    );
  } catch (error: unknown) {
    console.error("Error setting cookie:", error);
    let message = "Internal Server Error";
    const status = 500;

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ error: message }, { status });
  }
}