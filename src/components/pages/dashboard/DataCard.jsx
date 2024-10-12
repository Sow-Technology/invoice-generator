export default function DataCard({ title, icon, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-gradient-to-t from-white via-[#6DD5FA] to-[#2980B9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 space-y-10 py-8 min-w-[250px] flex  flex-col justify-center"
    >
      <div className="flex justify-between items-center mb-2 ">
        <div className="text-3xl font-bold text-slate-50 drop-shadow-2xl  spice">
          {" "}
          {value}
        </div>

        <span className="text-4xl h-8 w-8 block">{icon}</span>
      </div>
      <span className="text-gray-800 text-xl block font-bold">{title}</span>
    </div>
  );
}
