import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <br />
      <Footer />
    </>
  );
}
