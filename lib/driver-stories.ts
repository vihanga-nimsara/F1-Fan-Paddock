export type DriverStory = {
  fullName: string;
  number: string;
  ageDob: string;
  nationality: string;
  team: string;
  careerStats: {
    championships: string;
    wins: string;
    podiums: string;
    poles: string;
  };
  journey: string[];
  didYouKnow: string;
  si: {
    journey: string[];
    didYouKnow: string;
  };
};

export const DRIVER_STORIES: Record<string, DriverStory> = {
  piastri: {
    fullName: "Oscar Jack Piastri",
    number: "#81",
    ageDob: "25 years old — 6 April 2001",
    nationality: "Australian 🇦🇺",
    team: "McLaren Mercedes",
    careerStats: {
      championships: "0",
      wins: "9",
      podiums: "28",
      poles: "6",
    },
    journey: [
      "Melbourne-born Oscar Piastri is the most efficiently assembled talent Formula 1 has seen in a generation. He charged up the junior single-seater ladder without a single wasted season - winning the Formula Renault Eurocup in 2019, the FIA Formula 3 Championship in 2020, and the FIA Formula 2 title in 2021 by a margin of over 50 points - before a now-legendary contractual standoff between Alpine and McLaren over his 2023 services made him the most discussed driver who had never yet started a Grand Prix. McLaren won the dispute, and Piastri has repaid them spectacularly at every turn.",
      "His debut season produced two podiums and the FIA Rookie of the Year award. In 2024, victories in Hungary and Azerbaijan made him a Grand Prix winner, and his contributions proved vital in McLaren clinching their first Constructors' Championship since 1998. His 2025 campaign raised the bar higher still - seven victories, 16 podiums, and six pole positions, all records for an Australian Formula 1 driver - before finishing third in a thrilling three-way championship battle. In 2026, he continues as one of the two quickest drivers on the entire grid.",
      "Calm, precise, and devastatingly economical with every input, Piastri makes the most complex racing scenarios look entirely, infuriatingly routine.",
    ],
    didYouKnow: "In 2026, a team of entomologists in Myanmar discovered a previously unknown species of wasp — and named it Gwesped piastrii in his honour. Making Piastri one of the very few active Formula 1 drivers to have had a living species of insect formally named after them. It is, without doubt, the most unusual tribute any driver on the 2026 grid has received.",
    si: {
      journey: [
        "මෙල්බර්න් වල ඉපදුණු Oscar Piastri කියන්නේ මේ පරම්පරාවේ Formula 1 දැකපු ගොඩක්ම කාර්යක්ෂමව හැදුණු ටැලන්ට් එකක්. කිසිම සීසන් එකක් අපතේ යවන්නේ නැතුව මෙයා junior single-seater තරගාවලි වල ඉහළටම ආවා - 2019 දී Formula Renault Eurocup එක, 2020 දී FIA Formula 3 Championship එක සහ 2021 දී ලකුණු 50 කට වඩා පරතරයකින් FIA Formula 2 title එක දිනාගත්තා. ඊට පස්සේ 2023 දී මෙයාගේ සේවය ලබාගන්න Alpine සහ McLaren අතරේ ආපු ඒ සුප්‍රසිද්ධ කොන්ත්‍රාත් අර්බුදය නිසා, එක Grand Prix එකක්වත් start කරලා තිබ්බේ නැති වුණත් ගොඩක්ම කතාබහට ලක්වුණු driver බවට මෙයා පත්වුණා. අන්තිමේදී McLaren ඒ ආරවුලෙන් දිනුවා, Piastri ත් ඒකට සුපිරිම විදිහට ප්‍රතිචාර දැක්වුවා.",
        "මෙයාගේ Debut season එකේදිම podiums දෙකක් එක්ක FIA Rookie of the Year සම්මානය දිනාගත්තා. 2024 දී හංගේරියාවේ සහ අසර්බයිජානයේ ලබපු ජයග්‍රහණ එක්ක මෙයා Grand Prix winner කෙනෙක් වුණා වගේම, 1998 න් පස්සේ McLaren ලා ගත්ත පළවෙනි Constructors' Championship එක දිනවන්න මෙයාගේ දායකත්වය ගොඩක් වැදගත් වුණා. 2025 campaign එකේදි මෙයා තවත් ඉහළට ගියා - ජයග්‍රහණ 7ක්, podiums 16ක් සහ pole positions 6ක් ගත්තා, මේවා ඔක්කොම Australian Formula 1 driver කෙනෙක් තියපු records. ඒ වගේම තුන්දෙනෙක් අතරේ තිබ්බ ලොකු championship සටනකින් පස්සේ තෙවැනියා විදිහට තරගාවලිය ඉවර කළා. මේ 2026 වෙද්දි, මුළු grid එකේම ඉන්න වේගවත්ම ඩ්‍රයිවර්ස්ලා දෙන්නගෙන් කෙනෙක් විදිහට මෙයා දිගටම රේස් කරනවා. Calm, precise, සහ කිසිම අනවශ්‍ය දෙයක් කරන්නේ නැති Piastri, රේසිං ට්‍රැක් එකේ තියෙන අමාරුම අවස්ථා පවා හරිම ලේසි සාමාන්‍ය දේවල් වගේ කරලා පෙන්නනවා.",
      ],
      didYouKnow: "මේ 2026 අවුරුද්දේ, මියන්මාරයේ කෘමී විද්‍යාඥයින් කණ්ඩායමක් කලින් හොයාගෙන නොතිබුණු අලුත් බඹර විශේෂයක් හොයාගෙන, ඒකට මෙයාට ගෞරවයක් විදිහට Gwesped piastrii කියලා නම තිබ්බා. මේ නිසා Piastri කියන්නේ තමන්ගේ නමින් ජීවත්වෙන කෘමි විශේෂයක් නම් කරපු, දැනට active ඉන්න Formula 1 ඩ්‍රයිවර්ස්ලා අතළොස්සෙන් කෙනෙක්. කිසිම සැකයක් නැතුව, මේ 2026 grid එකේ ඉන්න ඩ්‍රයිවර් කෙනෙක්ට ලැබුණු අමුතුම විදිහේ උපහාරය මේකයි.",
    },
  },
  sainz: {
    fullName: "Carlos Sainz Vázquez de Castro",
    number: "#55",
    ageDob: "32 years old — 1 September 1994",
    nationality: "Spanish 🇪🇸",
    team: "Atlassian Williams F1 Team",
    careerStats: {
      championships: "0",
      wins: "4",
      podiums: "29",
      poles: "6",
    },
    journey: [
      "Carlos Sainz Jr. was always going to race — the only question was at what level. Born in Madrid, the son of two-time World Rally Champion Carlos Sainz Sr., he inherited the family passion for competition but has built a Formula 1 career entirely on its own considerable merits. After claiming the Formula Renault 3.5 championship in 2014, he made his F1 debut alongside Max Verstappen at Toro Rosso in 2015 and embarked on one of the sport's most well-travelled and consistently impressive careers — representing Renault, McLaren, and four productive seasons at Scuderia Ferrari, where he evolved from dependable points accumulator into genuine race winner.",
      "At Ferrari, Sainz took his maiden Formula 1 victory at the 2022 British Grand Prix and added three more — Singapore, Australia, and Mexico City — before being displaced by Lewis Hamilton for 2025. His response was to join Williams and immediately revitalise the team, delivering back-to-back P3 finishes in Azerbaijan and Qatar — their first podiums in four years — before signing a new multi-year deal to commit to James Vowles' long-term rebuilding project. 2026 has been a more difficult year for the team in the new regulations, but Sainz's commitment to the cause has never wavered.",
      "Tenacious, intelligent, and nicknamed \"Chilli\" for his hot-blooded attacking instinct, Sainz is one of the sport's most naturally competitive and enduringly likeable characters.",
    ],
    didYouKnow: "Sainz became only the second driver in Formula 1 history — after the legendary Alain Prost — to score podium finishes while racing for Ferrari, McLaren, and Williams. His father, Carlos Sainz Sr., is a two-time FIA World Rally Champion, making the Sainz family one of the most accomplished father-son combinations in the entire history of world motorsport.",
    si: {
      journey: [
        "Carlos Sainz Jr. කොහොමත් රේස් පදිනවා කියන එක ෂුවර් දෙයක් වෙලයි තිබ්බේ — තිබ්බ එකම ප්‍රශ්නේ ඒ මොන level එකේද කියන එක විතරයි. මැඩ්‍රිඩ් වල ඉපදුණු මෙයාගේ තාත්තා තමයි two-time World Rally Champion කෙනෙක් වෙන Carlos Sainz Sr., ඒ තරගකාරී පවුලේ ආභාසය ලැබුණත් මෙයාගේ Formula 1 career එක සම්පූර්ණයෙන්ම ගොඩනගා ගත්තේ මෙයාගේම දක්ෂතාවයෙන්. 2014 දී Formula Renault 3.5 championship එක දිනුවට පස්සේ, 2015 දී Toro Rosso ටීම් එකේ Max Verstappen එක්ක F1 debut එක කළා. ඊට පස්සේ ක්‍රීඩාවේ ගොඩක් ටීම් වලට ක්‍රීඩා කරපු මෙයා Renault, McLaren, සහ Scuderia Ferrari වල productive seasons 4ක් ගත කරලා නිකන්ම ලකුණු එකතු කරන කෙනෙක්ගේ ඉඳන් නියම race winner කෙනෙක් දක්වා දියුණු වුණා.",
        "Ferrari වලදි, 2022 British Grand Prix එකෙන් Sainz තමන්ගේ maiden Formula 1 victory එක ගත්තා, ඊට පස්සේ සිංගප්පූරුව, ඕස්ට්‍රේලියාව සහ මෙක්සිකෝ සිටි වලිනුත් ජයග්‍රහණ 3ක් එකතු කරගත්තා. හැබැයි 2025 දී Lewis Hamilton ආපු නිසා මෙයාට එතනින් අයින් වෙන්න වුණා. ඒකට ප්‍රතිචාරයක් විදිහට මෙයා Williams ටීම් එකට එකතු වෙලා එකපාරටම ටීම් එකට අලුත් පණක් දුන්නා, අසර්බයිජාන් සහ කටාර් වල පිටපිට P3 finishes ලබා දුන්නා — ඒක ටීම් එකට අවුරුදු 4කට පස්සේ ලැබුණු පළවෙනි podiums වුණා. ඊට පස්සේ James Vowles ගේ ටීම් එක ගොඩනැගීමේ long-term project එකට එකඟ වෙමින් අලුත් multi-year deal එකකට අත්සන් කළා. අලුත් නීති රීති එක්ක මේ 2026 අවුරුද්ද ටීම් එකට ටිකක් අමාරු කාලයක් වුණත්, Sainz ගේ කැපවීම කිසිම අඩුවක් වෙලා නෑ. ගොඩක් උත්සාහවන්ත, බුද්ධිමත්, වගේම රේස් එකේදි පෙන්නන ඒ දරුණු attacking instinct එක නිසාම \"Chilli\" කියලා නම වැටිලා තියෙන Sainz, මේ ක්‍රීඩාවේ ඉන්න ගොඩක්ම ස්වාභාවිකව තරගකාරී වගේම හැමෝම ආදරේ කරන චරිතයක්.",
      ],
      didYouKnow: "ඉතිහාසයේ Ferrari, McLaren, සහ Williams කියන ටීම් 3ටම රේස් කරලා podium finishes ලබාගත්ත දෙවැනි driver තමයි Sainz — ඊට කලින් ඒක කරලා තියෙන්නේ legendary Alain Prost විතරයි. ඒ වගේම මෙයාගේ තාත්තා, Carlos Sainz Sr., 2-time FIA World Rally Champion කෙනෙක් නිසා, ලෝක මෝටර් ස්පෝර්ට්ස් ඉතිහාසයේම ඉන්න ගොඩක්ම සාර්ථක පිය-පුතු සුසංයෝගයක් විදිහට Sainz පවුල සැලකෙනවා.",
    },
  },
  albon: {
    fullName: "Alexander Philippe Albon Ansusinha",
    number: "#23",
    ageDob: "30 years old — 23 March 1996",
    nationality: "Thai 🇹🇭",
    team: "Atlassian Williams F1 Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "2",
      poles: "0",
    },
    journey: [
      "Born in London to a British father and Thai mother, Alexander Albon chose to race under the Thai flag — a decision that sparked an explosion of Formula 1 interest across Southeast Asia and gave him one of the sport's most devoted national fanbases. He progressed through the Red Bull junior programme via Formula 2 and received a shock call-up to Toro Rosso mid-season in 2019, performing so impressively that he was promoted to partner Verstappen at Red Bull just months later. After a difficult 2020 amid expectations he wasn't yet fully equipped for, he was dropped — spending 2021 as a Red Bull reserve before Williams offered a career lifeline in 2022.",
      "The Williams move proved the making of him. Albon became the team's undisputed cornerstone and lead performer, consistently extracting results that far outperformed what the machinery deserved, earning a reputation within the paddock as one of the most technically intelligent and constructive development drivers on the grid. The arrival of Sainz in 2025 elevated the team's ceiling further — Albon finishing eighth in the championship in a campaign that represented Williams' best collective output in years. He continues with the team into 2026 on an extended contract.",
      "Smooth, forensically precise, and extraordinarily collaborative with his engineers, Albon is the quiet backbone of one of the sport's most watchable rebuilding stories.",
    ],
    didYouKnow: "Despite being born and raised in London, Albon competes under the Thai flag — his mother Kankamol is Thai, and his choice to represent Thailand in Formula 1 has made him the sport's most beloved personality across Southeast Asia, where his race weekends are now televised events of national significance. Away from the circuit, he is a passionate gamer and streamer, and his rescue cat Alfie has developed a loyal social media following very nearly rivalling his own.",
    si: {
      journey: [
        "ලන්ඩන් වල බ්‍රිතාන්‍ය ජාතික තාත්තෙක්ට සහ තායි ජාතික අම්මෙක්ට දාව ඉපදුණු Alexander Albon තීරණය කළේ Thai flag එක යටතේ රේස් කරන්නයි — මේ තීරණය නිසා මුළු අග්නිදිග ආසියාව පුරාම Formula 1 ගැන ලොකු උනන්දුවක් ඇතිවුණා වගේම, මේ ක්‍රීඩාවේ ඉන්න ලොකුම national fanbase එකක් මෙයාට හැදුණා. Red Bull junior programme එක හරහා Formula 2 වලට ගිය මෙයාට, 2019 season එක මැදදි Toro Rosso ටීම් එකෙන් හදිසි call-up එකක් ආවා, එතනදි පෙන්නපු සුපිරි දක්ෂතා නිසා මාස කීපයකින්ම Red Bull ටීම් එකේ Verstappen ගේ partner විදිහට එයාව ප්‍රමෝට් කළා. හැබැයි ඒ ලොකු බලාපොරොත්තු වලට එයා ඒ වෙද්දි සම්පූර්ණයෙන්ම සූදානම් වෙලා හිටියේ නැති නිසා 2020 අවුරුද්ද ගොඩක් අමාරු එකක් වුණා, ඒ නිසා එයාව ටීම් එකෙන් අයින් කරලා 2021 මුළු අවුරුද්දම Red Bull reserve ඩ්‍රයිවර් විදිහට හිටියා. ඊට පස්සේ 2022 දී Williams ටීම් එකෙන් මෙයාට අලුත් ලයිෆ්ලයින් එකක් හම්බුණා.",
        "ඒ Williams ගමන මෙයාගේ ජීවිතේ හැරවුම් ලක්ෂ්‍යයක් වුණා. Albon ඒ ටීම් එකේ ප්‍රධානම සහ lead performer බවට පත්වුණා, තමන්ට හම්බුණු කාර් එකට කරන්න පුළුවන් ප්‍රමාණයටත් වඩා ලොකු ප්‍රතිඵල දිගටම අරන් දීලා, මුළු paddock එකේම ඉන්න technically intelligent සහ constructive development drivers ලගෙන් කෙනෙක් විදිහට නමක් හදාගත්තා. 2025 දී Sainz ටීම් එකට ආවට පස්සේ ටීම් එක තවත් ඉස්සරහට ගියා — Williams ටීම් එකට අවුරුදු ගාණකින් ලැබුණු හොඳම collective output එක පෙන්නලා Albon championship එකේ 8 වෙනියා වුණා. ඒ extended contract එකත් එක්ක මේ 2026 දීත් මෙයා ඒ ටීම් එකේම ඉන්නවා. Smooth, forensically precise, සහ එයාගේ ඉංජිනේරුවන් එක්ක අසාමාන්‍ය විදිහට සහයෝගයෙන් වැඩ කරන Albon කියන්නේ මේ ක්‍රීඩාවේ තියෙන ආසාවෙන්ම බලන් ඉන්න පුළුවන් rebuilding stories වලින් එකක නිහඬ කොඳුනාරටියයි.",
      ],
      didYouKnow: "ලන්ඩන් වල ඉපදිලා හැදුණු කෙනෙක් වුණත්, Albon තරග කරන්නේ Thai flag එකෙන් — මෙයාගේ අම්මා Kankamol තායි ජාතිකයෙක්, මෙයා Formula 1 වලදි තායිලන්තය නියෝජනය කරන්න ගත්ත තීරණය නිසා මෙයා අග්නිදිග ආසියාවේ ඉන්න ආදරණීයම F1 චරිතය වෙලා තියෙනවා, දැන් එහේ අයට මෙයාගේ race weekends කියන්නේ ජාතික මට්ටමේ ලොකු ඉවෙන්ට්ස් වෙලා. ට්‍රැක් එකෙන් පිටත, මෙයා ගොඩක් ආසාවෙන් ගේම්ස් ප්ලේ කරන gamer සහ streamer කෙනෙක්, වගේම මෙයාගේ rescue cat වෙන 'Alfie' ට පවා social media වල මෙයාට කිට්ටුවෙන්ම ඉන්න ලොකු ෆෑන්බේස් එකක් ඉන්නවා.",
    },
  },
  alonso: {
    fullName: "Fernando Alonso Díaz",
    number: "#14",
    ageDob: "45 years old — 29 July 1981",
    nationality: "Spanish 🇪🇸",
    team: "Aston Martin Aramco F1 Team",
    careerStats: {
      championships: "2 (2005, 2006)",
      wins: "32",
      podiums: "106",
      poles: "22",
    },
    journey: [
      "To write about Fernando Alonso is to write about the most complete, most competitive, most inexhaustible racing driver of the modern era. Born in Oviedo in northern Spain, Alonso began karting at three years old and arrived at Formula 1 with Minardi in 2001 at just 19, becoming a two-time World Champion at Renault by the age of 25 — defeating the great Michael Schumacher in 2005 and defending brilliantly in 2006, becoming the youngest double champion in history at that time.",
      "What followed was a masterclass in elite-level talent without the ultimate reward. Seasons at McLaren, Ferrari — where his genius was most visible and most frustrated simultaneously — McLaren again (the disastrous Honda partnership) and Renault kept producing individual brilliance from imperfect machinery. Retirements and returns punctuated a career that others wrote off repeatedly and Alonso simply refused to accept. His return to Aston Martin in 2023 produced eight podiums and a fourth-place championship finish that sent a message across the entire paddock: this man still has everything. In 2026 — his 24th season in Formula 1 and armed with the most starts in the sport's history at 438 — Alonso, at 45, remains the most stubborn, ferocious competitor on the grid.",
      "Forensic in defence, surgical in attack, and driven by a competitive fire that has simply never been switched off, Fernando Alonso is the sport's greatest ongoing human story.",
    ],
    didYouKnow: "Alonso is chasing motorsport's unofficial Triple Crown — wins at the Monaco Grand Prix, the 24 Hours of Le Mans, and the Indianapolis 500. He has the Monaco GP multiple times, and won Le Mans outright in 2018 and 2019 with Toyota. Only the Indianapolis 500 — which he has attempted twice, agonisingly leading before mechanical failure in 2017 — stands between him and motorsport immortality.",
    si: {
      journey: [
        "Fernando Alonso ගැන ලියනවා කියන්නේ මේ නූතන යුගයේ ඉන්න සම්පූර්ණම, තරගකාරීම, සහ කිසිම දවසක විඩාවට පත් වෙන්නේ නැති racing driver ගැන ලියනවා වගේ වැඩක්. උතුරු ස්පාඤ්ඤයේ Oviedo වල ඉපදුණු Alonso අවුරුදු 3 දිම karting පටන් අරන්, වයස 19 දි Minardi ටීම් එකෙන් 2001 දී Formula 1 වලට ආවා. වයස 25 වෙද්දි Renault ටීම් එකෙන් two-time World Champion කෙනෙක් වුණා — 2005 දී ශ්‍රේෂ්ඨ Michael Schumacher ව පරද්දලා, 2006 දී ඒක සුපිරියට defend කරලා, ඒ කාලේ හැටියට ඉතිහාසයේ ළාබාලතම double champion බවට පත්වුණා.",
        "ඊට පස්සේ ආවේ elite-level talent එකක් තිබ්බත් ඒකට හරියන ලොකුම ප්‍රතිඵලය නොලැබුණු කාලයක්. McLaren, Ferrari (මෙතනදි තමයි මෙයාගේ ඒ අසමසම හැකියාව සහ ඒ එක්කම ආපු කලකිරීම හොඳටම දැක්කේ), ආයේ McLaren (අර අසාර්ථක Honda partnership එක) සහ Renault වගේ ටීම්ස් එක්ක imperfect machinery වලින් වුණත් මෙයා තමන්ගේ සුපිරි දක්ෂතා පෙන්නුවා. Retire වෙවී ආයෙත් එමින් තිබුණු career එකක් වුණත්, අනිත් අය මෙයාව ප්‍රතික්ෂේප කරද්දි Alonso ඒක භාරගන්න ලෑස්ති වුණේ නෑ. 2023 දී Aston Martin වලට ආපු එකෙන් podiums 8ක් එක්ක championship එකේ 4 වෙනියා වෙලා මුළු paddock එකටම ලොකු පණිවිඩයක් දුන්නා: ඒ තමයි \"මේ මනුස්සයාට තාමත් ඒ හැමදේම පුළුවන්\" කියන එක. මේ 2026 කියන්නේ මෙයාගේ Formula 1 වල 24 වෙනි season එක, වගේම ක්‍රීඩා ඉතිහාසයේ වැඩිම starts ගාණක් ඒ කියන්නේ 438ක් තියෙන ඩ්‍රයිවර් විදිහට — වයස 45 දී පවා Alonso තමයි මේ grid එකේ ඉන්න මුරණ්ඩුම සහ දරුණුම තරගකරුවා. Defence එකේදි මාරම forensic, attack කරද්දි surgical, වගේම කවදාවත් නිවෙන්නේ නැති තරගකාරී ගින්නකින් වැඩ කරන Fernando Alonso කියන්නේ මේ ක්‍රීඩාවේ තියෙන අමරණීයම මානව කතාන්දරයයි.",
      ],
      didYouKnow: "Alonso මෝටර් ස්පෝර්ට්ස් වල unofficial Triple Crown එක පස්සේ යනවා — ඒ කියන්නේ Monaco Grand Prix, 24 Hours of Le Mans, සහ Indianapolis 500 කියන තුනම දිනන එක. මෙයා Monaco GP එක කීප සැරයක්ම දිනලා තියෙනවා, වගේම Toyota එක්ක 2018 සහ 2019 දී Le Mans එකත් දිනුවා. අර motorsport immortality එකට එන්න මෙයාට දැන් බාධාවකට තියෙන්නේ Indianapolis 500 එක විතරයි — මෙයා ඒකට දෙපාරක් උත්සාහ කළා, 2017 දී ගොඩක් දුරට ලීඩ් එකේ හිටියත් mechanical failure එකක් නිසා ඒක නැති වුණා.",
    },
  },
  stroll: {
    fullName: "Lance Jacob Strulovitch",
    number: "#18",
    ageDob: "27 years old — 29 October 1998",
    nationality: "Canadian 🇨🇦",
    team: "Aston Martin Aramco F1 Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "3",
      poles: "1",
    },
    journey: [
      "Born in Montreal to billionaire entrepreneur Lawrence Stroll and Belgian fashion designer Claire-Anne Callens, Lance Stroll arrived in Formula 1 in 2017 carrying the inevitable scrutiny that accompanies both a famous name and an unfashionable family wallet. What the headline-writers consistently underplayed was a genuine talent that predated any family involvement in F1 ownership — he won the Italian F4 championship in 2014 and the FIA Formula 3 European Championship in 2016 when his father had no stake in any grand prix team, titles earned purely on ability in a competitive field.",
      "His debut season at Williams saw a sensational podium at just his fourth Grand Prix, in Azerbaijan, and further podiums in Bahrain and Italy in 2020 added to his tally. A stunning pole position in treacherous wet conditions at the 2020 Turkish Grand Prix remains one of the most impressive single-lap performances of his career. From 2023 alongside Alonso at Aston Martin, Stroll has continued to develop within a team his father now owns — a unique and permanently debated dynamic. In 2026, he enters his tenth Formula 1 season, a milestone that puts a great deal of early criticism firmly into context.",
      "Occasionally spectacular in the rain, continuously developing his racecraft, and showing more substance than the loudest voices around him acknowledge, Stroll is a driver still very much writing his story.",
    ],
    didYouKnow: "Lance Stroll's sister Chloe is married to Australian Olympic snowboarder Scotty James — the 2022 Beijing Winter Olympics halfpipe gold medalist — making the Stroll family one of the most decorated multi-sport households in Canadian sporting history. The family's connection to both Formula 1 and Olympic winter sports gives them a very unusual place in the global sporting landscape.",
    si: {
      journey: [
        "මොන්ට්‍රියල් වල බිලියනපති ව්‍යාපාරික Lawrence Stroll ට සහ බෙල්ජියම් ජාතික විලාසිතා නිර්මාණකාරිණී Claire-Anne Callens ට දාව ඉපදුණු Lance Stroll 2017 දී Formula 1 වලට ආවේ ජනප්‍රිය නමක් සහ පවුලේ සල්ලි බලය කියන කාරණා නිසාම එන අනිවාර්ය විවේචනත් එක්කමයි. හැබැයි පත්තරකාරයෝ හැමතිස්සෙම අමතක කරපු දේ තමයි පවුලේ අය F1 ටීම් එකක් ගන්න කලින් ඉඳන්ම මෙයාට තිබුණු සහජ දක්ෂතාවය — මෙයාගේ තාත්තා කිසිම grand prix ටීම් එකක් අරන් තියෙන්න කලින්, 2014 දී Italian F4 championship එක සහ 2016 දී FIA Formula 3 European Championship එක දිනුවේ තනිකරම මෙයාගේ හැකියාවෙන්මයි.",
        "Williams ටීම් එකේ හිටපු මෙයාගේ debut season එකේදීම, එයාගේ 4 වෙනි Grand Prix එක වුණු අසර්බයිජාන් වලදි සුපිරි podium එකක් ගත්තා, ඊට පස්සේ 2020 දී බහරේන් සහ ඉතාලි වලිනුත් තවත් podiums එකතු කරගත්තා. 2020 Turkish Grand Prix එකේ දරුණු වර්ෂාව මැද ගත්ත ඒ සුපිරි pole position එක අදටත් මෙයාගේ career එකේ තියෙන හොඳම single-lap performance එකක් විදිහට සලකනවා. 2023 ඉඳන් Aston Martin ටීම් එකේ Alonso එක්ක මෙයා දිගටම හැදෙමින් එනවා, දැන් ඒ ටීම් එක අයිති මෙයාගේ තාත්තාට — මේක අමුතු වගේම හැමදාම කට්ටිය කතා වෙන මාතෘකාවක්. මේ 2026 දී මෙයා තමන්ගේ දහවෙනි Formula 1 season එකට එනවා, ඒකෙන් පෙන්නුම් කරන්නේ මුල් කාලේ ආපු විවේචන වලට වඩා යමක් මෙයා ළඟ තියෙනවා කියන එකයි. සමහර වෙලාවට වැස්සේදි අතිවිශිෂ්ට දක්ෂතා පෙන්නන, තමන්ගේ racecraft එක දිගටම දියුණු කරගන්න, සහ අනිත් අය කෑගහලා කියනවාට වඩා ලොකු දෙයක් තමන් තුළ තියෙනවා කියලා පෙන්නන Stroll කියන්නේ තාමත් තමන්ගේ කතාව ලියමින් ඉන්න ඩ්‍රයිවර් කෙනෙක්.",
      ],
      didYouKnow: "Lance Stroll ගේ සහෝදරිය වෙන Chloe කසාද බැඳලා ඉන්නේ ඕස්ට්‍රේලියානු ඔලිම්පික් ස්නෝබෝඩ් ක්‍රීඩක Scotty James ව — එයා තමයි 2022 Beijing Winter Olympics හි halfpipe gold medalist. මේ නිසා Stroll පවුල කැනේඩියානු ක්‍රීඩා ඉතිහාසයේ තියෙන ගොඩක්ම සම්මානනීය multi-sport පවුලක් බවට පත්වෙලා තියෙනවා. Formula 1 සහ ඔලිම්පික් ශීත ඍතු ක්‍රීඩා දෙකටම තියෙන මේ සම්බන්ධය නිසා ගෝලීය ක්‍රීඩා ලෝකයේ මෙයාලට හරිම අසාමාන්‍ය තැනක් හිමිවෙලා තියෙනවා.",
    },
  },
  perez: {
    fullName: "Sergio Michel \"Checo\" Pérez Mendoza",
    number: "#11",
    ageDob: "36 years old — 26 January 1990",
    nationality: "Mexican 🇲🇽",
    team: "Cadillac Formula 1 Team",
    careerStats: {
      championships: "0",
      wins: "6",
      podiums: "39",
      poles: "3",
    },
    journey: [
      "From Guadalajara, Mexico — a city that now celebrates its most famous sporting export with a passion that borders on the religious — Sergio \"Checo\" Pérez built one of Formula 1's most patient, persistent, and ultimately rewarding careers. He made his debut in 2011 after years of junior development funded partly by family sacrifice and hometown support, and spent the better part of a decade delivering consistently outstanding performances from machinery at Sauber, McLaren, and Force India that rarely matched his talent. His maiden Formula 1 victory at the chaotic 2020 Sakhir Grand Prix with Racing Point — capitalising on the carnage around him with trademark calm and clinical tyre management — was one of the hybrid era's most celebrated results.",
      "The move to Red Bull in 2021 elevated him to the sport's highest competitive level, where five further victories and 39 podiums in total made him not only Verstappen's most effective wingman but indisputably the most successful Mexican Formula 1 driver in history. His release at the end of 2024 after a challenging final season was followed by a year away before Cadillac confirmed him as co-lead driver for their historic 2026 debut — Formula 1's first American manufacturer-backed entry in decades, built partly around Pérez's enormous experience and impeccable racecraft.",
      "Patient, precise, and at his absolute best when the race is at its most chaotic, Checo is the consummate under-pressure performer.",
    ],
    didYouKnow: "Away from the circuit, Pérez is one of Formula 1's most philanthropically active drivers. His Checo Pérez Foundation funds educational programmes, sports facilities, and youth development initiatives for underprivileged children and young people across Jalisco and throughout Mexico — giving back directly to the communities and the country that supported his racing journey from the very beginning.",
    si: {
      journey: [
        "මෙක්සිකෝවේ Guadalajara වලින් ආපු (දැන් ඒ නගරය මෙයාව සමරන්නේ හරියට ආගමක් වගේ ආසාවකින්) Sergio \"Checo\" Pérez හදාගත්තේ Formula 1 වල තියෙන ගොඩක්ම ඉවසිලිවන්ත, නොපසුබට වගේම අන්තිමේදී ලොකු ප්‍රතිඵල ගෙනාපු career එකක්. පවුලේ අයගේ කැපකිරීම් සහ ගමේ අයගේ සපෝට් එකෙන් අවුරුදු ගාණක් junior තරග වල හිටියට පස්සේ 2011 දී F1 debut එක කළා, දශකයකට කිට්ටු කාලයක් Sauber, McLaren, සහ Force India වල හිටියත් එයාගේ ටැලන්ට් එකට හරියන කාර් එකක් එයාට හම්බුණේ නෑ. හැබැයි 2020 දී Racing Point ටීම් එකත් එක්ක තිබ්බ අර පිස්සු හැදෙන Sakhir Grand Prix එකේදි තමන්ගේ maiden Formula 1 victory එක ගත්තා — වටේම දරුණු දේවල් වෙද්දි තමන්ගේ සුපුරුදු නිවුණු ගතිය සහ clinical tyre management එක පාවිච්චි කරලා ගත්ත ඒ ජයග්‍රහණය hybrid era එකේ තියෙන සුපිරිම ජයග්‍රහණයක්.",
        "2021 දී Red Bull එකට ගිය එකෙන් මෙයා ක්‍රීඩාවේ ඉහළම තරගකාරී තැනට ආවා, එතනදි තවත් ජයග්‍රහණ 5ක් සහ මුළු podiums 39ක් අරන් Verstappen ගේ හොඳම wingman වුණා විතරක් නෙවෙයි, ඉතිහාසයේ සාර්ථකම මෙක්සිකානු Formula 1 ඩ්‍රයිවර් බවටත් පත්වුණා. අභියෝගාත්මක අවසාන season එකකින් පස්සේ 2024 අන්තිමේදි ටීම් එකෙන් අයින් වෙලා අවුරුද්දක් ක්‍රීඩාවෙන් ඈත් වෙලා හිටියා, ඊට පස්සේ Cadillac ටීම් එක එයාලගේ 2026 ඓතිහාසික debut එක වෙනුවෙන් මෙයාව co-lead driver විදිහට තෝරගත්තා. දශක ගාණකට පස්සේ F1 වලට ආපු පළවෙනි ඇමරිකානු manufacturer-backed ටීම් එක හැදෙන්නේ Pérez ගේ ඒ අතිවිශාල අත්දැකීම් සහ සුපිරි racecraft එකත් පදනම් කරගෙනයි. ඉවසිලිවන්ත, නිවැරදි, සහ රේස් එකක් ගොඩක්ම අවුල් වෙලා තියෙන වෙලාවට තමන්ගේ උපරිමය දෙන Checo කියන්නේ අමාරුම pressure එකක් යටතේ වුණත් වැඩ පෙන්නන සුපිරි ඩ්‍රයිවර් කෙනෙක්.",
      ],
      didYouKnow: "සර්කිට් එකෙන් පිටත ගත්තොත්, Pérez කියන්නේ Formula 1 වල ඉන්න ගොඩක්ම පුණ්‍ය කටයුතු වලට දායක වෙන ඩ්‍රයිවර්ස්ලගෙන් කෙනෙක්. මෙයාගේ 'Checo Pérez Foundation' එක හරහා Jalisco සහ මුළු මෙක්සිකෝව පුරාම ඉන්න දුප්පත් ළමයින්ට සහ තරුණයින්ට අධ්‍යාපන වැඩසටහන්, ක්‍රීඩා පහසුකම් සහ තරුණ සංවර්ධන ව්‍යාපෘති වලට මුදල් යොදවනවා — මෙයාගේ රේසිං ගමන පටන් ගත්ත දවසේ ඉඳන් උදව් කරපු ඒ ප්‍රජාවට සහ රටට මෙයා ආයෙත් ඒ විදිහටම සලකනවා.",
    },
  },
  bottas: {
    fullName: "Valtteri Viktor Bottas",
    number: "#77",
    ageDob: "37 years old — 28 August 1989",
    nationality: "Finnish 🇫🇮",
    team: "Cadillac Formula 1 Team",
    careerStats: {
      championships: "0",
      wins: "10",
      podiums: "67",
      poles: "20",
    },
    journey: [
      "Born in Nastola, a small town in southern Finland where his father Rauno owns a cleaning company and his mother Marianne works as an undertaker — backgrounds about as far removed from Formula 1 glamour as it is possible to be — Valtteri Bottas made it to the pinnacle of the sport through natural pace, extraordinary resilience, and a work ethic that never asked for sympathy or attention. He rose through the British junior formulae and GP3 before joining Williams in 2013, developing methodically into a dependable front-midfield performer before Mercedes came calling in 2017 to replace the retired Nico Rosberg.",
      "Five seasons alongside Lewis Hamilton produced ten race wins, 67 podiums, 20 pole positions, and five consecutive Constructors' Championship titles — but the Drivers' crown always narrowly eluded him, finishing second in 2019 and 2020. Seasons at Alfa Romeo and then Sauber followed before a 2025 absence from the grid as a Mercedes reserve driver. His signing by Cadillac for their 2026 Formula 1 debut — alongside Pérez — brought the paddock's most popular absentee back to where he belongs. He is now helping build an entirely new American project from its very foundations.",
      "Fast, experienced, and — away from the car — the paddock's most unexpectedly hilarious and self-aware personality, Bottas knows exactly who he is and owns every word of it.",
    ],
    didYouKnow: "Bottas holds the Formula One record for the most career championship points (1,797) without ever winning the World Drivers' Championship — a bittersweet distinction that speaks as much to how fiercely competitive his era was as to his own remarkable consistency. Off the track, he is a committed competitive cyclist who regularly enters amateur road races and time trials, and his partner, Australian professional cyclist Tiffany Cromwell, makes them one of the most athletically formidable couples in world sport.",
    si: {
      journey: [
        "දකුණු ෆින්ලන්තයේ Nastola කියන පොඩි නගරයේ ඉපදුණු Valtteri Bottas ගේ තාත්තා Rauno ට පිරිසිදු කරන කොම්පැණියක් තිබ්බේ, අම්මා Marianne වැඩ කළේ මල්ශාලාවක — Formula 1 වල තියෙන ඒ ග්ලැමර් එකට කිසිම සම්බන්ධයක් නැති පසුබිමකින් ආපු Bottas මේ ක්‍රීඩාවේ ඉහළටම ආවේ ස්වාභාවික වේගය, අසාමාන්‍ය දරාගැනීම සහ කිසිම දවසක අනුකම්පාවක් හරි අවධානයක් හරි බලාපොරොත්තු නොවුණු වැඩ කිරීමේ කැපවීම නිසයි. British junior formulae සහ GP3 හරහා ඇවිත් 2013 දී Williams ටීම් එකට එකතු වුණා, එතනදි හොඳ front-midfield ඩ්‍රයිවර් කෙනෙක් විදිහට හැදීගෙන එද්දි තමයි 2017 දී retire වුණු Nico Rosberg ගේ තැනට Mercedes ලා මෙයාව ගත්තේ.",
        "Lewis Hamilton එක්ක හිටපු seasons 5 දි මෙයා race wins 10ක්, podiums 67ක්, pole positions 20ක්, සහ පිටපිට Constructors' Championship titles 5ක් අරන් දුන්නා — හැබැයි 2019 සහ 2020 අවුරුදු වලදි දෙවැනියා වෙලා Drivers' crown එක නම් පොඩි ගාණකින් මගහැරුණා. ඊට පස්සේ Alfa Romeo සහ Sauber වල හිටියා, 2025 දී grid එකේ හිටියේ නෑ Mercedes reserve driver කෙනෙක් විදිහට හිටිය නිසා. හැබැයි 2026 Cadillac ලගෙ Formula 1 debut එකට Pérez එක්ක මෙයාවත් ගත්ත එකෙන්, paddock එකේ හිටපු ජනප්‍රියම නැතිවෙලා හිටපු චරිතය ආයෙත් ඉන්න ඕන තැනටම ඇවිත් තියෙනවා. දැන් මෙයා ඇමරිකානු අලුත්ම project එකක් මුල ඉඳන්ම ගොඩනගන්න උදව් කරනවා. වේගවත්, අත්දැකීම් බහුල, සහ කාර් එකෙන් පිටත ගත්තොත් මුළු paddock එකේම ඉන්න හිතාගන්න බැරි තරම් විහිළුකාර වගේම තමන් ගැන හොඳ අවබෝධයක් තියෙන Bottas, තමන් කවුද කියන එක හරියටම දන්නවා වගේම ඒ වෙනුවෙන් පෙනී ඉන්නවා.",
      ],
      didYouKnow: "World Drivers' Championship එකක් දිනන්නේ නැතුව Formula One ඉතිහාසයේ වැඩිම career championship points ගාණක් (ලකුණු 1,797 ක්) තියාගෙන ඉන්න record එක තියෙන්නේ Bottas ට — ඒක ටිකක් දුක හිතෙන දෙයක් වුණත්, ඒකෙන් පෙන්නුම් කරන්නේ එයා හිටපු කාලේ කොච්චර තරගකාරීද කියන එකයි, වගේම මෙයාගේ තියෙන අසාමාන්‍ය consistency එකයි. ට්‍රැක් එකෙන් පිටත, මෙයා ගොඩක් කැපවුණු competitive cyclist කෙනෙක්, නිතරම amateur road races සහ time trials වලට සහභාගි වෙනවා, වගේම මෙයාගේ partner වෙන ඕස්ට්‍රේලියානු professional cyclist Tiffany Cromwell ත් එක්ක ගත්තම මෙයාලා ලෝක ක්‍රීඩාවේ ඉන්න athletic අතින් ගොඩක්ම ශක්තිමත් කපල් එකක් විදිහට සලකනවා.",
    },
  },
  antonelli: {
    fullName: "Andrea Kimi Antonelli",
    number: "#12",
    ageDob: "20 years old — 25 August 2006",
    nationality: "Italian 🇮🇹",
    team: "Mercedes-AMG Petronas",
    careerStats: {
      championships: "0",
      wins: "8",
      podiums: "15",
      poles: "6",
    },
    journey: [
      "Hailing from Bologna — the beating heart of Italy's legendary Motor Valley — Kimi Antonelli was practically born to race. His father Marco competed in sports cars and ran his own team, meaning young Kimi grew up surrounded by engines, data sheets, and race-weekend adrenaline. After dominating junior karting and claiming back-to-back European championships, he burst into single-seaters in 2022 at just 15, sweeping both the German and Italian Formula 4 titles in his debut season. Mercedes-AMG had already seen enough, bringing him into their junior programme immediately.",
      "A dominant double in the Formula Regional European and Middle East championships in 2023 marked him out as the most exciting junior prospect on the planet. Mercedes fast-tracked him to Formula 1 in 2025, placing him alongside George Russell in the role vacated by the legendary Lewis Hamilton. His debut season showcased dazzling wet-weather pace and composure beyond his years. In 2026, he raised the bar entirely — consecutive victories in China, Japan, and Miami made him the youngest driver ever to lead the Formula 1 World Championship.",
      "On track, Antonelli is fluid, tyre-smart, and technically exceptional — managing energy and pace with a calm intelligence that makes you forget he is only 20 years old.",
    ],
    didYouKnow: "A lifelong admirer of Ayrton Senna, Antonelli chose the iconic #12 for his Formula 1 car in the Brazilian legend's honour. He also co-founded AKM Motorsport by Kart Republic with his father Marco — a professional kart team where he personally serves as a driver coach and chassis tester between Formula 1 weekends.",
    si: {
      journey: [
        "ඉතාලියේ Motor Valley එකේ හදවත වගේ සැලකෙන Bologna වලින් ආපු Kimi Antonelli ඉපදුනේම රේස් පදින්න කියලයි කියන්නේ. එයාගෙ තාත්තා Marco ත් sports cars රේස් කරපු කෙනෙක් වගේම එයාටම කියලා රේසින් ටීම් එකකුත් තිබ්බා, ඒ නිසා තරුණ Kimi හැදුනෙම එන්ජින්, ඩේටා ෂීට්ස් සහ රේස් වීක්එන්ඩ් එකක තියෙන ගැම්මත් එක්කමයි. ජූනියර් කාර්ටින් තරඟ ආධිපත්‍යය දරලා පිටපිට යුරෝපීය ශූරතා දිනාගත්තට පස්සේ, 2022 දි එයාගෙ වයස අවුරුදු 15 දී single-seaters වලට ඇවිත් එයාගෙ පළවෙනි සීසන් එකේදීම ජර්මන් සහ ඉතාලි Formula 4 titles දෙකම දිනාගත්තා. මේ දක්ෂතා දැකපු Mercedes-AMG ටීම් එක වහාම එයාව එයාලගෙ junior programme එකට එකතු කරගත්තා.",
        "2023 දී Formula Regional European සහ Middle East championships දෙකම දිනාගත්ත Kimi, ලෝකේ ඉන්න සුපිරිම junior prospect කෙනෙක් විදිහට කැපිලා පෙනුණා. Mercedes ටීම් එක 2025 දී එයාව ඉක්මනින්ම Formula 1 වලට ගෙනාවේ Lewis Hamilton ගෙන් හිස්වුණු තැනට George Russell එක්ක වැඩ කරන්නයි. එයාගෙ පළවෙනි සීසන් එකේදී වර්ෂාව තියෙන වෙලාවට එයාගෙ තියෙන වේගය සහ එයාගෙ වයසට වඩා මුහුකුරා ගිය සන්සුන්කම් හැසිරවීමක් එයා පෙන්නුවා. මේ 2026 අවුරුද්දේ එයා තමන්ගෙ දක්ෂතා තවත් ඉහළට ගෙනිහින් චීනය, ජපානය සහ මියාමි වල පිටපිට race ජයග්‍රහණ අරගෙන F1 World Championship එකක් ලීඩ් කරපු ළාබාලතම ඩ්‍රයිවර් බවට පත්වුණා. ට්‍රැක් එකේදී Antonelli ගොඩක් fluid, ටයර් ගැන හොඳට හිතලා වැඩ කරන, වගේම තාක්ෂණිකව සුවිශේෂී කෙනෙක්. එයාගෙ තියෙන සන්සුන් බුද්ධියත් එක්ක එයාගෙ ශක්තිය සහ වේගය පාලනය කරන විදිහ දැක්කම එයාට තාම අවුරුදු 20 යි කියන එකත් අපිට අමතක වෙනවා.",
      ],
      didYouKnow: "Ayrton Senna ගේ ලොකුම රසිකයෙක් වෙන Antonelli, ඒ බ්‍රසීලියානු ලෙජන්ඩ්ට ගෞරවයක් විදිහට තමන්ගෙ Formula 1 කාර් එකටත් ඒ ජනප්‍රිය #12 අංකයම තෝරගත්තා. ඒ වගේම එයාගෙ තාත්තා Marco එක්ක එකතු වෙලා AKM Motorsport by Kart Republic කියන professional kart team එකත් ආරම්භ කළා, Formula 1 වීක්එන්ඩ්ස් අතරතුරේදී එයා පෞද්ගලිකවම ඒකෙ driver coach සහ chassis tester විදිහට වැඩ කරනවා.",
    },
  },
  russell: {
    fullName: "George William Russell",
    number: "#63",
    ageDob: "28 years old — 15 February 1998",
    nationality: "British 🇬🇧",
    team: "Mercedes-AMG Petronas",
    careerStats: {
      championships: "0",
      wins: "7",
      podiums: "30",
      poles: "11",
    },
    journey: [
      "Born in King's Lynn, Norfolk, George Russell was practically the textbook graduate of the Mercedes-AMG junior programme. He swept the BRDC Formula 4 title in 2014, the GP3 Series in 2017, and the FIA Formula 2 championship in 2018 before stepping up to Williams for 2019 — a team fighting at the back of the grid. Three seasons in an uncompetitive car became a masterclass in resourcefulness and mental strength. His defining moment arrived at the 2020 Sakhir Grand Prix, where he stepped in for a COVID-stricken Lewis Hamilton: he claimed pole position, led for most of the race, and was robbed of a stunning maiden win only by a dramatic pit-lane mix-up.",
      "Moving to Mercedes in 2022 unlocked his true ceiling. Debut pole in Hungary and debut win in São Paulo arrived in his very first season alongside Hamilton. He added further victories in Austria and Las Vegas in 2024, but his finest campaign yet came in 2025 — two wins in Canada and Singapore, nine podiums, and a career-best 319 championship points. In 2026, he opened the season with a dominant victory in Melbourne and has continued to push hard for that elusive first title.",
      "A forensic engineer's driver defined by clinical qualifying pace, meticulous car knowledge, and cool, calculated race management, Russell consistently extracts the absolute maximum from whatever machinery he drives.",
    ],
    didYouKnow: "Off the track, Russell is a passionate automotive enthusiast who put his money where his heart is — purchasing one of only 275 Mercedes-AMG One hypercars ever built, a 1,049bhp road-legal machine with a Formula 1-derived engine. He describes driving it as the closest road experience to his actual race car, saying it gives him exactly the same sensation he gets behind the wheel at a Grand Prix.",
    si: {
      journey: [
        "Norfolk වල King's Lynn හි ඉපදුණු George Russell කියන්නේ Mercedes-AMG junior programme එකේ සාර්ථකම ප්‍රතිඵලයක්. එයා 2014 දී BRDC Formula 4 title එකත්, 2017 දී GP3 Series එකත්, 2018 දී FIA Formula 2 championship එකත් දිනාගෙන 2019 දී Williams ටීම් එකට ආවා — ඒ කියන්නේ grid එකේ අන්තිමටම හිටපු ටීම් එකකට. තරඟකාරී නැති කාර් එකක අවුරුදු තුනක් ගත කරපු එක, එයාගෙ මානසික ශක්තිය හදාගන්න ලොකු පාඩමක් වුණා. එයාගෙ ජීවිතේ හැරවුම් ලක්ෂය ආවේ 2020 Sakhir Grand Prix එකේදී, COVID හැදිලා හිටපු Lewis Hamilton වෙනුවට රේස් එකට සහභාගි වෙලා එයා Pole Position එක අරන් රේස් එකේ ගොඩක් වෙලා පෙරමුණේ හිටියා, නමුත් අවාසනාවන්ත pit-lane පැටලැවිල්ලක් නිසා එයාට ඒ පළමු ජයග්‍රහණය අහිමි වුණා.",
        "2022 දී Mercedes ටීම් එකට ආවට පස්සේ එයාගෙ නියම හැකියාවන් එළියට ආවා. Hamilton එක්ක හිටපු පළමු සීසන් එකේදීම හංගේරියාවේදී පළමු pole එකත්, São Paulo වලදී පළමු ජයග්‍රහණයත් ලබා ගත්තා. 2024 දී ඕස්ට්‍රියාවේ සහ ලාස් වේගාස් වල තවත් ජයග්‍රහණ එකතු කරගත්ත එයා, 2025 දී කැනඩාවේ සහ සිංගප්පූරුවේ ජයග්‍රහණ දෙකක්, podiums නවයක් සහ එයාගෙ career එකේ වැඩිම ලකුණු 319 ක් අරගෙන සුපිරිම තරගාවලියක් නිම කළා. මේ 2026 අවුරුද්දේ එයා මෙල්බර්න් වල සුපිරි ජයග්‍රහණයකින් සීසන් එක පටන් අරන්, ඒ අහිමි වුණු පළමු චැම්පියන්ෂිප් එක වෙනුවෙන් දිගටම සටන් කරනවා. සුපිරි qualifying pace එකක්, කාර් එක ගැන තියෙන සියුම් දැනුම සහ රේස් එකක් calculated විදිහට මැනේජ් කරන George Russell, තමන් පදවන ඕනෑම කාර් එකකින් උපරිම ප්‍රයෝජනය ගන්න දක්ෂයෙක්.",
      ],
      didYouKnow: "ට්‍රැක් එකෙන් පිටත, Russell කියන්නේ වාහන වලට හරිම ආදරේ කරන කෙනෙක්, එයා තමන්ගෙ සල්ලි වලින් ලෝකෙටම 275 ක් විතරක් හදපු Mercedes-AMG One hypercar එකක් මිලදී ගෙන තියෙනවා. මේක 1,049bhp තියෙන, Formula 1 එන්ජිමකින් හදපු පාරේ යන්න පුළුවන් කාර් එකක්. එයා කියන විදිහට ඒක පදවන එක තමයි එයාගෙ රේස් කාර් එක පදවනවට සමානම අත්දැකීම, හරියට Grand Prix එකක කාර් එකක් පදවනවා වගේම ෆීලින්ග් එකක් මේකෙන් එනවා කියලයි එයා කියන්නේ.",
    },
  },
  leclerc: {
    fullName: "Charles Marc Hervé Perceval Leclerc",
    number: "#16",
    ageDob: "28 years old — 16 October 1997",
    nationality: "Monégasque 🇲🇨",
    team: "Scuderia Ferrari",
    careerStats: {
      championships: "0",
      wins: "9",
      podiums: "54",
      poles: "27",
    },
    journey: [
      "Growing up in Monte Carlo — literally in the shadow of Formula 1's most glamorous race circuit — Charles Leclerc was shaped by motorsport from his earliest years. Under the mentorship of the late Jules Bianchi, one of the most devastating losses in recent F1 history, Leclerc climbed through the junior rankings with devastating speed, claiming the GP3 title in 2016 and the FIA Formula 2 championship in 2017 before making his Formula 1 debut with Sauber in 2018. His first season in a midfield car was extraordinary: he routinely outperformed the machinery beneath him, convincing Ferrari that he was the driver to anchor their future.",
      "At Maranello, Leclerc immediately justified every expectation. He won in Belgium in 2019 and backed it up the following weekend with another in Italy — Ferrari's first back-to-back victories in over a decade. He subsequently stacked up an astonishing 27 pole positions across his career, cementing his status as arguably the greatest one-lap qualifier of his generation. His emotional win at the 2024 Monaco Grand Prix — the first Monégasque winner on home streets in 93 years — was one of the decade's defining sporting moments. In 2026, he returned to winning ways at the British Grand Prix.",
      "Explosive, precise, and utterly fearless on a flying lap, Leclerc's qualifying performances are works of art. His hunger for a first World Championship has never been more urgent.",
    ],
    didYouKnow: "Charles Leclerc is a classically trained pianist who has been playing since childhood. Away from the race track, he composes and performs his own original pieces — a deeply personal and creative side of his personality that rarely makes headlines but speaks volumes about the depth of talent that also makes him exceptional behind the wheel of a Ferrari.",
    si: {
      journey: [
        "Formula 1 වල තියෙන ලස්සනම රේස් ට්‍රැක් එකක් වෙන Monte Carlo වල හැදී වැඩුණු Charles Leclerc ගේ ජීවිතේ පොඩි කාලේ ඉඳන්ම හැඩගැහුණේ මෝටර් ස්පෝර්ට්ස් එක්කයි. මෑතකදී F1 ලෝකෙට අහිමි වුණු දක්ෂයෙක් වෙන අභාවප්‍රාප්ත Jules Bianchi ගේ මඟපෙන්වීම යටතේ, Leclerc කනිෂ්ඨ තරඟ වලින් වේගයෙන් ඉදිරියට ඇවිත් 2016 දී GP3 title එකත්, 2017 දී FIA Formula 2 championship එකත් දිනාගෙන 2018 දී Sauber ටීම් එකෙන් Formula 1 වලට ආවා. Midfield කාර් එකක එයාගෙ පළවෙනි සීසන් එක අතිවිශිෂ්ට වුණා: එයාට තිබුණු කාර් එකට වඩා සුපිරි දක්ෂතා පෙන්නපු නිසා Ferrari ටීම් එක තීරණය කළා එයාලගෙ අනාගතය භාරදෙන්න ඕන ඩ්‍රයිවර් එයා කියලා.",
        "Maranello වලදී , Leclerc ඒ බලාපොරොත්තු ඔක්කොම ඉෂ්ට කළා. 2019 දී එයා බෙල්ජියමේ ජයග්‍රහණයක් අරගෙන ඊළඟ සතියේ ඉතාලියේදීත් ජයග්‍රහණය කළා — ඒක දශකයකට පස්සේ Ferrari ගත්ත පළවෙනි back-to-back ජයග්‍රහණයයි. එතනින් පස්සේ එයා එයාගෙ career එක ඇතුළත පුදුම සහගත විදිහට Pole Positions 27 ක් අරගෙන තියෙනවා, ඒකෙන් එයා මේ පරම්පරාවේ ඉන්න හොඳම one-lap qualifier කෙනෙක් විදිහට නමක් හදාගත්තා. 2024 දී Monaco Grand Prix එකේදී එයා ලබපු ජයග්‍රහණය ගොඩක් හැඟීම්බර එකක් වුණා — අවුරුදු 93 කට පස්සේ තමන්ගෙම ගෙදරදි දිනපු පළවෙනි Monégasque ජාතිකයා වුණේ එයා. මේ 2026 අවුරුද්දේ එයා British Grand Prix එක දිනලා ආයෙමත් තමන්ගෙ ජයග්‍රාහී ගමනට ඇවිත් ඉන්නවා. Flying lap එකකදී පුදුම වේගවත්, නිවැරදි සහ කිසිම බයක් නැති Leclerc ගේ qualifying දක්ෂතා හරියට කලාවක් වගේ. එයාගෙ පළවෙනි World Championship එක වෙනුවෙන් තියෙන බලාපොරොත්තුව දැන් වෙන කවරදාටත් වඩා වැඩියි.",
      ],
      didYouKnow: "Charles Leclerc කියන්නේ පොඩි කාලේ ඉඳන්ම පියානෝ වාදනය ඉගෙන ගත්ත දක්ෂ පියානෝ වාදකයෙක්. රේස් ට්‍රැක් එකෙන් පිටත එයා එයාගෙම නිර්මාණ හදලා ප්ලේ කරනවා — මේක එයාගෙ පෞරුෂත්වයේ ගොඩක් අය නොදන්න නිර්මාණාත්මක පැත්තක්, මේකෙන් පේනවා Ferrari කාර් එකක් ඇතුළේ වගේම ඉන් පිටතත් එයාට කොච්චර හැකියාවක් තියෙනවද කියලා.",
    },
  },
  hamilton: {
    fullName: "Lewis Carl Davidson Hamilton",
    number: "#44",
    ageDob: "41 years old — 7 January 1985",
    nationality: "British 🇬🇧",
    team: "Scuderia Ferrari",
    careerStats: {
      championships: "7 (2008, 2014, 2015, 2017, 2018, 2019, 2020)",
      wins: "106",
      podiums: "207",
      poles: "104",
    },
    journey: [
      "To write about Lewis Hamilton is to attempt to summarise one of the greatest sporting achievements in human history. Born and raised in Stevenage, Hertfordshire, Hamilton defied the social and financial barriers that have long kept working-class kids out of motorsport, rising through karting on the back of McLaren junior support to become the most statistically dominant racing driver the sport has ever produced. His 2007 Formula 1 debut with McLaren was one of the most remarkable in the sport's history — he nearly won the championship in his very first season, and returned in 2008 to claim it. The first of many.",
      "His move to Mercedes in 2013 triggered an era of near-total domination. Six further World Championships followed — in 2014, 2015, 2017, 2018, 2019, and 2020 — placing him level with Michael Schumacher on seven titles while surpassing every significant record in Formula 1 history: most wins (106), most pole positions (104), most podiums (207). The seismic move to Ferrari for 2025 was one of modern sport's biggest stories; after a difficult debut season in red, he delivered an emotional first Ferrari victory at the 2026 Spanish Grand Prix.",
      "At 41 and entering his 20th season, Hamilton remains a supremely complete racing driver — a wet-weather genius, a master of tyre preservation, and a qualifying predator whose instincts for the race have never been sharper.",
    ],
    didYouKnow: "Lewis Hamilton received a knighthood in the 2021 New Year Honours, making him officially Sir Lewis Hamilton — one of the highest recognitions the British state can bestow. Away from racing, he is also the founder of Mission 44, a UK-based charitable foundation dedicated to supporting underrepresented young people into motorsport, STEM careers, and higher education.",
    si: {
      journey: [
        "Lewis Hamilton ගැන ලියනවා කියන්නේ මානව ඉතිහාසයේ ලොකුම ක්‍රීඩා ජයග්‍රහණයක් ගැන සාරාංශ කරන්න හදනවා වගේ වැඩක්. Hertfordshire හි Stevenage වල ඉපදිලා හැදුණු Hamilton, සමාජීය සහ මූල්‍යමය බාධක ඔක්කොම බිඳගෙන McLaren junior support එකත් එක්ක karting වලින් උඩට ඇවිත්, මේ ක්‍රීඩාවේ බිහිවුණු සාර්ථකම රේසින් ඩ්‍රයිවර් බවට පත්වුණා. 2007 දී McLaren එක්ක එයාගෙ Formula 1 debut එක මේ ක්‍රීඩාවේ ඉතිහාසයේ සුවිශේෂීම එකක් — එයාගෙ පළවෙනි සීසන් එකේදීම චැම්පියන්ෂිප් එක දිනන්න ඔන්න මෙන්න තියෙද්දි නැතිවුණත්, 2008 දී ඇවිත් ඒක දිනාගත්තා. ඒක තමයි එයාගෙ ජයග්‍රහණ ගොඩක ආරම්භය.",
        "2013 දී Mercedes ටීම් එකට ගිය එකත් එක්ක එයා සම්පූර්ණයෙන්ම වගේ F1 ලෝකෙ ආධිපත්‍යය පැතිරෙව්වා. තවත් World Championships හයක් — 2014, 2015, 2017, 2018, 2019, සහ 2020 — දිනාගෙන Michael Schumacher ගේ titles හතේ රෙකෝඩ් එකට සම වුණා වගේම Formula 1 ඉතිහාසයේ තියෙන හැම ලොකු රෙකෝඩ් එකක්ම බිඳ දැම්මා: වැඩිම ජයග්‍රහණ (106), වැඩිම pole positions (104), වැඩිම podiums (207) විදිහට. 2025 දී එයා Ferrari ටීම් එකට ගිය එක නූතන ක්‍රීඩා ලෝකයේ ලොකුම නිවුස් එකක් වුණා; රතු කාර් එකේ ටිකක් අමාරු පළමු සීසන් එකකට පස්සේ, මේ 2026 Spanish Grand Prix එකේදී එයා Ferrari වෙනුවෙන් එයාගෙ හැඟීම්බර පළමු ජයග්‍රහණය ලබාගත්තා. වයස අවුරුදු 41 දී එයාගෙ 20 වෙනි සීසන් එකට ඇතුළත් වෙන Hamilton තාමත් F1 වල ඉන්න අතිවිශිෂ්ට ඩ්‍රයිවර් කෙනෙක් — වර්ෂාව වෙලාවට සුපිරි දක්ෂයෙක්, ටයර් ආරක්ෂා කරගන්න උපන් හපනෙක්, වගේම qualifying වලදී රේස් එකට තියෙන ඉව තාමත් ඒ විදිහටම තියෙනවා.",
      ],
      didYouKnow: "2021 New Year Honours වලදී Lewis Hamilton ට knighthood එකක් ලැබුණා, ඒකෙන් එයා නිල වශයෙන් Sir Lewis Hamilton බවට පත්වුණා — මේක බ්‍රිතාන්‍ය රාජ්‍යයෙන් දෙන්න පුළුවන් ඉහළම ගෞරවයක්. රේසින් වලට අමතරව, එයා Mission 44 කියන UK වල තියෙන පුණ්‍යායතනයේ නිර්මාතෘවරයා විදිහටත් වැඩ කරනවා, ඒකෙන් අඩු වරප්‍රසාද ලබන තරුණ අයට මෝටර් ස්පෝර්ට්ස්, STEM careers, සහ උසස් අධ්‍යාපනයට යන්න උදව් කරනවා.",
    },
  },
  norris: {
    fullName: "Lando Norris",
    number: "#1 (2026, as reigning World Champion — permanent number: #4)",
    ageDob: "26 years old — 13 November 1999",
    nationality: "British 🇬🇧",
    team: "McLaren Mercedes",
    careerStats: {
      championships: "1 (2025)",
      wins: "13",
      podiums: "48",
      poles: "18",
    },
    journey: [
      "Bristol-born Lando Norris was never a question of if — only when. Arriving in Formula 1 with McLaren in 2019 after one of the most decorated junior careers of his generation, he made himself at home immediately, extracting extraordinary results from a team still finding its way back to competitiveness. He became a regular podium visitor in 2021 and came heartbreakingly close to his maiden win at the Russian Grand Prix that year, leading comfortably before a fateful decision to stay out on slicks in worsening rain ultimately cost him the victory. It was a painful lesson that sharpened everything that followed.",
      "The 2024 Miami Grand Prix finally delivered his first win, unleashing something ferocious. He pushed Max Verstappen all the way to the title wire that year before delivering a masterful 2025 campaign — seven victories, including a spectacular home win at Silverstone — and clinching the World Drivers' Championship by just two points in a dramatic final round in Abu Dhabi. McLaren's first title since Jenson Button in 2008 was sealed. In 2026, he carries the #1 as defending champion and has already underlined his intent with further victories.",
      "Natural, relentless, and supremely car-intelligent, Norris combines blistering one-lap pace with exceptional racecraft and an ability to push his machinery to the very limit without overstepping it.",
    ],
    didYouKnow: "Norris is one of Formula 1's biggest gaming and content personalities. He co-founded Quadrant — a UK-based esports and lifestyle brand spanning content creation, apparel, and gaming peripherals — and is a regular Twitch streamer with millions of followers. He is also a passionate music producer, regularly sharing tracks online, making him one of the most creatively and digitally multifaceted athletes in world sport.",
    si: {
      journey: [
        "Bristol වල ඉපදුණු Lando Norris ට F1 එන්න පුළුවන්ද බැරිද කියන එක කවදාවත් ප්‍රශ්නයක් වුණේ නෑ — ප්‍රශ්නෙ වුණේ කවදද එන්නේ කියන එක විතරයි. මේ පරම්පරාවේ හොඳම කනිෂ්ඨ වාර්තා තියාගෙන 2019 දී McLaren එක්ක Formula 1 වලට ආපු එයා, තරඟකාරීත්වයට එන්න උත්සාහ කරන ටීම් එකකින් සුපිරි ප්‍රතිඵල අරන් දුන්නා. 2021 දී නිතරම podium එකට ගිය එයා, ඒ අවුරුද්දේ Russian Grand Prix එකේදී එයාගෙ පළවෙනි ජයග්‍රහණයට ගොඩක් කිට්ටුවට ආවා, හොඳින් පෙරමුණේ හිටියත් වැඩිවෙන වර්ෂාව අස්සේ slicks ටයර් වලින්ම යන්න ගත්ත තීරණය නිසා එයාට ඒ ජයග්‍රහණය අහිමි වුණා. ඒක රිදෙන පාඩමක් වුණත් ඒකෙන් පස්සේ එයා තවත් ශක්තිමත් වුණා.",
        "2024 Miami Grand Prix එකෙන් එයාගෙ පළවෙනි ජයග්‍රහණය ලැබුණා, ඒකෙන් එයාගෙ ඇතුළේ හිටපු දක්ෂයා එළියට ආවා. ඒ අවුරුද්දේ Max Verstappen එක්ක අන්තිම වෙනකන් title එකට සටන් කරපු එයා, 2025 දී අතිවිශිෂ්ට සීසන් එකක් පෙන්නුවා — ජයග්‍රහණ හතක්, ඒ අතරට Silverstone වල සුපිරි ජයග්‍රහණයකුත් ඇතුළත්, වගේම අබුඩාබි වල අන්තිම රේස් එකේදී ලකුණු දෙකකින් World Drivers' Championship එක දිනාගත්තා. 2008 දී lewis hamilton ගෙන් පස්සේ McLaren ටීම් එක ගත්ත පළවෙනි title එක ඒකයි. මේ 2026 අවුරුද්දේ එයා defending champion විදිහට #1 අංකය පාවිච්චි කරනවා වගේම දැනටමත් තවත් ජයග්‍රහණ අරගෙන එයාගෙ අරමුණ පැහැදිලි කරලා තියෙනවා. ස්වභාවික හැකියාවක් තියෙන, උත්සාහය අත්නාරින, සහ කාර් එක ගැන සුපිරි අවබෝධයක් තියෙන Norris, වේගවත් one-lap pace එකක් වගේම exceptional racecraft එකකුත් එක්ක තමන්ගෙ කාර් එකේ උපරිම සීමාවටම යන්න පුළුවන් ඩ්‍රයිවර් කෙනෙක්.",
      ],
      didYouKnow: "Norris කියන්නේ Formula 1 වල ඉන්න ලොකුම gaming සහ content personalities වලින් කෙනෙක්. එයා Quadrant කියන UK වල තියෙන esports සහ lifestyle brand එකේ සම-නිර්මාතෘ කෙනෙක් වගේම මිලියන ගාණක් followers ලා ඉන්න Twitch streamer කෙනෙක්. ඒ වගේම එයා ආසාවෙන් music පවා හදනවා, ඔන්ලයින් tracks ශෙයා කරනවා, මේ නිසා එයා ලෝක ක්‍රීඩාවේ ඉන්න නිර්මාණාත්මක සහ ඩිජිටල් පැත්තෙන් ගොඩක් දක්ෂතා තියෙන කෙනෙක් විදිහට කැපිලා පේනවා.",
    },
  },
  max_verstappen: {
    fullName: "Max Emilian Verstappen",
    number: "#3 (switched from #1 following the 2025 title; originally raced as #33 from 2015–2021)",
    ageDob: "28 years old — 30 September 1997",
    nationality: "Dutch 🇳🇱",
    team: "Red Bull Racing",
    careerStats: {
      championships: "4 (2021, 2022, 2023, 2024)",
      wins: "71",
      podiums: "131",
      poles: "48",
    },
    journey: [
      "Born in Hasselt, Belgium to Dutch F1 driver Jos Verstappen and Belgian karting champion Sophie Kumpen, Max Verstappen arrived in Formula 1 carrying more motorsport DNA than almost any driver before him. He bypassed Formula 3 entirely and stepped directly into F1 with Toro Rosso in 2015 at just 17 — the youngest starter in Grand Prix history at the time. Promoted to Red Bull mid-season in 2016, he won on his very first weekend in the senior car at the Spanish Grand Prix, becoming the youngest Grand Prix winner in history at 18 years and 228 days. Formula 1 has not been the same since.",
      "What followed was the most dominant individual period in the sport's modern history. Four consecutive World Championships — in 2021, 2022, 2023, and 2024 — placed him among the all-time greats. The 2021 title was claimed in the most controversial final lap of the most dramatic final race the sport had ever seen in Abu Dhabi. His 2023 season produced a staggering record of 19 victories from 22 Grands Prix. In 2026, amid Red Bull's new-era regulation struggles with the RB22, he has yet to win — but remains the fiercest competitor on the grid.",
      "Raw, instinctive, and possessed of an otherworldly ability to find the limit of a racing car at any moment, Verstappen is a generational talent in a class of his own.",
    ],
    didYouKnow: "Away from the circuit, Verstappen is one of the world's most serious sim racers. He co-owns Team Redline, a leading esports racing outfit, and competes in major virtual events — sometimes anonymously under a pseudonym so other drivers don't know it's him and treat him like any other competitor. His lap times online are reportedly as frightening as his lap times in real life.",
    si: {
      journey: [
        "බෙල්ජියමේ Hasselt වල, ලන්දේසි F1 ඩ්‍රයිවර් කෙනෙක් වෙන Jos Verstappen ට සහ බෙල්ජියම් karting champion කෙනෙක් වෙන Sophie Kumpen ට දාව ඉපදුණු Max Verstappen Formula 1 වලට ආවේ වෙන කිසිම ඩ්‍රයිවර් කෙනෙක්ට වඩා මෝටර් ස්පෝර්ට්ස් DNA ඇඟේ තියාගෙනයි. එයා Formula 3 සම්පූර්ණයෙන්ම මඟහැරලා 2015 දී වයස 17 න් Toro Rosso ටීම් එකෙන් කෙළින්ම F1 වලට ආවා — ඒ වෙද්දි Grand Prix ඉතිහාසයේ ළාබාලතම ඩ්‍රයිවර් එයායි. 2016 මැදදි Red Bull ටීම් එකට ගිය එයා, Spanish Grand Prix එකේ පළවෙනි රේස් එකෙන්ම ජයග්‍රහණය කරලා, අවුරුදු 18 යි දින 228 න් ඉතිහාසයේ ළාබාලතම Grand Prix winner බවට පත්වුණා. එදායින් පස්සේ Formula 1 කලින් වගේ වුණේ නෑ.",
        "ඒකෙන් පස්සේ ආවේ නූතන ක්‍රීඩා ඉතිහාසයේ ලොකුම ආධිපත්‍යය පැතිරෙව්ව කාලයයි. පිටපිට World Championships හතරක් — 2021, 2022, 2023, සහ 2024 — දිනාගත්ත එයා F1 වල ඉන්න ශ්‍රේෂ්ඨතමයන්ගේ ලිස්ට් එකට එකතු වුණා. 2021 title එක දිනාගත්තේ අබුඩාබි වල ක්‍රීඩා ඉතිහාසයේ දැකපු ආන්දෝලනාත්මකම සහ නාට්‍යමය අවසන් වටයේදියි. 2023 සීසන් එකේදී එයා Grands Prix 22 කින් ජයග්‍රහණ 19 ක් අරගෙන පුදුම සහගත රෙකෝඩ් එකක් තිබ්බා. මේ 2026 අවුරුද්දේ, Red Bull  RB22 කාර් එකේ අලුත් ප්‍රශ්නත් එක්ක එයා තාම රේස් එකක් දිනලා නැති වුණත්, Grid එකේ ඉන්න දරුණුතම තරඟකරුවා එයාමයි. ස්වභාවික, ඉවෙන් වගේ රේස් කරන, සහ ඕනෑම වෙලාවක රේසින් කාර් එකක උපරිම සීමාව හොයාගන්න පුළුවන් හැකියාවක් තියෙන Verstappen කියන්නේ මේ පරම්පරාවේ ඉන්න වෙනමම class එකක කෙනෙක්.",
      ],
      didYouKnow: "සර්කිට් එකෙන් පිටත, Verstappen කියන්නේ ලෝකේ ඉන්න බරපතළම sim racers ලගෙන් කෙනෙක්. එයා ප්‍රමුඛ esports racing කණ්ඩායමක් වෙන Team Redline එකේ සම අයිතිකරුවෙක් වගේම ලොකු virtual තරඟ වලට සහභාගි වෙනවා — සමහර වෙලාවට එයා කවුද කියලා අනිත් අය දැනගන්නවට අකමැති නිසා ව්‍යාජ නමකින් පවා තරඟ කරනවා. එයා ඔන්ලයින් තියන lap times, එයා ඇත්ත ජීවිතේ රේස් කරන lap times වගේම භයානකයි.",
    },
  },
  hadjar: {
    fullName: "Isack Alexandre Hadjar",
    number: "#6",
    ageDob: "21 years old — 28 September 2004",
    nationality: "French 🇫🇷",
    team: "Red Bull Racing",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "2",
      poles: "0",
    },
    journey: [
      "Born in Paris to an Algerian family of academics and researchers, Isack Hadjar is Formula 1's quiet overachiever — a young driver who has consistently done his talking on the track rather than off it. His journey into motorsport began in karting in 2012, and his progress was so rapid that Red Bull's Helmut Marko took notice at a Monaco Formula Regional race in 2021, where the 16-year-old delivered a pole-victory-fastest lap hat-trick that left no room for doubt. He was signed to the junior programme almost immediately.",
      "His graduation through Formula 3 and Formula 2 was measured and impressive — patient when needed, explosive when the opportunity arose. He made his Formula 1 debut with Racing Bulls in 2025, logging a difficult but educational rookie season that contained a stunning maiden podium at the Dutch Grand Prix at Zandvoort. That result, earned through four-time composure in a grand prix environment, convinced Red Bull to promote him to the senior team alongside Max Verstappen for the 2026 season — replacing the experienced Yuki Tsunoda.",
      "Still developing and navigating a challenging 2026 alongside the most demanding benchmark teammate imaginable, Hadjar shows all the hallmarks of a future race winner: smooth, intelligent, and built for the long game.",
    ],
    didYouKnow: "Isack Hadjar's father, Yassine Hadjar, is a professional research scientist specialising in quantum mechanics — and he also personally served as Isack's kart mechanic throughout his junior career, maintaining the equipment himself. Very few Formula 1 drivers can say their first mechanic was a published quantum physicist.",
    si: {
      journey: [
        "පැරිස් වල ඇල්ජීරියානු අධ්‍යාපනඥයින් සහ පර්යේෂකයින් ඉන්න පවුලක ඉපදුණු Isack Hadjar කියන්නේ Formula 1 වල ඉන්න නිශ්ශබ්දවම වැඩ පෙන්නන කෙනෙක් — කතාවට වඩා වැඩියෙන් ට්‍රැක් එකේ තමන්ගෙ දක්ෂතා පෙන්නන තරුණ ඩ්‍රයිවර් කෙනෙක්. 2012 දී karting වලින් පටන් ගත්ත එයාගෙ ගමන කොච්චර වේගවත්ද කියනවනම් 2021 දී Monaco Formula Regional රේස් එකකදී වයස අවුරුදු 16ක් වෙච්ච මේ කොල්ලා ගත්ත pole-victory-fastest lap ත්‍රිත්වය දැකලා Red Bull එකේ Helmut Marko ට පවා පුදුම හිතුණා. එයා වහාම ඒ junior programme එකට අත්සන් කළා.",
        "Formula 3 සහ Formula 2 හරහා එයාගෙ ගමන ගොඩක් සැලසුම්සහගත සහ ආකර්ෂණීය වුණා — ඉවසන්න ඕන තැන ඉවසලා, අවස්ථාව ආවම පුපුරලා යන විදිහට එයා වැඩ කළා. 2025 දී Racing Bulls එක්ක Formula 1 debut එක කරපු එයා, අමාරු වුණත් ගොඩක් දේවල් ඉගෙන ගත්ත rookie සීසන් එකක් ගත කළා, ඒකේ Zandvoort හි Dutch Grand Prix එකේ සුපිරි maiden podium එකකුත් තිබ්බා. ඒ ප්‍රතිඵලයත් එක්ක, 2026 සීසන් එක වෙනුවෙන් Yuki Tsunoda වෙනුවට Max Verstappen එක්ක Red Bull senior team එකට එයාව ප්‍රමෝට් කරන්න Red Bull තීරණය කළා. තාමත් දියුණු වෙන ගමන් ඉන්න, අමාරු 2026 සීසන් එකක් අමාරුම teammate කෙනෙකුත් එක්ක ගත කරන Hadjar ට, අනාගතයේ race winner කෙනෙක් වෙන්න ඕන කරන හැම ලක්ෂණයක්ම තියෙනවා: smooth, බුද්ධිමත්, සහ දිගු ගමනකට හැදුණු කෙනෙක්.",
      ],
      didYouKnow: "Isack Hadjar ගේ තාත්තා, Yassine Hadjar කියන්නේ quantum mechanics ගැන විශේෂඥ දැනුමක් තියෙන professional research scientist කෙනෙක් — වගේම එයා තමයි Isack ගේ කනිෂ්ඨ කාලේ පුරාවටම එයාගෙ kart mechanic විදිහට වැඩ කළේ, ඒ උපකරණ එයාමයි නඩත්තු කළේ. තමන්ගෙ පළවෙනි මෙකැනික් quantum physicist කෙනෙක් කියලා කියන්න පුළුවන් ඩ්‍රයිවර්ස්ලා F1 වල ඉන්නේ හරිම අඩුවෙන්.",
    },
  },
  lawson: {
    fullName: "Liam Jared Lawson",
    number: "#30",
    ageDob: "24 years old — 11 February 2002",
    nationality: "New Zealander 🇳🇿",
    team: "Racing Bulls",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "0",
      poles: "0",
    },
    journey: [
      "From the small city of Hastings on New Zealand's North Island, Liam Lawson built his reputation the hard way — competing across an unusually wide range of championships simultaneously, proving his adaptability and nerve at every level. After claiming national titles back home, he progressed into the European junior ranks, becoming a front-runner in Formula 2 while simultaneously racing in the German DTM championship in 2021, narrowly missing the DTM title in controversial circumstances. His range across completely different machinery set him apart from the crowd and earned him a place in the Red Bull junior programme.",
      "His Formula 1 debut in 2023 arrived unexpectedly when he was called up as a substitute for an injured Daniel Ricciardo at AlphaTauri. Across five races, he delivered mature, impressive performances — highlighted by outqualifying Verstappen at Singapore — that made the paddock sit up and take immediate notice. After a turbulent start to the 2025 season at Red Bull, he returned to Racing Bulls and re-established himself as a consistent points scorer, earning further credibility as a senior Red Bull emergency call-up mid-2026 when Hadjar suffered a wrist injury.",
      "Aggressive, adaptable, and unshakeable under pressure, Lawson is New Zealand's most credible chance of a Formula 1 Grand Prix winner since the golden era of Denny Hulme.",
    ],
    didYouKnow: "Liam Lawson has openly shared that his love of racing was sparked as a child by Lightning McQueen — the animated hero of the Disney Pixar film Cars. He has also raced in Super Formula Japan, the DTM, Formula 2, and Formula 1 across different periods of his career — making him one of the most multi-disciplinary racing drivers of his generation.",
    si: {
      journey: [
        "නවසීලන්තයේ උතුරු දූපතේ Hastings කියන පොඩි නගරයෙන් ආපු Liam Lawson එයාගෙ නම හදාගත්තේ හරිම අමාරුවෙන් — එකම කාලේක ගොඩක් වෙනස් චැම්පියන්ෂිප්ස් වලට තරඟ කරලා, හැම තැනදීම එයාගෙ හැකියාව සහ ධෛර්යය පෙන්නලා. තමන්ගෙ රටේ national titles දිනාගෙන යුරෝපීය කනිෂ්ඨ තරඟ වලට ආපු එයා, 2021 දී Formula 2 වල ඉස්සරහින්ම ඉන්න ගමන් ජර්මානු DTM championship එකටත් තරඟ කරලා පොඩි වෙනසකින් ආන්දෝලනාත්මක විදිහට DTM title එක නැති කරගත්තා. වෙනස්ම ජාතියේ වාහන පදවන්න එයාට තිබුණු හැකියාව නිසා එයා අනිත් අයට වඩා කැපිලා පෙනුණා, ඒකෙන්ම Red Bull junior programme එකේ තැනකුත් හදාගත්තා.",
        "2023 දී AlphaTauri ටීම් එකේ අතට තුවාල වෙලා හිටපු Daniel Ricciardo වෙනුවට ආදේශකයක් විදිහට F1 වලට එන්න එයාට හදිසි අවස්ථාවක් ලැබුණා. රේස් පහක් ඇතුළත එයා පෙන්නපු මුහුකුරා ගිය දක්ෂතා — විශේෂයෙන්ම සිංගප්පූරුවේදී Verstappen ට වඩා හොඳින් qualify වීම — නිසා මුළු පැඩොක් එකම එයා දිහා බැලුවා. 2025 මුලදී Red Bull එක්ක අමාරු කාලයක් ගත කරලා ආයෙමත් Racing Bulls වලට ආපු එයා දිගටම points ගන්න ඩ්‍රයිවර් කෙනෙක් විදිහට නමක් හදාගත්තා, වගේම 2026 මැදදී Hadjar ගේ මැණික්කටුවට තුවාල වුණාම Red Bull ටීම් එකට ආයෙත් හදිසියට කතා කළෙත් එයාවමයි. Aggressive, හැඩගැහෙන්න පුළුවන්, සහ ප්‍රෙෂර් එකක් ආවාම සැලෙන්නේ නැති Lawson තමයි Denny Hulme ගේ ස්වර්ණමය යුගයෙන් පස්සේ නවසීලන්තයෙන් ආපු හොඳම Formula 1 Grand Prix ජයග්‍රහණයක් බලාපොරොත්තු වෙන්න පුළුවන් කෙනා.",
      ],
      didYouKnow: "Liam Lawson ප්‍රසිද්ධියේම කියලා තියෙනවා එයාට රේස් පදින්න ආසාව ඇතිවුණේ පොඩි කාලේ Disney Pixar ලගෙ Cars ෆිල්ම් එකේ Lightning McQueen ව දැකලලු. එයා Super Formula Japan, DTM, Formula 2, සහ Formula 1 කියන මේ ඔක්කොම වල තරඟ කරලා තියෙනවා — ඒකෙන් එයා මේ පරම්පරාවේ ඉන්න විවිධ ක්ෂේත්‍ර වල රේස් කරපු අත්දැකීම් බහුලම ඩ්‍රයිවර් කෙනෙක් වෙනවා.",
    },
  },
  arvid_lindblad: {
    fullName: "Arvid Anand Olof Lindblad",
    number: "#41",
    ageDob: "19 years old — 8 August 2007",
    nationality: "British 🇬🇧",
    team: "Racing Bulls",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "0",
      poles: "0",
    },
    journey: [
      "Arvid Lindblad is not just the youngest driver on the 2026 Formula 1 grid — he is the only rookie on it, and at 19 years old, one of the youngest drivers to have been handed a full-time seat in the sport's entire history. Born in Virginia Water, Surrey, Lindblad developed rapidly through the European junior single-seater ranks, showing raw pace and a composure markedly beyond his years. After winning the Formula Regional Oceania championship in 2025 and performing strongly in Formula 2, Red Bull's junior programme selected him as the natural successor to Isack Hadjar's Racing Bulls seat for the 2026 season.",
      "His Formula 1 debut at the 2026 Australian Grand Prix was immediately statement-making. Starting in an unfamiliar car at one of the sport's most demanding circuits, Lindblad brought it home in eighth place — scoring points on his very first Grand Prix start and becoming one of the third youngest drivers in F1 history to achieve it. The remainder of the season has been a steep but productive learning curve, with his raw qualifying pace and race management drawing consistent praise from within the Racing Bulls garage.",
      "With an entire career still ahead of him, Lindblad is the face of Formula 1's next generation, and every race weekend adds another page to what promises to be a very long story.",
    ],
    didYouKnow: "Arvid Lindblad is, as of 2026, the youngest driver on the Formula 1 grid — born in 2007, he was only 18 years old when he took part in pre-season testing. His British-Scandinavian heritage is reflected in his name: \"Arvid\" is a traditional Old Norse name, meaning eagle, still widely used across Sweden and the Nordic countries — a fitting name for someone already soaring well above expectations.",
    si: {
      journey: [
        "Arvid Lindblad කියන්නේ 2026 Formula 1 ග්‍රිඩ් එකේ ඉන්න ළාබාලතම ඩ්‍රයිවර් විතරක් නෙවෙයි — මේ අවුරුද්දේ ඉන්න එකම rookie කෙනා එයායි, අවුරුදු 19 න් F1  full-time seat එකක් හම්බුණ ඉතිහාසයේ ළාබාලතම ඩ්‍රයිවර්ස්ලගෙන් කෙනෙක් තමයි මේ. Surrey වල Virginia Water හි ඉපදුණු Lindblad, යුරෝපීය කනිෂ්ඨ single-seater තරඟ වලින් වේගයෙන් ඉදිරියට ආවේ එයාගෙ තියෙන ස්වභාවික වේගය සහ වයසට වඩා මුහුකුරා ගිය සන්සුන්කම හැසිරවීම නිසයි. 2025 දී Formula Regional Oceania championship එක දිනාගෙන Formula 2 වලත් හොඳට කරපු නිසා, 2026 සීසන් එකට Isack Hadjar ගෙන් හිස්වුණු Racing Bulls seat එකට Red Bull junior programme එකෙන් එයාව තෝරගත්තා.",
        "2026 Australian Grand Prix එකේදී එයාගෙ Formula 1 debut එක හැමෝටම ලොකු පණිවිඩයක් දුන්නා. ක්‍රීඩාවේ තියෙන අමාරුම සර්කිට් එකක නුහුරු කාර් එකකින් රේස් එක පටන් අරන් 8 වෙනියා විදිහට රේස් එක ඉවර කළා — පළවෙනි Grand Prix එකෙන්ම points අරගෙන ඒක කරපු F1 ඉතිහාසයේ තුන්වෙනි ළාබාලතම ඩ්‍රයිවර් බවට පත්වුණා. සීසන් එකේ ඉතුරු ටික එයාට ලොකු අත්දැකීමක් වුණා, එයාගෙ qualifying pace එක සහ race management එක ගැන Racing Bulls ටීම් එකෙන් නිතරම ප්‍රශංසා කළා. සම්පූර්ණ අනාගතයක්ම ඉස්සරහට තියෙන Lindblad කියන්නේ Formula 1 වල ඊළඟ පරම්පරාවේ මුහුණුවරයි, හැම රේස් වීක්එන්ඩ් එකක්ම මේ දිග කතාවට අලුත් පිටුවක් එකතු කරනවා.",
      ],
      didYouKnow: "2026 වෙනකොට Arvid Lindblad තමයි Formula 1 ග්‍රිඩ් එකේ ඉන්න ළාබාලතම ඩ්‍රයිවර් — 2007 දී ඉපදුණු එයා pre-season testing වලට එද්දි වයස අවුරුදු 18 යි. එයාගෙ බ්‍රිතාන්‍ය-ස්කැන්ඩිනේවියානු සම්භවය එයාගෙ නමෙන් පේනවා: \"Arvid\" කියන්නේ සාම්ප්‍රදායික Old Norse නමක්, ඒකේ තේරුම රාජාලියා, ස්වීඩනයේ සහ නෝර්ඩික් රටවල තාමත් මේ නම පාවිච්චි වෙනවා — දැනටමත් බලාපොරොත්තු වලට වඩා උඩින් පියාසර කරන කෙනෙක්ට මේ නම හරියටම ගැළපෙනවා.",
    },
  },
  gasly: {
    fullName: "Pierre Jean-Jacques Gasly",
    number: "#10",
    ageDob: "30 years old — 7 February 1996",
    nationality: "French 🇫🇷",
    team: "BWT Alpine F1 Team",
    careerStats: {
      championships: "0",
      wins: "1",
      podiums: "5",
      poles: "1",
    },
    journey: [
      "Pierre Gasly's Formula 1 career is a masterclass in resilience. Born in Rouen, Normandy into a family with deep motorsport roots — his grandmother was a champion karter, his grandfather also raced, and his father competed as an amateur rally driver — Gasly earned his place through the European junior categories before becoming a front-runner in Super Formula Japan in 2017. He made his F1 debut as a mid-season substitute that same year, and from that first appearance at Toro Rosso, he never looked back.",
      "His darkest hour arrived in 2019 when he was dropped mid-season from Red Bull Racing, brutally demoted just half a year into the job. What followed was one of the great comebacks in the sport. Restored to form at AlphaTauri, Gasly delivered one of the most emotional victories in modern F1 at the 2020 Italian Grand Prix at Monza — the first French Grand Prix winner in 24 years, since Olivier Panis at Monaco in 1996. He has gone on to be a consistent, respected, and increasingly senior voice in the paddock, joining Alpine in 2023 and proving his class regularly in machinery that rarely flatters. At the 2026 Italian Grand Prix — on the very same Monza circuit where he won his only race in 2020 — he claimed his first-ever career pole position.",
      "Experienced, emotionally intelligent, and capable of the extraordinary on a big day, Gasly remains one of the grid's most compelling personalities.",
    ],
    didYouKnow: "Pierre Gasly achieved his first and only Grand Prix victory AND his first-ever Formula 1 pole position at exactly the same circuit — the legendary Autodromo Nazionale Monza in Italy, six years apart. He also lives in Milan, making the Italian temple of speed something of a home track — and perhaps explaining why he always seems to produce something special there.",
    si: {
      journey: [
        "Pierre Gasly ගේ Formula 1 ගමන කියන්නේ කිසිම දේකට යටත් නොවෙන අදිටන ගැන කියාදෙන සුපිරි පාඩමක්. නෝමන්ඩි වල Rouen හි, මෝටර් ස්පෝර්ට්ස් පවුලක ඉපදුණු Gasly — එයාගෙ ආච්චි champion karter කෙනෙක්, සීයා රේස් පැද්දා, සහ තාත්තා amateur rally ඩ්‍රයිවර් කෙනෙක් — යුරෝපීය කනිෂ්ඨ තරඟ වලින් උඩට ඇවිත් 2017 දී Super Formula Japan වල ඉස්සරහින්ම හිටියා. ඒ අවුරුද්දෙම මැදදි ආදේශකයක් විදිහට F1 debut එක කරපු එයා, Toro Rosso එක්ක ගිය ඒ පළවෙනි ගමනෙන් පස්සේ ආයෙත් පස්සට හැරිලා බැලුවේ නෑ.",
        "එයාගෙ අමාරුම කාලය ආවේ 2019 දී Red Bull Racing වලින් මැදදි එයාව අයින් කරපු වෙලාවේ, මාස හයකින් එයාව පල්ලෙහාට දැම්මා. ඊටපස්සේ ආවේ ක්‍රීඩා ඉතිහාසයේ ලොකුම comebacks වලින් එකක්. AlphaTauri වලදී ආයෙමත් තමන්ගෙ ෆෝම් එකට ආපු Gasly, 2020 Monza හි Italian Grand Prix එකේදී නූතන F1 ඉතිහාසයේ හැඟීම්බරම ජයග්‍රහණයක් ලබාගත්තා — 1996 මොනාකෝ වලදී Olivier Panis ට පස්සේ අවුරුදු 24 කින් ප්‍රංශ ජාතිකයෙක් ගත්ත පළවෙනි Grand Prix ජයග්‍රහණය ඒකයි. එතැන් පටන් එයා පැඩොක් එකේ ඉන්න අත්දැකීම් බහුල, ගෞරවනීය කෙනෙක් බවට පත්වෙලා 2023 දී Alpine ටීම් එකට එකතු වෙලා තමන්ගෙ හැකියාවන් පෙන්නුවා. මේ 2026 Italian Grand Prix එකේදී — 2020 දී එයාගෙ එකම රේස් එක දිනපු Monza සර්කිට් එකේම — එයා එයාගෙ career එකේ පළවෙනි pole position එක ලබාගත්තා. අත්දැකීම් තියෙන, බුද්ධිමත්, සහ ලොකු දවස් වලට විශේෂ දේවල් කරන්න පුළුවන් Gasly තාමත් Grid එකේ ඉන්න ආකර්ෂණීය චරිතයක්.",
      ],
      didYouKnow: "Pierre Gasly එයාගෙ පළවෙනි සහ එකම Grand Prix ජයග්‍රහණය සහ එයාගෙ පළවෙනි Formula 1 pole position එක ගත්තේ එකම සර්කිට් එකේ — ඉතාලියේ ජනප්‍රිය Autodromo Nazionale Monza වල, හැබැයි අවුරුදු හයක පරතරයකින්. එයා ජීවත් වෙන්නෙත් මිලාන් වල, ඒ නිසා මේ ඉතාලි ට්‍රැක් එක එයාට ගෙදර වගේ — ඒකෙන්ම තේරෙනවා ඇයි එයා එතනදී නිතරම විශේෂ දේවල් කරන්නේ කියලා.",
    },
  },
  colapinto: {
    fullName: "Franco Alejandro Colapinto",
    number: "#43",
    ageDob: "23 years old — 27 May 2003",
    nationality: "Argentine 🇦🇷",
    team: "BWT Alpine F1 Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "0",
      poles: "0",
    },
    journey: [
      "Born in Pilar, Buenos Aires, Franco Colapinto arrived in Formula 1 the way Argentina has always dreamed one of its own would — explosively, unapologetically, and with an attacking instinct that immediately caught every eye in the paddock. He began karting at nine years old, built through the Spanish and European junior formulae, and claimed his first title at the 2019 F4 Spanish Championship before navigating Formula Renault, Formula 3, Formula 2, and even a stint at the 24 Hours of Le Mans as part of his wide-ranging development. His path to Formula 1 was unconventional, but the opportunity, when it came, was seized with both hands.",
      "Williams called on him to replace Logan Sargeant from the 2024 Italian Grand Prix onwards, and Colapinto delivered a series of immediate, impressive performances that made the decision look inspired within the first few laps. His appointment at Alpine for 2025 — continuing into a full season in 2026 alongside Gasly — confirmed his place on the grid as more than a fleeting substitute. Race by race, he is building the consistency to match the raw speed that first turned heads at Monza.",
      "Quick, brave, and electric under pressure, Colapinto carries the natural attacking instinct that makes Argentine motorsport fans believe — loudly — once again.",
    ],
    didYouKnow: "When Colapinto made his Formula 1 debut in 2024, it triggered an explosion of F1 interest in Argentina that had not been seen in decades — television viewing records were broken, social media went into meltdown, and a generation of new fans were introduced to the sport entirely because of him. His girlfriend, Argentine actress and singer Maia Reficco, is also a major celebrity in Latin America, making the pair one of motorsport's most prominent celebrity couples.",
    si: {
      journey: [
        "Buenos Aires වල Pilar හි ඉපදුණු Franco Colapinto Formula 1 වලට ආවේ ආර්ජන්ටිනාව හැමදාම හීන දැක්ක විදිහටයි — පුපුරන සුලු, බයක් නැතිව, වගේම පැඩොක් එකේ හැමෝගෙම ඇස් එයා දිහාට හැරෙන විදිහටයි. අවුරුදු නමයේදී karting පටන් ගත්ත එයා, ස්පාඤ්ඤ සහ යුරෝපීය කනිෂ්ඨ තරඟ හරහා ඇවිත් 2019 දී F4 Spanish Championship එක දිනාගත්තා, ඊටපස්සේ Formula Renault, Formula 3, Formula 2, සහ 24 Hours of Le Mans වල පවා තරඟ කරලා අත්දැකීම් එකතු කරගත්තා. එයා F1 වලට ආපු පාර සාමාන්‍ය එකක් නෙවෙයි, හැබැයි අවස්ථාව ආවම එයා ඒක අත් දෙකෙන්ම අල්ලගත්තා.",
        "2024 Italian Grand Prix එකෙන් පස්සේ Logan Sargeant වෙනුවට Williams ටීම් එක එයාව ගෙනාවා, Colapinto එයාට පුළුවන් විදිහට සුපිරි performances ටිකක් පෙන්නලා පළවෙනි laps කීපය ඇතුළතම ඒ තීරණය කොච්චර හොඳද කියලා ඔප්පු කළා. 2025 දී Alpine ටීම් එකට ගිය එයා — 2026 දී Gasly එක්ක සම්පූර්ණ සීසන් එකක් කරනවා — ඒකෙන් පැහැදිලි වුණේ එයා නිකන්ම ආදේශකයක් විතරක් නෙවෙයි කියන එකයි. රේස් එකෙන් රේස් එක එයා Monza වලදී මුලින්ම පෙන්නපු වේගයට හරියන්න consistency එක හදාගන්නවා. වේගවත්, නිර්භීත, සහ ප්‍රෙෂර් එකක් ආවාම සුපිරියටම වැඩ කරන Colapinto නිසා ආර්ජන්ටිනා මෝටර් ස්පෝර්ට්ස් රසිකයින්ට ආයෙමත් සද්දෙන් කෑගහලා සපෝට් කරන්න පුළුවන් වෙලා තියෙනවා.",
      ],
      didYouKnow: "Colapinto 2024 දී Formula 1 වලට ආපු වෙලාවේ දශක ගාණකට පස්සේ ආර්ජන්ටිනාවේ F1 ගැන පුදුම උනන්දුවක් ඇතිවුණා — රූපවාහිනී වාර්තා කැඩුණා, සෝෂල් මීඩියා පිස්සු වැටුණා, අලුත් රසිකයෝ පරම්පරාවක්ම මේ ක්‍රීඩාවට ආවේ එයා නිසයි. එයාගෙ පෙම්වතිය වෙන ආර්ජන්ටිනා නිළි සහ ගායිකා Maia Reficco ත් ලතින් ඇමරිකාවේ ලොකු තරුවක්, මේ නිසා මෙයාලා දෙන්නා මෝටර් ස්පෝර්ට්ස් වල ඉන්න ජනප්‍රියම කපල් එකක් වෙලා.",
    },
  },
  ocon: {
    fullName: "Esteban José Jean-Pierre Ocon-Khelfane",
    number: "#31",
    ageDob: "30 years old — 17 September 1996",
    nationality: "French 🇫🇷",
    team: "MoneyGram Haas F1 Team",
    careerStats: {
      championships: "0",
      wins: "1",
      podiums: "4",
      poles: "0",
    },
    journey: [
      "Esteban Ocon's journey to Formula 1 is one of the sport's most human and emotional stories. Born in Évreux, Normandy, to parents who made staggering personal sacrifices to keep their son racing — including selling the family home and travelling across Europe in a motorhome just to make ends meet — Ocon repaid every impossible decision with talent, determination, and a refusal to be moved from his goal. He dominated the F3 European and GP3 series in 2014 and 2015 before making his Formula 1 debut with Manor in 2016, graduating to Force India, Racing Point, and eventually becoming a fixture at Alpine through 2021–2024.",
      "The highlight of his career arrived at the 2021 Hungarian Grand Prix, where, in a race turned upside down by a chaotic first corner melee, Ocon emerged through the chaos to take a stunning maiden Formula 1 victory — Alpine's only win under that name, and one of the most unexpected results of the hybrid era. A move to Haas for 2025 opened a new chapter, and he continues into 2026 with the experience and measured composure of a driver who has weathered everything the sport can throw at a career.",
      "Resilient, consistent, and hard to shake once settled in a car, Ocon brings an understated professionalism that the midfield depends on.",
    ],
    didYouKnow: "During Ocon's early karting years, his parents sold the family home and the entire family lived and travelled in a motorhome, sleeping in paddock car parks across Europe to fund his racing. His father worked multiple jobs simultaneously; his mother ran every logistical detail of the campaign. Every Formula 1 race Ocon has ever started has carried the weight of that sacrifice.",
    si: {
      journey: [
        "Esteban Ocon ගේ Formula 1 ගමන කියන්නේ මේ ක්‍රීඩාවේ තියෙන හැඟීම්බරම කතාවක්. නෝමන්ඩි වල Évreux හි ඉපදුණු එයාගෙ දෙමව්පියෝ එයාගෙ රේසින් අරමුණ වෙනුවෙන් එයාලගෙ ගෙදර පවා විකුණලා motorhome එකකින් යුරෝපය පුරා ගියේ ඒ වියදම් පියවගන්නයි — Ocon මේ හැම කැපකිරීමකටම තමන්ගෙ හැකියාවෙන් සහ ධෛර්යයෙන් ප්‍රතිචාර දැක්වුවා. 2014 සහ 2015 දී F3 European සහ GP3 series වල ආධිපත්‍යය පැතිරෙව්ව එයා, 2016 දී Manor එක්ක Formula 1 වලට ඇවිත්, Force India, Racing Point වලට ගිහින් අන්තිමට 2021-2024 කාලේ Alpine එකේ ස්ථිර ඩ්‍රයිවර් කෙනෙක් වුණා.",
        "එයාගෙ career එකේ ලොකුම ජයග්‍රහණය ආවේ 2021 Hungarian Grand Prix එකේදී, පළවෙනි කෝනර් එකේ වුණු ලොකු අනතුරක් අස්සෙන් ඇවිත් Ocon එයාගෙ පළවෙනි Formula 1 ජයග්‍රහණය ලබාගත්තා — ඒ නමින් Alpine ගත්ත එකම ජයග්‍රහණය ඒක වගේම hybrid era එකේ වුණු පුදුමසහගතම ප්‍රතිඵලයක් ඒක. 2025 දී Haas ටීම් එකට ගිය එයා එයාගෙ අලුත් පරිච්ඡේදයක් පටන් ගත්තා, 2026 දීත් මේ ක්‍රීඩාවෙන් එන ඕනම අභියෝගයකට මුහුණ දෙන්න පුළුවන් අත්දැකීම් බහුල සන්සුන් ඩ්‍රයිවර් කෙනෙක් විදිහට එයා දිගටම රේස් කරනවා. වැටුණත් ආයෙත් නැගිටින, consistent, සහ කාර් එකේ set වුණාම හොල්ලන්න අමාරු Ocon, midfield එකේ ඉන්න වෘත්තීය මට්ටමේ සුපිරි ඩ්‍රයිවර් කෙනෙක්.",
      ],
      didYouKnow: "Ocon ගේ මුල් කාලේ karting වෙනුවෙන් එයාගෙ දෙමව්පියෝ ගෙදර විකුණලා මුළු පවුලම motorhome එකක ජීවත් වුණා, යුරෝපයේ paddock car parks වල නිදාගත්තා. එයාගෙ තාත්තා රස්සා කීපයක්ම කළා; අම්මා ඒ ගමනේ හැම සැලසුමක්ම බලාගත්තා. Ocon පටන්ගන්න හැම Formula 1 රේස් එකකම ඒ කැපකිරීමේ බර තියෙනවා.",
    },
  },
  bearman: {
    fullName: "Oliver James Bearman",
    number: "#87",
    ageDob: "21 years old — 8 May 2005",
    nationality: "British 🇬🇧",
    team: "MoneyGram Haas F1 Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "0",
      poles: "0",
    },
    journey: [
      "Oliver Bearman is a product of Ferrari's elite junior driver pipeline — and he announced himself to the world with one of the most audacious debut performances Formula 1 has ever seen. Born in Chelmsford, Essex, Bearman rose through the Italian and German Formula 4 championships in 2021, winning both in his very first season of car racing, before progressing through Formula 3 and Formula 2 while serving simultaneously as Ferrari's official reserve driver. He was being groomed for the sport's biggest stage — but nobody expected that stage to arrive quite so suddenly.",
      "Hours before the 2024 Saudi Arabian Grand Prix, Carlos Sainz was rushed to hospital with appendicitis. With virtually no notice, 18-year-old Bearman stepped into the Ferrari SF-24 and drove the race of his life — finishing seventh on debut, outpacing experienced Formula 1 regulars, and drawing astonished praise from Lewis Hamilton, Max Verstappen, and virtually everyone watching. The performance earned him a full-time Haas seat for 2025, converting an emergency substitute role into a permanent career launch.",
      "Now in his second full season at Haas alongside Ocon in 2026, Bearman continues to add race experience and mechanical understanding to the raw pace that first announced him so spectacularly.",
    ],
    didYouKnow: "Bearman discovered he would be racing a Ferrari in a Formula 1 Grand Prix with just hours' notice when Sainz fell ill at the 2024 Saudi Arabian GP. He had no meaningful preparation time, drove an unfamiliar race strategy, and still finished seventh — prompting Lewis Hamilton to personally name him one of the most exciting young talents he had encountered in his entire Formula 1 career.",
    si: {
      journey: [
        "Oliver Bearman කියන්නේ Ferrari ලගෙ elite junior driver pipeline එකෙන් ආපු කෙනෙක් — Formula 1 ඉතිහාසයේ දැකපු අතිවිශිෂ්ටතම debut performances වලින් එකක් දීලා තමයි එයා ලෝකෙටම එයා කවුද කියලා පෙන්නුවේ. Essex වල Chelmsford හි ඉපදුණු Bearman, 2021 දී ඉතාලි සහ ජර්මන් Formula 4 වලට ඇවිත් ඒ පළවෙනි සීසන් එකේදීම ඒ දෙකම දිනාගත්තා, ඊටපස්සේ Formula 3 සහ Formula 2 වලට ගියා වගේම Ferrari එකේ නිල reserve driver විදිහටත් වැඩ කළා. එයාව ලෝකෙ ලොකුම වේදිකාවට සූදානම් කරමින් හිටියත්, ඒ අවස්ථාව මේ තරම් ඉක්මනට එයි කියලා කවුරුත් හිතුවේ නෑ.",
        "2024 Saudi Arabian Grand Prix එකට පැය කීපයක් තියෙද්දි, Carlos Sainz ව ඇපෙන්ඩිසයිටිස් නිසා රෝහලට ගෙනිච්චා. කිසිම පෙර සූදානමක් නැතුව, අවුරුදු 18 ක් වුණු Bearman Ferrari SF-24 කාර් එකට නැගලා එයාගෙ ජීවිතේ හොඳම රේස් එක පැද්දා — debut එකෙන්ම 7 වෙනියා වුණු එයා අත්දැකීම් බහුල Formula 1 ඩ්‍රයිවර්ස්ලට වඩා හොඳින් රේස් කළා, මේක දැක්ක Lewis Hamilton, Max Verstappen ඇතුළු හැමෝම පුදුම වෙලා එයාට සුබ පැතුවා. මේ performance එක නිසා එයාට 2025 දී Haas හි full-time seat එකක් හම්බුණා, හදිසි ආදේශකයෙක් විදිහට ආපු ගමන ස්ථිර එකක් කරගත්තා. මේ 2026 දී Haas එකේ Ocon එක්ක එයාගෙ දෙවෙනි full season එක පදින Bearman, එයා මුලින්ම පෙන්නපු ඒ වේගයට තවත් අත්දැකීම් සහ කාර් එක ගැන අවබෝධයක් එකතු කරගනිමින් ඉන්නවා.",
      ],
      didYouKnow: "Sainz අසනීප වුණාම 2024 Saudi Arabian GP එකේදී තමන්ට Ferrari එකක් පදින්න වෙනවා කියලා Bearman දැනගත්තේ රේස් එකට පැය කීපයකට කලින්. කිසිම සූදානම් වීමක් නැතුව, නුහුරු race strategy එකක් එක්කත් එයා 7 වෙනියා වුණා — මේක දැක්ක Lewis Hamilton පෞද්ගලිකවම කිව්වේ එයාගෙ F1 ජීවිතේම දැකපු දක්ෂතම තරුණ ඩ්‍රයිවර්ස්ලගෙන් කෙනෙක් තමයි Bearman කියලයි.",
    },
  },
  hulkenberg: {
    fullName: "Nicolas Hülkenberg",
    number: "#27",
    ageDob: "39 years old — 19 August 1987",
    nationality: "German 🇩🇪",
    team: "Audi Formula One Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "1",
      poles: "1",
    },
    journey: [
      "Nico Hülkenberg is, to use a word that fits him perfectly, indestructible. Born in Emmerich am Rhein in Germany, \"The Hulk\" has been a fixture of Formula 1 since 2010, when he announced himself with a stunning maiden pole position on his very first qualifying appearance at the Brazilian Grand Prix with Williams — a level of natural pace that immediately marked him out as a future frontrunner. What followed over the next decade and a half was a career of consistently strong performances delivered from machinery that rarely, if ever, matched his talent: Force India, Sauber, Renault, Racing Point, Aston Martin, Haas, and now Audi.",
      "For years, Hülkenberg carried the unfortunate label of the longest-standing active driver to have never finished on the Formula 1 podium — a record that grew to almost mythical proportions as it crept past 200, then 220, then 230 starts. He bore it with characteristic dry wit. The record finally, gloriously, ended at the 2025 British Grand Prix in his 239th start, when he crossed the line third to a paddock-wide ovation that was as joyful as it was long overdue. Now anchoring Audi's first-ever Formula 1 season as the team's experienced cornerstone, Hülkenberg is exactly where a career this distinguished deserves to finish: at the front of a major manufacturer's project.",
      "Experienced, technically sharp, and possessed of a raceday instinct that never faded, Hülkenberg at 39 remains genuinely, surprisingly competitive.",
    ],
    didYouKnow: "While simultaneously competing as an active Formula 1 driver for Force India, Hülkenberg drove for Porsche at the 2015 24 Hours of Le Mans — and won overall, alongside Nick Tandy and Earl Bamber. He became one of the very few drivers in history to claim the world's most famous endurance race while maintaining a full-time grand prix schedule. Incredibly, the victory was reportedly celebrated with very little sleep before returning to Formula 1 the same week.",
    si: {
      journey: [
        "Nico Hülkenberg කියන්නේ, වචනයේ පරිසමාප්ත අර්ථයෙන්ම \"විනාශ කරන්න බැරි\" කෙනෙක්. ජර්මනියේ Emmerich am Rhein හි ඉපදුණු \"The Hulk\", 2010 ඉඳන්ම Formula 1 වල ඉන්නවා, Williams එක්ක ගිය එයාගෙ පළවෙනි qualifying එකේදීම Brazilian Grand Prix එකේ සුපිරි maiden pole position එකක් අරන් තමයි එයා ලෝකෙට ආවේ — ඒ ස්වභාවික වේගය නිසා එයා අනාගතයේ පෙරමුණ ගන්න කෙනෙක් කියලා හැමෝම හිතුවා. ඊළඟ දශක එකහමාරක කාලය ඇතුළත එයා එයාගෙ හැකියාවට ගැළපෙන කාර් එකක් නොලැබුණත් දිගටම සුපිරි performances දුන්නා: Force India, Sauber, Renault, Racing Point, Aston Martin, Haas, සහ දැන් Audi වලට.",
        "අවුරුදු ගාණක් තිස්සේ Hülkenberg ට තිබුණේ Formula 1 podium එකකට නොගිය වැඩිම කාලයක් රේස් කරපු ඩ්‍රයිවර් කියන අවාසනාවන්ත ලේබල් එක — මේ රෙකෝඩ් එක රේස් 200, 220, 230 පහු කරගෙන යනකන්ම තිබුණා. එයා ඒක එයාගෙ විහිළු කතාවලින්ම මඟහැරියා. කොහොමහරි 2025 British Grand Prix එකේදී එයාගෙ 239 වෙනි රේස් එකෙන් ඒ රෙකෝඩ් එක නැති වුණා, එයා 3 වෙනියා විදිහට රේස් එක ඉවර කරද්දි මුළු පැඩොක් එකම එයාට ලොකු අත්පොළසන් නාදයක් දුන්නා. දැන් Audi ලගෙ පළවෙනි Formula 1 සීසන් එකේ අත්දැකීම් බහුල නායකයා විදිහට ඉන්න Hülkenberg ඉන්නේ මෙච්චර අත්දැකීම් තියෙන කෙනෙක් ඉන්නම ඕන තැනයි: ලොකු සමාගමක ප්‍රොජෙක්ට් එකක ඉස්සරහින්ම. අත්දැකීම් තියෙන, තාක්ෂණිකව දක්ෂ, සහ රේස් දවසට තියෙන ඉව තාමත් නැතිවුණු නැති Hülkenberg, වයස 39 දීත් ඇත්තටම පුදුම හිතෙන විදිහට තරඟකාරී කෙනෙක්.",
      ],
      didYouKnow: "Force India වල F1 ඩ්‍රයිවර් කෙනෙක් විදිහට ඉන්න ගමන්ම, Hülkenberg 2015 දී 24 Hours of Le Mans එකේ Porsche වෙනුවෙන් රේස් කරලා ඒක දිනාගත්තා (Nick Tandy සහ Earl Bamber එක්ක). F1 රේස් කරන ගමන්ම ලෝකෙ ජනප්‍රියම endurance race එක දිනාගත්ත කීපදෙනාගෙන් කෙනෙක් තමයි එයා. පුදුමෙ කියන්නේ, ඒ ජයග්‍රහණය සමරලා හරියට නිදාගන්නෙවත් නැතුව ඒ සතියෙම එයා ආයෙත් F1 රේස් එකකට ආවා කියන එකයි.",
    },
  },
  bortoleto: {
    fullName: "Gabriel Lourenzo \"Gabi\" Bortoleto Oliveira",
    number: "#5",
    ageDob: "21 years old — 14 October 2004",
    nationality: "Brazilian 🇧🇷",
    team: "Audi Formula One Team",
    careerStats: {
      championships: "0",
      wins: "0",
      podiums: "0",
      poles: "0",
    },
    journey: [
      "Gabriel Bortoleto is Formula 1's most compelling Brazilian story in nearly a decade — and he has arrived at the top of the sport carrying a junior career résumé that left nothing to debate. Born in Osasco, São Paulo, Bortoleto grew up in a country that worshipped its Formula 1 heroes and channelled that inspiration into systematic domination of the junior ranks. He claimed the FIA Formula 3 championship in 2023, then came back the following year and swept the FIA Formula 2 title in 2024 — winning consecutive elite junior series in back-to-back seasons, a feat that only the most exceptional talents have managed.",
      "Audi's Formula 1 project — which ran as Sauber through the 2025 transitional season — signed Bortoleto ahead of several competing interests, handing him one of the most high-profile junior-to-Formula 1 moves of recent years. His 2025 campaign with the still-developing Sauber package was a learning exercise, but his pace and technical clarity consistently drew praise from engineers who worked with him. In 2026, as a full Audi works driver alongside the experienced Hülkenberg, his confidence and output have grown noticeably with each race weekend.",
      "Smooth, determined, and technically astute well beyond his years, Bortoleto is carrying the rich weight of Brazilian motorsport history on remarkably assured shoulders.",
    ],
    didYouKnow: "As the only Brazilian driver on the 2026 Formula 1 grid, Bortoleto carries the legacy of one of the sport's most storied racing nations — birthplace of Ayrton Senna, Nelson Piquet, Rubens Barrichello, and Felipe Massa. He is the first Brazilian to race full-time in Formula 1 since Massa departed in 2017, a nine-year gap that Brazilian fans have felt deeply. The weight of that expectation appears to sit comfortably on his shoulders.",
    si: {
      journey: [
        "Gabriel Bortoleto කියන්නේ F1 වලට ආපු අලුත්ම බ්‍රසීලියානු බලාපොරොත්තුව — එයා ක්‍රීඩාවේ ඉහළටම ආවේ කිසිම කෙනෙක්ට ප්‍රශ්න කරන්න බැරි විදිහේ සුපිරි ජූනියර් රෙකෝඩ්ස් ටිකක් තියාගෙනයි. São Paulo වල Osasco හි ඉපදුණු Bortoleto හැදුණේ Formula 1 වීරයින්ට ආදරේ කරන රටක, ඒ ආභාසයත් එක්ක එයා ජූනියර් තරඟ වල ආධිපත්‍යය පැතිරෙව්වා. 2023 දී FIA Formula 3 championship එක දිනාගෙන, ඊළඟ අවුරුද්දේ ඒ කියන්නේ 2024 දී FIA Formula 2 title එකත් දිනාගත්තා — පිටපිට elite junior series දෙකක් දිනාගන්නවා කියන්නේ සුපිරිම දක්ෂයෙක්ට විතරක් කරන්න පුළුවන් දෙයක්.",
        "2025 transitional season එකේ Sauber විදිහට තිබුණු Audi Formula 1 ප්‍රොජෙක්ට් එක අනිත් ටීම්ස් වලින් එයාට තිබුණු ඉල්ලුම පරද්දලා එයාව තෝරගත්තා, මේක මෑතකදී F1 ලෝකෙ සිද්ධවුණු ලොකුම junior-to-Formula 1 මාරුවීම් වලින් එකක්. තාමත් හැදෙමින් තිබුණු Sauber කාර් එකත් එක්ක එයාගෙ 2025 සීසන් එක ඉගෙන ගන්න එකක් වුණත්, එයාගෙ වේගය සහ තාක්ෂණික දැනුම ගැන එයා එක්ක වැඩ කරපු ඉංජිනේරුවන් නිතරම වර්ණනා කළා. මේ 2026 අවුරුද්දේ අත්දැකීම් බහුල Hülkenberg එක්ක full Audi works driver කෙනෙක් විදිහට වැඩ කරන එයාගෙ විශ්වාසය සහ ප්‍රතිඵල හැම රේස් වීක්එන්ඩ් එකක් එක්කම වැඩි වෙලා තියෙනවා පේන්න තියෙනවා. Smooth, අධිෂ්ඨානශීලී, සහ වයසට වඩා තාක්ෂණිකව බුද්ධිමත් Bortoleto, බ්‍රසීලියානු මෝටර් ස්පෝර්ට්ස් ඉතිහාසයේ ලොකු බරක් හරිම විශ්වාසයකින් තමන්ගෙ කර උඩ තියාගෙන යනවා.",
      ],
      didYouKnow: "2026 Formula 1 ග්‍රිඩ් එකේ ඉන්න එකම බ්‍රසීලියානු ඩ්‍රයිවර් විදිහට Bortoleto ගෙනියන්නේ ලෝකේ තියෙන ලොකුම රේසින් ඉතිහාසයක් තියෙන රටක ලෙගසි එකක් — Ayrton Senna, Nelson Piquet, Rubens Barrichello, සහ Felipe Massa වගේ අය ඉපදුණු රටේ. 2017 දී Massa ගියාට පස්සේ Formula 1 වල full-time රේස් කරන පළවෙනි බ්‍රසීලියානුවා එයායි, අවුරුදු නමයක හිඩැසක් නිසා බ්‍රසීලියානු රසිකයින්ට F1 අඩුවක් වෙලා තිබුණේ. ඒ ලොකු බලාපොරොත්තු බරක් වුණත් එයා ඒක හරිම පහසුවෙන් දරාගෙන ඉන්නවා වගේ පේනවා.",
    },
  },
};
