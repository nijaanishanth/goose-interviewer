import { useEffect, useState } from "react";
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
  const [liveFeedback, setLiveFeedback] = useState<string>("");
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [isGeneratingLiveFeedback, setIsGeneratingLiveFeedback] = useState(false);
  const { transcript, isListening, isSpeaking, startListening, stopListening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
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

  // Debounced live feedback while the user is speaking / interim transcript updates
  useEffect(() => {
    if (!currentQuestion) return;
    if (!transcript || !transcript.trim()) {
      setLiveFeedback("");
      return;
    }

    // Only request live feedback while listening to avoid spamming when not in an answer
    if (!isListening) return;

    const controller = new AbortController();
    const id = setTimeout(async () => {
      setIsGeneratingLiveFeedback(true);
      try {
        const { data, error } = await supabase.functions.invoke('interview-feedback', {
          body: {
            question: currentQuestion.question,
            transcript: transcript,
            // hint to server this is a live/partial request
            partial: true,
          },
          signal: controller.signal,
        });

        if (error) throw error;
        setLiveFeedback(data.feedback || "");
      } catch (err: unknown) {
        // Narrow the unknown to an object with an optional `name` property without using `any`
        if (typeof err === 'object' && err !== null && 'name' in err && (err as { name?: unknown }).name === 'AbortError') return;
        console.error('Live feedback error:', err);
      } finally {
        setIsGeneratingLiveFeedback(false);
      }
    }, 1200); // 1.2s debounce after last interim update

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [transcript, isListening, currentQuestion]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header Section */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-3">
              <span className="text-5xl">🪿</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Goose Interview Coach
            </h1>
            <p className="text-sm text-muted-foreground">
              Practice with AI-powered feedback
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* Left Panel - Goose Avatar */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8 h-full min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-goose-orange/5 via-goose-yellow/5 to-transparent border border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-center space-y-4">
                <div className="text-8xl sm:text-9xl animate-pulse">🪿</div>
                <div className="space-y-2">
                  <p className="text-lg sm:text-xl font-semibold text-foreground">
                    Ready to Practice
                  </p>
                  <p className="text-sm text-muted-foreground">Video avatar coming soon</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Interactions */}
          <div className="lg:col-span-1 space-y-4">
            {/* Interview Question Display */}
            <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">
                  Interview Question
                </h2>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50 min-h-[80px]">
                {currentQuestion ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground leading-relaxed">{currentQuestion.question}</p>
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {currentQuestion.category}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Click start to begin your interview practice.</p>
                )}
              </div>
            </Card>

            {/* Live Transcript */}
            <Card className="p-4 shadow-md border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Mic className="h-4 w-4 text-foreground" />
                <h2 className="text-sm font-semibold text-foreground">
                  Live Transcript
                </h2>
                <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isSpeaking ? 'bg-success-green/10 text-success-green' : 'bg-muted text-muted-foreground'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${isSpeaking ? 'bg-success-green animate-pulse' : 'bg-muted-foreground'}`} />
                  {isSpeaking ? 'Active' : 'Silent'}
                </span>
              </div>
              <ScrollArea className="h-32 rounded-lg border border-border/50 bg-muted/20 p-3">
                {transcript ? (
                  <p className="text-xs text-foreground leading-relaxed">{transcript}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Your speech will appear here...</p>
                )}
              </ScrollArea>
            </Card>

            {/* Feedback Section */}
            <Card className="p-4 bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-accent" />
                <h2 className="text-sm font-semibold text-foreground">
                  AI Feedback
                </h2>
              </div>
              
              {/* Live Feedback */}
              {(liveFeedback || isGeneratingLiveFeedback) && (
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50 mb-3 min-h-[60px]">
                  {isGeneratingLiveFeedback ? (
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      <p className="text-xs text-muted-foreground">Analyzing...</p>
                    </div>
                  ) : liveFeedback ? (
                    <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">{liveFeedback}</p>
                  ) : null}
                </div>
              )}
              
              {/* Final Feedback */}
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3 border border-border/50 min-h-[80px]">
                {isGeneratingFeedback ? (
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <p className="text-xs text-muted-foreground">Generating feedback...</p>
                  </div>
                ) : feedback ? (
                  <p className="text-xs text-foreground whitespace-pre-wrap leading-relaxed">{feedback}</p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">Complete your answer to receive feedback.</p>
                )}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full h-11 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                size="lg"
                onClick={handleStartInterview}
              >
                <Play className="mr-2 h-4 w-4" />
                Start New Question
              </Button>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline"
                  className="h-11 text-sm font-semibold border-2 hover:bg-success-green hover:text-white hover:border-success-green transition-all shadow-sm"
                  size="lg"
                  onClick={handleStartListening}
                  disabled={isListening}
                >
                  <Mic className="mr-1.5 h-4 w-4" />
                  {isListening ? "Listening..." : "Start"}
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-11 text-sm font-semibold border-2 hover:bg-destructive hover:text-white hover:border-destructive transition-all shadow-sm"
                  size="lg"
                  onClick={handleStopListening}
                  disabled={!isListening}
                >
                  <MicOff className="mr-1.5 h-4 w-4" />
                  Stop
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
