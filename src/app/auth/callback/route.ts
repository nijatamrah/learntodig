import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const supabase = await createClient();

  // token_hash flow (email template ilə)
  if (token_hash && type === "recovery") {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return NextResponse.redirect(`${origin}/reset-password`);
    }
  }

  // code flow (resetPasswordForEmail ilə - bu bizim case)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}/reset-password`);
    }
  }

  // Xəta halında login-ə qayıt
  return NextResponse.redirect(`${origin}/login?error=reset-failed`);
}