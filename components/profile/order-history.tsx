"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import type { Order } from "@/contexts/AuthContext"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

export default function OrderHistory({ orders }: { orders: Order[] }) {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            <Button asChild className="mt-4">
              <Link href="/popular-products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <Badge variant="outline" className={`${getStatusColor(order.status)} text-white border-0`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {format(new Date(order.date), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">₹{order.total.toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 p-0 h-auto"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      {expandedOrders.includes(order.id) ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span className="text-sm">Hide Details</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span className="text-sm">View Details</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              {expandedOrders.includes(order.id) && (
                <div className="p-4 space-y-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-16 h-16 relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order.id}`} className="flex items-center gap-1">
                        <ExternalLink className="h-4 w-4" />
                        Track Order
                      </Link>
                    </Button>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium text-lg">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

