import { useState } from "react";
 import { Check } from "lucide-react";
interface Step {
  id: number;
  label: string;
  progress: number; 
}

export const TestSteps = () => {
    const [steps, setSteps] = useState<Step[]>([
        { id: 1, label: "Teste conexão IP", progress: 0 },
        { id: 2, label: "Autenticação usuário", progress: 0 },
        { id: 3, label: "Comunicação algoritmo", progress: 0 },
        { id: 4, label: "Dispositivo liberado", progress: 0 },
    ]);
    const advanceStep = (id: number) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, progress: Math.min(4, s.progress + 1) }
          : s
      )
    );
  };



const renderCircle = (progress: number) => {
  const active = "border-green-500";
  const inactive = "border-gray-300";

  return (
    <div className="w-8 h-8 relative flex items-center justify-center">
      {/* círculo externo */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-200" />

      {/* quadrantes */}
      <div
        className={`absolute inset-0 rounded-full border-t-2 ${
          progress >= 1 ? active : inactive
        }`}
      />
      <div
        className={`absolute inset-0 rounded-full border-r-2 ${
          progress >= 2 ? active : inactive
        }`}
      />
      <div
        className={`absolute inset-0 rounded-full border-b-2 ${
          progress >= 3 ? active : inactive
        }`}
      />
      <div
        className={`absolute inset-0 rounded-full border-l-2 ${
          progress >= 4 ? active : inactive
        }`}
      />

      {/* ícone no centro */}
      <Check
        size={20}
        className={`transition-colors duration-300 ${
          progress === 4 ? "text-green-500" : "text-gray-300"
        }`}
      />
    </div>
  );
};

  const getClip = (progress: number) => {
    // cada quadrante ocupa 25% do círculo
    switch (progress) {
      case 1: return "polygon(50% 50%, 0 0, 100% 0)"; // top
      case 2: return "polygon(50% 50%, 0 0, 100% 0, 100% 100%)"; // right
      case 3: return "polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)"; // bottom
      case 4: return "circle(100% at 50% 50%)"; // full
      default: return "none";
    }
  };
  const [testing, setTesting] = useState(false);
  const [testPassed, setTestPassed] = useState(false);
  const [message, setMessage] = useState("");
    const handleTestConnection = async (ip: string) => {
    setTesting(true);
    setMessage("Testando conexão...");
    try {
      const res = await fetch("/api/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ip }),
      });

      const result = await res.json();
      if (result.success) {
        setTestPassed(true);
        setMessage("✅ Conexão bem sucedida!");
      } else {
        setTestPassed(false);
        setMessage("❌ Falha ao conectar no dispositivo.");
      }
    } catch (err) {
      setTestPassed(false);
      setMessage("⚠️ Erro no teste.");
    } finally {
      setTesting(false);
    }
  };
  return (
    <div className="space-y-4 p-4 w-1/2">
      {steps.map((step) => (
        <div key={step.id} className="flex justify-between">
        <div className="flex gap-4 items-center">


          {renderCircle(step.progress)}
          <span className="text-sm">{step.label}</span>
        </div>
          <button
            onClick={() => advanceStep(step.id)}
            className="px-2 py-1 text-xs rounded bg-blue-500 text-white"
            >
            Avançar
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const ipField = (document.querySelector<HTMLInputElement>("input[name='ip']"));
          if (ipField?.value) handleTestConnection(ipField.value);
        }}
        disabled={testing}
        className="px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
      >
        {testing ? "Testando..." : "Testar conexão"}
      </button>
    </div>
  )
}