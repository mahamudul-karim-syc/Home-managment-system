
import { useState } from "react";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const Review = ({ room_id }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("hossing_tocken");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BaseUrl}/review/${room_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(rating),
          comment: comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to create review");
      }

      toast.success("Review submitted successfully!");

      setRating(5);
      setComment("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md border border-base-300 p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

      <form onSubmit={handleReview} className="space-y-4">

        {/* Rating */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">
              Rating
            </span>
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Average</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">
              Comment
            </span>
          </label>

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default Review;

