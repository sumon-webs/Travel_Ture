"use client";


import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AlertDialog, Button } from "@heroui/react";

export function DestinationDelete({ destination }) {
    const router = useRouter()


    const { _id, destinationName } = destination

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destination/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()
        console.log("After deletedData", data)

        if (data.deletedCount > 0) {
            router.push("/destinations")
            toast.warning(`${destinationName} delete success`)
        }
    }
    return (
        <AlertDialog>
            <Button variant="danger">Delete </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete destination permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>My Awesome Project</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}