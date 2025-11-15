import { Card } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(217,50%,18%)] via-[hsl(215,30%,22%)] to-[hsl(25,40%,25%)] p-8">
      <div className="container mx-auto">
        <Card className="p-8 bg-white">
          <h1 className="text-4xl font-bold mb-4 text-[hsl(217,91%,35%)]">
            ℹ️ About Us
          </h1>
          <p className="text-slate-600 mb-4">
            Goose Interview Coach is your friendly companion for interview preparation.
          </p>
          <p className="text-slate-600">
            We help job seekers practice and improve their interview skills with AI-powered feedback.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
