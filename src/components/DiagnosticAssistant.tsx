"use client";

import { useState } from "react";
import {
  WrenchIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  CurrencyRupeeIcon,
  SparklesIcon,
  ArrowPathIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

export interface DiagnosisData {
  response_type?: "text" | "diagnosis";
  text_response?: string;
  diagnosis_title?: string;
  explanation?: string;
  severity_level?: "High" | "Medium" | "Low" | string;
  is_safe_to_drive?: boolean;
  estimated_cost?: {
    currency?: string;
    parts_min?: number;
    parts_max?: number;
    labor_min?: number;
    labor_max?: number;
  };
  diy_difficulty_1_to_10?: number;
  suggested_next_steps?: string[];
}

export default function DiagnosticAssistant() {
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Fortuner");
  const [year, setYear] = useState("2021");
  const [mileage, setMileage] = useState("60,000 km");
  const [location, setLocation] = useState("Mumbai, India");
  const [symptoms, setSymptoms] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);
  const [isDemoFallback, setIsDemoFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  const [demoUsageCount, setDemoUsageCount] = useState(0);
  const MAX_WEBSITE_DEMO_QUERIES = 3;

  const samplePresets = [
    { label: "P0300 Misfire & Rough Idle", text: "OBD2 Code P0300 random cylinder misfire, engine shaking at idle, check engine light flashing." },
    { label: "Brakes High Squeal", text: "High-pitched screeching noise when pressing brake pedal at low speeds." },
    { label: "Overheating at Red Lights", text: "Temperature gauge spikes to hot while idling at traffic lights, cools down when driving." },
    { label: "Clicking Noise on Turn", text: "Popping or clicking sound coming from front wheels during sharp left and right turns." },
  ];

  const handlePresetClick = (presetText: string) => {
    setSymptoms(presetText);
    setError(null);
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      setError("Please describe the vehicle symptoms or enter OBD2 fault codes.");
      return;
    }

    if (demoUsageCount >= MAX_WEBSITE_DEMO_QUERIES) {
      setError("Website interactive demo limit reached (3/3). Download the AutoLog mobile app for full access to Otto, your AI Master Mechanic!");
      return;
    }

    setLoading(true);
    setError(null);
    setDiagnosis(null);
    setIsDemoFallback(false);

    const steps = [
      "Analyzing vehicle telemetry and symptoms...",
      "Consulting master mechanic knowledge base...",
      "Estimating parts and labor cost split...",
      "Evaluating safety risk and DIY complexity...",
    ];

    let currentStep = 0;
    setLoadingStep(steps[0]);
    const stepInterval = setInterval(() => {
      currentStep = (currentStep + 1) % steps.length;
      setLoadingStep(steps[currentStep]);
    }, 800);

    try {
      const response = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms,
          make,
          model,
          year: parseInt(year, 10) || 2021,
          mileage,
          location,
        }),
      });

      const json = await response.json();
      clearInterval(stepInterval);

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to retrieve diagnosis.");
      }

      setDiagnosis(json.data);
      setDemoUsageCount((prev) => prev + 1);
      if (json.is_demo_fallback) {
        setIsDemoFallback(true);
      }
    } catch (err: unknown) {
      clearInterval(stepInterval);
      setError((err as Error)?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyDiagnosisSummary = () => {
    if (!diagnosis) return;
    if (diagnosis.text_response || diagnosis.response_type === "text") {
      const text = `AutoLog AI Mechanic: ${diagnosis.text_response || diagnosis.explanation}`;
      navigator.clipboard.writeText(text);
    } else {
      const text = `AutoLog AI Diagnosis: ${diagnosis.diagnosis_title || "Vehicle Diagnosis"}
Severity: ${diagnosis.severity_level || "N/A"} | Safe to drive: ${diagnosis.is_safe_to_drive ? "Yes" : "No"}
Explanation: ${diagnosis.explanation || ""}
Parts Cost: ${diagnosis.estimated_cost?.currency || "INR"} ${diagnosis.estimated_cost?.parts_min || 0} - ${diagnosis.estimated_cost?.parts_max || 0}
Labor Cost: ${diagnosis.estimated_cost?.currency || "INR"} ${diagnosis.estimated_cost?.labor_min || 0} - ${diagnosis.estimated_cost?.labor_max || 0}
DIY Score: ${diagnosis.diy_difficulty_1_to_10 || "N/A"}/10
Next Steps:
${(diagnosis.suggested_next_steps || []).map((s, i) => `${i + 1}. ${s}`).join("\n")}`;

      navigator.clipboard.writeText(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper calculation for total & cost ratios
  const totalMin = diagnosis?.estimated_cost
    ? (diagnosis.estimated_cost.parts_min || 0) + (diagnosis.estimated_cost.labor_min || 0)
    : 0;
  const totalMax = diagnosis?.estimated_cost
    ? (diagnosis.estimated_cost.parts_max || 0) + (diagnosis.estimated_cost.labor_max || 0)
    : 0;
  const avgParts = diagnosis?.estimated_cost
    ? ((diagnosis.estimated_cost.parts_min || 0) + (diagnosis.estimated_cost.parts_max || 0)) / 2
    : 0;
  const avgLabor = diagnosis?.estimated_cost
    ? ((diagnosis.estimated_cost.labor_min || 0) + (diagnosis.estimated_cost.labor_max || 0)) / 2
    : 0;
  const partsRatio = avgParts + avgLabor > 0 ? (avgParts / (avgParts + avgLabor)) * 100 : 50;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Website Demo Mode Banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between text-amber-300 text-sm">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong>Interactive Website Demo ({demoUsageCount}/{MAX_WEBSITE_DEMO_QUERIES} queries used)</strong> — Live AI features available on AutoLog App.
          </span>
        </div>
        <a
          href="https://apps.apple.com/us/app/autolog-vehicle-manager/id6757113052"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
        >
          Download App
        </a>
      </div>

      {/* Header Banner */}
      <div className="glass-card p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <WrenchIcon className="w-64 h-64 text-indigo-400" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
          <SparklesIcon className="w-4 h-4" /> AI Mechanic Triage
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Vehicle Diagnostic Assistant
        </h1>
        <p className="text-slate-400 mt-3 max-w-2xl mx-auto text-sm md:text-base">
          Describe any symptom, noise, or OBD2 error code. Otto, your personal, impartial master mechanic, will analyze the issue, assess driving safety, and break down repair costs into parts vs. labor to prevent you from paying for unnecessary repairs.
        </p>
      </div>

      {/* Main Input Form */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <form onSubmit={handleDiagnose} className="space-y-6">
          {/* Active Vehicle Context Fields */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Active Vehicle Context
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div>
                <span className="text-[11px] text-slate-500">Make</span>
                <input
                  type="text"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Make"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500">Model</span>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Model"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500">Year</span>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Year"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-500">Mileage</span>
                <input
                  type="text"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Mileage"
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <span className="text-[11px] text-slate-500">Location</span>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Location"
                />
              </div>
            </div>
          </div>

          {/* Symptoms & OBD2 Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Symptoms or OBD2 Fault Codes
              </label>
            </div>
            <textarea
              rows={4}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Code P0300 random misfire, engine shaking when idle, or high pitched squeal when applying brakes..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-base text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
            />
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-xs font-medium text-slate-400 block mb-2">
              Quick Test Prompts:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handlePresetClick(preset.text)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 text-xs font-medium text-slate-300 hover:text-white transition-all text-left"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-premium flex items-center justify-center gap-3 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 transition-all"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>{loadingStep}</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5 text-indigo-200" />
                <span>Run Diagnostic Triage</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Demo Fallback Notice */}
      {isDemoFallback && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ExclamationTriangleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Demo Mode:</strong> <code className="bg-black/30 px-1.5 py-0.5 rounded">OPENAI_API_KEY</code> is not configured. Showing realistic fallback diagnostic data.
            </span>
          </div>
        </div>
      )}

      {/* Diagnosis Result Card */}
      {diagnosis && (
        <div className="glass-card p-6 md:p-8 space-y-8 animate-fadeIn border-indigo-500/30">
          {diagnosis.response_type === "text" || (diagnosis.text_response && !diagnosis.estimated_cost) ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                <WrenchIcon className="w-4 h-4 text-indigo-400" /> Master Mechanic Response
              </div>
              <p className="text-slate-200 text-base leading-relaxed">
                {diagnosis.text_response || diagnosis.explanation}
              </p>
            </div>
          ) : (
            <>
              {/* Top Bar: Title & Severity */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <WrenchIcon className="w-4 h-4 text-indigo-400" /> Triage Result
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {diagnosis.diagnosis_title || "Vehicle Diagnosis"}
                  </h2>
                </div>

            <div className="flex items-center gap-3">
              {/* Severity Level Badge */}
              {diagnosis.severity_level?.toLowerCase() === "high" && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 font-bold text-sm">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-400 animate-pulse" />
                  <span>High Severity</span>
                </div>
              )}
              {diagnosis.severity_level?.toLowerCase() === "medium" && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-sm">
                  <ExclamationCircleIcon className="w-5 h-5 text-amber-400" />
                  <span>Medium Severity</span>
                </div>
              )}
              {diagnosis.severity_level?.toLowerCase() === "low" && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-sm">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                  <span>Low Severity</span>
                </div>
              )}
            </div>
          </div>

          {/* Safety Warning Banner */}
          <div>
            {!diagnosis.is_safe_to_drive ? (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-3">
                <ShieldExclamationIcon className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-red-400">Driving Safety Risk: Not Safe to Drive</h4>
                  <p className="text-xs text-red-300/90 mt-0.5">
                    Continued driving may cause severe mechanical failure or engine damage. Immediate roadside repair or towing recommended.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-3">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-emerald-400">Safe to Drive</h4>
                  <p className="text-xs text-emerald-300/90 mt-0.5">
                    Vehicle can be safely driven to your local workshop. Avoid aggressive driving or excessive loads until inspected.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Mechanic Explanation
            </h3>
            <p className="text-slate-200 text-sm leading-relaxed">
              {diagnosis.explanation}
            </p>
          </div>

          {/* Cost Breakdown Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CurrencyRupeeIcon className="w-4 h-4 text-emerald-400" />
                Estimated Cost Breakdown ({diagnosis.estimated_cost?.currency || "INR"})
              </h3>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Fair Market Estimate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Parts Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block font-medium">Parts Estimate</span>
                <span className="text-xl font-black text-white mt-1 block">
                  {diagnosis.estimated_cost?.currency || "INR"} {diagnosis.estimated_cost?.parts_min?.toLocaleString()} - {diagnosis.estimated_cost?.parts_max?.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">Component replacement cost</span>
              </div>

              {/* Labor Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block font-medium">Labor Estimate</span>
                <span className="text-xl font-black text-white mt-1 block">
                  {diagnosis.estimated_cost?.currency || "INR"} {diagnosis.estimated_cost?.labor_min?.toLocaleString()} - {diagnosis.estimated_cost?.labor_max?.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">Workshop technician labor</span>
              </div>

              {/* Total Estimated Cost */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-500/30">
                <span className="text-xs text-indigo-300 block font-bold">Total Repair Range</span>
                <span className="text-xl font-black text-indigo-300 mt-1 block">
                  {diagnosis.estimated_cost?.currency || "INR"} {totalMin.toLocaleString()} - {totalMax.toLocaleString()}
                </span>
                <span className="text-[11px] text-indigo-400/80 mt-1 block">Combined Parts + Labor</span>
              </div>
            </div>

            {/* Visual Parts vs Labor Progress Split Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Parts ({Math.round(partsRatio)}%)</span>
                <span>Labor ({Math.round(100 - partsRatio)}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{ width: `${partsRatio}%` }}
                />
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${100 - partsRatio}%` }}
                />
              </div>
            </div>
          </div>

          {/* DIY Difficulty & Suggested Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* DIY Difficulty Score */}
            {diagnosis.diy_difficulty_1_to_10 !== undefined && diagnosis.diy_difficulty_1_to_10 !== null ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      DIY Repair Score
                    </h3>
                    <span className="text-lg font-black text-white">
                      {diagnosis.diy_difficulty_1_to_10} / 10
                    </span>
                  </div>

                  {/* Score Bar */}
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-3">
                    <div
                      className={`h-full transition-all duration-500 ${
                        (diagnosis.diy_difficulty_1_to_10 || 0) <= 3
                          ? "bg-emerald-500"
                          : (diagnosis.diy_difficulty_1_to_10 || 0) <= 6
                          ? "bg-amber-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${((diagnosis.diy_difficulty_1_to_10 || 0) / 10) * 100}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-400">
                    {(diagnosis.diy_difficulty_1_to_10 || 0) <= 3
                      ? "Easy DIY: Can be completed at home with standard hand tools."
                      : (diagnosis.diy_difficulty_1_to_10 || 0) <= 6
                      ? "Moderate DIY: Requires basic mechanic knowledge and specialized sockets/tools."
                      : "Advanced Mechanic: Best handled by certified professional technicians."}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Suggested Next Steps */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Suggested Next Steps
              </h3>
              <ul className="space-y-2.5">
                {diagnosis.suggested_next_steps?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-normal">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

          {/* Card Actions Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={copyDiagnosisSummary}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-all"
            >
              {copied ? (
                <>
                  <ClipboardDocumentCheckIcon className="w-4 h-4 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="w-4 h-4 text-slate-400" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
