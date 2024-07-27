export default function SelectDB({
  searchedDB,
  setSearchedDB,
  params,
  goToSearchPage,
}: {
  params: URLSearchParams;
  searchedDB: string;
  setSearchedDB: Function;
  goToSearchPage: Function;
}) {
  const Databases = ["MongoDB", "TMDB"];
  return (
    <div className="w-full justify-around">
      <p className="text-4xl font-extralight">
        Select which database to search :-
      </p>
      <div className="flex w-full justify-around">
        {Databases.map((DB, index) => (
          <button
            key={index}
            className={`flex cursor-pointer gap-2 rounded-full border-2 border-yellow-400 px-6 py-2 ${searchedDB === DB && "bg-yellow-400"}`}
            onClick={() => {
              setSearchedDB(DB);
              params.set("searchedDB", DB);
              params.delete("page");
              goToSearchPage();
            }}
          >
            {DB}
          </button>
        ))}
      </div>
    </div>
  );
}
