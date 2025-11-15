import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Mirror Lake Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/mirror-lake.jpeg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-lake-blue/40 via-grass-green/30 to-lake-light/40 backdrop-blur-[2px]" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-32 h-32 text-6xl">🌸</div>
        <div className="absolute bottom-0 right-0 w-32 h-32 text-6xl">🌷</div>
        <div className="absolute top-1/4 left-10 text-4xl">🦆</div>
        <div className="absolute top-1/3 right-20 text-4xl">🦆</div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-7xl animate-pulse">⛲</div>
      </div>
      
      <Card className="p-12 max-w-2xl text-center bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl relative z-10">
        <div className="mb-4">
          <span className="text-6xl">🪿</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-lake-blue">
          Goose Interview Coach
        </h1>
        <p className="text-lg text-foreground/80 mb-8">
          Practice interview questions with a friendly (but serious) goose by the peaceful lake. Improve your answers and get feedback in real time.
        </p>
        <div className="flex justify-center gap-2">
          <span className="text-2xl">🌸</span>
          <Button size="lg" className="px-8 shadow-lg bg-duck-orange hover:bg-duck-orange/90" onClick={() => navigate('/interview')}>
            Get Started
          </Button>
          <span className="text-2xl">🌸</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
