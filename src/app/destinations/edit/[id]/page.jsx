import DestinationEditForm from '@/components/DestinationEditForm copy';
import React from 'react';

const EditIdPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${id}`);

    const destination = await res.json();

  

    return (
        <div>
            <DestinationEditForm destination={destination} />
        </div>
    );
};

export default EditIdPage;