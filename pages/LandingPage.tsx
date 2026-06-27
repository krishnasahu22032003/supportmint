import Header from '@/components/landing/Header'
import HeroSection from '@/components/landing/Hero';


type Props = {}

const LandingPage = (props: Props) => {
  return (
    <main className='min-h-screen'>
<Header/>
<HeroSection/>
    </main>
  )
}

export default LandingPage ; 