import { ClassCard } from '@/app/components/ClassCard';
import { mockClasses } from '@/app/data/classes';

export function UpcomingClasses() {
  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Upcoming Live Classes
          </h2>
          <p className="text-gray-600">
            Join interactive sessions with expert tutors from around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((classData) => (
            <ClassCard key={classData.id} classData={classData} />
          ))}
        </div>
      </div>
    </section>
  );
}
