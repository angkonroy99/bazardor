const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const enDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর (যেমন: 148 -> ১৪৮)
export function toBanglaNumber(num) {
  if (num === null || num === undefined) return "০";
  const formatted =
    typeof num === "number" ? num.toLocaleString("en-US") : String(num);
  return formatted.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}

// সর্টিংয়ের জন্য বাংলা সংখ্যাকে ইংরেজি নাম্বারে রূপান্তর
export function toEnglishNumber(str) {
  if (typeof str === "number") return str;
  if (!str) return 0;
  let result = String(str).replace(/,/g, "");
  for (let i = 0; i < 10; i++) {
    result = result.replace(new RegExp(bnDigits[i], "g"), enDigits[i]);
  }
  const parsed = parseFloat(result.replace(/[^\d.-]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

// আজকের ও গতকালকের দামের তুলনা করে শতাংশ বের করা
export function calculatePriceChange(today, yesterday) {
  const t = Number(today) || 0;
  const y = Number(yesterday) || 0;
  if (y === 0 || t === y) {
    return {
      percent: 0,
      text: "—০.০%",
      status: "flat",
    };
  }
  const diff = ((t - y) / y) * 100;
  const absFormatted = toBanglaNumber(Math.abs(diff).toFixed(1));
  if (diff > 0) {
    return {
      percent: diff,
      text: `▲ ${absFormatted}%`,
      status: "up",
    };
  }
  return {
    percent: diff,
    text: `▼ ${absFormatted}%`,
    status: "down",
  };
}

// আজকের তারিখ বাংলায় দেখানোর ফাংশন
export function getBanglaDate() {
  try {
    const now = new Date();
    return now.toLocaleDateString("bn-BD", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "আজকের বাজার দর";
  }
}
