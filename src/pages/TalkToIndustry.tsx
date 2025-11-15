import { Card } from "@/components/ui/card";

const TalkToIndustry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-blue p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-5 left-5 text-5xl">🌸</div>
        <div className="absolute bottom-5 right-5 text-5xl">🌷</div>
        <div className="absolute top-1/4 left-10 text-4xl">🦆</div>
        <div className="absolute top-1/4 right-10 text-4xl">🦆</div>
      </div>
      <div className="container mx-auto relative z-10">
        <Card className="p-8 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue">
            💼 Talk to Industry
          </h1>
          <p className="text-foreground/80">
            Coming soon: Connect with industry professionals for mentorship and advice by the serene lakeside.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TalkToIndustry;
