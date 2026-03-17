import { useCallback, useEffect, useState } from 'react';
import { buildApiUrl, extractListItems } from './api';
import DataTableCard from './DataTableCard';

function Teams() {
  const endpoint = buildApiUrl('teams');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTeams = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log('[Teams] API endpoint:', endpoint);
      console.log('[Teams] API response:', data);
      setItems(extractListItems(data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to load teams from backend API.');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    loadTeams(controller.signal);
    return () => controller.abort();
  }, [loadTeams]);

  return (
    <DataTableCard
      title="Teams"
      endpoint={endpoint}
      columns={['ID', 'Team Name', 'City']}
      items={items}
      loading={loading}
      error={error}
      onReload={() => loadTeams()}
      renderRow={(item) => ({
        key: item.id,
        cells: [item.id, item.name, item.city],
      })}
    />
  );
}

export default Teams;
