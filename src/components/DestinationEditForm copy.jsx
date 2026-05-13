'use client'
import { FieldError, Form, Input, Label, TextField, Select, ListBox, TextArea, Button, Card } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";



const DestinationEditForm = ({ destination }) => {
    const router = useRouter()

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
    } = destination;

    const handleEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const newDestination = Object.fromEntries(formData.entries());

        const res = await fetch(`https://travels-server-secm.onrender.com/destination/${_id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newDestination)
        })

        const data = await res.json()

        if (data.modifiedCount > 0) {
            toast.success("Edit success")
            router.push(`/destinations/${_id}`)
        }

        if(data.modifiedCount == 0) {
            toast.warning("You not update your data")
        }

    }

    return (
        <div className=" max-w-7xl mx-auto ">

            <h1 className=" py-8 text-2xl font-semibold text-center">Edit destination</h1>
            <div className=" flex justify-end">
                <Link href={`/destinations/${_id}`}>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-5 py-2 rounded-xl border-gray-300 hover:bg-gray-100 transition-all duration-200"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Button>

                </Link>
            </div>
            <Card className=" max-w-4xl mx-auto">

                <Form
                    onSubmit={handleEdit}
                    className="p-10 space-y-8 "
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Destination Name */}
                        <div className="md:col-span-2">
                            <TextField name="destinationName" isRequired defaultValue={destinationName}>
                                <Label>Destination Name</Label>
                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Country */}
                        <TextField name="country" isRequired defaultValue={country}>
                            <Label>Country</Label>
                            <Input placeholder="Indonesia" className="rounded-2xl" />
                            <FieldError />
                        </TextField>

                        {/* Category - Updated Select Component */}
                        <div>
                            <Select defaultValue={category}
                                name="category"
                                isRequired
                                className="w-full"
                                placeholder="Select category"
                            >
                                <Label>Category</Label>
                                <Select.Trigger className="rounded-2xl ">
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
                        <TextField name="price" type="number" isRequired defaultValue={price}>
                            <Label>Price (USD)</Label>
                            <Input
                                type="number"
                                placeholder="1299"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Duration */}
                        <TextField name="duration" isRequired defaultValue={duration}>
                            <Label>Duration</Label>
                            <Input
                                placeholder="7 Days / 6 Nights"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>

                        {/* Departure Date */}
                        <div className="md:col-span-2">
                            <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                                <Label>Departure Date</Label>
                                <Input type="date" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Image URL - Removed preview */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired defaultValue={description}>
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
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default DestinationEditForm;