import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import DocumentEditor from "./editor/DocumentEditor";
import CollaborationPanel from "./editor/CollaborationPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Untitled Document</h1>
            <span className="text-sm text-muted-foreground">Saved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["Alice", "Bob", "Charlie"].map((name, i) => (
                <div
                  key={name}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground ring-2 ring-background"
                  style={{
                    backgroundColor: ["#4f46e5", "#0ea5e9", "#10b981"][i],
                  }}
                >
                  {name[0]}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              3 collaborators
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-6 py-6 flex gap-6">
        <Card className="flex-1 border shadow-sm">
          <CardContent className="p-0">
            <DocumentEditor />
          </CardContent>
        </Card>

        <div className="w-80 shrink-0">
          <CollaborationPanel />
        </div>
      </div>
    </div>
  );
}
