
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import BaseUrl from "../service/BaseUrl";
import toast from "react-hot-toast";

const Payment = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState({
    amount: "",
    payment_method: "cash",
    transaction_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("hossing_tocken");

      const response = await fetch(`${BaseUrl}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room_id: Number(room_id),
          amount: Number(payment.amount),
          payment_method: payment.payment_method,
          transaction_id: payment.transaction_id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Payment request failed"
        );
      }

      toast.success("Rent payment submitted successfully!");

      navigate("/reserved");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">

      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            Rent Payment
          </h1>

          <p className="text-base-content/60 mt-2">
            Submit your monthly rent payment
          </p>
        </div>

        {/* Payment Card */}
        <div className="card bg-base-100 shadow-xl border border-base-300">

          <div className="card-body">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Room ID */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Room ID
                  </span>
                </label>

                <input
                  type="text"
                  value={room_id}
                  readOnly
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Rent Amount
                  </span>
                </label>

                <input
                  type="number"
                  name="amount"
                  value={payment.amount}
                  onChange={handleChange}
                  placeholder="Enter rent amount"
                  min="1"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Payment Method
                  </span>
                </label>

                <select
                  name="payment_method"
                  value={payment.payment_method}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="cash">
                    Cash
                  </option>

                  <option value="bkash">
                    bKash
                  </option>

                  <option value="nagad">
                    Nagad
                  </option>

                  <option value="bank">
                    Bank Transfer
                  </option>
                </select>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Transaction ID
                  </span>
                </label>

                <input
                  type="text"
                  name="transaction_id"
                  value={payment.transaction_id}
                  onChange={handleChange}
                  placeholder="Enter transaction ID"
                  className="input input-bordered w-full"
                />

                <p className="text-xs text-base-content/50 mt-2">
                  Required for bKash, Nagad or Bank Transfer.
                </p>
              </div>

              {/* Payment Status */}
              <div className="alert alert-info">
                <span>
                  Your payment will be submitted as{" "}
                  <strong>Pending</strong>.
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Submit Payment
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Payment;

