import { Link } from "react-router-dom"
import illus from "../assets/home.png";
import illus2 from "../assets/home2.png";
import illus3 from "../assets/home3.png";
import  line from '../assets/line1.png'
import  line2 from '../assets/line2.png'



 const  HumaaansLanding=()=> {
  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-6 lg:px-8">
      <main className="mx-auto max-w-7xl">
        <div className="relative">
          {/* Left illustration placeholder */}
          <div className="absolute left-0 top-20 h-64 w-48 md:h-96 md:w-72">
            {/* <div className="h-full w-full bg-gray-100 opacity-20" /> */}
            <img src={line2} alt="" className="h-full w-full flex items-end" />
          </div>
          
          {/* Bottom left illustration placeholder */}
          <div className="absolute bottom-0 left-24 h-64 w-48 md:h-96 md:w-72">
            {/* <div className="h-full w-full bg-gray-100 opacity-20" /> */}
            {/* <img src={illus2} alt="" className="h-full w-full" /> */}

          </div>
          
          {/* Right illustration placeholder */}
          <div className="absolute right-0 top-20 h-64 w-48 md:h-96 md:w-72">
            {/* <div className="h-full w-full bg-gray-100 opacity-20" /> */}
            <img src={line} alt="" className="h-full w-full" />

          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-6xl font-medium tracking-tight text-gray-900 sm:text-7xl md:text-8xl">
              humaaans
            </h1>
            <p className="mt-6 text-xl text-gray-600 md:text-2xl">
              Mix-&-match illustrations of people with a design library
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                size="lg"
                className="bg-[#4263EB] text-lg hover:bg-[#3b5bdb]"
              >
                Use with Blush
              </button>
              <button
                size="lg"
                variant="outline"
                className="text-lg text-[#4263EB] hover:bg-[#4263EB]/10"
              >
                Download
              </button>
            </div>
            <div className="mt-16 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                cc
              </div>
              <span>
                CC0 Free for commercial or personal use by{" "}
                <Link
                  to="#"
                  className="text-[#4263EB] hover:underline"
                >
                  Pablo Stanley
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </main>
      
      {/* Webflow badge */}
      <div className="fixed bottom-4 right-4">
        <button
          variant="secondary"
          size="sm"
          className="bg-[#4263EB] text-white hover:bg-[#3b5bdb]"
        >
          Made with Webflow
        </button>
      </div>
    </div>
  )
}



export default HumaaansLanding