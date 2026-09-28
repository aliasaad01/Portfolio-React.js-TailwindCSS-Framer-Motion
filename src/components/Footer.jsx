import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="py-10 bg-[#16251D]/90 border-t border-gray-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-300">
          {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
          <span className="text-[#6B8E23] font-semibold">
            {t("footer.name")}
          </span>
          {t("footer.rights")}
        </p>
      </div>
    </div>
  );
};

export default Footer;
