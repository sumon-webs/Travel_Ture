"use client";

import Link from "next/link";
import { Avatar, Button } from "@heroui/react";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { FaSpinner } from "react-icons/fa";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Add Destination", href: "/add-destination" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const router = useRouter()

    const pathName = usePathname()

    const { data: session, isLoading } = useSession();
    const user = session?.user;

    const handleLogOUt = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/log-in"); // redirect to login page

                },
            },
        });
        router.refresh()
    }

    if (isLoading) return <FaSpinner className="animate-spin" />

    return (
        <nav className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/">
                        <h1 className="text-2xl font-extrabold tracking-wide">
                            <span className="text-blue-600">TRAVELS</span>
                            <span className="text-orange-500">BOOK</span>
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-gray-700 hover:text-blue-600 transition font-medium ${pathName === link.href ? 'border-b border-black' : ""}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {
                            user
                                ?
                                <div className=" flex gap-2 items-center">
                                    <Avatar>
                                        <Avatar.Image alt="John Doe" src={user?.image} />
                                        <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                                    </Avatar>
                                    <Button
                                        onClick={handleLogOUt}
                                        variant="outline" color="primary">
                                        Log out
                                    </Button>
                                </div>
                                :

                                <div className=" space-x-1.5">
                                    <Link href={"/log-in"}>
                                        <Button variant="outline" color="primary">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href={"/register"}>
                                        <Button color="primary">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                        }

                    </div>

                    {/* Mobile Menu Icon */}
                    <button className="md:hidden">
                        <Menu size={28} />
                    </button>

                </div>
            </div>
        </nav>
    );
}