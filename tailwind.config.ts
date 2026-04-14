import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101010",
        paper: "#f7f7f4",
        mist: "#e7e7e2",
        muted: "#77736c",
        line: "#d8d8d2",
        accent: "#1f8a70",
        coral: "#d95f43"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 16, 16, 0.08)"
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
