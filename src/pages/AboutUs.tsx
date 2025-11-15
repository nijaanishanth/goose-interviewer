import { Card } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-blue p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl animate-pulse">⛲</div>
        <div className="absolute bottom-10 left-20 text-4xl">🦆</div>
        <div className="absolute bottom-10 right-20 text-4xl">🦆</div>
      </div>
      <div className="container mx-auto relative z-10">
        <Card className="p-8 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue">
            ℹ️ About Us
          </h1>
          <p className="text-foreground/80 mb-4">
            Goose Interview Coach is your friendly companion for interview preparation, nestled by a peaceful lake.
          </p>
          <p className="text-foreground/80">
            We help job seekers practice and improve their interview skills with AI-powered feedback in a calm, natural environment. 🦆🌸
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
