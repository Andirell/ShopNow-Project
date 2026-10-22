"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";
import { FormField, getNextPage } from "@/components/sharing/authform";
import { useAuth } from "@/contexts/authcontext";
import { errorMessage } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);

    const result = await login(email, password);
    setSending(false);

    if (result.ok) {
      router.push(getNextPage());
    } else if (result.status === 401) {
      setError("Wrong email or password.");
    } else {
      setError(errorMessage(result.data));
    }
  }

  return (
    <MaxwidthContainer className="py-16">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5 border border-gray-300 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#0E290E]">Log in</h1>

        <FormField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-[#0E290E] text-white py-3 rounded-3xl hover:bg-[#0c230c] text-base"
        >
          {sending ? "Logging in..." : "Log in"}
        </Button>

        <p className="text-center text-sm">
          New to ShopNow?{" "}
          <Link href="/register" className="underline text-[#0E290E]">
            Create an account
          </Link>
        </p>
      </form>
    </MaxwidthContainer>
  );
}
