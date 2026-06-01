"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Brain, AlertTriangle, CheckCircle, X, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DEMO_RESULTS = {
  summary: "The report indicates elevated blood glucose levels (fasting: 138 mg/dL) and slightly high LDL cholesterol (142 mg/dL). Blood pressure readings are within borderline range. Kidney function tests are normal.",
  riskLevel: "moderate" as const,
  findings: [
    { label: "Fasting Blood Glucose", value: "138 mg/dL", status: "high", normal: "70–99 mg/dL" },
    { label: "LDL Cholesterol", value: "142 mg/dL", status: "high", normal: "<100 mg/dL" },
    { label: "HbA1c", value: "6.4%", status: "borderline", normal: "<5.7%" },
    { label: "Creatinine", value: "0.9 mg/dL", status: "normal", normal: "0.7–1.2 mg/dL" },
    { label: "Hemoglobin", value: "13.8 g/dL", status: "normal", normal: "12–17 g/dL" },
  ],
  medications: ["Metformin 500mg (consult doctor)", "Atorvastatin 20mg (consult doctor)"],
  recommendations: [
    "Schedule a follow-up with an endocrinologist within 2 weeks.",
    "Reduce intake of refined carbohydrates and sugary beverages.",
    "Begin a 30-minute daily walking routine.",
    "Monitor blood pressure daily.",
  ],
};

const riskConfig = {
  low: { color: "text-green-600", bg: "bg-green-50", border: "border-green-200", icon: CheckCircle, label: "Low Risk" },
  moderate: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle, label: "Moderate Risk" },
  high: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, label: "High Risk" },
};

export default function AIScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<typeof DEMO_RESULTS | null>(null);
  const [step, setStep] = useState<"upload" | "scanning" | "results">("upload");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setResults(null);
    setStep("upload");
  };

  const handleScan = async () => {
    if (!file) return;
    setStep("scanning");
    setScanning(true);
    await new Promise((r) => setTimeout(r, 3000));
    setScanning(false);
    setResults(DEMO_RESULTS);
    setStep("results");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const riskInfo = results ? riskConfig[results.riskLevel] : null;

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-sky-200">
            <Sparkles className="w-4 h-4" /> Powered by Gemini AI
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">AI Medical Report Scanner</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload your lab reports or prescriptions and get an instant, easy-to-understand AI analysis. Always consult a doctor for medical decisions.
          </p>
        </div>

        {/* Upload Zone */}
        {step !== "results" && (
          <Card className="mb-6">
            <CardContent className="p-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? "border-sky-500 bg-sky-50" : file ? "border-green-400 bg-green-50" : "border-border hover:border-sky-400 hover:bg-muted/30"}`}
              >
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                {file ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="font-semibold text-green-700">{file.name}</div>
                    <div className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-xs text-red-500 hover:underline flex items-center gap-1 mx-auto">
                      <X className="w-3 h-3" /> Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="font-semibold text-lg">Drop your report here</div>
                    <div className="text-muted-foreground text-sm">or click to browse — supports PDF, JPG, PNG</div>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {["Blood Report","X-Ray","MRI","Prescription","Lab Test"].map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {file && step !== "scanning" && (
                <div className="mt-4 flex justify-center">
                  <Button onClick={handleScan} size="lg" className="gradient-primary text-white border-0 shadow-lg shadow-sky-500/25 gap-2 text-base font-semibold px-8">
                    <Brain className="w-5 h-5" /> Analyze with AI
                  </Button>
                </div>
              )}

              {/* Try Demo */}
              {!file && (
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm" onClick={() => { setFile(new File(["demo"], "sample_blood_report.pdf")); }}>
                    Try with a sample report →
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Scanning Animation */}
        {step === "scanning" && (
          <Card className="mb-6">
            <CardContent className="p-12 text-center space-y-6">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-20 h-20 rounded-full border-4 border-sky-200 border-t-sky-600 mx-auto" />
              <div>
                <h3 className="text-xl font-bold mb-2">Analyzing your report...</h3>
                <p className="text-muted-foreground">Gemini AI is reading and interpreting your medical data. This takes a few seconds.</p>
              </div>
              <div className="space-y-2 max-w-xs mx-auto">
                {["Extracting text from document", "Identifying medical parameters", "Analyzing values & ranges", "Generating insights"].map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.7 }} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />{s}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {step === "results" && results && riskInfo && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analysis Results</h2>
              <Button variant="outline" size="sm" onClick={() => { setStep("upload"); setFile(null); setResults(null); }}>
                Scan New Report
              </Button>
            </div>

            {/* Risk Level Banner */}
            <div className={`flex items-center gap-4 p-5 rounded-xl border-2 ${riskInfo.bg} ${riskInfo.border}`}>
              <div className={`p-3 rounded-full bg-white`}>
                <riskInfo.icon className={`w-6 h-6 ${riskInfo.color}`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${riskInfo.color}`}>{riskInfo.label} Detected</h3>
                <p className="text-sm text-muted-foreground">{results.summary}</p>
              </div>
            </div>

            {/* Findings */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Key Findings</h3>
                <div className="space-y-3">
                  {results.findings.map((f) => (
                    <div key={f.label} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <div className="font-medium">{f.label}</div>
                        <div className="text-xs text-muted-foreground">Normal: {f.normal}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{f.value}</span>
                        <Badge className={f.status === "normal" ? "bg-green-100 text-green-700 hover:bg-green-100 border-0" : f.status === "borderline" ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-0" : "bg-red-100 text-red-700 hover:bg-red-100 border-0"}>
                          {f.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">AI Recommendations</h3>
                <div className="space-y-2">
                  {results.recommendations.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <ChevronRight className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              ⚠️ <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and does not replace professional medical advice. Always consult a qualified doctor for diagnosis and treatment.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
