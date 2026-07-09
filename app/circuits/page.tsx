"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ───
interface Circuit {
  id: string;
  name: string;
  grandPrix: string;
  location: string;
  country: string;
  countryCode: string;
  length: number; // km
  laps: number;
  turns: number;
  drsZones: number;
  lapRecord: string;
  lapRecordHolder: string;
  lapRecordYear: number;
  type: "permanent" | "street" | "road";
  firstGp: number;
  direction: "clockwise" | "anti-clockwise";
  svgPath: string;
  viewBox: string;
  round?: number;
  date?: string;
  status?: "completed" | "upcoming" | "next";
}

// ─── 2026 Circuit Data ───
const circuits: Circuit[] = [
  {
    id: "albert-park",
    name: "Albert Park Circuit",
    grandPrix: "Australian Grand Prix",
    location: "Melbourne",
    country: "Australia",
    countryCode: "AU",
    length: 5.278,
    laps: 58,
    turns: 14,
    drsZones: 4,
    lapRecord: "1:20.235",
    lapRecordHolder: "Sergio Pérez",
    lapRecordYear: 2023,
    type: "street",
    firstGp: 1996,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 1,
    date: "06-08 Mar",
    status: "completed",
    svgPath: "M 120 240 L 80 220 Q 60 200 70 170 L 90 130 Q 100 110 130 100 L 180 90 Q 210 85 240 95 L 290 115 Q 320 130 330 160 L 340 200 Q 345 230 320 245 L 280 255 Q 250 260 220 250 L 180 240 Q 150 235 120 240 Z",
  },
  {
    id: "shanghai",
    name: "Shanghai International Circuit",
    grandPrix: "Chinese Grand Prix",
    location: "Shanghai",
    country: "China",
    countryCode: "CN",
    length: 5.451,
    laps: 56,
    turns: 16,
    drsZones: 2,
    lapRecord: "1:32.238",
    lapRecordHolder: "Michael Schumacher",
    lapRecordYear: 2004,
    type: "permanent",
    firstGp: 2004,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 2,
    date: "13-15 Mar",
    status: "completed",
    svgPath: "M 60 200 L 60 140 Q 60 110 90 100 L 150 90 Q 180 85 200 100 L 240 130 Q 260 145 280 140 L 320 130 Q 350 125 360 150 L 370 190 Q 375 220 350 235 L 300 250 Q 270 258 240 245 L 200 225 Q 170 210 140 220 L 100 235 Q 70 245 60 200 Z",
  },
  {
    id: "suzuka",
    name: "Suzuka International Racing Course",
    grandPrix: "Japanese Grand Prix",
    location: "Suzuka",
    country: "Japan",
    countryCode: "JP",
    length: 5.807,
    laps: 53,
    turns: 18,
    drsZones: 1,
    lapRecord: "1:30.983",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2019,
    type: "permanent",
    firstGp: 1987,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 3,
    date: "27-29 Mar",
    status: "completed",
    svgPath: "M 200 60 Q 240 60 260 90 L 280 130 Q 290 160 270 190 L 240 230 Q 220 255 180 250 L 140 240 Q 110 230 100 200 L 95 160 Q 92 130 110 110 L 140 85 Q 170 65 200 60 M 200 60 Q 160 60 140 90 L 120 130 Q 110 160 130 190 L 160 230 Q 180 250 200 240",
  },
  {
    id: "miami",
    name: "Miami International Autodrome",
    grandPrix: "Miami Grand Prix",
    location: "Miami Gardens",
    country: "United States",
    countryCode: "US",
    length: 5.412,
    laps: 57,
    turns: 19,
    drsZones: 3,
    lapRecord: "1:29.708",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2023,
    type: "street",
    firstGp: 2022,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 4,
    date: "01-03 May",
    status: "completed",
    svgPath: "M 80 250 L 70 200 Q 65 170 85 150 L 120 120 Q 150 95 190 100 L 240 110 Q 280 118 310 140 L 340 170 Q 360 195 350 225 L 335 255 Q 320 275 290 270 L 240 260 Q 200 252 160 258 L 120 265 Q 90 270 80 250 Z",
  },
  {
    id: "gilles-villeneuve",
    name: "Circuit Gilles-Villeneuve",
    grandPrix: "Canadian Grand Prix",
    location: "Montreal",
    country: "Canada",
    countryCode: "CA",
    length: 4.361,
    laps: 70,
    turns: 14,
    drsZones: 2,
    lapRecord: "1:13.078",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2019,
    type: "street",
    firstGp: 1978,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 5,
    date: "22-24 May",
    status: "completed",
    svgPath: "M 100 240 L 90 180 Q 85 140 110 120 L 160 95 Q 200 80 240 90 L 300 110 Q 340 125 350 160 L 355 200 Q 358 240 330 255 L 280 265 Q 240 270 200 260 L 150 250 Q 120 245 100 240 Z",
  },
  {
    id: "monaco",
    name: "Circuit de Monaco",
    grandPrix: "Monaco Grand Prix",
    location: "Monte Carlo",
    country: "Monaco",
    countryCode: "MC",
    length: 3.337,
    laps: 78,
    turns: 19,
    drsZones: 1,
    lapRecord: "1:12.909",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2021,
    type: "street",
    firstGp: 1929,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 6,
    date: "05-07 Jun",
    status: "completed",
    svgPath: "M 120 260 L 110 220 Q 105 190 125 170 L 160 140 Q 190 120 220 125 L 260 135 Q 290 142 310 165 L 330 195 Q 345 220 335 245 L 320 270 Q 305 285 275 280 L 230 270 Q 200 262 170 268 L 140 275 Q 125 278 120 260 Z",
  },
  {
    id: "barcelona",
    name: "Circuit de Barcelona-Catalunya",
    grandPrix: "Barcelona-Catalunya Grand Prix",
    location: "Montmeló",
    country: "Spain",
    countryCode: "ES",
    length: 4.657,
    laps: 66,
    turns: 14,
    drsZones: 2,
    lapRecord: "1:16.330",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2023,
    type: "permanent",
    firstGp: 1991,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 7,
    date: "12-14 Jun",
    status: "completed",
    svgPath: "M 80 230 L 75 180 Q 72 150 95 130 L 140 100 Q 180 78 220 85 L 270 95 Q 310 105 330 135 L 350 175 Q 360 210 340 240 L 305 270 Q 275 290 235 280 L 185 265 Q 145 252 110 260 L 85 268 Q 78 270 80 230 Z",
  },
  {
    id: "red-bull-ring",
    name: "Red Bull Ring",
    grandPrix: "Austrian Grand Prix",
    location: "Spielberg",
    country: "Austria",
    countryCode: "AT",
    length: 4.318,
    laps: 71,
    turns: 10,
    drsZones: 3,
    lapRecord: "1:05.619",
    lapRecordHolder: "Carlos Sainz",
    lapRecordYear: 2020,
    type: "permanent",
    firstGp: 1970,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 8,
    date: "26-28 Jun",
    status: "completed",
    svgPath: "M 100 240 L 95 190 Q 92 160 115 140 L 155 110 Q 190 90 230 95 L 280 105 Q 320 115 340 145 L 355 185 Q 365 220 345 250 L 310 275 Q 280 292 240 285 L 190 270 Q 150 258 120 265 L 100 272 Q 95 274 100 240 Z",
  },
  {
    id: "silverstone",
    name: "Silverstone Circuit",
    grandPrix: "British Grand Prix",
    location: "Silverstone",
    country: "United Kingdom",
    countryCode: "GB",
    length: 5.891,
    laps: 52,
    turns: 18,
    drsZones: 2,
    lapRecord: "1:27.097",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2020,
    type: "permanent",
    firstGp: 1950,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 9,
    date: "03-05 Jul",
    status: "completed",
    svgPath: "M 120 250 L 100 200 Q 90 170 110 145 L 150 110 Q 180 85 220 88 L 270 95 Q 310 102 335 130 L 355 170 Q 368 205 350 235 L 320 265 Q 290 288 250 280 L 200 265 Q 160 252 140 260 L 125 265 Q 115 268 120 250 Z",
  },
  {
    id: "spa",
    name: "Circuit de Spa-Francorchamps",
    grandPrix: "Belgian Grand Prix",
    location: "Stavelot",
    country: "Belgium",
    countryCode: "BE",
    length: 7.004,
    laps: 44,
    turns: 19,
    drsZones: 2,
    lapRecord: "1:46.286",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2018,
    type: "permanent",
    firstGp: 1925,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 10,
    date: "17-19 Jul",
    status: "next",
    svgPath: "M 90 260 L 80 210 Q 75 175 100 150 L 145 115 Q 180 90 220 95 L 275 105 Q 315 115 340 150 L 360 195 Q 372 235 355 265 L 325 290 Q 295 308 255 300 L 200 285 Q 160 272 130 280 L 105 288 Q 92 292 90 260 Z",
  },
  {
    id: "hungaroring",
    name: "Hungaroring",
    grandPrix: "Hungarian Grand Prix",
    location: "Mogyoród",
    country: "Hungary",
    countryCode: "HU",
    length: 4.381,
    laps: 70,
    turns: 14,
    drsZones: 2,
    lapRecord: "1:16.627",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2020,
    type: "permanent",
    firstGp: 1986,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 11,
    date: "24-26 Jul",
    status: "upcoming",
    svgPath: "M 110 245 L 100 195 Q 95 160 120 135 L 160 105 Q 195 82 235 88 L 285 98 Q 325 108 345 142 L 362 182 Q 372 218 355 248 L 325 278 Q 298 298 260 290 L 210 275 Q 172 260 145 268 L 120 275 Q 108 278 110 245 Z",
  },
  {
    id: "zandvoort",
    name: "Circuit Zandvoort",
    grandPrix: "Dutch Grand Prix",
    location: "Zandvoort",
    country: "Netherlands",
    countryCode: "NL",
    length: 4.259,
    laps: 72,
    turns: 14,
    drsZones: 2,
    lapRecord: "1:11.097",
    lapRecordHolder: "Lewis Hamilton",
    lapRecordYear: 2021,
    type: "permanent",
    firstGp: 1952,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 12,
    date: "21-23 Aug",
    status: "upcoming",
    svgPath: "M 105 250 L 95 200 Q 90 165 115 140 L 155 110 Q 190 85 230 90 L 280 100 Q 320 110 340 145 L 358 188 Q 370 225 352 255 L 322 285 Q 295 305 255 298 L 205 282 Q 165 268 138 276 L 115 282 Q 102 285 105 250 Z",
  },
  {
    id: "monza",
    name: "Autodromo Nazionale Monza",
    grandPrix: "Italian Grand Prix",
    location: "Monza",
    country: "Italy",
    countryCode: "IT",
    length: 5.793,
    laps: 53,
    turns: 11,
    drsZones: 2,
    lapRecord: "1:21.046",
    lapRecordHolder: "Rubens Barrichello",
    lapRecordYear: 2004,
    type: "permanent",
    firstGp: 1922,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 13,
    date: "04-06 Sep",
    status: "upcoming",
    svgPath: "M 100 240 L 90 190 Q 85 155 110 130 L 150 100 Q 185 78 225 82 L 275 90 Q 315 98 338 132 L 358 172 Q 370 208 352 240 L 325 270 Q 298 290 258 282 L 208 268 Q 168 255 142 262 L 118 268 Q 105 272 100 240 Z",
  },
  {
    id: "madrid",
    name: "Madring",
    grandPrix: "Spanish Grand Prix",
    location: "Madrid",
    country: "Spain",
    countryCode: "ES",
    length: 5.474,
    laps: 56,
    turns: 20,
    drsZones: 3,
    lapRecord: "—",
    lapRecordHolder: "—",
    lapRecordYear: 2026,
    type: "street",
    firstGp: 2026,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 14,
    date: "11-13 Sep",
    status: "upcoming",
    svgPath: "M 95 245 L 85 195 Q 80 160 105 135 L 148 105 Q 185 82 228 87 L 280 97 Q 322 107 345 142 L 365 185 Q 378 222 360 252 L 330 282 Q 302 302 262 295 L 212 280 Q 172 265 145 272 L 120 278 Q 105 282 95 245 Z",
  },
  {
    id: "baku",
    name: "Baku City Circuit",
    grandPrix: "Azerbaijan Grand Prix",
    location: "Baku",
    country: "Azerbaijan",
    countryCode: "AZ",
    length: 6.003,
    laps: 51,
    turns: 20,
    drsZones: 2,
    lapRecord: "1:43.009",
    lapRecordHolder: "Charles Leclerc",
    lapRecordYear: 2019,
    type: "street",
    firstGp: 2016,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 15,
    date: "24-26 Sep",
    status: "upcoming",
    svgPath: "M 90 255 L 80 205 Q 75 168 100 142 L 145 112 Q 185 88 228 93 L 282 103 Q 325 113 348 148 L 368 192 Q 380 230 362 260 L 332 290 Q 305 310 265 302 L 215 287 Q 175 272 148 280 L 122 286 Q 108 290 90 255 Z",
  },
  {
    id: "singapore",
    name: "Marina Bay Street Circuit",
    grandPrix: "Singapore Grand Prix",
    location: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    length: 4.940,
    laps: 62,
    turns: 19,
    drsZones: 3,
    lapRecord: "1:35.867",
    lapRecordHolder: "Kevin Magnussen",
    lapRecordYear: 2018,
    type: "street",
    firstGp: 2008,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 16,
    date: "09-11 Oct",
    status: "upcoming",
    svgPath: "M 95 250 L 85 200 Q 80 165 105 140 L 148 110 Q 185 87 228 92 L 280 102 Q 322 112 345 147 L 365 190 Q 378 228 360 258 L 330 288 Q 302 308 262 300 L 212 285 Q 172 270 145 278 L 120 284 Q 105 288 95 250 Z",
  },
  {
    id: "cota",
    name: "Circuit of the Americas",
    grandPrix: "United States Grand Prix",
    location: "Austin",
    country: "United States",
    countryCode: "US",
    length: 5.513,
    laps: 56,
    turns: 20,
    drsZones: 2,
    lapRecord: "1:36.169",
    lapRecordHolder: "Charles Leclerc",
    lapRecordYear: 2019,
    type: "permanent",
    firstGp: 2012,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 17,
    date: "23-25 Oct",
    status: "upcoming",
    svgPath: "M 100 245 L 90 195 Q 85 160 110 135 L 152 105 Q 190 82 232 88 L 285 98 Q 328 108 350 143 L 370 187 Q 382 225 364 255 L 334 285 Q 306 305 266 297 L 216 282 Q 176 267 149 275 L 124 281 Q 108 285 100 245 Z",
  },
  {
    id: "hermanos-rodriguez",
    name: "Autódromo Hermanos Rodríguez",
    grandPrix: "Mexico City Grand Prix",
    location: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
    length: 4.304,
    laps: 71,
    turns: 17,
    drsZones: 3,
    lapRecord: "1:17.774",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2021,
    type: "permanent",
    firstGp: 1963,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 18,
    date: "30 Oct-01 Nov",
    status: "upcoming",
    svgPath: "M 105 248 L 95 198 Q 90 162 115 137 L 158 107 Q 195 84 238 90 L 290 100 Q 332 110 355 145 L 375 188 Q 388 226 370 256 L 340 286 Q 312 306 272 298 L 222 283 Q 182 268 155 276 L 130 282 Q 114 286 105 248 Z",
  },
  {
    id: "interlagos",
    name: "Autódromo José Carlos Pace",
    grandPrix: "São Paulo Grand Prix",
    location: "São Paulo",
    country: "Brazil",
    countryCode: "BR",
    length: 4.309,
    laps: 71,
    turns: 15,
    drsZones: 2,
    lapRecord: "1:10.540",
    lapRecordHolder: "Valtteri Bottas",
    lapRecordYear: 2018,
    type: "permanent",
    firstGp: 1973,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 19,
    date: "06-08 Nov",
    status: "upcoming",
    svgPath: "M 95 252 L 85 202 Q 80 165 105 140 L 148 110 Q 185 87 228 93 L 280 103 Q 322 113 345 148 L 365 192 Q 378 230 360 260 L 330 290 Q 302 310 262 302 L 212 287 Q 172 272 145 280 L 120 286 Q 105 290 95 252 Z",
  },
  {
    id: "las-vegas",
    name: "Las Vegas Strip Circuit",
    grandPrix: "Las Vegas Grand Prix",
    location: "Las Vegas",
    country: "United States",
    countryCode: "US",
    length: 6.201,
    laps: 50,
    turns: 17,
    drsZones: 2,
    lapRecord: "1:35.490",
    lapRecordHolder: "Oscar Piastri",
    lapRecordYear: 2024,
    type: "street",
    firstGp: 2023,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 20,
    date: "19-21 Nov",
    status: "upcoming",
    svgPath: "M 90 255 L 80 205 Q 75 168 100 143 L 145 113 Q 185 89 228 94 L 282 104 Q 325 114 348 149 L 368 193 Q 380 231 362 261 L 332 291 Q 304 311 264 303 L 214 288 Q 174 273 147 281 L 122 287 Q 106 291 90 255 Z",
  },
  {
    id: "lusail",
    name: "Lusail International Circuit",
    grandPrix: "Qatar Grand Prix",
    location: "Lusail",
    country: "Qatar",
    countryCode: "QA",
    length: 5.419,
    laps: 57,
    turns: 16,
    drsZones: 2,
    lapRecord: "1:24.319",
    lapRecordHolder: "Lando Norris",
    lapRecordYear: 2024,
    type: "permanent",
    firstGp: 2021,
    direction: "clockwise",
    viewBox: "0 0 400 300",
    round: 21,
    date: "27-29 Nov",
    status: "upcoming",
    svgPath: "M 100 250 L 90 200 Q 85 163 110 138 L 155 108 Q 195 84 238 90 L 290 100 Q 332 110 355 145 L 375 189 Q 388 227 370 257 L 340 287 Q 312 307 272 299 L 222 284 Q 182 269 155 277 L 130 283 Q 114 287 100 250 Z",
  },
  {
    id: "yas-marina",
    name: "Yas Marina Circuit",
    grandPrix: "Abu Dhabi Grand Prix",
    location: "Abu Dhabi",
    country: "United Arab Emirates",
    countryCode: "AE",
    length: 5.281,
    laps: 58,
    turns: 16,
    drsZones: 2,
    lapRecord: "1:26.103",
    lapRecordHolder: "Max Verstappen",
    lapRecordYear: 2021,
    type: "permanent",
    firstGp: 2009,
    direction: "anti-clockwise",
    viewBox: "0 0 400 300",
    round: 22,
    date: "04-06 Dec",
    status: "upcoming",
    svgPath: "M 95 248 L 85 198 Q 80 161 105 136 L 150 106 Q 190 82 233 88 L 285 98 Q 327 108 350 143 L 370 187 Q 383 225 365 255 L 335 285 Q 307 305 267 297 L 217 282 Q 177 267 150 275 L 125 281 Q 109 285 95 248 Z",
  },
];

// ─── Flag Component (simplified) ───
function Flag({ code }: { code: string }) {
  const flags: Record<string, string> = {
    AU: "🇦🇺", CN: "🇨🇳", JP: "🇯🇵", US: "🇺🇸", CA: "🇨🇦", MC: "🇲🇨",
    ES: "🇪🇸", AT: "🇦🇹", GB: "🇬🇧", BE: "🇧🇪", HU: "🇭🇺", NL: "🇳🇱",
    IT: "🇮🇹", AZ: "🇦🇿", SG: "🇸🇬", MX: "🇲🇽", BR: "🇧🇷", QA: "🇶🇦",
    AE: "🇦🇪",
  };
  return <span style={{ fontSize: 18 }}>{flags[code] || "🏁"}</span>;
}

// ─── Track SVG Component ───
function TrackSVG({ circuit }: { circuit: Circuit }) {
  const isNext = circuit.status === "next";
  const isCompleted = circuit.status === "completed";

  return (
    <div
      style={{
        height: 160,
        position: "relative",
        overflow: "hidden",
        background: "var(--tarmac)",
        borderBottom: `3px solid ${isNext ? "var(--f1-red)" : "var(--line)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <svg
        viewBox={circuit.viewBox}
        style={{ width: "100%", height: "100%", opacity: 0.85 }}
        fill="none"
      >
        {/* Track outline */}
        <path
          d={circuit.svgPath}
          stroke={isNext ? "var(--f1-red)" : "var(--muted-dim)"}
          strokeWidth={isNext ? 6 : 5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: isNext ? "drop-shadow(0 0 8px var(--f1-red-glow))" : "none",
          }}
        />
        {/* Track inner fill */}
        <path
          d={circuit.svgPath}
          stroke="var(--tarmac)"
          strokeWidth={isNext ? 3 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Start/finish line indicator */}
        <circle
          cx={parseInt(circuit.svgPath.split(" ")[1]) + 10}
          cy={parseInt(circuit.svgPath.split(" ")[2]) - 5}
          r={4}
          fill={isCompleted ? "var(--success)" : isNext ? "var(--f1-red)" : "var(--muted-dim)"}
          style={isNext ? { filter: "drop-shadow(0 0 4px var(--f1-red))" } : {}}
        />
      </svg>

      {/* Status overlay */}
      {isNext && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--f1-red)",
            background: "var(--f1-red-dim)",
            border: "1px solid var(--f1-red-glow)",
            padding: "3px 8px",
            borderRadius: 3,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--f1-red)",
              animation: "pulseLive 1.8s ease-in-out infinite",
            }}
          />
          Next Race
        </div>
      )}
      {isCompleted && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "var(--success)",
            background: "var(--success-dim)",
            border: "1px solid rgba(16,185,129,0.2)",
            padding: "3px 8px",
            borderRadius: 3,
          }}
        >
          Completed
        </div>
      )}
    </div>
  );
}

// ─── Circuit Card ───
function CircuitCard({ circuit }: { circuit: Circuit }) {
  return (
    <Link
      href={`/circuits/${circuit.id}`}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 8,
        overflow: "hidden",
        transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        position: "relative",
        display: "block",
        textDecoration: "none",
        color: "inherit",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "var(--f1-red)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4), 0 0 20px var(--f1-red-dim)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <TrackSVG circuit={circuit} />

      <div style={{ padding: "20px 22px 22px" }}>
        {/* Round badge */}
        {circuit.round && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--surface-raised)",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 900,
              color: "var(--muted)",
            }}
          >
            {circuit.round}
          </div>
        )}

        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            color: "var(--f1-red)",
            textTransform: "uppercase",
            marginBottom: 8,
            fontWeight: 800,
          }}
        >
          {circuit.grandPrix}
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: 17,
            lineHeight: 1.2,
            textTransform: "uppercase",
            marginBottom: 8,
            color: "var(--text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          {circuit.name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 14,
          }}
        >
          <Flag code={circuit.countryCode} />
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {circuit.location}, {circuit.country}
          </span>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--line)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div style={{ background: "var(--surface-raised)", padding: "10px 8px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              Length
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {circuit.length.toFixed(3)}
              <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 2 }}>km</span>
            </div>
          </div>
          <div style={{ background: "var(--surface-raised)", padding: "10px 8px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              Laps
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {circuit.laps}
            </div>
          </div>
          <div style={{ background: "var(--surface-raised)", padding: "10px 8px", textAlign: "center" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              Turns
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {circuit.turns}
            </div>
          </div>
        </div>

        {/* Lap record */}
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 800,
                marginBottom: 2,
              }}
            >
              Lap Record
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>
              {circuit.lapRecord !== "—" ? (
                <>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{circuit.lapRecord}</span>
                  <span style={{ color: "var(--muted)", marginLeft: 4 }}>
                    {circuit.lapRecordHolder} ({circuit.lapRecordYear})
                  </span>
                </>
              ) : (
                <span style={{ color: "var(--muted-dim)" }}>First race in 2026</span>
              )}
            </div>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "var(--muted-dim)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 800,
              padding: "3px 8px",
              borderRadius: 3,
              background: "var(--surface-raised)",
              border: "1px solid var(--line)",
            }}
          >
            {circuit.type}
          </div>
        </div>

        {/* Date */}
        {circuit.date && (
          <div
            style={{
              marginTop: 10,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--muted)",
              fontWeight: 700,
              letterSpacing: "0.5px",
            }}
          >
            {circuit.date} &bull; 2026
          </div>
        )}
      </div>
    </Link>
  );
}

// ─── Main Page ───
export default function CircuitsPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "upcoming" | "next">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "permanent" | "street">("all");
  const [search, setSearch] = useState("");

  const filtered = circuits.filter((c) => {
    const matchesStatus = filter === "all" || c.status === filter;
    const matchesType = typeFilter === "all" || c.type === typeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.grandPrix.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);
    return matchesStatus && matchesType && matchesSearch;
  });

  const completedCount = circuits.filter((c) => c.status === "completed").length;
  const upcomingCount = circuits.filter((c) => c.status === "upcoming").length;

  const filterBtn = (key: string, label: string, count?: number, active?: boolean) => (
    <button
      key={key}
      onClick={() => {
        if (key === "all" || key === "completed" || key === "upcoming" || key === "next") {
          setFilter(key as typeof filter);
        } else {
          setTypeFilter(key as typeof typeFilter);
        }
      }}
      style={{
        padding: "8px 16px",
        borderRadius: 6,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: "1px",
        textTransform: "uppercase",
        border: active ? "1px solid var(--f1-red)" : "1px solid var(--line)",
        background: active ? "var(--f1-red-dim)" : "var(--tarmac)",
        color: active ? "var(--f1-red)" : "var(--muted)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            fontSize: 10,
            color: active ? "var(--f1-red)" : "var(--muted-dim)",
            background: active ? "rgba(225,6,0,0.15)" : "var(--surface-raised)",
            padding: "1px 6px",
            borderRadius: 3,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );

  return (
    <main>
      {/* Page Header */}
      <div className="page-header" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--f1-red)" }} />
        <div className="wrap" style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ width: 24, height: 2, background: "var(--f1-red)" }} />
            2026 Championship
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(32px,5vw,56px)",
              textTransform: "uppercase",
              letterSpacing: "-0.3px",
              lineHeight: 1,
              marginBottom: 12,
              color: "var(--text-primary)",
            }}
          >
            Circuits
          </h1>
          <p style={{ color: "var(--muted)", maxWidth: 620, fontSize: 15, lineHeight: 1.6 }}>
            All 22 circuits on the 2026 Formula 1 calendar. Explore track layouts, lap records, and circuit statistics.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ padding: "20px clamp(20px,4vw,48px)", borderBottom: "1px solid var(--line)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ position: "relative", flex: 1, minWidth: 260, maxWidth: 400 }}>
              <svg
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "var(--muted-dim)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search circuits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--tarmac)",
                  border: "1px solid var(--line)",
                  borderRadius: 6,
                  padding: "10px 14px 10px 40px",
                  fontSize: 13,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-body)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--f1-red)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
              />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {filterBtn("all", "All", circuits.length, filter === "all")}
              {filterBtn("completed", "Completed", completedCount, filter === "completed")}
              {filterBtn("upcoming", "Upcoming", upcomingCount, filter === "upcoming")}
              {filterBtn("next", "Next Race", undefined, filter === "next")}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filterBtn("all-type", "All Types", undefined, typeFilter === "all")}
            {filterBtn("permanent", "Permanent", undefined, typeFilter === "permanent")}
            {filterBtn("street", "Street", undefined, typeFilter === "street")}
          </div>
        </div>
      </div>

      {/* Circuits Grid */}
      <div style={{ padding: "32px clamp(20px,4vw,48px) clamp(64px,8vw,96px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
              borderBottom: "2px solid var(--f1-red)",
              paddingBottom: 12,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(24px,4vw,32px)",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span style={{ width: 4, height: 28, background: "var(--f1-red)", borderRadius: 2 }} />
              2026 Calendar
            </h2>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--muted-dim)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: 700,
              }}
            >
              {filtered.length} of {circuits.length} circuits
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              No circuits found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}