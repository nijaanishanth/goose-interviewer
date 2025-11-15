import { Card } from "@/components/ui/card";

const ResumeReview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-blue p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 text-4xl">🦆</div>
        <div className="absolute bottom-20 left-20 text-4xl">🦆</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-6xl animate-pulse">⛲</div>
      </div>
      <div className="container mx-auto relative z-10">
        <Card className="p-8 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue">
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
