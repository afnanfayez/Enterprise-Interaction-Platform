
const CITIES_AR: Record<string, Record<string, string>> = {
  SA: {
   
    Riyadh: 'الرياض',
    Jeddah: 'جدة',
    Mecca: 'مكة المكرمة',
    Medina: 'المدينة المنورة',
    Dammam: 'الدمام',
    Abha: 'أبها',
    Tabuk: 'تبوك',
    Taif: 'الطائف',
    'At Taif': 'الطائف',
    'Khamis Mushait': 'خميس مشيط',
    Buraydah: 'بريدة',
    Najran: 'نجران',
    'Al-Ahsa': 'الأحساء',
    'Al Ahsa': 'الأحساء',
    Yanbu: 'ينبع',
    Jizan: 'جيزان',
    Hail: 'حائل',
    'Al Khobar': 'الخبر',
    Khobar: 'الخبر',
    Jubayl: 'الجبيل',
    Jubail: 'الجبيل',
    Dhahran: 'الظهران',
    Qatif: 'القطيف',
    'Al Qatif': 'القطيف',
    'Al Oatif': 'القطيف',
    Sakaka: 'سكاكا',
    Arar: 'عرعر',
    Hofuf: 'الهفوف',
    'Al Hufuf': 'الهفوف',
    Mubarraz: 'المبرز',
    Makkah: 'مكة المكرمة',
    Madinah: 'المدينة المنورة',
    Abqaiq: 'بقيق',
    'Al Bahah': 'الباحة',
    Baha: 'الباحة',
    'Hafar Al-Batin': 'حفر الباطن',
    'Hafar al-Batin': 'حفر الباطن',
    'Hafr Al Batin': 'حفر الباطن',
    'Al Wajh': 'الوجه',
    'Wajh': 'الوجه',
    'Ar Rass': 'الرس',
    Rass: 'الرس',
    Unayzah: 'عنيزة',
    'Al Qaysumah': 'القيصومة',
    Qaisumah: 'القيصومة',
    'Ras Tanura': 'رأس تنورة',
    'Ras al-Khair': 'رأس الخير',
    Sabya: 'صبيا',
    Sharurah: 'شرورة',
    Tayma: 'تيماء',
    Turaif: 'طريف',
    Zulfi: 'الزلفي',
    'Al Zulfi': 'الزلفي',
    Dawadmi: 'الدوادمي',
    'Al Dawadmi': 'الدوادمي',
    Shaqra: 'شقراء',
    Afif: 'عفيف',
    Laith: 'ليث',
    Qunfudhah: 'القنفذة',
    'Al Qunfudhah': 'القنفذة',
    Samtah: 'صامطة',
    'Wadi ad-Dawasir': 'وادي الدواسر',
    'Wadi Al Dawaser': 'وادي الدواسر',
    Khafji: 'الخفجي',
    'Al Khafji': 'الخفجي',
    Julaydah: 'جليدة',
    Majmaah: 'المجمعة',
    'Al Majmaah': 'المجمعة',
    Rumah: 'رماح',
    Haradh: 'حرض',
    'Al Faruq': 'الفاروق',
  },
  AE: {
    Dubai: 'دبي', 'Abu Dhabi': 'أبوظبي', Sharjah: 'الشارقة',
    Ajman: 'عجمان', 'Ras Al Khaimah': 'رأس الخيمة',
    Fujairah: 'الفجيرة', 'Umm Al Quwain': 'أم القيوين',
    'Al Ain': 'العين', 'Umm al-Qaiwain': 'أم القيوين',
    'Ras al-Khaimah': 'رأس الخيمة',
    'Khor Fakkan': 'خورفكان', Kalba: 'كلباء', Dibba: 'دبا',
    'Dibba Al-Fujairah': 'دبا الفجيرة',
  },
  EG: {
    Cairo: 'القاهرة', Alexandria: 'الإسكندرية', Giza: 'الجيزة',
    'Shubra El-Kheima': 'شبرا الخيمة', 'Port Said': 'بورسعيد',
    Suez: 'السويس', Luxor: 'الأقصر', Aswan: 'أسوان',
    Asyut: 'أسيوط', Ismailia: 'الإسماعيلية', Faiyum: 'الفيوم',
    Mansoura: 'المنصورة', Tanta: 'طنطا', Zagazig: 'الزقازيق',
    Minya: 'المنيا', Hurghada: 'الغردقة', 'Sharm El Sheikh': 'شرم الشيخ',
    Sohag: 'سوهاج', Qena: 'قنا', Damanhur: 'دمنهور',
    'Beni Suef': 'بني سويف', Shibin: 'شبين الكوم',
    'Kafr El Sheikh': 'كفر الشيخ', Banha: 'بنها', Damietta: 'دمياط',
    'El Mahalla El Kubra': 'المحلة الكبرى', '6th of October': 'السادس من أكتوبر',
    Arish: 'العريش', 'Al Arish': 'العريش',
  },
  JO: {
    Amman: 'عمّان', Zarqa: 'الزرقاء', Irbid: 'إربد',
    Aqaba: 'العقبة', Salt: 'السلط', Karak: 'الكرك',
    Madaba: 'مادبا', Jerash: 'جرش', Ajloun: 'عجلون',
    Mafraq: 'المفرق', Tafila: 'الطفيلة', Maan: 'معان',
  },
  KW: {
    'Kuwait City': 'مدينة الكويت', Salmiya: 'السالمية',
    Hawalli: 'حولي', Farwaniya: 'الفروانية', Jahra: 'الجهراء',
    Ahmadi: 'الأحمدي', Mangaf: 'المنقف', Sabah: 'الصباح',
    'Ar Riqqah': 'الرقة', 'Al Fahahil': 'الفحاحيل',
  },
  QA: {
    Doha: 'الدوحة', 'Al Wakrah': 'الوكرة', 'Al Khor': 'الخور',
    'Al Rayyan': 'الريان', 'Umm Salal': 'أم صلال',
    'Al Wakra': 'الوكرة', 'Dukhan': 'دخان', 'Messaied': 'مسيعيد',
    'Ash Shahaniyah': 'الشحانية', Lusail: 'لوسيل',
    'Al Daayen': 'الظعاين',
  },
  BH: {
    Manama: 'المنامة', Riffa: 'الرفاع', Muharraq: 'المحرق',
    'Hamad Town': 'مدينة حمد', 'Isa Town': 'مدينة عيسى',
    Sitra: 'سترة', Zallaq: 'الزلاق', 'Al Hidd': 'الحد',
    Budaiya: 'البديع', Aali: 'عالي',
  },
  DJ: {
    Djibouti: 'جيبوتي', 'Ali Sabieh': 'علي صبيح', Tadjourah: 'تاجورة',
    Obock: 'أوبوك', Dikhil: 'دخيل', Arta: 'أرتا',
  },
  KM: {
    Moroni: 'موروني', Mutsamudu: 'موتسامودو', Fomboni: 'فومبوني',
    Domoni: 'دوموني', 'Mbeni': 'مبيني',
  },
  MR: {
    Nouakchott: 'نواكشوط', Nouadhibou: 'نواذيبو', Rosso: 'روصو',
    Kaedi: 'كيهيدي', Atar: 'أطار', Kiffa: 'كيفه', Zouerat: 'ازويرات',
  },
  SO: {
    Mogadishu: 'مقديشو', Hargeisa: 'هرجيسا', Bosaso: 'بوصاصو',
    Kismayo: 'كيسمايو', Baidoa: 'بيدوا', Beledweyne: 'بلدوين',
    Garowe: 'جروي',
  },
  OM: {
    Muscat: 'مسقط', Salalah: 'صلالة', Sohar: 'صحار',
    Nizwa: 'نزوى', Sur: 'صور', Buraimi: 'البريمي',
    Ibri: 'عبري', Rustaq: 'الرستاق', Khasab: 'خصب',
    Bahla: 'بهلاء', Seeb: 'السيب', Barka: 'بركاء',
  },
  LB: {
    Beirut: 'بيروت', Tripoli: 'طرابلس', Sidon: 'صيدا',
    Tyre: 'صور', Zahle: 'زحلة', Jounieh: 'جونيه',
    Byblos: 'جبيل', Baalbek: 'بعلبك', Nabatieh: 'النبطية',
  },
  IQ: {
    Baghdad: 'بغداد', Basra: 'البصرة', Mosul: 'الموصل',
    Erbil: 'أربيل', Najaf: 'النجف', Karbala: 'كربلاء',
    Kirkuk: 'كركوك', Sulaymaniyah: 'السليمانية', Duhok: 'دهوك',
    Amarah: 'العمارة', Ramadi: 'الرمادي', Baquba: 'بعقوبة',
    Samarra: 'سامراء', Nasiriyah: 'الناصرية', Tikrit: 'تكريت',
    Kut: 'الكوت', Hillah: 'الحلة', Fallujah: 'الفلوجة',
    Diwaniyah: 'الديوانية', Kufa: 'الكوفة', Zakho: 'زاخو',
    Sinjar: 'سنجار',
  },
  SY: {
    Damascus: 'دمشق', Aleppo: 'حلب', Homs: 'حمص',
    Hama: 'حماة', Latakia: 'اللاذقية', Deir: 'دير الزور',
    Daraa: 'درعا', 'Deir ez-Zor': 'دير الزور', Tartus: 'طرطوس',
    Raqqa: 'الرقة', Qamishli: 'القامشلي', Idlib: 'إدلب',
    Hasakah: 'الحسكة', Palmyra: 'تدمر',
  },
  LY: {
    Tripoli: 'طرابلس', Benghazi: 'بنغازي', Misrata: 'مصراتة',
    Tarhuna: 'ترهونة', 'Al Bayda': 'البيضاء', Ajdabiya: 'أجدابيا',
    Zawiya: 'الزاوية', Tobruk: 'طبرق', Sabha: 'سبها',
    Sirte: 'سرت', Derna: 'درنة', Zliten: 'زليتن',
  },
  TN: {
    Tunis: 'تونس', Sfax: 'صفاقس', Sousse: 'سوسة',
    Kairouan: 'القيروان', Bizerte: 'بنزرت', Gabes: 'قابس',
    Ariana: 'أريانة', Gafsa: 'قفصة', Monastir: 'المنستير',
    Kasserine: 'القصرين', Nabeul: 'نابل', 'Sidi Bouzid': 'سيدي بوزيد',
  },
  MA: {
    Casablanca: 'الدار البيضاء', Rabat: 'الرباط', Fes: 'فاس',
    Marrakesh: 'مراكش', Agadir: 'أكادير', Meknes: 'مكناس',
    Oujda: 'وجدة', Kenitra: 'القنيطرة', Tangier: 'طنجة',
    Tetouan: 'تطوان', Safi: 'آسفي', Nador: 'الناظور',
    'El Jadida': 'الجديدة', Laayoune: 'العيون',
  },
  DZ: {
    Algiers: 'الجزائر', Oran: 'وهران', Constantine: 'قسنطينة',
    Annaba: 'عنابة', Blida: 'البليدة', Batna: 'باتنة',
    Setif: 'سطيف', Tlemcen: 'تلمسان', Biskra: 'بسكرة',
    Bejaia: 'بجاية', Skikda: 'سكيكدة', Djelfa: 'الجلفة',
    Mostaganem: 'مستغانم',
  },
  SD: {
    Khartoum: 'الخرطوم', Omdurman: 'أم درمان', Kassala: 'كسلا',
    'Port Sudan': 'بورسودان', Wad: 'ود مدني', Gedaref: 'القضارف',
    Atbara: 'عطبرة', Nyala: 'نيالا', 'El Obeid': 'الأبيض',
    Dongola: 'دنقلا',
  },
  YE: {
    Sanaa: 'صنعاء', Aden: 'عدن', Taiz: 'تعز',
    Hodeidah: 'الحديدة', Mukalla: 'المكلا', Ibb: 'إب',
    Dhamar: 'ذمار', Amran: 'عمران', Hajjah: 'حجة',
    Marib: 'مأرب', Seiyun: 'سيئون',
  },
  PS: {
    Gaza: 'غزة', Ramallah: 'رام الله', Nablus: 'نابلس',
    Hebron: 'الخليل', Jenin: 'جنين', Tulkarm: 'طولكرم',
    Qalqilya: 'قلقيلية', Bethlehem: 'بيت لحم', Jericho: 'أريحا',
    Jerusalem: 'القدس', Rafah: 'رفح', 'Khan Yunis': 'خان يونس',
  },
};

export function getCitiesArByCountry(
  iso2: string
): Array<{ nameEn: string; nameAr: string }> {
  const map = CITIES_AR[iso2.toUpperCase()];
  if (!map) return [];

  const seen = new Set<string>();
  const cities = Object.entries(map)
    .map(([nameEn, nameAr]) => ({ nameEn, nameAr }))
    .filter((city) => {
      const key = city.nameAr.toLocaleLowerCase('ar');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  cities.sort((a, b) => a.nameAr.localeCompare(b.nameAr, 'ar'));
  return cities;
}

export function getCityAr(iso2: string, cityEn: string): string {
  const map = CITIES_AR[iso2.toUpperCase()];
  if (!map) return cityEn;

  if (map[cityEn]) return map[cityEn];

  const key = Object.keys(map).find(
    (k) => k.toLowerCase() === cityEn.toLowerCase()
  );
  return key ? map[key] : cityEn;
}
