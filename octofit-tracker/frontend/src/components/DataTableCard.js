import { useMemo, useState } from 'react';

function DataTableCard({ title, endpoint, columns, items, loading, error, onReload, renderRow }) {
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return items;
    }

    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(keyword));
  }, [items, query]);

  return (
    <article className="card shadow-sm border-0">
      <header className="card-header bg-white d-flex flex-wrap gap-3 justify-content-between align-items-center">
        <h2 className="h4 mb-0">{title}</h2>
        <a className="link-primary" href={endpoint} target="_blank" rel="noreferrer">
          Open API Endpoint
        </a>
      </header>

      <div className="card-body">
        <form className="row g-2 align-items-end mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-8">
            <label htmlFor={`${title}-search`} className="form-label">
              Search Data
            </label>
            <input
              id={`${title}-search`}
              className="form-control"
              type="text"
              placeholder="Type to filter rows"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-grid">
            <button type="button" className="btn btn-primary" onClick={onReload}>
              Reload Data
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info mb-0">Loading data from API...</div>}
        {error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">
                      {column}
                    </th>
                  ))}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center text-muted py-4">
                      No records found.
                    </td>
                  </tr>
                )}
                {filteredItems.map((item) => {
                  const row = renderRow(item);
                  return (
                    <tr key={row.key}>
                      {row.cells.map((cell, index) => (
                        <td key={`${row.key}-${index}`}>{cell}</td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedItem && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 className="h5 modal-title mb-0">{title} Detail</h3>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedItem(null)} />
                </div>
                <div className="modal-body">
                  <pre className="mb-0 bg-light border rounded p-3 small">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </article>
  );
}

export default DataTableCard;
