"use client";

import { useState } from "react";
import { EditorToolbar } from "./EditorToolbar";
import { BlockWorkspace } from "./BlockWorkspace";
import { StageCanvas } from "./StageCanvas";
import { StageOverlay } from "./StageOverlay";
import { SpritePanel } from "./SpritePanel";
import { CodePreviewPanel } from "./CodePreviewPanel";
import { BackdropPanel } from "./BackdropPanel";

interface BlockEditorProps {
  projectId: string;
}

export function BlockEditor({ projectId }: BlockEditorProps) {
  const [running, setRunning] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [selectedSpriteId, setSelectedSpriteId] = useState("sprite_1");
  const [generatedCode, setGeneratedCode] = useState("");

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar
        projectId={projectId}
        running={running}
        onRun={() => setRunning(true)}
        onStop={() => setRunning(false)}
        showCode={showCode}
        onToggleCode={() => setShowCode(!showCode)}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Blockly Workspace */}
        <div className="flex-1 relative">
          <BlockWorkspace
            spriteId={selectedSpriteId}
            onCodeChange={setGeneratedCode}
          />
        </div>

        {/* Right panel: Stage + Sprites */}
        <div className="w-[520px] flex flex-col border-l border-[var(--border-light)] bg-[var(--bg-card)]">
          {/* Stage */}
          <div className="p-3">
            <div className="relative bg-white rounded-xl overflow-hidden border border-[var(--border-light)] shadow-sm">
              <StageCanvas width={480} height={360} />
              <StageOverlay />
            </div>
          </div>

          {/* Sprite Panel */}
          <div className="flex-1 border-t border-[var(--border-light)] overflow-y-auto">
            <SpritePanel
              selectedSpriteId={selectedSpriteId}
              onSelectSprite={setSelectedSpriteId}
            />
          </div>

          {/* Backdrop */}
          <div className="border-t border-[var(--border-light)]">
            <BackdropPanel />
          </div>
        </div>

        {/* Code Preview */}
        {showCode && (
          <div className="w-[360px] border-l border-[var(--border-light)]">
            <CodePreviewPanel code={generatedCode} />
          </div>
        )}
      </div>
    </div>
  );
}
