import { Card } from "@/components/ui/card";

const TalkToIndustry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(217,50%,18%)] via-[hsl(215,30%,22%)] to-[hsl(25,40%,25%)] p-8">
      <div className="container mx-auto">
        <Card className="p-8 bg-white">
          <h1 className="text-4xl font-bold mb-4 text-[hsl(217,91%,35%)]">
            💼 Talk to Industry
          </h1>
          <p className="text-slate-600">
            Coming soon: Connect with industry professionals for mentorship and advice.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default TalkToIndustry;
