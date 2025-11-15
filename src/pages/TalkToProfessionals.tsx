import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type CareerFair = {
  id: string;
  title: string;
  date: string; // ISO
  location: string;
  companies: string[];
};

// Mocked upcoming Ohio State University career fairs (sample data)
const fairs: CareerFair[] = [
  {
    id: 'osu-fall-2025-tech',
    title: 'OSU Fall Career Fair - Tech & Engineering',
    date: '2025-10-15T10:00:00Z',
    location: 'Ohio Union, Columbus, OH',
    companies: ['Google', 'Microsoft', 'Amazon', 'Oracle', 'IBM', 'Cisco', 'Salesforce', 'Red Hat']
  },
  {
    id: 'osu-fall-2025-general',
    title: 'OSU Fall Career Fair - All Majors',
    date: '2025-10-16T12:00:00Z',
    location: 'Covelli Center, Columbus, OH',
    companies: ['Deloitte', 'PwC', 'KPMG', 'EY', 'Accenture', 'Procter & Gamble', 'Nationwide', 'JP Morgan']
  }
];

const TalkToProfessionals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lake-light via-grass-green/30 to-lake-blue p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-5 left-5 text-5xl">🌸</div>
        <div className="absolute bottom-5 right-5 text-5xl">🌷</div>
        <div className="absolute top-1/4 left-10 text-4xl">🦆</div>
        <div className="absolute top-1/4 right-10 text-4xl">🦆</div>
      </div>

      <div className="container mx-auto relative z-10">
        <Card className="p-8 bg-card/95 backdrop-blur-sm border border-border/50 shadow-xl mb-6">
          <h1 className="text-4xl font-bold mb-4 text-lake-blue">💬 Talk to Professionals</h1>
          <p className="text-foreground/80">Find upcoming Ohio State University career fairs and the companies attending. Use this to plan which events to attend and which companies to prepare for.</p>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fairs.map((fair) => (
            <Card key={fair.id} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{fair.title}</h2>
                  <p className="text-sm text-muted-foreground">{new Date(fair.date).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{fair.location}</p>
                </div>
                <Badge variant="outline">OSU</Badge>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Companies attending</h3>
                <ScrollArea className="max-h-40 rounded-md border border-border/40 p-3 bg-card/50">
                  <ul className="space-y-2">
                    {fair.companies.map((c) => (
                      <li key={c} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-sm text-muted-foreground">
          <p>Note: This list is a sample/mock. For official and live OSU career fair details, visit the Ohio State University career services website.</p>
        </div>
      </div>
    </div>
  );
};

export default TalkToProfessionals;
