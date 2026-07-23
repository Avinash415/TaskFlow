import Loader from "../../Loader/Loader";
import EmptyState from "../../EmptyState/EmptyState";

const DataTable = ({
  columns,
  data,
  loading,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No Data Found"
        description="There is nothing to display."
      />
    );
  }

  return (
    <>
      {/* ================= Desktop Table ================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
                  >
                    {column.title}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {data.map((row) => (

                <tr
                  key={row.id}
                  className="border-t transition hover:bg-slate-50"
                >

                  {columns.map((column) => (

                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-slate-700"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= Mobile Cards ================= */}

      <div className="space-y-4 lg:hidden">

        {data.map((row) => (

          <div
            key={row.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >

            {columns.map((column) => (

              <div
                key={column.key}
                className="flex items-start justify-between py-2"
              >

                <span className="mr-4 text-sm font-semibold text-slate-500">
                  {column.title}
                </span>

                <div className="text-right">
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </div>

              </div>

            ))}

          </div>

        ))}

      </div>
    </>
  );
};

export default DataTable;