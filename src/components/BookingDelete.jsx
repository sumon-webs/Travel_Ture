"use client";


import { AlertDialog, Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function BookingDelete({id}) {

    const router = useRouter()
    const { data: session, iseLoading } = useSession()
    const user = session?.user

    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user?.id}/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await res.json()

        if (data.deletedCount > 0) {
            toast.error("Cancle suucess")
            router.push('/my-bookings')
        }
    }
    return (
        <AlertDialog>
            <Button fullWidth variant="danger">Cancle Booking </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete booking permanently?</AlertDialog.Heading>
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
                                Cancle Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}