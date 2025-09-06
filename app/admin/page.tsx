"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeaderNav } from "@/components/header-nav"

interface Comment {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

interface CommentsResponse {
  comments: Comment[]
  total: number
  limit: number
  offset: number
}

export default function AdminPage() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
  })

  const fetchComments = async (offset = 0) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/comments?limit=${pagination.limit}&offset=${offset}`)

      if (!response.ok) {
        throw new Error("Failed to fetch comments")
      }

      const data: CommentsResponse = await response.json()
      setComments(data.comments)
      setPagination({
        total: data.total,
        limit: data.limit,
        offset: data.offset,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handlePrevPage = () => {
    const newOffset = Math.max(0, pagination.offset - pagination.limit)
    fetchComments(newOffset)
  }

  const handleNextPage = () => {
    const newOffset = pagination.offset + pagination.limit
    if (newOffset < pagination.total) {
      fetchComments(newOffset)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const currentPage = Math.floor(pagination.offset / pagination.limit) + 1
  const totalPages = Math.ceil(pagination.total / pagination.limit)

  return (
    <main className="min-h-screen bg-black">
      <HeaderNav />

      <div className="px-6 pb-20 pt-24 md:px-12 lg:px-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-zinc-400">Manage portfolio comments and messages</p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-zinc-400">Loading comments...</div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">Error: {error}</div>
          )}

          {!loading && !error && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-zinc-400">{pagination.total} total comments</div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handlePrevPage}
                      disabled={pagination.offset === 0}
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-black text-zinc-300 hover:bg-white/5"
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-zinc-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      onClick={handleNextPage}
                      disabled={pagination.offset + pagination.limit >= pagination.total}
                      variant="outline"
                      size="sm"
                      className="border-white/10 bg-black text-zinc-300 hover:bg-white/5"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-black p-8 text-center">
                    <p className="text-zinc-400">No comments yet</p>
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="rounded-2xl border border-white/10 bg-black p-6"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-white">{comment.name}</h3>
                          <p className="text-sm text-zinc-400">{comment.email}</p>
                        </div>
                        <div className="text-xs text-zinc-500">{formatDate(comment.created_at)}</div>
                      </div>

                      <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                        <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{comment.message}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </main>
  )
}
