import { Card } from "@/components/ui/card";

const ResumeReview = () => {
  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Mirror Lake Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: 'url(/mirror-lake.jpeg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lake-blue/40 via-grass-green/30 to-lake-light/40" />
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 text-4xl">🦆</div>
        <div className="absolute bottom-20 left-20 text-4xl">🦆</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl animate-pulse">⛲</div>
      </div>
      <div className="container mx-auto relative z-10">
        <Card variant="glass" className="p-8 animate-fade-in hover:shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue smooth-transition hover:scale-105">
            📄 Resume Review
          </h1>
          <p className="text-foreground/80">
            Coming soon: Get AI-powered feedback on your resume while enjoying the tranquil lake view.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ResumeReview;
