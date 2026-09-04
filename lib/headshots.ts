// Curated token-free driver headshots (Wikimedia Commons) used as a fallback
// when the OpenF1 headshot source is unavailable (e.g. during live sessions,
// which require a paid OpenF1 access token). Keyed by driver code, with driver
// number aliases, so the existing `headshots[number] ?? headshots[code]`
// lookups resolve. Images are CC-licensed photos of each F1 driver.
export const DRIVER_HEADSHOTS: Record<string, string> = {
  // code -> url
  ANT: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg/330px-Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg",
  HAM: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg/330px-Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg",
  NOR: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg/330px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg",
  LEC: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Charles_Leclerc_at_the_2026_Cannes_Film_Festival_%28cropped%29.jpg/330px-Charles_Leclerc_at_the_2026_Cannes_Film_Festival_%28cropped%29.jpg",
  VER: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/330px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg",
  PIA: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg/330px-2026_Chinese_GP_-_Oscar_Piastri_%28cropped%29_%28cropped%29.jpg",
  HAD: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg/330px-Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg",
  LAW: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7795%29.jpg/330px-Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7795%29.jpg",
  GAS: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/2022_French_Grand_Prix_%2852279066548%29_%28cropped%29_%28cropped%29.png/330px-2022_French_Grand_Prix_%2852279066548%29_%28cropped%29_%28cropped%29.png",
  LIN: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7869%29_%28cropped%29.jpg/330px-Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7869%29_%28cropped%29.jpg",
  COL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8698%29_cropped.jpg/330px-Franco_Colapinto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8698%29_cropped.jpg",
  BEA: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg/330px-2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg",
  BOR: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Gabriel_Bortoleto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8581%29_cropped.jpg/330px-Gabriel_Bortoleto_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8581%29_cropped.jpg",
  HUL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2019_Formula_One_tests_Barcelona%2C_Hulkenberg_%2840287128313%29.jpg/330px-2019_Formula_One_tests_Barcelona%2C_Hulkenberg_%2840287128313%29.jpg",
  ALB: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Alex_Albon_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8626%29_%28cropped%29.jpg/330px-Alex_Albon_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8626%29_%28cropped%29.jpg",
  OCO: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg/330px-Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg",
  ALO: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/330px-Alonso-68_%2824710447098%29.jpg",
  TSU: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Yuki_Tsunoda_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8096%29.jpg/330px-Yuki_Tsunoda_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8096%29.jpg",
  STR: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg/330px-2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg",
  BOT: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7556%29.jpg/330px-Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_%28028A7556%29.jpg",
  PER: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Sergio_P%C3%A9rez_2019_%28cropped%29.jpg/330px-Sergio_P%C3%A9rez_2019_%28cropped%29.jpg",
  RUS: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg/330px-KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg",
  SAI: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg/330px-Formula1Gabelhofen2022_%2804%29_%28cropped2%29.jpg",
};

