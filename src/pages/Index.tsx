import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Mic, MicOff, Sparkles } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { getRandomQuestion, type InterviewQuestion } from "@/lib/questionBank";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const { transcript, isListening, startListening, stopListening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { toast } = useToast();

  const handleStartInterview = () => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setFeedback("");
    resetTranscript();
    toast({
      title: "New Question",
      description: "Read the question and click 'Start Listening' when ready to answer.",
    });
  };

  const handleStartListening = () => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }
    if (!currentQuestion) {
      toast({
        title: "No Question",
        description: "Please start the interview first.",
        variant: "destructive",
      });
      return;
    }
    resetTranscript();
    startListening();
  };

  const handleStopListening = () => {
    stopListening();
  };

  const handleGetFeedback = async () => {
    if (!currentQuestion || !transcript.trim()) {
      toast({
        title: "Missing Information",
        description: "Please answer the question before requesting feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingFeedback(true);
    setFeedback("");

    try {
      const { data, error } = await supabase.functions.invoke('interview-feedback', {
        body: {
          question: currentQuestion.question,
          transcript: transcript,
        },
      });

      if (error) throw error;

      setFeedback(data.feedback);
      toast({
        title: "Feedback Ready",
        description: "The goose has analyzed your response!",
      });
    } catch (error) {
      console.error('Error getting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to generate feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

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
                <div className="bg-card rounded-lg p-4 border min-h-[80px]">
                  {currentQuestion ? (
                    <div>
                      <p className="text-foreground font-medium mb-2">{currentQuestion.question}</p>
                      <p className="text-sm text-muted-foreground">Category: {currentQuestion.category}</p>
                    </div>
                  ) : (
                    <p className="text-foreground">Click start to get your first interview question.</p>
                  )}
                </div>
            </Card>

            {/* Live Transcript */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Live Transcript
              </h2>
              <ScrollArea className="h-40 rounded-lg border bg-muted/30 p-4">
                {transcript ? (
                  <p className="text-sm text-foreground">{transcript}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Your speech will appear here in real-time...</p>
                )}
              </ScrollArea>
            </Card>

            {/* Feedback Section */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Feedback from the Goose
              </h2>
              <div className="bg-card rounded-lg p-4 border min-h-[100px]">
                {isGeneratingFeedback ? (
                  <p className="text-sm text-foreground">Generating feedback...</p>
                ) : feedback ? (
                  <p className="text-sm text-foreground whitespace-pre-wrap">{feedback}</p>
                ) : (
                  <p className="text-muted-foreground italic">Feedback will appear here after analysis.</p>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-12 text-base font-semibold"
                size="lg"
                onClick={handleStartInterview}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Interview
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline"
                  className="h-12 font-semibold border-2 hover:bg-success-green hover:text-white hover:border-success-green transition-colors"
                  size="lg"
                  onClick={handleStartListening}
                >
                  <Mic className="mr-2 h-5 w-5" />
                  Start Listening
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-12 font-semibold border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-colors"
                  size="lg"
                  onClick={handleStopListening}
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
