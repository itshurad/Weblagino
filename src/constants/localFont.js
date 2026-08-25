import LocalFont from "next/font/local";

const iranFont = LocalFont({
  src: [
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-UltraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranYekan/IRANYekanXFaNum-Heavy.woff2",
      weight: "1000",
      style: "normal",
    },
  ],
  variable: "--font-IranYekan",
  style: "noramal",
  display: "block",
});
export default iranFont;
