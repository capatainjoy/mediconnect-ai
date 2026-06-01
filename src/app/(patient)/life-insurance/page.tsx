"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, CheckCircle2, Activity, Heart, Cigarette, Scale, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type FormData = {
  age: string;
  gender: string;
  bmi: string;
  smoker: string;
  medicalHistory: string;
};

export default function LifeInsurancePredictor() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    age: "",
    gender: "",
    bmi: "",
    smoker: "",
    medicalHistory: "none",
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<{ premium: string; risk: string; color: string; desc: string } | null>(null);

  const updateForm = (key: keyof FormData, val: string) => setForm(p => ({ ...p, [key]: val }));

  const nextStep = () => setStep(p => Math.min(5, p + 1));
  const prevStep = () => setStep(p => Math.max(1, p - 1));

  const calculatePremium = async () => {
    setCalculating(true);
    // Simulate AI API call
    await new Promise(r => setTimeout(r, 2000));
    
    let basePremium = 500; // Base ₹500/month
    const ageNum = parseInt(form.age) || 30;
    const bmiNum = parseFloat(form.bmi) || 22;

    // Age factor
    if (ageNum > 30) basePremium += (ageNum - 30) * 20;
    
    // Smoker factor
    if (form.smoker === "yes") basePremium *= 1.5;

    // BMI factor
    if (bmiNum > 25) basePremium += (bmiNum - 25) * 50;

    // History factor
    if (form.medicalHistory !== "none") basePremium *= 1.3;

    let riskLevel = "Low Risk";
    let color = "text-emerald-500";
    let desc = "You are in great health. You qualify for our best premium rates.";

    if (basePremium > 1500) {
      riskLevel = "High Risk";
      color = "text-red-500";
      desc = "Based on the provided factors, your premium is higher due to elevated health risks.";
    } else if (basePremium > 1000) {
      riskLevel = "Moderate Risk";
      color = "text-amber-500";
      desc = "Your premium reflects a moderate risk profile. Minor lifestyle adjustments could lower this.";
    }

    setResult({
      premium: `₹${Math.round(basePremium).toLocaleString()}`,
      risk: riskLevel,
      color,
      desc
    });
    setCalculating(false);
    setStep(6);
  };

  return (
    <div className="min-h-screen pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-sky-500/10 text-sky-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Life Insurance Predictor</h1>
          <p className="text-muted-foreground">Answer 5 simple questions to get an AI-estimated premium and risk assessment.</p>
        </div>

        {/* Wizard Container */}
        <Card className="border-0 shadow-xl overflow-hidden bg-card">
          <div className="bg-muted/30 p-4 border-b flex justify-between items-center">
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`h-2 w-12 rounded-full transition-colors ${step >= i ? "bg-sky-500" : "bg-muted-foreground/20"}`} />
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">Step {Math.min(step, 5)} of 5</span>
          </div>

          <CardContent className="p-8 min-h-[350px] relative">
            <AnimatePresence mode="wait">
              
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-semibold mb-6">
                    <Baby className="w-6 h-6 text-sky-500" /> What is your current age?
                  </div>
                  <Input type="number" placeholder="e.g. 30" value={form.age} onChange={e => updateForm("age", e.target.value)} className="h-14 text-lg" />
                  <div className="flex justify-end pt-4">
                    <Button size="lg" onClick={nextStep} disabled={!form.age}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-semibold mb-6">
                    <User className="w-6 h-6 text-sky-500" /> What is your biological gender?
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant={form.gender === "male" ? "default" : "outline"} className="h-16 text-lg" onClick={() => updateForm("gender", "male")}>Male</Button>
                    <Button variant={form.gender === "female" ? "default" : "outline"} className="h-16 text-lg" onClick={() => updateForm("gender", "female")}>Female</Button>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button size="lg" onClick={nextStep} disabled={!form.gender}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-semibold mb-6">
                    <Scale className="w-6 h-6 text-sky-500" /> What is your BMI (Body Mass Index)?
                  </div>
                  <Input type="number" step="0.1" placeholder="e.g. 22.5" value={form.bmi} onChange={e => updateForm("bmi", e.target.value)} className="h-14 text-lg" />
                  <p className="text-xs text-muted-foreground">Normal BMI is between 18.5 and 24.9.</p>
                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button size="lg" onClick={nextStep} disabled={!form.bmi}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-semibold mb-6">
                    <Cigarette className="w-6 h-6 text-sky-500" /> Do you currently smoke or use tobacco?
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant={form.smoker === "yes" ? "default" : "outline"} className="h-16 text-lg" onClick={() => updateForm("smoker", "yes")}>Yes</Button>
                    <Button variant={form.smoker === "no" ? "default" : "outline"} className="h-16 text-lg" onClick={() => updateForm("smoker", "no")}>No</Button>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button size="lg" onClick={nextStep} disabled={!form.smoker}>Next <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </motion.div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <motion.div key="5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 text-xl font-semibold mb-6">
                    <Activity className="w-6 h-6 text-sky-500" /> Any pre-existing medical conditions?
                  </div>
                  <select 
                    value={form.medicalHistory} 
                    onChange={e => updateForm("medicalHistory", e.target.value)}
                    className="w-full h-14 rounded-md border border-input bg-background px-4 text-lg"
                  >
                    <option value="none">None / Healthy</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="hypertension">Hypertension (Blood Pressure)</option>
                    <option value="heart_disease">Heart Disease</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="flex justify-between pt-4">
                    <Button variant="ghost" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
                    <Button size="lg" onClick={calculatePremium} disabled={calculating} className="gradient-primary text-white border-0">
                      {calculating ? "Calculating..." : "Get Prediction"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* RESULT STEP */}
              {step === 6 && result && (
                <motion.div key="6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6 space-y-6">
                  <CheckCircle2 className={`w-16 h-16 mx-auto ${result.color}`} />
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Estimated Premium</p>
                    <h2 className={`text-5xl font-black ${result.color} mb-1`}>{result.premium}</h2>
                    <p className="text-muted-foreground font-medium">per month</p>
                  </div>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-muted/50 border font-semibold ${result.color}`}>
                    Risk Profile: {result.risk}
                  </div>
                  
                  <p className="text-muted-foreground px-4 leading-relaxed">{result.desc}</p>
                  
                  <div className="pt-6 border-t mt-6">
                    <Button variant="outline" onClick={() => { setStep(1); setResult(null); }}>
                      Recalculate
                    </Button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// User Icon missing from imports up top so importing here to avoid duplicate import errors
import { User } from "lucide-react";
