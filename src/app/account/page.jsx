"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MaxwidthContainer from "@/components/sharing/maxwidth-container";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authcontext";
import { formatPrice, errorMessage } from "@/lib/api";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-green-100 text-green-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-200 text-green-900",
  cancelled: "bg-gray-200 text-gray-700",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, logout, authRequest } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user) {
      router.push("/login?next=/account");
      return;
    }
    loadOrders();
    // We only want this to run when the login state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user]);

  async function loadOrders() {
    const result = await authRequest("/orders/");
    if (result.ok) {
      setOrders(result.data);
    } else {
      setError(errorMessage(result.data));
    }
    setLoadingOrders(false);
  }

  async function cancelOrder(orderId) {
    setError("");
    const result = await authRequest(`/orders/${orderId}/`, {
      method: "PATCH",
      body: { status: "cancelled" },
    });
    if (result.ok) {
      loadOrders();
    } else {
      setError(errorMessage(result.data));
    }
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <MaxwidthContainer className="py-20">
        <p className="text-center text-gray-500">Loading...</p>
      </MaxwidthContainer>
    );
  }

  return (
    <section className="p-4 sm:p-10">
      <MaxwidthContainer>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0E290E]">Hi, {user.first_name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <Button onClick={handleLogout} className="bg-white text-[#0E290E] border border-[#0E290E] px-6 rounded-3xl">
            Log out
          </Button>
        </div>

        <h2 className="text-2xl font-bold mb-4">My orders</h2>
        {error && <p className="text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>}

        {loadingOrders ? (
          <p className="text-gray-500">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600">
            You haven&apos;t ordered anything yet.{" "}
            <Link href="/products" className="underline text-[#0E290E]">
              Start shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-300 rounded-2xl p-5 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <p className="font-bold text-lg">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${STATUS_COLORS[order.status] || ""}`}>
                    {order.status}
                  </span>
                </div>

                <ul className="text-sm space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-4">
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span>{formatPrice(item.total_price)}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap justify-between items-center gap-3 border-t pt-3">
                  <span className="font-bold">Total: {formatPrice(order.total_price)}</span>
                  {/* Customers can only cancel orders that haven't been paid yet */}
                  {order.status === "pending" && (
                    <button onClick={() => cancelOrder(order.id)} className="text-sm text-red-600 underline">
                      Cancel order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </MaxwidthContainer>
    </section>
  );
}
