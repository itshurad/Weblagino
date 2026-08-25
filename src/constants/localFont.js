import LocalFont from "next/font/local";

const iranFont = LocalFont({
  src: [
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IranYekanXFaNum-Heavy.woff2",
      weight: "1000",
      style: "normal",
    },
  ],
  variable: "--font-IranYekan",
  style: "noramal",
  display: "block",
});
export default iranFont;
