'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Placeholder for ProTrack API integration
// Replace with actual component or fetch logic from ProTrack GPS
const ProTrackMap = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-gray-200 rounded-2xl shadow-md">
      <p className="text-gray-600 text-lg">ProTrack GPS Map will render here</p>
    </div>
  );
};

const ProTrackDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [report, setReport] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    // Example call to your OpenAI backend API route (replace `/api/openai`)
    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setReport(data.response);
    } catch (err) {
      console.error("Error fetching AI route report:", err);
      setReport("❌ Failed to fetch report. Check console for details.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* ProTrack GPS Display */}
      <div className="flex-grow flex items-center justify-center">
        <ProTrackMap />
      </div>

      {/* AI Report + Prompt Section */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Route Safety & Incident Report
          </h2>

          {/* Generated Report */}
          {report && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm whitespace-pre-line">
              {report}
            </div>
          )}

          {/* Input + Button */}
          <div className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about incidents on this route..."
              className="flex-grow"
            />
            <Button onClick={handleSubmit}>Generate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProTrackDashboard;
