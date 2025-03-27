"use client"

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux"
import { deleteProduct } from "@/lib/store/slices/productsSlice"
import { AddProductModal } from "@/components/modals/add-product-modal"
import { AddReviewModal } from "@/components/modals/add-review-modal"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { Star } from "lucide-react"

export default function ProductsPage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.items)
  const reviews = useAppSelector((state) => state.reviews.items)
  const loading = useAppSelector((state) => state.products.loading)

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id))
  }

  const getAverageRating = (productId: string) => {
    const productReviews = reviews.filter((review) => review.productId === productId)
    if (productReviews.length === 0) return 0
    const totalRating = productReviews.reduce((acc, review) => acc + review.rating, 0)
    return totalRating / productReviews.length
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <AddProductModal />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price?.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${getAverageRating(product.id) >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {getAverageRating(product.id).toFixed(1)} / 5
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="mr-2">
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <AddReviewModal productId={product.id} productName={product.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}