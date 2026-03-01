import SectionHeading from "@/components/ui/SectionHeading";

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Khulna University of Engineering & Technology (KUET)",
    status: "Currently Pursuing",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C)",
    institution: "Dhaka City College",
  },
  {
    degree: "Secondary School Certificate (S.S.C)",
    institution: "Joypara Pilot High School",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-20">
      <SectionHeading title="education" />
      <div className="space-y-6">
        {educationData.map((edu) => (
          <div
            key={edu.degree}
            className="border border-slate-700 p-6 bg-background/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
            <div>
              <h3 className="text-slate-100 font-bold text-lg">
                {edu.degree}
              </h3>
              <p className="text-slate-400">{edu.institution}</p>
            </div>
            {edu.status && (
              <span className="text-primary text-sm font-medium border border-primary px-3 py-1 shrink-0 w-fit">
                {edu.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
