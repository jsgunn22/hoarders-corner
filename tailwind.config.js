/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/src/**/*.jsx"],
  theme: {
    fontFamily: {
      sans: "Roboto",
    },
    fontSize: {
      h1: ["32px", "40px"],
      h2: ["24px", "32px"],
      h3: ["20px", "24px"],
      h4: ["14px", "16px"],
      lg: ["16px", "20px"],
      med: ["14px", "16px"],
      sm: ["12px", "14px"],
    },
    colors: {
      neu: {
        0: "#fafbfb",
        1: "#f8f8f9",
        2: "#f0f1f2",
        3: "#cdd3d6",
        4: "#b9bec1",
        5: "#a4a9ab",
        6: "#9a9ea1",
        7: "#7b7f80",
        8: "#5c5f60",
        9: "#484a4b",
      },
      pri: {
        1: "#e0eff5",
        3: "#8FDFFF",
        5: "#2e94b9",
        7: "#226B86",
        9: "#1c596f",
      },
      sec: {
        1: "#ede0f4",
        5: "#872eb8",
        9: "#511c6e",
      },
      suc: {
        1: "#e0f5e9",
        5: "#2eb96e",
        9: "#1c6f42",
      },
      dan: {
        1: "#ffe6e6",
        5: "#fd5959",
        9: "#983535",
      },
      war: {
        1: "#fdf4ea",
        5: "#f0b775",
        9: "#906e46",
      },
      opac: {
        neu: "#484a4b26",
        alt: "#fafbfb26",
        pri: "#2e94b926",
        sec: "#872eb826",
        suc: "#2eb96e26",
        dan: "#fd595926",
        war: "#f0b77526",
      },
    },
    opacity: {
      15: "0.15",
      40: "0.4",
    },
    extend: {},
  },
  plugins: [],
};
