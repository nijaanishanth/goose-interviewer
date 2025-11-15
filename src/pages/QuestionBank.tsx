import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { questionBank, getQuestionsByCategory, type InterviewQuestion, type QuestionCategory } from "@/lib/questionBank";
import { Badge } from "@/components/ui/badge";

const categories: (QuestionCategory | "all")[] = [
  "all",
  "behavioral",
  "technical",
  "situational",
  "leadership",
];

const QuestionBank = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | "all">("all");

  const visibleQuestions = useMemo(() => {
    let list: InterviewQuestion[] = [];
    if (selectedCategory === "all") list = questionBank;
    else list = getQuestionsByCategory(selectedCategory as QuestionCategory);

    if (!search.trim()) return list;

    const q = search.trim().toLowerCase();
    return list.filter((it) => it.question.toLowerCase().includes(q));
  }, [search, selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-2xl font-bold mb-1">Question Bank</h1>
            <p className="text-sm text-muted-foreground">Browse and pick questions by category or search the full bank.</p>
          </div>

          <div className="w-full sm:w-auto flex gap-3 items-center mt-4 sm:mt-0">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full sm:w-64"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as QuestionCategory | "all")}
              className="rounded-md border px-2 py-1 bg-card text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs text-muted-foreground mb-2">{visibleQuestions.length} question(s) found</div>
          <ScrollArea className="max-h-[60vh] rounded-md border border-border/40 p-2 bg-card/50">
            <div className="space-y-2">
              {visibleQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => navigate('/interview', { state: { questionId: q.id } })}
                  className="w-full text-left p-3 rounded-md bg-card/70 border border-border/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-sm text-foreground leading-relaxed">{q.question}</div>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <Badge variant="outline">{q.category}</Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};

export default QuestionBank;
