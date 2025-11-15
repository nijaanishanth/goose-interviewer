import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(217,50%,18%)] via-[hsl(215,30%,22%)] to-[hsl(25,40%,25%)]">
      <Card className="p-12 max-w-2xl text-center bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-sm border-border/50 shadow-2xl">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          🪿 Goose Interview Coach
        </h1>
        <p className="text-lg text-foreground/90 mb-8">
          Practice interview questions with a friendly (but serious) goose. Improve your answers and get feedback in real time.
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="px-8 shadow-lg" onClick={() => navigate('/interview')}>
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
