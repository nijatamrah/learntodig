"use client";

interface Props {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  accent: string;
  onChange: (v: number) => void;
  decimals?: number;
}

export default function Slider({ label, unit, value, min, max, step, accent, onChange, decimals = 0 }: Props) {
  return (
    <label className="block">
      <div className="flex justify-between text-[12px] mb-1 font-['Space_Grotesk']">
        <span className="text-[#8DA2BF]">{label}</span>
        <span className="font-mono text-[#F0F4FF]">
          {value.toFixed(decimals)} <span className="text-[#6B82A0]">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: accent }}
      />
    </label>
  );
}
