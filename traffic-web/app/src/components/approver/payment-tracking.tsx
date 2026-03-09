"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Plus,
  MoreHorizontal,
  FileText,
  Download,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

const mockPaymentHistory = [
  {
    id: "PAY-001",
    amount: 75.0,
    status: "Paid",
    method: "Credit Card",
    date: "2025-04-10T14:30:00Z",
    reference: "TXN-45678",
  },
  {
    id: "PAY-002",
    amount: 150.0,
    status: "Pending",
    method: "Bank Transfer",
    date: "2025-05-18T09:15:00Z",
    reference: "TXN-56789",
  },
  {
    id: "PAY-003",
    amount: 50.0,
    status: "Failed",
    method: "Digital Wallet",
    date: "2025-05-17T16:45:00Z",
    reference: "TXN-67890",
  },
];

export function PaymentTracking() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Payment Tracking</h3>
        <Button
          variant="outline"
          size="sm"
          className="border-pink-200 text-pink-700 hover:bg-pink-50"
        >
          <Plus className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-green-800">Total Paid</h4>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-800 mt-2">$75.00</p>
            <p className="text-xs text-green-700 mt-1">
              Last payment: Apr 10, 2025
            </p>
          </CardContent>
        </Card>
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-amber-800">Pending</h4>
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-800 mt-2">$150.00</p>
            <p className="text-xs text-amber-700 mt-1">
              Due date: May 30, 2025
            </p>
          </CardContent>
        </Card>
        <Card className="border border-pink-200 bg-pink-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-pink-800">
                Total Amount
              </h4>
              <DollarSign className="h-5 w-5 text-pink-600" />
            </div>
            <p className="text-2xl font-bold text-pink-800 mt-2">$275.00</p>
            <p className="text-xs text-pink-700 mt-1">Across 3 penalties</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-md border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h4 className="font-medium text-gray-800">Payment History</h4>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPaymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>
                    {format(new Date(payment.date), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {payment.reference}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "Failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </DropdownMenuItem>
                        {payment.status === "Pending" && (
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Payment Actions
          </h4>
          <div className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Verify Payment
            </Button>
            <Button
              variant="outline"
              className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Extend Due Date
            </Button>
            <Button
              variant="outline"
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              Send Payment Reminder
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Payment Instructions
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              The driver can pay the penalty using one of the following methods:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Online payment through the Traffic Penalty Portal</li>
              <li>Bank transfer to Account #12345678</li>
              <li>In-person payment at any Traffic Authority office</li>
              <li>Mobile payment using the TrafficPay app</li>
            </ul>
            <p className="text-sm mt-3">
              <span className="font-medium">Payment Due Date:</span> May 30,
              2025
            </p>
            <p className="text-sm">
              <span className="font-medium">Late Fee:</span> $25.00 after due
              date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
