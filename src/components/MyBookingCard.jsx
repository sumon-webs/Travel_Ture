import { BookingDelete } from "./BookingDelete";

const MyBookingCard = ({ booking }) => {
    const {
        _id,
        destinationName,
        country,
        category,
        price,
        date,
        imageUrl,
        userName,
        userEmail,
    } = booking


    return (
        <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden">

            {/* Image */}
            <div className="h-44 w-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt={destinationName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800">
                    {destinationName}
                </h2>

                {/* Country + Category */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{country}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {category}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="text-green-600 font-bold text-lg">
                        ${price}
                    </span>
                </div>

                {/* Date */}
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Travel Date:</span> {date}
                </div>

                {/* User */}
                <div className="text-xs text-gray-400 border-t pt-2">
                    Booked by: {userName} ({userEmail})
                </div>

                {/* Button (optional future use) */}
                <BookingDelete id={_id} />

            </div>
        </div>
    );
};

export default MyBookingCard;