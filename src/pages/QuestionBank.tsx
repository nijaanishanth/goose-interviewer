import { Card } from "@/components/ui/card";

const QuestionBank = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-blue p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 text-4xl">🦆</div>
        <div className="absolute bottom-20 right-20 text-4xl">🦆</div>
        <div className="absolute top-1/3 right-10 text-3xl">🌸</div>
        <div className="absolute bottom-1/3 left-10 text-3xl">🌷</div>
      </div>
      <div className="container mx-auto relative z-10">
        <Card className="p-8 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue">
            📚 Question Bank
          </h1>
          <p className="text-foreground/80">
            Coming soon: Browse our comprehensive collection of interview questions by the peaceful lake.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QuestionBank;
