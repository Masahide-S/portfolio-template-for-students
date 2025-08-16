import { IconType } from 'react-icons';
import { FaGraduationCap, FaBuilding, FaCode, FaLightbulb, FaTrophy, FaFlask, FaUsers, FaBrain, FaPalette, FaLaptopCode, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaAward } from 'react-icons/fa';
import { FaXTwitter, FaEnvelope } from 'react-icons/fa6';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPrisma } from 'react-icons/si';

// =================================================================================
// 📌 サイトの基本設定
// =================================================================================
export const siteConfig = {
  // --- プロフィール情報 ---
  profile: {
    name: "[あなたの名前]",
    nameEn: "[あなたの名前(英語)]",
    catchphrase: "[適当なキャッチフレーズ]",
    birthDate: new Date('2005-08-08'), // 生年月日
    university: {
      name: "〇〇大学",
      faculty: "〇〇学部",
      entranceYear: 2024, //あなたの入学年
    },
    profileImage: "https://placehold.jp/3d4070/ffffff/240x240.png", //あまたのプロフィール画像URL
    mainVisual: "https://placehold.jp/1200x400.png?text=Main+Visual", //メインビジュアルのURL
    aboutMe: `ここに自己紹介文を記述します。これまでの経験や興味、価値観などを簡潔にまとめてください。
              訪問者があなたの人柄を理解できるような、温かみのある文章を心がけましょう。`,
  },

  // --- 連絡先・SNS ---
  contact: {
    email: "your-email@example.com",
    githubId: "YOUR_GITHUB_ID",
    xId: "YOUR_X_ID",
  },

  // --- ヘッダー・フッター ---
  header: {
    navItems: [
      { name: 'Skills', href: '#skills' },
      { name: 'Timeline', href: '#timeline' },
      { name: 'Awards', href: '#awards' },
      { name: 'Research', href: '#research' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  
  // --- スキル ---
  // あなたの取得しているスキルをここで管理します
  skills: {
    frontend: [
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
    backend: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Prisma', icon: SiPrisma },
    ],
    others: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'Figma', icon: FaFigma },
    ],
  },

  certifications: {
    items: [
      {
        name: "基本情報技術者試験",
        issuer: "IPA 独立行政法人情報処理推進機構",
        date: "2024年10月",
        icon: FaAward,
      },
      {
        name: "ITパスポート試験",
        issuer: "IPA 独立行政法人情報処理推進機構",
        date: "2023年12月",
        icon: FaAward,
      },
      // ここに取得した資格を追加していきます
    ],
  },

  // --- タイムライン ---
  // あなたの活動履歴をここで管理します
  timeline: {
    items: [
      { date: '2025年4月', title: '株式会社〇〇 インターンシップ参加', description: 'Web開発チームでフロントエンド開発を担当。ReactとTypeScriptを用いたコンポーネント設計や実装に携わりました。', tags: ['インターン'], },
      { date: '2024年11月', title: '個人開発アプリ「〇〇」をリリース', description: '企画から設計、開発、リリースまで一貫して担当。ユーザーの課題解決に貢献し、〇〇ダウンロードを達成しました。', tags: ['個人開発'], },
      { date: '2025年8月', title: '△△カンファレンスにスタッフとして参加', description: '来場者の案内やセッションのサポートを担当し、イベント運営の裏側を学びました。', tags: ['イベント'], },
      { date: '2026年2月', title: '卒業研究にて〇〇を発表', description: '〇〇というテーマで研究を行い、その成果を学会で発表しました。', tags: ['研究', '学歴'], },
      { date: '2024年4月', title: '〇〇大学 〇〇学部 入学', description: '情報科学を専攻し、特にヒューマン・コンピュータ・インタラクションの分野に興味を持って学んでいます。', tags: ['学歴'], },
      { date: '2023年10月', title: '高校時代、文化祭実行委員長を務める', description: '企画立案から予算管理、当日の運営まで統括し、イベントを成功に導きました。', tags: ['イベント'], },
    ],
  },

  // --- 受賞歴 ---
  awards: {
    items: [
      { date: '202X年X月', title: '〇〇ハッカソン 審査員特別賞', description: '「地域の課題を解決する」というテーマで、〇〇というアプリケーションを開発し、その着眼点と技術力が評価されました。', tags: ['開発', '特別賞'], },
      { date: '202X年X月', title: '〇〇ビジネスコンテスト 優勝', description: '〇〇というサービスのビジネスモデルを提案し、市場性と将来性が高く評価され、優勝に至りました。', tags: ['アイデア', '最優秀賞'], },
    ],
  },

  // --- 研究 ---
  research: {
    items: [
      { date: '202X年X月 - 現在', title: '卒業研究：〇〇に関する研究', description: '指導教官のもとで、〇〇の分野における新しいアルゴリズムの提案と評価を行っています。', tags: ['機械学習'], },
      { date: '202X年X月', title: 'UI/UX改善に関する共同研究', description: '〇〇企業のWebサイトを対象に、ユーザー行動分析に基づいたUI/UX改善案を提案し、効果測定を行いました。', tags: ['UI/UX'], },
    ],
  },

  // --- タグのスタイル定義 ---
  // ここでサイト全体のタグを一括管理します
  tagStyles: {
    '学歴': { color: 'bg-sky-100 text-sky-800', icon: FaGraduationCap },
    'インターン': { color: 'bg-emerald-100 text-emerald-800', icon: FaBuilding },
    'ハッカソン': { color: 'bg-amber-100 text-amber-800', icon: FaCode },
    '個人開発': { color: 'bg-indigo-100 text-indigo-800', icon: FaLightbulb },
    '受賞': { color: 'bg-rose-100 text-rose-800', icon: FaTrophy },
    '研究': { color: 'bg-teal-100 text-teal-800', icon: FaFlask },
    'イベント': { color: 'bg-purple-100 text-purple-800', icon: FaUsers },
    '開発': { color: 'bg-indigo-100 text-indigo-800', icon: FaCode },
    'アイデア': { color: 'bg-amber-100 text-amber-800', icon: FaLightbulb },
    '最優秀賞': { color: 'bg-rose-100 text-rose-800', icon: FaTrophy },
    '特別賞': { color: 'bg-emerald-100 text-emerald-800', icon: FaTrophy },
    '機械学習': { color: 'bg-teal-100 text-teal-800', icon: FaBrain },
    'UI/UX': { color: 'bg-purple-100 text-purple-800', icon: FaPalette },
  } as { [key: string]: { color: string; icon: IconType } },
};