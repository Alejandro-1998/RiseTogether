import HeaderPublic from "../../components/public/header_public";
import FooterPublic from "../../components/public/footer_public";
import Home from "../../components/public/home";

export default function HomePage() {


  return (
    <div className="bg-[#fcfaf8] text-[#1c140d] dark:bg-[#120b07] dark:text-[#fcfaf8]">
      <HeaderPublic />
      <Home />
      <FooterPublic />
    </div>
  );
}