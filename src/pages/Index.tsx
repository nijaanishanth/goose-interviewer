import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              🪿 Goose Interview Coach
            </h1>
            <p className="text-lg text-muted-foreground">
              Practice interview questions with a friendly (but serious) goose.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Panel - Goose Avatar (60% width on desktop) */}
          <div className="lg:col-span-3">
            <Card className="p-8 h-full min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-goose-orange/10 to-goose-yellow/10 border-2 border-goose-orange/20">
              <div className="text-center space-y-4">
                <div className="text-9xl animate-pulse">🪿</div>
                <p className="text-xl font-semibold text-foreground">
                  Goose Avatar
                </p>
                <p className="text-muted-foreground">(video goes here)</p>
              </div>
            </Card>
          </div>

          {/* Right Panel - Interactions (40% width on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interview Question Display */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Interview Question
              </h2>
              <div className="bg-card rounded-lg p-4 border">
                <p className="text-foreground">
                  Click start to get your first interview question.
                </p>
              </div>
            </Card>

            {/* Live Transcript */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Live Transcript
              </h2>
              <ScrollArea className="h-40 rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground italic">
                  Your speech will appear here in real-time...
                </p>
              </ScrollArea>
            </Card>

            {/* Feedback Section */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Feedback from the Goose
              </h2>
              <div className="bg-card rounded-lg p-4 border min-h-[100px]">
                <p className="text-muted-foreground italic">
                  Feedback will appear here after analysis.
                </p>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Interview
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className="h-12 font-semibold border-2 hover:bg-success-green hover:text-white hover:border-success-green transition-colors"
                  size="lg"
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Listening
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-12 font-semibold border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
                  size="lg"
                >
                  <MicOff className="mr-2 h-5 w-5" />
                  Stop Listening
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
