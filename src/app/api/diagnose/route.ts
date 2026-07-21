import { NextRequest, NextResponse } from "next/server";

export interface DiagnosisSchema {
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

function generateDemoDiagnosis(symptoms: string, make: string, model: string, year: number): DiagnosisSchema {
  const query = symptoms.toLowerCase();

  if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.length < 5) {
    return {
      response_type: "text",
      text_response: `Hello! I'm Otto, your personal, impartial master mechanic. Connected vehicle demo: ${year} ${make} ${model}. Describe any issue, strange sounds, or OBD2 codes (e.g., P0300, squealing brakes) to test our AI triage generator.`,
    };
  }

  if (query.includes("p0300") || query.includes("misfire")) {
    return {
      response_type: "diagnosis",
      diagnosis_title: "Random/Multiple Cylinder Misfire (P0300)",
      explanation: `The P0300 code indicates that one or more cylinders in your ${year} ${make} ${model} are misfiring. This causes engine shaking, unburnt fuel in exhaust, and rough idling. Common root causes include worn spark plugs, failing ignition coils, or vacuum leaks.`,
      severity_level: "Medium",
      is_safe_to_drive: true,
      estimated_cost: {
        currency: "INR",
        parts_min: 1500,
        parts_max: 6000,
        labor_min: 800,
        labor_max: 2500,
      },
      diy_difficulty_1_to_10: 4,
      suggested_next_steps: [
        "Inspect spark plugs for carbon buildup or gap wear.",
        "Check ignition coil packs and wiring harness connectors.",
        "Scan individual cylinder misfire codes (P0301-P0304) using an OBD2 scanner.",
      ],
    };
  }

  if (query.includes("brake") || query.includes("squeal") || query.includes("noise") || query.includes("grinding")) {
    return {
      response_type: "diagnosis",
      diagnosis_title: "Brake Pad Wear & Rotor Friction",
      explanation: `High-pitched squealing from your ${make} ${model} indicates the mechanical wear indicators on your brake pads are contacting the rotor surface. If left unresolved, it will progress to metal-on-metal rotor grinding.`,
      severity_level: "Medium",
      is_safe_to_drive: true,
      estimated_cost: {
        currency: "INR",
        parts_min: 2500,
        parts_max: 8500,
        labor_min: 1000,
        labor_max: 3000,
      },
      diy_difficulty_1_to_10: 5,
      suggested_next_steps: [
        "Inspect front & rear brake pad thickness (minimum safe thickness is 3mm).",
        "Check brake rotor disc surfaces for scoring or heat discoloration.",
        "Replace front brake pads and bleed brake fluid if necessary.",
      ],
    };
  }

  if (query.includes("overheat") || query.includes("hot") || query.includes("coolant") || query.includes("radiator")) {
    return {
      response_type: "diagnosis",
      diagnosis_title: "Cooling System Thermal Overload",
      explanation: `Engine temperature elevation in your ${year} ${make} ${model} points to insufficient coolant flow or air blockage. Continuing to drive while overheating risks blown head gaskets or warped engine blocks.`,
      severity_level: "High",
      is_safe_to_drive: false,
      estimated_cost: {
        currency: "INR",
        parts_min: 1800,
        parts_max: 12000,
        labor_min: 1200,
        labor_max: 4000,
      },
      diy_difficulty_1_to_10: 7,
      suggested_next_steps: [
        "Pull over safely immediately and allow engine to cool down.",
        "Check coolant overflow reservoir level once engine is cold.",
        "Inspect radiator cooling fan operation and thermostat valve.",
      ],
    };
  }

  if (query.includes("oil") || query.includes("lubricant") || query.includes("filter")) {
    return {
      response_type: "text",
      text_response: `For your ${year} ${make} ${model}, standard synthetic engine oil (e.g. 5W-30 or 0W-20 depending on specs) is recommended every 10,000 km or 12 months along with a genuine oil filter replacement.`,
    };
  }

  return {
    response_type: "diagnosis",
    diagnosis_title: `Vehicle Symptom Triage (${make} ${model})`,
    explanation: `Based on reported symptom "${symptoms}" for your ${year} ${make} ${model}, Otto detected potential drivetrain or sensor anomalies. Download the AutoLog mobile app to run live, deep AI diagnostics tailored to your vehicle's full service history.`,
    severity_level: "Low",
    is_safe_to_drive: true,
    estimated_cost: {
      currency: "INR",
      parts_min: 1200,
      parts_max: 5000,
      labor_min: 600,
      labor_max: 2000,
    },
    diy_difficulty_1_to_10: 3,
    suggested_next_steps: [
      "Perform a visual inspection of engine bay and fluid levels.",
      "Scan OBD2 port for active or pending diagnostic trouble codes.",
      "Download AutoLog mobile app to log service records & access live Otto AI.",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      symptoms,
      make = "Toyota",
      model = "Fortuner",
      year = 2021,
    } = body;

    if (!symptoms || typeof symptoms !== "string" || symptoms.trim() === "") {
      return NextResponse.json(
        { error: "Please provide valid vehicle symptoms or OBD2 diagnostic codes." },
        { status: 400 }
      );
    }

    const demoData = generateDemoDiagnosis(symptoms, make, model, Number(year) || 2021);

    return NextResponse.json({
      success: true,
      is_demo_fallback: true,
      data: demoData,
    });
  } catch {
    return NextResponse.json(
      { error: "Diagnostic demo service encountered an error." },
      { status: 500 }
    );
  }
}
