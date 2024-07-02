import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";

import { useEffect, useState } from "react";

export default function Paginate({
  noOfMovies,
  searchParams,
  params,
}: {
  noOfMovies?: number;
  searchParams: ReadonlyURLSearchParams;
  params: URLSearchParams;
}) {
  const pathName = usePathname();
  const router = useRouter();

  const noOfPages = noOfMovies ? Math.ceil(noOfMovies / 20) : 1;
  const [activePage, setActivePage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    params.set("page", `${activePage}`);
    router.push(`${pathName}?${params.toString()}`);
  }, [activePage, params, pathName, router]);

  if (noOfPages < 2) return <p>Showing all movies</p>;

  return (
    <div className="my-2">
      <span
        className="mx-[2px] font-semibold"
        onClick={() => {
          if (activePage > 1) setActivePage((p) => p - 1);
        }}
      >
        &lt;
      </span>
      {activePage > 2 && <PageNumber num={1} setActivePage={setActivePage} />}
      {activePage - 2 >= 1 && <span>.....</span>}
      {activePage > 1 && (
        <PageNumber num={activePage - 1} setActivePage={setActivePage} />
      )}
      <PageNumber
        num={activePage}
        setActivePage={setActivePage}
        active={true}
      />
      {activePage < noOfPages && (
        <PageNumber num={activePage + 1} setActivePage={setActivePage} />
      )}

      {activePage + 2 <= noOfPages && <span>.....</span>}
      {activePage < noOfPages - 2 && (
        <PageNumber num={noOfPages} setActivePage={setActivePage} />
      )}
      <span
        className="mx-[2px] font-semibold"
        onClick={() => {
          if (activePage < noOfPages) setActivePage((p) => p + 1);
        }}
      >
        &gt;
      </span>
    </div>
  );
}

function PageNumber({
  num,
  setActivePage,
  active,
}: {
  num: number;
  setActivePage: Function;
  active?: boolean;
}) {
  return (
    <span
      className={`mx-[2px] rounded-full border border-black px-2 py-1 ${active && `bg-black text-white`}`}
      onClick={() => setActivePage(num)}
    >
      {num}
    </span>
  );
}
