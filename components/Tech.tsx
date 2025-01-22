import Image from "next/image";
import { skillItem } from "@/constants";
import { WobbleCard } from "./ui/wobble-card";

const Tech = () => {
  return (
    <section className="py-32 flex flex-col items-center gap-9">
      <h1 className="heading">
        Tech <span className="text-purple">I use</span>
      </h1>

      <div className="w-full">
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
          {skillItem.map((skills, key) => (
            <WobbleCard
              key={key}
              className="flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-3 hover:bg-zinc-800 group transition-colors"
            >
              <figure className="bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-2 group-hover:bg-zinc-900 transition-colors">
                <Image src={skills.imgSrc} height={32} width={32} alt={skills.label} />
              </figure>

              <div>
                <h3>{skills.label}</h3>

                <p className="text-zinc-400 text-sm">{skills.desc}</p>
              </div>
            </WobbleCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
