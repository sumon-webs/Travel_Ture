
import Image from "next/image";
import {
    MapPin,
    Globe,
    Tag,
    DollarSign,
    Timer,
    CalendarDays,
    ArrowLeft,
    Pencil,
} from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import BookingCard from "@/components/BookingCard";

const DestinationDetails = async ({ params }) => {

    const { id } = await params;

    const res = await fetch(`http://localhost:5000/destination/${id}`, {
        cache: "no-store",
    });

    const destination = await res.json();

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


   

    return (
        <div className="container mx-auto px-4 py-10 space-y-8">
            <div className="flex justify-end gap-3 mt-6">

                <Link href={'/destinations'}>
                    <Button
                        variant="bordered"
                        className="flex items-center gap-2 px-5 py-2 rounded-xl border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Button>

                </Link>
                <Link href={`/destinations/edit/${_id}`}
                >
                    <Button

                        color="primary"
                        className="flex items-center gap-2 px-5 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-200"
                    >
                        <Pencil size={18} />
                        Edit
                    </Button>
                </Link>

            </div>

            {/* Image */}
            <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src={imageUrl}
                    alt={destinationName}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content */}
            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-10 relative">

                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-8">

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-tight">
                        {destinationName}
                    </h1>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-white p-6 rounded-3xl shadow-sm border">

                        <div className="flex items-center gap-3 text-gray-700">
                            <MapPin className="text-blue-600" />
                            <span className="font-medium">{country}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <Tag className="text-purple-600" />
                            <span>{category}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <DollarSign className="text-green-600" />
                            <span className="font-bold text-green-600">${price}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <Timer className="text-orange-600" />
                            <span>{duration}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700 sm:col-span-2">
                            <CalendarDays className="text-red-600" />
                            <span>{departureDate}</span>
                        </div>

                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 p-6 rounded-3xl shadow-sm border">
                        <h2 className="text-xl font-semibold mb-3">
                            About This Destination
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {description}
                        </p>
                    </div>

                </div>

                {/* RIGHT SIDEBAR (BOOKING CARD) */}
              <BookingCard destination = {destination}/>

            </div>
        </div>
    );
};

export default DestinationDetails;