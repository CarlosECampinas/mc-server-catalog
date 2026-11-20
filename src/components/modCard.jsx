export default function ModCard({ modName, modlogoUrl, modLink }) {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg shadow-lg">
      <a
        href={modLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300"
      >
        <img src={modlogoUrl} alt={modName} className=" w-1/5 h-1/5 mb-2" />
        <h3 className="text-lg font-bold">{modName}</h3>
      </a>
      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Addons
      </button>
    </div>
  );
}
