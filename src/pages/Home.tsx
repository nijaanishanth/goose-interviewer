import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="p-12 max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">🪿 Goose Interview Coach</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Practice interview questions with a friendly (but serious) goose. Improve your answers and get feedback in real time.
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="px-8" onClick={() => navigate('/interview')}>
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
