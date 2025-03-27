"use client"

import { useState } from 'react'
import { useAppDispatch } from '@/lib/hooks/redux'
import { addReview } from '@/lib/store/slices/reviewsSlice'
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
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'

interface AddReviewModalProps {
  productId: string;
  productName: string;
}

export function AddReviewModal({ productId, productName }: AddReviewModalProps) {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    comment: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const review = {
      id: Date.now().toString(),
      productId,
      userId: 'user-1', // In a real app, this would come from auth
      userName: 'John Doe', // In a real app, this would come from auth
      rating,
      comment: formData.comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    dispatch(addReview(review))
    setFormData({ comment: '' })
    setRating(0)
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review {productName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="Write your review here..."
              className="min-h-[100px]"
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
            <Button type="submit" disabled={rating === 0}>
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
