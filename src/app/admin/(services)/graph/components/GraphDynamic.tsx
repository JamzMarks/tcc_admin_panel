'use client'
import dynamic from "next/dynamic";

const GraphWrapper = dynamic(
  () => import("./GraphWrapper").then(mod => mod.GraphWrapper),
  { ssr: false }
);

export default function GraphDynamic() {
  return <GraphWrapper />;
}
