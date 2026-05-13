import MyBookingCard from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const id = session?.user?.id;

    const res = await fetch(`http://localhost:5000/bookings/${id}`);
    const bookings = await res.json();

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Bookings
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage all your travel bookings in one place
                    </p>
                </div>

                {/* Empty state */}
                {bookings?.length === 0 && (
                    <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No bookings found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Start exploring destinations and book your first trip.
                        </p>
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings?.map((booking) => (
                        <MyBookingCard
                            key={booking._id}
                            booking={booking}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookingPage;