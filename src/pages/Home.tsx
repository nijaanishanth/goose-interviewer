import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-light relative overflow-hidden">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[40vh] px-4 py-8">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-0">
            {/* Left Illustration (Emoji) - Flush against title */}
            <div className="flex-shrink-0 mr-0 lg:mr-4">
              <span className="text-8xl lg:text-9xl block">🪿</span>
            </div>

            {/* Right Content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 text-lake-blue leading-tight">
                Goose Interview Coach
              </h1>
              <p className="text-lg text-foreground/80 mb-6">
                Polished interview prep guided by your AI coach. Friendly, focused, and built to help you shine.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Button size="lg" className="font-bold text-sm px-6 bg-duck-orange hover:bg-duck-orange/90 " onClick={() => navigate('/interview')}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex-1 py-16 px-4 bg-background/40 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          <h2 className="text-4xl font-bold text-center mb-12 text-lake-blue">
            Unlock Your Interview Success in 3 Steps!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
            {/* Step 1 */}
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-duck-orange text-white font-bold text-lg mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-lake-blue">
                Generate a Question
              </h3>
              <p className="text-foreground/80 text-center">
                Start with a question pulled from our customizable question bank. Tailored to your role and interview style.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-duck-orange text-white font-bold text-lg mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-lake-blue">
                Record Your Response
              </h3>
              <p className="text-foreground/80 text-center">
                Speak naturally and record your answer. Practice under realistic conditions to build confidence for the real interview.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 bg-card/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-duck-orange text-white font-bold text-lg mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-center mb-3 text-lake-blue">
                Get Real-Time Feedback
              </h3>
              <p className="text-foreground/80 text-center">
                Receive instant, constructive feedback from our smart coach. Learn what you did well and where to improve.
              </p>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="py-12 px-4 mt-2 text-center">
            <Button 
              size="lg" 
              className="bg-duck-orange hover:bg-duck-orange/90 rounded-full font-semibold px-8" 
              onClick={() => navigate('/interview')}
            >
              Start Your Interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
