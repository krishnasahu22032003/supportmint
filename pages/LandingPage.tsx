import About from '@/components/landing/About';
import CTA from '@/components/landing/CTA';
import Features from '@/components/landing/Features';
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero';
import Testimonials from '@/components/landing/Testimonial';

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <main className='min-h-screen'>
<Header/>
<Hero/>
<Features/>
<About/>
<Testimonials/>
<CTA/>
    </main>
  )
}

export default LandingPage ; 