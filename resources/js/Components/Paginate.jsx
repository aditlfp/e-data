import { Link } from "@inertiajs/react";

const Paginate = ({ meta }) => {
  const prev = meta.links[0].url;
  const next = meta.links[meta.links.length - 1].url;
  const current = meta.current_page;

  return (
    <div className="join shadow-md">
      {prev && (
        <Link
          href={prev}
          className="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        >
          «
        </Link>
      )}
      <button
        disabled
        className="join-item btn btn-sm disabled:bg-orange-300 disabled:text-white rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
      >
        {current}
      </button>
      {next && (
        <Link
          href={next}
          className="join-item btn btn-sm rounded-sm bg-orange-600 hover:bg-orange-800 text-white"
        >
          »
        </Link>
      )}
    </div>
  );
};

export default Paginate;
