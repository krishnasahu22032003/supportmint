import React from 'react'
import EmbedHeader from './EmbedHeader'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation';

const EmbedClient = async ({ ownerId }: { ownerId: string }) => {

    const user = await getSession();

    if (!user) {
        redirect("/")
    };

    return (
        <div>
            <EmbedHeader
                userName={user.name}
                userEmail={user.email} />
        </div>
    )
}

export default EmbedClient
