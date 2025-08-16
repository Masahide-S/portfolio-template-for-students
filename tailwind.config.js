/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 以前設定したカラーパレット
        'base': '#FFFBF5',      // 背景の基本色 (オフホワイト)
        'surface': '#F7EFE5',   // 少し濃い背景色 (薄いベージュ)
        'primary': '#E7A46E',   // メインカラー (温かみのあるオレンジ)
        'text-main': '#4C433E',  // メインテキスト (ダークブラウン)
        'text-sub': '#8E827A',   // サブテキスト (グレーブラウン)
      },
      fontFamily: {
        // 以前設定したフォント
        sans: ['"M PLUS Rounded 1c"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}