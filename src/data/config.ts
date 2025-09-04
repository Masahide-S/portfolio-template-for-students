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
      { name: 'Profile', href: '#about' },
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
// --- タイムライン ---
  timeline: {
    items: [
      { 
        date: '2025年4月', 
        title: '株式会社〇〇 インターンシップ参加', 
        description: `Web開発チームの一員として、フロントエンド開発を担当しました。
                      主な業務は、ReactとTypeScriptを用いたUIコンポーネントの設計と実装です。

                      実際の製品コードに触れ、チームでの開発フローやコードレビューの文化を学び、
                      実践的なスキルを身につけることができました。`, 
        tags: ['インターン'], 
      },
      { 
        date: '2024年11月', 
        title: '個人開発アプリ「〇〇」をリリース', 
        description: `「〇〇」という課題を解決するため、個人でWebアプリケーションを開発しました。
                      技術選定からUI/UXデザイン、実装、そしてVercelへのデプロイまで、
                      プロダクト開発の全工程を一人で担当しました。

                      この経験を通じて、プロジェクト全体を管理する能力が身につきました。`, 
        tags: ['個人開発'], 
      },
      { 
        date: '2025年8月', 
        title: '△△カンファレンスにスタッフとして参加', 
        description: `技術カンファレンスに運営スタッフとして参加しました。
                      来場者の誘導や、登壇者のサポートなどを担当しました。`, 
        tags: ['イベント'], 
      },
      { 
        date: '2026年2月', 
        title: '卒業研究にて〇〇を発表', 
        description: `卒業研究として「〇〇」というテーマに取り組んでいます。
                      この研究では、深層学習モデルを用いて〇〇の精度を向上させることを目指しています。

                      現在は先行研究の調査と、データセットの準備を進めている段階です。
                      最終的には研究成果を論文にまとめ、学会で発表する予定です。`, 
        tags: ['研究', '学歴'], 
      },
      { 
        date: '2024年4月', 
        title: '〇〇大学 〇〇学部 入学', 
        description: `〇〇大学データサイエンス学部に現役で入学しました。
                      データ分析や機械学習の基礎を学びつつ、Web開発にも力を入れています。`, 
        tags: ['学歴'], 
      },
      { 
        date: '2023年10月', 
        title: '高校時代、文化祭実行委員長を務める', 
        description: `高校時代に文化祭の実行委員長を務めました。
                      企画から運営まで全体を統括し、リーダーシップを学びました。`, 
        tags: ['イベント'], 
      },
    ],
  },

// --- 受賞歴 ---
  awards: {
    items: [
      { 
        date: '2025年3月', 
        title: '〇〇ハッカソン 審査員特別賞', 
        description: `「地域の課題を解決する」というテーマのハッカソンに参加しました。
                      私たちのチームは、〇〇というユニークな視点からアプローチしたアプリケーションを開発。

                      技術的な挑戦と、アイデアの独創性が高く評価され、
                      審査員特別賞をいただくことができました。`, 
        tags: ['開発', '特別賞'],
        details: [
          { subtitle: '使用技術', text: 'Next.js, TypeScript, Gemini API' },
          { subtitle: '担当役割', text: 'フロントエンド、API連携' },
        ]
      },
      { 
        date: '2024年8月', 
        title: '〇〇ビジネスコンテスト 優勝', 
        description: `〇〇の社会課題解決を目的としたビジネスコンテストに参加。
                      データに基づいた実現可能性の高いプランを提案しました。

                      プレゼンテーションでは、審査員から特に将来性を高く評価していただき、
                      最終的に優勝することができました。
                      この経験を通じて、課題発見力と提案力が身につきました。`,
        tags: ['アイデア', '最優秀賞'],
        details: [
          { subtitle: '担当役割', text: '企画、データ分析、プレゼンテーション' },
        ]
      },
    ],
  },

// --- 研究 ---
  research: {
    items: [
      { 
        date: '2025年4月 - 現在', 
        title: '卒業研究：〇〇に関する研究', 
        description: `〇〇大学の〇〇研究室にて、指導教官のもとで研究に取り組んでいます。
                      主なテーマは、深層学習を用いた新しい画像認識アルゴリズムの提案です。

                      現在は、関連研究のサーベイと、実験で使用するデータセットの構築を行っており、
                      最終的な目標は、この研究成果を国際学会で発表することです。`,
        tags: ['機械学習', '研究'],
        details: [
          { subtitle: '使用技術', text: 'Python, TensorFlow, Scikit-learn' },
          { subtitle: 'キーワード', text: '深層学習, 画像認識' },
        ]
      },
      { 
        date: '2024年10月', 
        title: 'UI/UX改善に関する共同研究', 
        description: `〇〇企業のWebサイトを対象とした共同研究に参加しました。
                      Google Analyticsを用いてユーザーの行動分析を行い、
                      サイト内の離脱率が高い原因を特定。

                      分析結果に基づき、UI/UXの改善案を複数提案し、
                      A/Bテストによる効果測定までを担当しました。`,
        tags: ['UI/UX', 'データサイエンス'],
        details: [
          { subtitle: '使用ツール', text: 'Google Analytics, Figma, Hotjar' },
          { subtitle: '担当役割', text: 'データ分析、改善案提案' },
        ]
      },
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