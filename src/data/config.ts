import { IconType } from 'react-icons';
import { FaGraduationCap, FaBuilding, FaCode, FaLightbulb, FaTrophy, FaFlask, FaUsers, FaBrain, FaPalette, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaAward, FaPython, FaDatabase, FaGithub, FaDocker, FaBook, FaCertificate} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss,} from 'react-icons/si';
import { RiDatabaseLine } from "react-icons/ri";

// =================================================================================
// 📌 サイトの基本設定
// =================================================================================
export const siteConfig = {
  // --- プロフィール情報 ---
  profile: {
    name: "関口昌英",
    nameEn: "Masahide",
    catchphrase: "やりたいことをやり、人にとって便利なものを創る",
    birthDate: new Date('2005-04-29'), // 生年月日
    university: {
      name: "武蔵野大学",
      faculty: "データサイエンス学部",
      entranceYear: 2024, //あなたの入学年
    },
    profileImage: "/profile.png", //あまたのプロフィール画像URL
    mainVisual: "/MainVisual.jpg", //メインビジュアルのURL
    aboutMe: `私はデータサイエンスを専攻する大学生で、プログラミングとAI技術に強い関心を持っています。
新しい技術を学び、それを活用して人々の生活を便利にすることに情熱を注いでいます。
データサイエンスだけでなく、開発やデザインにも興味を持っており、日々学びを深めています。`, //自己紹介文
  },

  // --- 連絡先・SNS ---
  contact: {
    email: "masa.seki0429@gmail.com",
    githubId: "Masahide-S",
    xId: "YOUR_X_ID",
    formspreeEndpoint: "https://formspree.io/f/xdkljepv",
  },

  // --- ヘッダー・フッター ---
  header: {
    navItems: [
      { name: 'Profile', href: '#about' },
      { name: 'Knowledge', href: '#knowledge' },
      { name: 'Timeline', href: '#timeline' },
      { name: 'Awards', href: '#awards' },
      { name: 'Creations', href: '#creations' },
      { name: 'Connect', href: '#connect' },
    ],
  },
  
  // --- スキル ---
  // あなたの取得しているスキルをここで管理します
  skills: {
    frontend: [
      { name: 'HTML', icon: FaHtml5 },
      { name: 'CSS', icon: FaCss3Alt },
      { name: 'JavaScript', icon: FaJsSquare },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
    backend: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Python', icon: FaPython },
      { name: 'SQL', icon: FaDatabase },
    ],
    others: [
      { name: 'GitHub', icon: FaGithub },
      { name: 'Docker', icon: FaDocker },
    ],
  },

  certifications: {
    items: [
      {
        name: "基本情報技術者試験",
        issuer: "IPA 独立行政法人情報処理推進機構",
        date: "2025年5月",
        icon: FaAward,
      }
      // ここに取得した資格を追加していきます
    ],
  },

  // --- タイムライン ---
  // あなたの活動履歴をここで管理します
  timeline: {
    items: [
      { 
        date: '2024年3月', 
        title: '安田学園高等学校 卒業', 
        description: `軽くプログラミングについて触れて、興味を持ち始めました。`, 
        tags: ['学歴'], 
      },
      { 
        date: '2024年4月', 
        title: '武蔵野大学 データサイエンス学部 入学', 
        description: `より深くプログラミングなどの技術を学ぶために入学しました。`, 
        tags: ['学歴'], 
      },
      { 
        date: '2024年6月', 
        title: 'Progateハッカソン powered by AWSに参加', 
        description: `Progateハッカソン powered by AWSに参加し、企業賞を受賞しました。
作成したのは「AI生成逆アキネーター」です。入学したばかりで、技術力のない私たちが持ちうる技術を駆使して、AIを活用した新しいエンターテインメントの形を提案しました。
AIの返答が「はい」「いいえ」「わかりません」の三つに限定することで、AIの返答時間を短縮している点が評価され、受賞しました。`, 
        tags: ['イベント','ハッカソン', '受賞'], 
      },
      { 
        date: '2024年9月', 
        title: '未来創造PJ(研究)スタート', 
        description: `自分で研究テーマを決めて、後期の最後にポスター発表を行うプロジェクトがスタートしました。
私が決めたテーマは「キャラクター再現言語生成モデル」です。創作のキャラクターのセリフを模したLLMを作成し、最終的にユーザーが楽しんで対話できるものを目指して研究を開始しました。`, 
        tags: ['学歴', '研究'], 
      },
      { 
        date: '2025年1月', 
        title: '未来創造PJ(研究) ポスター発表', 
        description: `自分の研究成果をポスター形式で発表しました。
研究の内容は「キャラクター再現言語生成モデル」で、創作のキャラクターのセリフを模したLLMを作成し、ユーザーが楽しんで対話できるものを目指しました。
LMにしっかりと触れるには初めてで、試行錯誤を重ねながら取り組みました。満足いくクオリティにはなりませんでしたが、熱意が伝わり、企業賞を受賞しました。`, 
        tags: ['学歴', '研究', '受賞'], 
      },
      { 
        date: '2025年2月', 
        title: 'ツクってアソぶハッカソンに参加', 
        description: `ツクってアソぶハッカソンに参加しました。
お題は「一年に一度だけ使いたいもの」。私たちはチームで「彦星浮気チェッカー」を作りました。
技術的には、ラインのWebhookとGemini AIのAPIを連携させています。
賞は取れませんでしたが、良い経験だったと思います。`, 
        tags: ['イベント', 'ハッカソン'], 
      },
      { 
        date: '2025年4月', 
        title: '【Career Design Forum in 東京】に参加', 
        description: `就活のことについて考えだし、どのような企業があるのか。どんなことをしているのかを知るために参加しました。
インターンシップの案内もあり、参加してみたいと思いました。実際、これをきっかけに幾つかの企業の説明会に参加し、インターンシップにも参加しました。`, 
        tags: ['イベント', 'インターン'], 
      },
      { 
        date: '2025年4月', 
        title: '2年目未来創造PJ(研究) 新しい研究スタート', 
        description: `未来創造PJの新しい研究がスタートしました。今回のテーマは「間の理解したLLMを作る」です。`, 
        tags: ['学歴', '研究'], 
      },
      { 
        date: '2025年5月', 
        title: '基本情報技術者検定 合格', 
        description: `前々より目標としていた基本情報技術者試験に合格しました。
ITの基礎的な知識を幅広く学び、今後の学習やキャリアに役立てていきたいと思います。`, 
        tags: ['勉強', '資格'], 
      },
      { 
        date: '2025年7月', 
        title: 'React.jsを使い始める', 
        description: `React.jsやNode.jsを使った開発に取り組み始めました。本格的な開発ができるようになり、Webアプリケーションの開発に興味を持ち始めました。`, 
        tags: ['勉強', '開発'], 
      },
      { 
        date: '2025年8月', 
        title: 'ポートフォリオサイトを作成', 
        description: `開発のための勉強の一環として、このポートフォリオサイトを作成しました。
Next.jsとTailwind CSSを使用し、レスポンシブデザインとモダンなUI/UXを意識して設計しました。`, 
        tags: ['勉強', '開発'], 
      },
      {
        date: '2025年8月',
        title: '初めてのインターンに参加',
        description: `初めてのインターンシップに参加し、実際の開発現場を体験しました。
主に会社内で使用されるRAGの構築と改善を担当しました。具体的には、セキュリティチェックシートの記入の補助を行うRAGです。
RAGに触れるのは初めてで、最初は苦労しましたが、チームのサポートもあり、徐々に理解を深めることができました。
チームでの協力やコミュニケーションの重要性を学び、貴重な経験となりました。`,
        tags: ['インターン', '開発'],
      },
      {
        date: '2025年9月',
        title: 'RSS Hackathon 2025 Beyondに参加',
        description: `RSS Hackathon 2025 Beyondに参加し、奨励賞を受賞しました。
チームで「Thanks」というアプリケーションを開発しました。このアプリは、自身のありがとうと言われた経験を投稿し、それを他の人と繋げていき、自分のありがとうを他者に伝播させるのをコンセプトとしたアプリです。
技術スタックとしてはVue.jsとFirebaseを使用しました。二つとも初めて触る技術でしたが、チームメンバーと協力して学びながら開発を進めました。
アプリケーションとして、今後の発展を期待される点が評価され、奨励賞を受賞しました。`,
        tags: ['イベント','ハッカソン', '受賞'], 
      },
    ],
  },

  // --- 受賞歴 ---
  awards: {
    items: [
      { 
        date: '2024年6月', 
        title: 'Progateハッカソン powered by AWS 企業賞', 
        details: [
          { subtitle: '使用技術', text: 'Python, AWS(LLM,画像生成AI), Streamlit'},
          { subtitle: 'キーワード', text: 'LLM, 画像認識, AI生成逆アキネーター' },
        ],
        description: `Progateハッカソン powered by AWSに参加し、企業賞を受賞しました。
作成したのは「AI生成逆アキネーター」です。入学したばかりで、技術力のない私たちが持ちうる技術を駆使して、AIを活用した新しいエンターテインメントの形を提案しました。
Iの返答が「はい」「いいえ」「わかりません」の三つに限定することで、AIの返答時間を短縮している点が評価され、受賞しました。`, 
        tags: ['開発', '特別賞', 'ハッカソン', 'アイデア'], 
      },
      { 
        date: '2025年2月',
        title: '未来創造PJ(研究) ポスター発表 企業賞', 
        details: [
          { subtitle: '使用技術', text: `Python, LLM(Gemini AI,Llama), Bert`},
          { subtitle: 'キーワード', text: 'LLM,ファインチューニング,キャラクター再現' },
        ],
        description: `自分の研究成果をポスター形式で発表しました。
研究の内容は「キャラクター再現言語生成モデル」で、創作のキャラクターのセリフを模したLLMを作成し、ユーザーが楽しんで対話できるものを目指しました。
LLMにしっかりと触れるには初めてで、試行錯誤を重ねながら取り組みました。既存手法としてよく使われるファインチューニングに対して、効果的なアプローチを模索しましたが、満足いくクオリティにはなりませんでした。
しかし、熱意が伝わり、企業賞を受賞しました。`,
        tags: ['研究', '機械学習', '特別賞', 'アイデア'], 
      },
      { 
        date: '2025年9月',
        title: 'RSS Hackathon 2025 Beyond 奨励賞', 
        details: [
          { subtitle: '使用技術', text: `Vue.js, Firebase`},
          { subtitle: 'キーワード', text: 'Webアプリケーション, ハッカソン, チーム開発' },
        ],
        description: `RSS Hackathon 2025 Beyondに参加し、奨励賞を受賞しました。
チームで「Thanks」というアプリケーションを開発しました。このアプリは、自身のありがとうと言われた経験を投稿し、それを他の人と繋げていき、自分のありがとうを他者に伝播させるのをコンセプトとしたアプリです。
技術スタックとしてはVue.jsとFirebaseを使用しました。二つとも初めて触る技術でしたが、チームメンバーと協力して学びながら開発を進めました。
アプリケーションとして、今後の発展を期待される点が評価され、奨励賞を受賞しました。`,
        tags: ['開発', '特別賞', 'ハッカソン', 'アイデア'], 
      },
    ],
  },

  products: {
    items: [
      {
        title: "Thanks",
        imageUrl: "/thanks.png",
        githubUrl: "https://github.com/namb0304/RSS_Hackathon_namelesz",
        liveUrl: "https://rss-hackathon-namelesz-k1f8bbvz1-shunsukenambo-8040s-projects.vercel.app",
        tags: ['ハッカソン', 'Vue.js', 'Firebase', 'Vercel'],
        description: "RSS Hackathon 2025 Beyondで開発したアプリです。ありがとうと言われた経験を投稿し、それを他の人と繋げていき、自分のありがとうを他者に伝播させるのをコンセプトとしたアプリです。",
      },
      {
        title: "Portfolio Site",
        imageUrl: "/ogp-image.png",
        githubUrl: "https://github.com/Masahide-S/portfolio-template-for-students",
        liveUrl: "https://feature-update-personal-data.d3e27exnxbgcut.amplifyapp.com",
        tags: ['React', 'Next.js', 'Tailwind CSS', 'AWS'],
        description: "自分のポートフォリオサイトです。",
      },
      {
        title: "思い出マップ",
        imageUrl: "/remember.png",
        githubUrl: "https://github.com/Masahide-S/last_time_database",
        liveUrl: "https://muds.gdl.jp/~s2422109/last_time_database/deploy/",
        tags: ['React', 'PHP', 'Leaflet.js', 'SQL'],
        description: "自分の行った場所。現在地とタイトル、コメントと写真を投稿することによって、自分だけの思い出マップを作成できるアプリです。",
      },
      {
        title: "彦星浮気チェッカー",
        imageUrl: "/hikoboshi.png",
        githubUrl: "",
        liveUrl: "https://script.google.com/macros/s/AKfycbzj4qgiIhltVS79ln_qPxhknENe1KD3Qa7Va4XBj-HInQssBK40rMfbedFWtmEdNvw/exec",
        tags: ['ハッカソン', 'LINE', 'Gemini', 'Google Apps Script'],
        description: "ツクってあそぶハッカソンで開発したアプリです。七夕の日に彦星が浮気をしていないか、織姫がLINEで確認できるチャットボットです。",
      }
    ],
  },

  // --- 研究 ---
  research: {
    items: [
      { 
        date: '2025年4月 - 現在', 
        title: '間の理解したLLMを作る', 
        details: [
          { subtitle: '使用技術', text: `Python, LLM(ChatGPT), Whisper, Pyannote.audio`},
        ],
        description: `人と人との会話では、言葉と言葉の「間」に多くの情報が含まれています。
そして、この「間」という情報は各人の経験や価値観に大きく依存しており、同じ言葉でもその人の経験、職種、シチュエーションによって受け取り方が異なっていると考えてます。
そこで、私はこの「間」というものをLLMに組み込むことで、より自然で人間らしい対話ができるモデルを目指しています。`, 
        tags: ['研究', 'UI/UX', 'データサイエンス'], 
      },
      { 
        date: '2024年9月', 
        title: 'キャラクター再現言語生成モデル', 
        details: [
          { subtitle: '使用技術', text: 'Python, LLM(Gemini AI,Llama), Bert' },
        ],
        description: `キャラクターのセリフを再現したLLMを作るといった時に、ファインチューニングを行う手法が一般的です。しかし、ファインチューニングはGPUを使用したりと気軽に行うことが難しいです。
そこで、LLMの出力をベクトル表現に変換してデータベースに保存した物語のキャラクターのセリフを使用し、LLMの表現と類似している表現を探索、制御することで、ルールベース的にキャラクターの口調や性格を模した対話ができると考え、実装。手法を提案しました。
そして、その手法と従来のファインチューニングを比較し、提案手法の有効性を確認しました。`,
        tags: ['研究', '機械学習', 'アイデア', 'データサイエンス'], 
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
    '勉強': { color: 'bg-gray-100 text-gray-800', icon: FaBook },
    '資格': { color: 'bg-yellow-100 text-yellow-800', icon: FaCertificate },
    'データサイエンス': { color: 'bg-cyan-100 text-cyan-800', icon: RiDatabaseLine },
  } as { [key: string]: { color: string; icon: IconType } },
};