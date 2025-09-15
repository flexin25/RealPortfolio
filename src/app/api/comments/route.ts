import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// POST - Submit a new comment
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Insert comment into database
    const { data, error } = await supabase
      .from("comments")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Comment submitted successfully",
        data: {
          id: data.id,
          created_at: data.created_at,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET - Retrieve comments (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // Fetch comments with pagination
    const { data, error, count } = await supabase
      .from("comments")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
    }

    return NextResponse.json({
      comments: data || [],
      total: count || 0,
      limit,
      offset,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
