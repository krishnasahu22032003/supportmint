import EmbedClient from '@/components/ui/EmbedClient'
import EmbedHeader from '@/components/ui/EmbedHeader'
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation'

const EmbedPage = async () => {

    const user = await getSession();

    if (!user) {
        redirect('/')
    };

    return (
        <div>
            <EmbedHeader
                userName={user.name}
                userEmail={user.email}
            />
            <EmbedClient ownerId={user.id} />
        </div>
    );
};

export default EmbedPage ;