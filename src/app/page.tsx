import Link from "next/link";

import Carousel from "@/components/Carousel";

const Home = async () => {
  return (
    <main>
      <section
        className="w-full flex items-center"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <section className="flex justify-between overflow-hidden">
          <Carousel />
          <section className="flex w-1/3 items-center justify-center flex-col ml-1">
            <h2
              className="text-7xl m-0 tracking-widest whitespace-nowrap"
              style={{ fontFamily: "Fredoka One" }}
            >
              Tutu Code
            </h2>
            <p className="text-center w-11/12 mt-8">
              Using AI to convert table structure to front-end code.
            </p>

            <Link href="playground">
              <button className="cursor-pointer bg-gradient-to-r tracking-wider from-violet-500 to-fuchsia-500 w-52 h-10 rounded-xl text-white font-bold text-base px-4 mx-4 mt-10 hover:scale-105 hover:underline transition-all">
                Get Start
              </button>
            </Link>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Home;
