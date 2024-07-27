import { usePathname, useRouter } from "next/navigation";

export default function Paginate({
  noOfMovies,
  params,
  activePage,
}: {
  noOfMovies?: number;
  params: URLSearchParams;
  activePage: number;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const noOfPages = noOfMovies ? Math.ceil(noOfMovies / 20) : 1;

  function pageChange(num: number) {
    params.set("page", `${num}`);
    router.push(`${pathName}?${params.toString()}`);
  }

  if (noOfMovies === 0) return null;

  if (noOfPages < 2)
    return (
      <p className="m-6 rounded-full border bg-yellow-400 text-center uppercase">
        Showing all the movies
      </p>
    );

  return (
    <div className="my-2">
      <button
        className="mx-[2px] font-semibold"
        onClick={() => {
          if (activePage > 1) pageChange(activePage - 1);
        }}
      >
        &lt;
      </button>

      <PageNumber num={1} pageChange={pageChange} active={activePage === 1} />
      {activePage - 2 > 1 && <span>.....</span>}
      {activePage - 1 > 1 && (
        <PageNumber num={activePage - 1} pageChange={pageChange} />
      )}
      {activePage !== 1 && activePage !== noOfPages && (
        <PageNumber num={activePage} pageChange={pageChange} active={true} />
      )}
      {activePage + 1 < noOfPages && (
        <PageNumber num={activePage + 1} pageChange={pageChange} />
      )}

      {activePage + 2 < noOfPages && <span>.....</span>}

      <PageNumber
        num={noOfPages}
        pageChange={pageChange}
        active={activePage === noOfPages}
      />

      <button
        className="mx-[2px] font-semibold"
        onClick={() => {
          if (activePage < noOfPages) pageChange(activePage + 1);
        }}
      >
        &gt;
      </button>
    </div>
  );
}

function PageNumber({
  num,
  pageChange,
  active,
}: {
  num: number;
  pageChange: Function;
  active?: boolean;
}) {
  return (
    <button
      className={`mx-[2px] rounded-full border border-black px-2 py-1 ${active && `bg-black text-white`}`}
      onClick={() => pageChange(num)}
    >
      {num}
    </button>
  );
}
