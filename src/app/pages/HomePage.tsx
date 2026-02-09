import { Navbar } from '@/app/components/Navbar';
import { SearchFilter } from '@/app/components/SearchFilter';
import { UpcomingClasses } from '@/app/components/UpcomingClasses';
import { WhyPeerLearn } from '@/app/components/WhyPeerLearn';
import { Footer } from '@/app/components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <SearchFilter />
        <UpcomingClasses />
        <WhyPeerLearn />
      </main>
      <Footer />
    </div>
  );
}
