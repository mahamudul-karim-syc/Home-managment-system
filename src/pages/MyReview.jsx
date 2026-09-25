
import { useEffect, useState } from "react";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      const token = localStorage.getItem("hossing_tocken");

      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BaseUrl}/review/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to fetch reviews");
        }

        setReviews(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="alert">
          <span>You have not written any reviews yet.</span>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card bg-base-100 shadow-md border border-base-300 p-5"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold">
                  Room ID: {review.room_id}
                </h3>

                <div className="badge badge-warning">
                  ⭐ {review.rating}/5
                </div>
              </div>

              <p className="mt-3 text-gray-600">
                {review.comment}
              </p>

              {review.created_at && (
                <p className="text-sm text-gray-400 mt-3">
                  {new Date(review.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReview;

