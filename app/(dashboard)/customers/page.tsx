"use client"

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux"
import { deleteCustomer } from "@/lib/store/slices/customersSlice"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddCustomerModal } from "@/components/modals/add-customer-modal"
import { Trash2 } from "lucide-react"

export default function CustomersPage() {
  const dispatch = useAppDispatch()
  const customers = useAppSelector((state) => state.customers.items)
  const loading = useAppSelector((state) => state.customers.loading)

  const handleDelete = (id: string) => {
    dispatch(deleteCustomer(id))
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center space-x-2">
          <AddCustomerModal />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer?.id}>
                <TableCell>{customer?.name}</TableCell>
                <TableCell>{customer?.email}</TableCell>
                <TableCell>{customer?.phone}</TableCell>
                <TableCell>{customer?.totalOrders}</TableCell>
                <TableCell>${customer?.totalSpent?.toFixed(2)}</TableCell>
                <TableCell>{new Date(customer?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(customer?.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}