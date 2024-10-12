export default function DataCard({ title, icon, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-gradient-to-t from-white via-[#6DD5FA] to-[#2980B9] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 space-y-10 py-8 2xl:min-w-[220px] w-[180px] min-w-[180px] flex  flex-col justify-center "
    >
      <div className="flex justify-between items-center mb-2 ">
        <div className="2xl:text-2xl text-xl font-bold text-slate-50 drop-shadow-2xl  spice">
          {" "}
          {value}
        </div>

        <span className="text-4xl h-8 w-8 block">{icon}</span>
      </div>
      <span className="text-gray-800 text-lg 2xl:text-xl block font-bold">
        {title}
      </span>
    </div>
  );
}
