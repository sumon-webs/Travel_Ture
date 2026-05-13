"use client";

import { Button, Input } from "@heroui/react";
import { MapPin, CalendarDays, Search } from "lucide-react";

export default function Banner() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Explore The World <br />
          With <span className="text-blue-400">TRAVELSBOOK</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Discover beautiful destinations, book amazing tours,
          and create unforgettable memories around the globe.
        </p>

        {/* Search Box */}
        <div className="mt-10 bg-white rounded-3xl p-4 md:p-6 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Destination */}
            <Input
              size="lg"
              startcontent={<MapPin className="text-gray-500" size={18} />}
              placeholder="Where are you going?"
              className="text-black"
            />

            {/* Check In */}
            <Input
              type="date"
              size="lg"
              startcontent={
                <CalendarDays className="text-gray-500" size={18} />
              }
              className="text-black"
            />

            {/* Check Out */}
            <Input
              type="date"
              size="lg"
              startcontent={
                <CalendarDays className="text-gray-500" size={18} />
              }
              className="text-black"
            />

            {/* Search Button */}
            <Button
              color="primary"
              size="lg"
              className="h-full font-semibold text-lg"
              startcontent={<Search size={20} />}
            >
              Search
            </Button>

          </div>
        </div>

        {/* Small Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">

          <div>
            <h2 className="text-3xl font-bold">10K+</h2>
            <p className="text-gray-300">Happy Travelers</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">500+</h2>
            <p className="text-gray-300">Tour Packages</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">100+</h2>
            <p className="text-gray-300">Destinations</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">24/7</h2>
            <p className="text-gray-300">Customer Support</p>
          </div>

        </div>
      </div>
    </section>
  );
}