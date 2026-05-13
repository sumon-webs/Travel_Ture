'use client'
import { useSession } from "@/lib/auth-client";
import { postBookingData } from "@/lib/data";
import { useState } from "react";

const BookingCard = ({ destination }) => {
    const [book, setBook] = useState(false)
    const { data: session, isLoading } = useSession();
    const user = session?.user;

    if (isLoading) return null

    const [date, setDate] = useState()
    const {
        _id,
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
    } = destination


    const handleBooking = async () => {
        setBook(true)
        const data = {
            destiantionId: _id,
            userName: user?.name,
            userEmail: user?.email,
            userId: user?.id,
            destinationName: destinationName,
            country: country,
            category: category,
            price: price,
            date: date,
            imageUrl: imageUrl
        }

        try {
            postBookingData(data)
        }
        finally {
            setBook(false)
        }
    }

    return (
        <div>
            <div className="w-full lg:w-[360px] lg:sticky lg:top-24 self-start">

                <div className="bg-white shadow-xl border rounded-3xl p-6 space-y-5">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Book This Trip
                    </h2>
                    <p>Per pice</p>

                    {/* Price */}
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
                        <span className="text-gray-600 font-medium">Price</span>
                        <span className="text-2xl font-bold text-green-600">
                            ${price}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleBooking();
                            }}
                            className="space-y-5"
                        >
                            {/* Date Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-600">
                                    Select Date
                                </label>

                                <input
                                    type="date"
                                    required
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500 transition-all shadow-sm"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={book}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50
               text-white py-3 rounded-2xl font-semibold"
                            >
                                {book ? "Booking..." : "Book Now"}
                            </button>
                        </form>
                    </div>



                    <p className="text-xs text-gray-500 text-center">
                        Free cancellation before 24 hours
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;