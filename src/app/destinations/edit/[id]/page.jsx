import DestinationEditForm from '@/components/DestinationEditForm copy';
import React from 'react';

const EditIdPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`https://travels-server-secm.onrender.com/${id}`, {
        cache: "no-store",
    });

    const destination = await res.json();

  

    return (
        <div>
            <DestinationEditForm destination={destination} />
        </div>
    );
};

export default EditIdPage;