import toast from "react-hot-toast"

export const postBookingData = async( bookingData) =>{
    const res = await fetch(`http://localhost:5000/bookings`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(bookingData)
    })
    const data = await res.json()

    if(data.acknowledged){
        toast.success("Booking success")
    }
    else {
        toast.error("There is a problem")
    }

}

