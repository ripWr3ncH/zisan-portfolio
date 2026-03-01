import SectionHeading from "@/components/ui/SectionHeading";

const achievements = [
  {
    icon: "🏆",
    title: "Finalist – BUET CSE Fest Hackathon",
  },
  {
    icon: "💻",
    title: "Codeforces Pupil",
    detail: "500+ problems solved in online judges",
  },
  {
    icon: "🎓",
    title: "Eligible for Dean's List Award",
    detail: "2nd Year",
  },
  {
    icon: "🥉",
    title: "3rd Place in HACK Project Showcasing",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20">
      <SectionHeading title="achievements" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((item) => (
          <div
            key={item.title}
            className="border border-slate-700 p-5 bg-background/40 flex items-start gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h3 className="text-slate-100 font-bold">{item.title}</h3>
              {item.detail && (
                <p className="text-slate-400 text-sm mt-1">{item.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
