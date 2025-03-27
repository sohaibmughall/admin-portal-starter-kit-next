"use client"

import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux"
import { deleteReview } from "@/lib/store/slices/reviewsSlice"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Star, Trash2 } from "lucide-react"

export default function ReviewsPage() {
  const dispatch = useAppDispatch()
  const reviews = useAppSelector((state) => state.reviews.items)
  const products = useAppSelector((state) => state.products.items)

  const handleDelete = (id: string) => {
    dispatch(deleteReview(id))
  }

  const getProductName = (productId: string) => {
    const product = products?.find(p => p.id === productId)
    return product?.name || 'Unknown Product'
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews?.map((review) => (
              <TableRow key={review?.id}>
                <TableCell>{getProductName(review?.productId)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${review?.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>{review?.comment}</TableCell>
                <TableCell>{new Date(review?.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(review?.id)}
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
