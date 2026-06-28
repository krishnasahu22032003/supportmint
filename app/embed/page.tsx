import EmbedClient from '@/components/ui/EmbedClient';
import { getSession } from '@/lib/getSession'
import { redirect } from 'next/navigation';

async function page() {
    const user=await getSession();

     if (!user) {
        redirect("/");
      }
   
  return (
    <>
      <EmbedClient ownerId={user.id}/>
    </>
  )
}

export default page;
