import DestinationCard from "@/components/DestinationCard";

export const dynamic = "force-dynamic";

const AllDestinationsPage = async () => {


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
        { cache: "no-store" }
    );
    const destinations = await res.json();


    return (
        <div className="container mx-auto px-4 py-10">

            {/* Heading */}
            <h1 className="text-3xl font-bold mb-8 text-center">
                🌍 All Destinations
            </h1>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {destinations.length > 0 ? (
                    destinations.map((destination) => (
                        <DestinationCard
                            key={destination._id}
                            destination={destination}
                        />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No destinations found 😢
                    </p>
                )}

            </div>
        </div>
    );
};

export default AllDestinationsPage;