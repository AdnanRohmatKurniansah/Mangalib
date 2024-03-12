import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="layouts bg-gray-100">
      <Navbar />
      <div className="container px-5 md:px-44 md:mx-auto mt-10">
        <div className="content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}