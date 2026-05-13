'use client'

import { Card, CardBody, Button, Chip } from "@heroui/react";
import { ArrowUpRight, Clock3, MapPin, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DestinationDelete } from "./DestinationDeleteAleart";

const DestinationCard = ({ destination }) => {
    const {
        _id,
        imageUrl,
        country,
        price,
        duration,
        destinationName,
    } = destination;

    return (
        <Card
            className="
                group
                rounded-3xl
                overflow-hidden
                border
                border-gray-200
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
                bg-white
            "
        >
            {/* Image Section */}
            <div className="relative w-full h-64 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={destinationName || "Destination"}
                    fill
                    className="
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-500
                    "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Price */}
                <div className="absolute top-4 right-4">
                    <Chip
                        className="bg-white/90 backdrop-blur-md font-semibold"
                        radius="full"
                    >
                        ${price}
                    </Chip>
                </div>

                {/* Bottom Content on Image */}
                <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-2xl font-bold leading-tight">
                        {destinationName || "Beautiful Destination"}
                    </h2>

                    <div className="flex items-center gap-1 text-sm mt-1 text-gray-200">
                        <MapPin size={16} />
                        <span>{country}</span>
                    </div>
                </div>
            </div>

            {/* Card Body */}

            {/* Info */}
            <div className="flex items-center justify-between">

                <div className="flex items-center gap-2 text-gray-600">
                    <Clock3 size={18} />
                    <span className="text-sm font-medium">
                        {duration}
                    </span>
                </div>

                <p className="text-lg font-bold text-blue-600">
                    ${price}
                </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">

                <Link href={`/destinations/${_id}`}> <p className=" flex text-blue-500 w-fit hover:border-b ">Book Now <ArrowUpRight /> </p> </Link>

            <div>
                <DestinationDelete destination={destination} />
            </div>
        </div>
        </Card >
    );
};

export default DestinationCard;