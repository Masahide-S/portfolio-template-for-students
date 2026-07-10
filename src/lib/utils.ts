/**
 * 日本語形式の日付文字列（例: "2024年4月"）をDateオブジェクトに変換
 * @param dateStr - 日本語形式の日付文字列（"YYYY年M月"形式）
 * @returns Dateオブジェクト
 */
export function parseJapaneseDate(dateStr: string): Date {
  const parts = dateStr.replace('年', '-').replace('月', '').split('-');
  const year = parseInt(parts[0]);
  const month = parseInt(parts[1]) - 1; // 月は0始まり
  return new Date(year, month, 1);
}

/**
 * 生年月日から現在の年齢を計算
 * @param birthDate - 生年月日（ISO形式の文字列 or Date）
 * @returns 現在の年齢
 */
export function calculateAge(birthDate: string | Date): number {
  const birthDateObj = typeof birthDate === 'string' ? new Date(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
}

/**
 * 入学年と現在日時から学年を計算
 * @param entranceYear - 入学年
 * @param currentDate - 現在日時（省略時は今日）
 * @returns 現在の学年（1-4）、または入学前/卒業後の場合は対応する値
 */
export function calculateGrade(entranceYear: number, currentDate: Date = new Date()): number {
  let grade = currentDate.getFullYear() - entranceYear + 1;
  // 4月より前は学年を1つ下げる
  if (currentDate.getMonth() < 3) {
    grade--;
  }
  return grade;
}

/**
 * イベント日付と入学年から学年表示テキストを生成
 * @param eventDate - イベント日付（"YYYY年M月"形式）
 * @param entranceYear - 入学年
 * @param currentGrade - 現在の学年
 * @returns 学年表示テキスト（例: "大学1年生"、"大学2年生（現在）"）
 */
export function getAcademicStatus(
  eventDate: string,
  entranceYear: number,
  currentGrade: number
): string {
  const eventDateObj = parseJapaneseDate(eventDate);
  const eventYear = eventDateObj.getFullYear();
  const eventMonth = eventDateObj.getMonth() + 1; // 1始まりに戻す

  let eventGrade = eventYear - entranceYear + 1;
  // 4月より前は学年を1つ下げる
  if (eventMonth < 4) {
    eventGrade--;
  }

  if (eventGrade < 1) {
    return "入学前";
  } else if (eventGrade > 4) {
    return "卒業後";
  } else {
    if (eventGrade === currentGrade) {
      return `大学${eventGrade}年生（現在）`;
    }
    return `大学${eventGrade}年生`;
  }
}

/**
 * 2つの日付を比較する（ソート用）
 * @param dateStrA - 日付A（"YYYY年M月"形式）
 * @param dateStrB - 日付B（"YYYY年M月"形式）
 * @returns 比較結果（A < B なら負、A > B なら正、A === B なら0）
 */
export function compareDates(dateStrA: string, dateStrB: string): number {
  const dateA = parseJapaneseDate(dateStrA);
  const dateB = parseJapaneseDate(dateStrB);
  return dateA.getTime() - dateB.getTime();
}

/**
 * クラス名を条件付きで結合するユーティリティ
 * @param classes - クラス名の配列（falsy値は無視される）
 * @returns 結合されたクラス名
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
