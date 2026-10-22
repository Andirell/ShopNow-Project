"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";
import { FormField, getNextPage } from "@/components/sharing/authform";
import { useAuth } from "@/contexts/authcontext";
import { errorMessage } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Your password needs at least 8 characters.");
      return;
    }

    setSending(true);
    const details = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      address: address,
    };
    // Phone number is optional, and the backend needs it to be unique,
    // so we only send it when it was filled in
    if (phoneNumber.trim()) {
      details.phone_number = phoneNumber.trim();
    }

    const result = await register(details);
    setSending(false);

    if (result.ok) {
      router.push(getNextPage());
    } else {
      setError(errorMessage(result.data));
    }
  }

  return (
    <MaxwidthContainer className="py-16">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5 border border-gray-300 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-[#0E290E]">Create an account</h1>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="First name" value={firstName} onChange={setFirstName} autoComplete="given-name" />
          <FormField label="Last name" value={lastName} onChange={setLastName} autoComplete="family-name" />
        </div>
        <FormField label="Email" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <FormField
          label="Phone number (optional)"
          type="tel"
          value={phoneNumber}
          onChange={setPhoneNumber}
          required={false}
          autoComplete="tel"
        />
        <FormField
          label="Delivery address (optional)"
          value={address}
          onChange={setAddress}
          required={false}
          autoComplete="street-address"
        />
        <FormField
          label="Password (at least 8 characters)"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />

        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>}

        <Button
          type="submit"
          disabled={sending}
          className="w-full bg-[#0E290E] text-white py-3 rounded-3xl hover:bg-[#0c230c] text-base"
        >
          {sending ? "Creating your account..." : "Create account"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline text-[#0E290E]">
            Log in
          </Link>
        </p>
      </form>
    </MaxwidthContainer>
  );
}
