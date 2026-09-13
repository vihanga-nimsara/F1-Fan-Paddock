export type OwnPostAuthor = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

export type OwnPostComment = {
  id: string;
  author: string;
  avatar?: string;
  date: string;
  text: string;
};

export type OwnPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image?: string;
  author: OwnPostAuthor;
  pubDate: string;
  readTime: string;
  comments: OwnPostComment[];
};

const PLACEHOLDER = (n: number) => `/images/f1-${Math.min(n, 20)}.jpg`;

export const OWN_POSTS: OwnPost[] = [
  {
    id: "road-to-f1-kimi-antonelli",
    title:
      "Road To Formula 1 Series - Ep 02 - Bologna වලන් ආපු අරුම පුදුම කොල්ලා Kimi Antonelli",
    excerpt:
      "මේ මාසෙට එයාට තවම වයස අවුරුදු 20 යි. ඒත් දැනටමත් මේ 2026 Season එකේ Championship Leader එයා. F1 Race Victories 6ක්ම එයාගේ නමට ලියවිලා ඉවරයි.",
    content: [
      "මේ මාසෙට එයාට තවම වයස අවුරුදු 20 යි. ඒත් දැනටමත් මේ 2026 Season එකේ Championship Leader එයා. F1 Race Victories 6ක්ම එයාගේ නමට ලියවිලා ඉවරයි. සමහර Drivers ලා තමන්ගේ මුළු Career එකේම හීන දකින Records ගොඩක් මේ කොල්ලා මේ වෙද්දිත් කඩලා දාලා. ලෝකයේ තියෙන Powerful ම වගේම Technically අමාරුම Racing Machines, හරියට එයාගේම අත් දෙක වගේ පාලනය කරන Driving Style එකක් එයාට තියෙනවා. මේ Weekend එකේ, එයාගේම රටේ, එයාගේම සෙනඟ ඉස්සරහා, 59-point Lead එකකුත් තියාගෙන එයා Grid එකේ අන්තිම පේළියෙන් Race එක Start කරන්න ලෑස්තියි. මේ තියෙන්නේ, කොහොමත් දවසක මේ තැනට එන්නම ඉපදුන Bologna වල ඒ පොඩි කොල්ලා... Andrea Kimi Antonelli formula 1 වලට ආපු කතාව.",
      "THE BOY FROM BOLOGNA",
      "Bologna කියන්නේ නිකම්ම නගරයක් නෙවෙයි. උතුරු ඉතාලියේ Emilia-Romagna කලාපයේ තියෙන මේ නගරය තමයි ලෝකයේ සුපිරිම Racing වාහන බිහිවුණ තිඹිරිගෙය. Ferrari, Lamborghini, Maserati, Ducati, Pagani — මේ ඔක්කොම තියෙන්නේ එකිනෙකට Drive කරන් යන්න පුළුවන් දුරින්. Motorsport වලට ආදරය කරන අය මේ කලාපයට කියන්නේ \"Motor Valley\" කියලා. මේක නිකම්ම එන්ජින් හදන තැනක් නෙවෙයි, ඒක එයාලගේ සංස්කෘතිය, අනන්‍යතාවය සහ කලාව. වයස අවුරුදු 5 දී පළවෙනි වතාවට Kart එකක වාඩි වුණු කොල්ලෙක්ට යන්න වෙන පාරක් මෙහේ නැහැ.",
      "Andrea Kimi Antonelli ඉපදුණේ 2006 අගෝස්තු 25 වෙනිදා. අහම්බයක් කියන්නේ, ඊට කලින් ඉතාලි ජාතික Driver කෙනෙක් F1 Grand Prix එකක් දිනපු අවසාන අවුරුද්ද වුණෙත් 2006 ම තමයි. එයාගේ තාත්තා, Marco Antonelli කියන්නේ දශක ගාණක් තිස්සේ ඉතාලියේ සහ ජාත්‍යන්තර Sportscar Championships වල තරඟ කරපු GT Racing Driver කෙනෙක්. දැන් එයා තමන්ගේ පුතා එක්ක එකතුවෙලා Racing Team එකකුත් රන් කරනවා. ඉතින් වයස අවුරුදු 7 දී තරුණ Andrea තරඟකාරී විදිහට Karting පටන් ගනිද්දී, ඒකට ඕන කරන දේවල් ගෙදරම තිබුණා. කෑම මේසෙදිත් කතා වුණේ Motorsport ගැන. ඒකේ ප්‍රතිඵල මුල ඉඳන්ම පේන්න ගත්තා.",
      "එයාගේ නමේ මැද කෑල්ල, \"Kimi\" කියන නම එයාට දැම්මේ තාත්තගේ යාළුවෙක්. එයා Finnish F1 World Champion Kimi Raikkonen ගේ ලොකු Fan කෙනෙක්. ඉතාලි කතාවකට මේ වගේ අහඹු සිදුවීමක් එකතු වුණ එකත් මාරයි. Antonelli හැදුණේ වැඩුණේ ImolaCircuit එකේ ඉඳන් කිලෝමීටර් 35 ක් විතර දුරින්. ඒ නිසාම එයා Imola වලට කියන්නේ තමන්ගේ \"Proper Home Race\" එක කියලා. හැබැයි මේ Weekend එකේ තියෙන අනිත් Home Race එක තමයි Monza! ඉතාලියේ හැමෝම දන්නවා වගේ, Monza කියන්නේ ඉරණම තීරණය වෙන තැන!",
      "THE KARTING PRODIGY: Driving Licence එක ගන්නත් කලින් Records කැඩූ හැටි",
      "Antonelli ට පාරේ වාහනයක් එලවන්න Legal Driving Licence එකක් හම්බවෙන්නත් ගොඩක් කාලෙකට කලින්, එයා Motorsport වල Records තියන්න පටන් අරන් තිබුණේ. 2019 අප්‍රේල් මාසේ, ඒ කියන්නේ වයස 12 දී එයා Mercedes Junior Programme එකට එකතු වුණා. Junior Karting Titles ගොඩක් දිනලා Silver Arrows ලගේ අවධානය දිනාගන්න එයාට පුළුවන් වුණා. Mercedes ලගේ Backing එක ලැබුණා කියන්නේ එයාගේ කරපිට ලොකු Pressure එකක් වැටුණා කියන එක. හැබැයි Antonelli ඒකට බය වුණේ නැහැ, එයා ට්‍රොෆි එකෙන් ට්‍රොෆි එක අරන් තමන් ඒකට සුදුසුයි කියලා ඔප්පු කළා.",
      "2019 වෙද්දි එයා OK Junior Karting Class එකේ WSK Euro Series සහ Super Master Series Titles දිනලා ඉවරයි. 2020 දී එයා FIA Karting Rookie of the Year වුණා. හැබැයි ඒ අවුරුද්දෙම World Championship Race එකේදී වුණු ලොකු Crash එකක් නිසා එයාගේ කකුලක් කැඩුණා. ඒත් 2021 දී ආයේ ඇවිත් Senior OK Class එකේ back-to-back FIA European Karting Championship Titles දිනුවා. ඊටපස්සේ KZ Gearbox Class එකට ගිහින් ඉතිහාසයේ ලාබාලතම KZ World Champion වුණා. ඒ කඩලා දැම්මේ Max Verstappen තියලා තිබුණ Record එකක්. මේ ඔක්කොම වෙද්දි එයා තවම ඉස්කෝලේ යන ටීනේජර් කෙනෙක්!",
      "එයාගේ Karting කාලේ Stats දැක්කම මේ වයසේ කෙනෙක්ට මේවා කරන්න පුළුවන්ද කියලා හිතෙනවා. යුරෝපය පුරා International Category Titles, ලෝකයේ අමාරුම Karting Championships වල Victories. ඉතින් Mercedes වලින් එයාට Call එකක් එන එක අහන්න දෙයක් නෙවෙයි, ඒක කවදද වෙන්නේ කියන එක විතරයි ප්‍රශ්නෙට තිබුණේ.",
      "FROM KARTS TO KINGS: රූල්බුක් එක අලුතින් ලියපු ගමන",
      "2022 දී Single-Seater කාර් වල Antonelli ගේ පළවෙනි Full Season එක පටන් ගත්තා. Charles Leclerc, Mick Schumacher, Oscar Piastri වගේ අය බිහි කරපු ඉතාලියේ Prema Team එක වෙනුවෙන් Drive කරපු එයා, Starts 20 කින් Races 13 ක් දිනලා Italian F4 Championship එක ඉස්සුවා. ඒක ඒ කාලේ Italian F4 Season එකක වැඩිම Wins ගාණ විදිහට Record වුණා. ඒ අවුරුද්දෙම German ADAC F4 Championship එකත් දිනලා, Nurburgring වලදී ඒ Title එක දිනපු පළවෙනි ඉතාලි ජාතිකයා වුණා (Starts 15 කින් Wins 9 යි). ඒ වගේම FIA Motorsport Games F4 Cup එකේ ඉතාලිය නියෝජනය කරලා Gold Medal එක දිනුවා. ඒ දිනුවේ වම් අතේ මැණික්කටුව කඩාගෙන ඉඳිද්දී! සම්පූර්ණ Formula 4 Career එක ගත්තොත් එයා Starts 57 කින් Wins 26 ක්, Pole Positions 24 ක් සහ Podiums 37 ක් අරගෙන F4 ඉතිහාසයේ දෙවැනියට සාර්ථකම Driver බවට පත් වුණා.",
      "2023 වෙද්දි එයා Formula Regional European Championship එකට ආවා. Zandvoort වලදී Races දෙකක් ඉතුරු වෙලා තියෙද්දීම Victories 5 ක් එක්ක ඒ Title එකත් දිනුවා. ඊට අමතරව Formula Regional Middle East Championship එකත් දිනුවා. Formula Scout එකෙන් එයාව Junior Formulae වල Best Driver විදිහට නම් කළා. එයා තමන්ගේ FRECA Title එක, නැතිවුණු තමන්ගේ මිත්‍ර Junior Driver කෙනෙක් වුණු Dilano van 't Hoff ට Dedicate කළා. ඒකෙන් Antonelli කියන්නේ Track එක ඇතුළේ විතරක් නෙවෙයි එළියෙත් කොයි වගේ චරිතයක්ද කියලා හැමෝටම තේරුණා.",
      "ඊටපස්සේ තමයි Mercedes ලා එයාව කොච්චර විශ්වාස කරනවද කියලා පෙන්නපු තීරණය ගත්තේ. සාමාන්‍යයෙන් ඊළඟට යන්න ඕන Formula 3 වලට වුණත්, Antonelli ඒක සම්පූර්ණයෙන්ම Skip කළා. වයස අවුරුදු 17 දී එයාව කෙලින්ම 2024 Season එකේ Formula 2 වලට Promote කළා Oliver Bearman එක්ක Prema Team එකේ Drive කරන්න. ඒක මාරම ලොකු Jump එකක්. Car එක අලුත්. Championship එක පිරිලා හිටියේ කලින් Seasons වල Experience තියෙන Rivals ලගෙන්.",
      "එයාගේ 2024 F2 Season එක Title Campaign එකක් වුණේ නැහැ. හැබැයි එයාගේ Talent එක නම් හැමෝටම පෙනුණා. Silverstone වල වැස්ස වෙලාවේ තිබුණු Sprint එකේදී එයා තමන්ගේ Maiden F2 Race එක දිනුවා, ඒකත් දෙවැනියට හිටපු කෙනාට වඩා තත්පර 8 කට වඩා පරතරයක් තියාගෙන. ඒ Wet-weather Dominance එක දැක්කම ගොඩක් අයට මතක් වුණේ වැස්සේ රජකරපු F1 Legends ලාව. සති දෙකකට පස්සේ Hungaroring වල Feature Race එකේ 5 වෙනියට Start කරලා සුපිරි Late-race Move එකකින් Victory එක ගත්තා. ඒත් එක්කම එයා F2 ඉතිහාසයේ Races කිහිපයක් දිනපු ළාබාලතම Driver වුණා. වයස 17 යි. F2 වල පළවෙනි Season එක. Mercedes ලා දැක්කා එයා මොකාටද එන්නේ කියලා!",
      "THE NIGHT THAT CHANGED EVERYTHING: Monza, 2024 සැප්තැම්බර්",
      "මුළු ලෝකෙම F1 Fans ලගේ අවධානය Kimi Antonelli කියන නමට හැරුණේ, එයාගේ Career එකේ ලොකුම Announcement එක එන්න පැය කිහිපයකට කලින්. 2024 Italian Grand Prix Weekend එකේ Monza වල FP1 Session එකේදී Mercedes ලා තමන්ගේ 18 හැවිරිදි Junior ට F1 Car එකක් Drive කරන්න දුන්නා. හැබැයි Session එක පටන් අරන් විනාඩි කිහිපයකින් ඒක ඉවර වුණා. 52g Impact එකක් එක්ක Antonelli ව Crash වුණා.",
      "ඕනම Young Driver කෙනෙක්ගේ අනාගතය අඳුරු වෙන්න පුළුවන් සිදුවීමක් ඒක. තමන්ගේ පළවෙනි F1 Practice Run එක, High-profile Event එකක්, ලෝකෙම බලාගෙන ඉන්නවා. හැබැයි Mercedes Team Principal Toto Wolff ට කේන්ති ගියේ නැහැ. \"මේ Incident එක ලබන අවුරුද්දේ Driver Decision එකට කිසිම බලපෑමක් කරන්නේ නැහැ\" කියලා Wolff කිව්වා, වචනෙටම වැඩ කළා. පහුවදා උදේම Mercedes ලා නිල වශයෙන් නිවේදනය කළා 2025 F1 Season එකට Lewis Hamilton ගේ අඩුව පුරවන්න එන්නේ Kimi Antonelli කියලා.",
      "වයස 18 ක, තමන්ගේ පළවෙනි F2 Campaign එකේ හිටපු Bologna වල කොල්ලට, Motorsport ලෝකේ හැමෝම ඇහැ ගහන් ඉන්න Seat එකක් ලැබුණා. පස්සේ කාලෙක Antonelli පිළිගත්තා, ඒ Crash එක නිසා එයාගේ F1 Debut එකේ මුල් කාලේ පොඩි Caution එකක් තිබුණා, හැබැයි ඒක Overcome කරන්න එයාට පුළුවන් වුණා කියලා. ඒ වගේ Self-awareness එකක් තියෙනවා කියන්නෙම නිකම්ම Race කරන අයට වඩා Champions ලව වෙන් කරන Emotional Intelligence එක එයාට තියෙනවා කියන එක.",
      "THE ROOKIE WHO BELONGED: 2025 IN FORMULA 1",
      "Kimi Antonelli එයාගේ Formula 1 Race Debut එක කළේ 2025 Australian Grand Prix එකේදී. එතකොට වයස අවුරුදු 18 යි මාස 6 යි දවස් 20 යි. ඒ කියන්නේ F1 ඉතිහාසයේ Grand Prix එකක් Start කරපු තුන්වෙනි ළාබාලතම Driver. ඒ වගේම 2021 හිටපු Antonio Giovinazzi ට පස්සේ F1 වල Race කරපු පළවෙනි ඉතාලි ජාතිකයා වුණෙත් එයා. 1950 ගණන් වලින් පස්සේ Mercedes ලා වෙනුවෙන් F1 Grid එකට ආපු පළවෙනි Rookie ත් එයා.",
      "එයාගේ Debut එකෙන්ම සැක කරපු අයගේ කටවල් වැහුණා. Mixed Conditions වල Top 15 න් එළියේ ඉඳන් Start කරපු Antonelli, 4 වෙනියා විදිහට Race එක ඉවර කළා. මේක නිකම්ම Development Experiment එකක් නෙවෙයි, එයා ආවේ Race කරන්නමයි කියලා මුළු Paddock එකටම තේරුණා.",
      "ඊටපස්සේ ආවා Miami! ඒක Record Books වල හැමදාටම ලියවුණ දවසක්. Sprint Qualifying වලදී Fastest Lap එක ගහලා Pole එක ගත්ත Antonelli, අවුරුදු 75 ක F1 ඉතිහාසයේ ඕනෑම විදිහක Pole Position එකක් ගත්ත ළාබාලතම Driver වුණා. වයස 18 දී! Sprint Session එකකදී! අවුරුදු ගාණක් Experience තියෙන Drivers ලා ඔක්කොටම වඩා Fast වෙලා.",
      "එයාගේ පළවෙනි F1 Podium එක ආවේ Canadian Grand Prix එකේදී. නිකම්ම Attack කරන්නේ නැතුව Race Distance එකක් Manage කරලා Composed විදිහට 3rd Place එක ගත්තා. ඊටපස්සේ Brazil වල Sao Paulo Grand Prix එකේදී 2nd Place එක ගත්තා. Las Vegas වලදීත් තව Podium එකක් ගත්තා. 2025 Season එක එයා ඉවර කළේ Points 150 කුත් එක්ක Drivers' Championship එකේ 7 වෙනියා විදිහට. 2025 Car එක අලුත් Regulations එද්දී ආපු Dominant Machine එකක් නෙවෙයි. හැබැයි ඒ Package එකෙන් ගන්න පුළුවන් උපරිමේටත් වඩා Antonelli ගත්තා. මාස 12 ක් ඇතුළත එයා Car එක, Team එක සහ Sport එක ගැන ඉගෙන ගත්තා. 2026 අලුත් Regulations එද්දී කොල්ලා හිටියේ ෆුල් Ready පිට.",
      "THE SUPERSTAR ARRIVES: ANTONELLI IN 2026",
      "2025 කියන්නේ නිකම්ම Statement එකක් නම්, මේ 2026 කියන්නේ Declaration එකක්! මුළු Grid එකම Reset කරපු අලුත් Technical Regulations එක්ක Mercedes ලා හදපු කාර් එක, Antonelli එලවන්නේ ගොඩක් Experience තියෙන Senior කෙනෙක් වගේ මාරම Authority එකකින් සහ Consistency එකකින්.",
      "Season එක පටන් ගත්තේ Australia වල 2nd Place එකෙන්. ඊටපස්සේ ආවා චීනෙට, Round 2! මුළු ලෝකෙම බලාගෙන ඉඳිද්දී Antonelli, Chinese Grand Prix එකේ Pole Position එක අරගෙන, F1 ඉතිහාසයේ ළාබාලතම GP Polesitter වුණා! (වයස අවුරුදු 19 යි, මාස 6 යි, දවස් 17 යි - Sebastian Vettel ගේ Record එක කැඩුවා). ඊටපස්සේ ඒ Pole එක Commanding Race Win එකක් බවට පත් කරලා Mercedes One-Two අරන් දුන්නා. ඒ Victory එකත් එක්ක එයා F1 ඉතිහාසයේ දෙවැනියට ළාබාලතම Race Winner වුණා (Max Verstappen ට විතරක් දෙවැනි වෙලා). ඒ වගේම අවුරුදු 20 කට පස්සේ F1 Race එකක් දිනපු පළවෙනි ඉතාලි ජාතිකයා වුණෙත් එයා (2006 Giancarlo Fisichella ගෙන් පස්සේ). අවුරුදු 20 ක ඉතාලි හීනේ හැබෑ කළේ මේ 19 හැවිරිදි Bologna කොල්ලා. \"මේක තමයි මගේ ජීවිතේ සුපිරිම දවස, පළවෙනි එක හැමදාම Special මොකද ඒක වෙන්නේ එක පාරයි\" කියලා Antonelli Race එකෙන් පස්සේ කිව්වා.",
      "ඊළඟට Japan - ආයේ Pole එකක්, ආයේ Race Win එකක්, තව Record එකක්: ඉතිහාසයේ ළාබාලතම World Championship Leader (වයස 19 යි මාස 7 යි දවස් 4 යි). ඊටපස්සේ Miami - Lights-to-flag Performance එකක් දීලා දිගටම Races 3 ක් දිනපු ළාබාලතම Driver වුණා. Canada වල Pole එකෙන් නෙවෙයි 2nd ඉඳන් Start කරලා දිනුවා. ඒකෙන් ඔප්පු වුණා Grid Advantage එක විතරක් නෙවෙයි Pure Pace එකෙන් සහ Race Management එකෙන් එයාට අනිත් අයව Beat කරන්න පුළුවන් කියලා. ඊටපස්සේ Monaco - 5 වෙනි දිගටම දිනපු Victory එක! Championship Lead එක 66 points දක්වා වැඩි කළා.",
      "ඊටපස්සේ පොඩි දුක හිතෙන කාලයක් ආවා. Barcelona වලදී Mechanical Failure එකක් . Hamilton දිනුවා. Britain වලදීත් ආයේ Mechanical Failure එකක්. Leclerc දිනුවා. Title Fight එක ටිකක් තියුණු වෙනවා වගේ පෙනුණා. හැබැයි Antonelli ඒකට උත්තර දුන්නේ Belgium වලදී: Pole එක අරන්, Lights to flag ගිහින් Season එකේ 6 වෙනි Win එක ගත්තා. වචනයක්වත් කතා නොකර තමන් කවුද කියලා එයා ඔප්පු කළා.",
      "Dutch Grand Prix එක වලදී Laps 32 ක් ලීඩ් කරලා, Lando Norris ට විතරක් දෙවැනි වෙලා 2nd ආවා. ඒ එයාගේ Career එකේ 13 වෙනි Podium එක. දැන් ඉතින් Italian Grand Prix එකට Antonelli එන්නේ Points 242 කුත් එක්ක Russell සහ Hamilton ට වඩා 59-point Lead එකක් තියාගෙන. තව Rounds 12 ක් ඉතුරුයි!",
      "දැනටමත් එයා කඩලා තියෙන Records!",
      "Antonelli ගේ මේ 2026 Results වල තියෙන විශේෂම දේ තමයි එයා දිනලා තියෙන Circuits වල වෙනස. Shanghai කියන්නේ Raw Power සහ Hard Braking ඕන ට්‍රැක් එකක්. Suzuka කියන්නේ පොඩි ඩවුට් එකක් තිබ්බත් කෙළවෙන මාරම Demanding Corners තියෙන තැනක්. Miami කියන්නේ Precision එක ඕන Semi-street Circuit එකක්. Montreal හැදිලා තියෙන්නේ Straight-line Speed සහ Brave Late-braking වලට. Monaco කියන්නේ Calendar එකේ තියෙන Slowest, අමාරුම, පටුම Track එක. එයා මේ ඔක්කොගෙම දිනුවා!",
      "අවුරුදු 20 වෙද්දි එයාගේ Records ලිස්ට් එක මෙන්න: අවුරුදු 20 වෙද්දි එයාගේ Records ලිස්ට් එක මෙන්න: 🔴 Youngest F1 Grand Prix Polesitter (Vettel ගේ රෙකෝඩ් එක කැඩුවා 19y 6m 17d වලින්) 🔴 Second Youngest Race Winner in F1 History (Verstappen ට විතරයි දෙවැනි) 🔴 දිගටම F1 Races 3 ක් දිනපු ළාබාලතම Driver 🔴 Youngest Formula 1 World Drivers' Championship Leader (19y 7m 4d) 🔴 Youngest Polesitter of any F1 format (Sprint or GP - 2025 දී 18 හැවිරිදි Rookie කෙනෙක් විදිහට) 🔴 අවුරුදු 20 කට පස්සේ ඉතාලියට Grand Prix එකක් දිනලා දුන්න Driver (2006 ට පස්සේ)",
      "THE SENNA IN HIM: අංකයක් සහ ආදර්ශයක්",
      "Results ටික අයින් කරලා එයා දිහා බැලුවොත් තේරෙනවා ඇයි මේ කොල්ලා මෙච්චර දුර ආවේ කියලා. Paddock එකේ ඉන්න ගොඩක් අය කියන විදිහට එයා මාරම Grounded සහ Self-aware චරිතයක්. ඒ ගුණාංග එයාට පොඩි කාලෙම දුන්නේ තාත්තා. එයා 2025 Rookie Season එක පුරාම ඔන්ලයින් International Relations සහ Marketing ඉගෙන ගත්තා. AKM Motorsport by Kart Republic කියලා තමන්ගේම Karting Operation එකක් තාත්තත් එක්ක පටන් ගත්තා, තමන් ආපු තැනට ආයේ දෙයක් දෙන්න. එයාගේ F1 ගමන ගැන 2025 දී Netflix එකෙන් \"The Seat\" කියලා Film එකකුත් ආවා. එයාගේ Racing Helmet එකේ තියෙන්නේ Savoy Blue Base එකක් එක්ක ඉතාලි කොඩියේ පාට. ඒක නිකම්ම Branding එකක් නෙවෙයි, එයාගේ අනන්‍යතාවය.",
      "ඊටපස්සේ ඒ අංකය. 12! එයා F1 වල රේස් කරපු හැම කාර් එකකම ගහලා තියෙන්නේ 12. ඒක කෙලින්ම Tribute එකක් බ්‍රසීලියානු 3-Time World Champion, Ayrton Senna ට. Senna 1985 ඉඳන් 1987 වෙනකම් Lotus Team එකේ පාවිච්චි කළේ අංක 12. Antonelli හැදුණේ Senna ගේ Racing DVD බල බල. රෑ නිදාගන්නේ නැතුව පරණ Seasons බලලා එයා ඉගෙන ගත්තේ Driving විතරක් නෙවෙයි, ඒ යුගයම හොල්ලපු Senna ගේ දර්ශනය සහ ආත්මය.",
      "\"Senna ගේ Videos දකිද්දී මට මාර විදිහට හැඟීම්බර වෙනවා,\" Antonelli කියලා තියෙනවා. \"මම 1980 ගණන් වල ඉඳන් 2000 ගණන් වෙනකම් තියෙන DVD සේරම බැලුවා. Senna ගේ Driving මට මාර විදිහට දැණුනා. Track එකේ විතරක් නෙවෙයි, එළියේ එයා හිටපු විදිහ නිසා එයා තමයි මගේ Idol. සුපිරි Driver කෙනෙක්, ඒ වගේම මාර මනුස්සයෙක්. මගේ Career එකෙන් එයා කරපු දේවලින් පොඩි හරි කොටසක් කරන්න පුළුවන් නම් ඒක මාරයි. මේ ඔක්කොම Ayrton නිසා. මම Single Seaters වල මුලින්ම පාවිච්චි කළෙත් මේ අංකයමයි.\" එයා තාමත් කියන්නේ ඒ අංකය දකිද්දී ඇඟේ හිරිගඩු පිපෙනවා කියලා.",
      "Paddock එකේ අය Antonelli ව Senna ට Compare කරන්නේ ගොඩක් පරිස්සමට. මොකද Senna කියන නමේ, තියෙන බර F1 වල වෙන කාටවත් නැති තරම්. හැබැයි ඒ Comparison එක වෙන්න පටන් අරන්, ඒකත් නිකම්ම නෙවෙයි, F1 වල අලුත් Headline එකක් දාන කෙනයි, ඇත්තටම Legend කෙනෙක්ගේ අඩුව පුරවන කෙනයි අඳුරගන්න පුළුවන් ප්‍රවීණයෝ අතින්මයි.",
      "THE HERO STARTING FROM THE BACK",
      "මේ Weekend එකේ Monza වල Italian Grand Prix එක පටන් ගනිද්දී, Championship Leader, Home Hero, ඉතාලියේ අවුරුදු 20 ක F1 ශාපය නිමා කරපු Kimi Antonelli Grid එකේ ඉස්සරහා ඉඳන් පටන් ගන්නේ නැහැ. එයා Race එක Start කරන්නේ Grid එකේ අන්තිම පේළියෙන්!",
      "Mercedes ලා තීරණය කරලා තියෙනවා Antonelli ගේ Car එකට අලුත්ම Power Unit එකක් දාන්න. ඒ නිසා Rules වල හැටියට අනිවාර්යයෙන් ලැබෙන Grid Penalty එක එයාලා බාරගත්තා. මේක Strategic Decision එකක්, හැබැයි මේකේ තියෙන Personal පැත්ත අමතක කරන්න බැහැ. අවුරුදු 20 ක ඉතාලි ජාතික කොල්ලෙක්, තමන්ගේ Home Grand Prix එක අන්තිමට ඉඳන් පටන් ගන්නවා, ඒත් එයා තමයි ලෝක ශූරතාවයේ පෙරමුණේ ඉන්නේ!",
      "එයා F1 ආපු දවසේ ඉඳන් පෙන්නපු ඒ Composure එකෙන්ම මේ දේත් බාරගත්තා. \"Monza වලට යද්දී අපිට Engine Penalty එකක් තියෙනවා, හැබැයි ඒක ගන්න හොඳම Track එක මේක කියලා මම හිතනවා,\" Antonelli කිව්වා. \"ඔව්, මේක මගේ Home Race එක තමයි, හැබැයි මේ දේ කරන්න හොඳම තැනත් මේකමයි.\" කිසිම Drama එකක් නැහැ, මැසිවිලි නෑ. තමන්ගේ උපරිමය දෙන්න ලේසි Narrative එකක් ඕනෙම නැති සුපිරිම Driver කෙනෙක්ගේ පැහැදිලි දැක්ම තමයි ඒක.",
      "එයා Field එක පහුකරගෙන ඉස්සරහට එයි. එයා මේ පාර Points Lead එක Defend කරන්නේ Front Row එකේ ඉඳන් නෙවෙයි, අන්තිම පේළියේ ඉඳන් ලැප් එකෙන් ලැප් එක තමන්ගේම සෙනඟ ඉස්සරහා ඒක Build කරන ගමන්. මේ Weekend එකේ F1 වල හොඳම කතාව මේක නෙවෙයි නම්, වෙන මොකක්ද? Bologna වල කොල්ලා ගෙදර යනවා. හැමදාම වගේම, එයා යන්නේ කාට හරි යමක් ඔප්පු කරලා පෙන්නන්න.",
      "ඒනම් කිමිගෙ කතාව මම මෙතනින් කියල ඉවර කරනව නමුත් එයාගෙ කතාව තාම පටන් ගත්ත විතරයි!",
      "දිගටම අපිත් එක්ක ඉන්න formula 1 වල නොදුටු දුටු අහපු නැති අහපු කතා සින්හලෙන් විස්තරාත්මකව දැනගන්න. - F1 Paddock SL",
    ],
    image:
      "/api/fbimg?u=https%3A%2F%2Fz-p3-scontent.fcmb9-1.fna.fbcdn.net%2Fv%2Ft39.30808-6%2F789264105_122130257480813207_3257365040956298638_n.jpg%3Fstp%3Ddst-jpg_tt6%26cstp%3Dmx1638x2048%26ctp%3Ds1638x2048%26_nc_cat%3D108%26ccb%3D1-7%26_nc_sid%3D127cfc%26_nc_eui2%3DAeHzNj6OzYGvWkI66ODCeS0KKbnBjg_VGWApucGOD9UZYN6O5mBeF-kZWtiN_KGyDRlCgkCtxbTWEXGWjRIlZZo3%26_nc_ohc%3De32ittcO-OgQ7kNvwFeHdHw%26_nc_oc%3DAdoFzCC4r9x0doTWiLgFu4oET3b0umRFm8P41DvthIftRIg7B8DSB6VR7_SCIkV1qzE%26_nc_zt%3D23%26_nc_ht%3Dz-p3-scontent.fcmb9-1.fna%26_nc_gid%3DsOnVTs3s11oICFdJvwQhtQ%26_nc_ss%3D7b2a8%26oh%3D00_AQJLWRmi4yI5CeTCFlL1XV-Ylyxtj2626I0l5hnBCd8V5A%26oe%3D6AA5E186",
    author: {
      name: "F1 Paddock SL",
      role: "Road to Formula 1 Series",
      bio: "Sinhala race-weekend stories, records and the untold tales from the Formula 1 paddock.",
      avatar: "/images/f1-9.jpg",
    },
    pubDate: "2026-09-06T09:00:00.000Z",
    readTime: "12 min read",
    comments: [],
  },
  {
    id: "pre-season-testing-2026",
    title: "Pre-Season Testing: The Numbers Behind Bahrain",
    excerpt:
      "What the three days in Sakhir really told us — tyre degradation, fuel-adjusted lap times and which cars are sandbagging.",
    content: [
      "The paddock has packed up after three days of pre-season testing in Bahrain, and as always the stopwatch only tells half the story. Fuel loads, engine modes and tyre compounds all move the lap time more than most fans expect.",
      "Every team ran a split programme: morning performance runs on the C5 compound, afternoon long runs on the C3. When you average the long-run pace and remove the fuel delta, a clear midfield picture starts to emerge.",
      "Our verified fan-sourced data backs up the idea that two teams are hiding significant performance. Sandbagging in testing is a tradition, but the gap between their headline times and their long-run simulations is unusually wide this year.",
      "By the time the season opens, expect the order to reshuffle. Testing always rewards patience — and the teams that spent the final hour of Day 3 chasing race-trim consistency rather than the fastest single lap.",
    ],
    image: PLACEHOLDER(1),
    author: {
      name: "Vihanga Nimsara",
      role: "Founder & Chief Editor",
      bio: "Runs the F1 Fan Paddock paddock, writes race-weekend verdicts and keeps the fan data honest.",
      avatar: "/images/f1-5.jpg",
    },
    pubDate: "2026-02-22T10:00:00.000Z",
    readTime: "4 min read",
    comments: [
      {
        id: "c1",
        author: "Kavi Fernando",
        date: "2026-02-22T11:30:00.000Z",
        text: "The fuel-adjusted numbers are the best bit. Everyone quoting raw laps is missing the point.",
      },
      {
        id: "c2",
        author: "Dilan Perera",
        date: "2026-02-22T13:05:00.000Z",
        text: "Hoping the long-run pace is real — we've been waiting for a proper midfield fight since last season.",
      },
      {
        id: "c3",
        author: "Amaya Silva",
        date: "2026-02-23T08:00:00.000Z",
        text: "Great write-up. Do you have the same breakdown for the second Bahrain test week?",
      },
    ],
  },
  {
    id: "rookie-driver-guide-2026",
    title: "Rookie Guide 2026: Five New Faces To Watch",
    excerpt:
      "From junior-series champions to surprise signings — the 2026 grid's rookies have more pressure on them than ever.",
    content: [
      "The 2026 season brings the biggest rookie intake in years. Five new names fill seats that spent most of last season rotating between familiar faces, and every one of them arrives with something to prove.",
      "Expectation is the real enemy. Formula 1 rookies now face a full calendar, sprint events and a development race that never stops — there is no such thing as a quiet debut season anymore.",
      "The strongest rookie wing-men will be the ones who manage media days, simulator time and race-weekend debriefs without letting the noise creep into the cockpit. The talent is close; the margins are not.",
      "Keep an eye on qualifying disappearances. A rookie who can bank a clean Q3 lap on day one is a rookie who belongs at the front of the mid-pack for the rest of the year.",
    ],
    image: PLACEHOLDER(3),
    author: {
      name: "Nethmi Jayasuriya",
      role: "Junior Correspondent",
      bio: "Follows the junior categories so you don't have to. Loves a good overtake and an even better excuse for it.",
      avatar: "/images/f1-7.jpg",
    },
    pubDate: "2026-02-18T09:00:00.000Z",
    readTime: "5 min read",
    comments: [
      {
        id: "c1",
        author: "Ravindu Wick",
        date: "2026-02-18T10:15:00.000Z",
        text: "The margins point about Q3 is so true. Rookies who nail quali are gold.",
      },
      {
        id: "c2",
        author: "Tharushi G",
        date: "2026-02-19T12:00:00.000Z",
        text: "Would love a similar guide for the sprint events later in the season.",
      },
    ],
  },
  {
    id: "pit-wall-radio-gold",
    title: "Pit Wall Radio Gold: What The Drivers Really Say",
    excerpt:
      "Behind the team radios — the code words, the frustration and the moments that make fan podcasts worth it.",
    content: [
      "Team radio is Formula 1's greatest unscripted drama. But the messages you hear on the world feed are only half of it — the bits that make it on air are hand-picked for maximum drama.",
      "'Box, box' sounds simple, but the tone tells you everything. A clipped 'box now' means the undercut is real. The long, resigned 'we are checking' is where hope goes to die.",
      "The real gold is in the calm swaps during the race — a driver asking one quiet question that changes an entire strategy, or a race engineer talking a driver through a lock-up like they've done it a thousand times together.",
      "Next time you watch, listen for the silences. The best moments on the pit wall never make it to the broadcast feed.",
    ],
    image: PLACEHOLDER(9),
    author: {
      name: "Ishara Bandara",
      role: "Strategy Analyst",
      bio: "Obsesses over tyre windows and pit-lane maths. Also runs the Paddock's race-day live blogs.",
      avatar: "/images/f1-12.jpg",
    },
    pubDate: "2026-02-10T15:00:00.000Z",
    readTime: "3 min read",
    comments: [
      {
        id: "c1",
        author: "Mahela D.",
        date: "2026-02-10T16:30:00.000Z",
        text: "'We are checking' should be a fraction of what it used to be, this is comedy gold.",
      },
      {
        id: "c2",
        author: "Sachin J",
        date: "2026-02-11T07:45:00.000Z",
        text: "The analysis about tone is spot on. You can hear the undercut before it happens.",
      },
      {
        id: "c3",
        author: "Ruvini",
        date: "2026-02-11T09:20:00.000Z",
        text: "Please do one of these every month, the podcast can only replay them so many times.",
      },
    ],
  },
];

export function getOwnPosts(): OwnPost[] {
  return OWN_POSTS;
}

export function getOwnPostById(id: string): OwnPost | undefined {
  return OWN_POSTS.find((p) => p.id === id);
}