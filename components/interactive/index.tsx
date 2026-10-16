"use client";

import dynamic from "next/dynamic";
import type { InteractiveId } from "@/content/types";

const loading = () => <div className="lab lab-loading" aria-busy="true" />;

const labs: Record<InteractiveId, React.ComponentType> = {
  neuron: dynamic(() => import("./NeuronLab"), { loading, ssr: false }),
  "gradient-descent": dynamic(() => import("./GradientLab"), { loading, ssr: false }),
  overfitting: dynamic(() => import("./OverfitLab"), { loading, ssr: false }),
  embeddings: dynamic(() => import("./EmbeddingsLab"), { loading, ssr: false }),
  attention: dynamic(() => import("./AttentionLab"), { loading, ssr: false }),
  temperature: dynamic(() => import("./TemperatureLab"), { loading, ssr: false }),
  rag: dynamic(() => import("./RagLab"), { loading, ssr: false }),
  diffusion: dynamic(() => import("./DiffusionLab"), { loading, ssr: false }),
};

export function Interactive({ id }: { id: InteractiveId }) {
  const L = labs[id];
  return <L />;
}
