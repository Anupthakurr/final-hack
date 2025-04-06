import React, { useState } from "react";
import { Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const InputField = ({ label, id, value, onChange, placeholder, min, max }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="flex items-center gap-2 text-sm">
      {label}
      <Info className="w-4 h-4 text-slate-400" />
    </label>
    <input
      id={id}
      name={id}
      type="number"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full p-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500"
    />
  </div>
);

const HealthForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    systolic: "",
    diastolic: "",
    cholesterol: "",
    glucose: "",
    smoking: "",
    alcohol: "",
    exercise: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const analyzeHealthRisks = () => {
    const risks = [];
    const bmi = Number(calculateBMI(Number(formData.height), Number(formData.weight)));

    if (bmi < 18.5) risks.push("Underweight: possible nutritional deficiencies");
    else if (bmi >= 25 && bmi < 30) risks.push("Overweight: risk of cardiovascular diseases");
    else if (bmi >= 30) risks.push("Obese: significant health risks");

    if (Number(formData.systolic) >= 140 || Number(formData.diastolic) >= 90)
      risks.push("High BP: risk of heart disease & stroke");
    else if (Number(formData.systolic) >= 130 || Number(formData.diastolic) >= 80)
      risks.push("Elevated BP: consider lifestyle changes");

    if (Number(formData.cholesterol) > 200) risks.push("High cholesterol: heart disease risk");
    if (Number(formData.glucose) > 140) risks.push("High blood glucose: may indicate pre-diabetes");
    if (formData.smoking === "1") risks.push("Smoking: cancer & heart disease risk");
    if (formData.alcohol === "1") risks.push("Alcohol: increased health risks");
    if (formData.exercise === "0") risks.push("No exercise: risk of multiple conditions");

    return risks;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empty = Object.entries(formData).filter(([_, v]) => v === "").map(([k]) => k);
    if (empty.length) {
      toast.error("Please fill all fields");
      return;
    }

    const risks = analyzeHealthRisks();
    if (!risks.length) {
      toast.success("No significant health risks detected. Stay healthy!");
    } else {
      toast.error(
        <div className="space-y-1">
          <p className="font-bold">Health Risks Detected:</p>
          <ul className="list-disc pl-4 text-sm">
            {risks.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>,
        { duration: 9000 }
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-8 bg-slate-900 rounded-xl shadow-lg space-y-8"
      >
        <div>
          <h1 className="text-2xl font-bold mb-1">Health Risk Assessment</h1>
          <p className="text-slate-400 text-sm">
            Fill in your health metrics below for a comprehensive analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="Age" id="age" value={formData.age} onChange={handleChange} placeholder="18-100" min={18} max={100} />
          <InputField label="Gender" id="gender" value={formData.gender} onChange={handleChange} placeholder="0 for Female, 1 for Male" min={0} max={1} />
          <InputField label="Height" id="height" value={formData.height} onChange={handleChange} placeholder="cm (e.g., 170)" min={100} max={230} />
          <InputField label="Weight" id="weight" value={formData.weight} onChange={handleChange} placeholder="kg (e.g., 70)" min={30} max={200} />
          <InputField label="Systolic BP" id="systolic" value={formData.systolic} onChange={handleChange} placeholder="e.g., 120" min={70} max={200} />
          <InputField label="Diastolic BP" id="diastolic" value={formData.diastolic} onChange={handleChange} placeholder="e.g., 80" min={40} max={130} />
          <InputField label="Cholesterol" id="cholesterol" value={formData.cholesterol} onChange={handleChange} placeholder="mg/dL" min={100} max={400} />
          <InputField label="Blood Glucose" id="glucose" value={formData.glucose} onChange={handleChange} placeholder="mg/dL" min={50} max={300} />
          <InputField label="Smoking Status" id="smoking" value={formData.smoking} onChange={handleChange} placeholder="0 for No, 1 for Yes" min={0} max={1} />
          <InputField label="Regular Alcohol" id="alcohol" value={formData.alcohol} onChange={handleChange} placeholder="0 for No, 1 for Yes" min={0} max={1} />
          <InputField label="Regular Exercise" id="exercise" value={formData.exercise} onChange={handleChange} placeholder="0 for No, 1 for Yes" min={0} max={1} />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition font-medium"
        >
          Analyze Health Risks
        </button>
      </form>
    </div>
  );
};

export default HealthForm;