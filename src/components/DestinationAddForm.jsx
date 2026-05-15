'use client'

import { authClient } from "@/lib/auth-client";
import { FieldError, Form, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";
import { getSession } from "better-auth/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DestinationAddForm = () => {

    const router = useRouter()

    const handlePost = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newDestination = Object.fromEntries(formData.entries());

        const { data: tokenData } = await authClient.token()
        console.log(tokenData)

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                 authorization: `Bearer ${tokenData?.token}`
            },
            body: JSON.stringify(newDestination)
        })

        const data = await res.json()

        if (data.acknowledged) {
            toast.success(`${newDestination.destinationName} added successfull in server`);
            router.push("/destinations")

        }
    }

    return (
        <div className=" max-w-7xl mx-auto ">

            <h1 className=" py-8 text-2xl font-semibold text-center">Add a destination</h1>

            <Card className=" max-w-4xl mx-auto">

                <Form
                    onSubmit={handlePost}
                    className="p-10 space-y-8 "
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Destination Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired>
                                <Label>Destination Name</Label>
                                <Input placeholder="Enter destination Name" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Country */}
                        <TextField name="country" isRequired>
                            <Label>Country</Label>
                            <Input placeholder="Enter place name" className="rounded-2xl" />
                            <FieldError />
                        </TextField>

                        {/* Category - Updated Select Component */}
                        <div>
                            <Select
                                name="category"
                                isRequired
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Category</Label>
                                <Select.Trigger className="rounded-2xl">
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        <ListBox.Item id="Beach" textValue="Beach">
                                            Beach
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Mountain" textValue="Mountain">
                                            Mountain
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="City" textValue="City">
                                            City
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Adventure" textValue="Adventure">
                                            Adventure
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Cultural" textValue="Cultural">
                                            Cultural
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                        <ListBox.Item id="Luxury" textValue="Luxury">
                                            Luxury
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Price */}
                        <TextField name="price" type="number" isRequired>
                            <Label>Price (USD)</Label>
                            <Input
                                type="number"
                                placeholder="Enter balance"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Duration */}
                        <TextField name="duration" isRequired>
                            <Label>Duration</Label>
                            <Input
                                placeholder="Enter days, ex:7days"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Departure Date */}
                        <div className="md:col-span-2">
                            <TextField name="departureDate" type="date" isRequired>
                                <Label>Departure Date</Label>
                                <Input type="date" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Image URL - Removed preview */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="Input image url ex:https://example.com/bali-paradise.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Describe the travel experience..."
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                    </div>

                    {/* Buttons */}

                    <Button
                        type="submit"
                        variant="outline"
                        className=" rounded-none w-full bg-cyan-500 text-white"
                    >
                        Add destination
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default DestinationAddForm;