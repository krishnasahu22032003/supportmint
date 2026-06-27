import Header from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero';


type Props = {}

const LandingPage = (props: Props) => {
  return (
    <main className='min-h-screen'>
<Header/>
<Hero/>
    </main>
  )
}

export default LandingPage ; 