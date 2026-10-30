import Hero from './components/Hero';
import PublisherBar from './components/PublisherBar';
import WhatWeDo from './components/WhatWeDo';
import HowItWorks from './components/HowItWorks';
import Personas from './components/Personas';
import Proof from './components/Proof';
import ScreenNetwork from './components/ScreenNetwork';
import Faq from './components/Faq';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="overflow-x-clip bg-brand font-sans text-white">
      <Hero />
      <PublisherBar />
      <WhatWeDo />
      <HowItWorks />
      <Personas />
      <Proof />
      <ScreenNetwork />
      <Faq />
      <Footer />
      <ChatWidget />
    </div>
  );
}
