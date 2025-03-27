"use client"

import { useState } from 'react'
import { useAppDispatch } from '@/lib/hooks/redux'
import { addOrder } from '@/lib/store/slices/ordersSlice'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'

export function AddOrderModal() {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    total: '',
    status: 'pending',
    items: [{ productId: '', quantity: '', price: '', name: '' }]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const order = {
      id: Date.now().toString(),
      customerName: formData.customerName,
      orderNumber: `ORD-${Date.now()}`,
      total: parseFloat(formData.total),
      status: formData.status as 'pending' | 'processing' | 'completed' | 'cancelled',
      items: formData.items.map(item => ({
        productId: item.productId,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
        name: item.name
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    dispatch(addOrder(order))
    setFormData({
      customerName: '',
      total: '',
      status: 'pending',
      items: [{ productId: '', quantity: '', price: '', name: '' }]
    })
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }))
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', quantity: '', price: '', name: '' }]
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={handleStatusChange} value={formData.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Order Items</Label>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 gap-2">
                <Input
                  placeholder="Product Name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  required
                />
                <Input
                  placeholder="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  required
                />
                <Input
                  placeholder="Price"
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                  required
                />
                <Input
                  placeholder="Product ID"
                  value={item.productId}
                  onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                  required
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addItem}>
              Add Item
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="total">Total Amount</Label>
            <Input
              id="total"
              name="total"
              type="number"
              step="0.01"
              value={formData.total}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}