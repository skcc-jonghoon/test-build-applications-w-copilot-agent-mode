import { useCallback, useEffect, useState } from 'react';
import { buildApiUrl, extractListItems } from './api';
import DataTableCard from './DataTableCard';

function Leaderboard() {
  const endpoint = buildApiUrl('leaderboard');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadLeaderboard = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log('[Leaderboard] API endpoint:', endpoint);
      console.log('[Leaderboard] API response:', data);
      setItems(extractListItems(data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to load leaderboard from backend API.');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    loadLeaderboard(controller.signal);
    return () => controller.abort();
  }, [loadLeaderboard]);

  return (
    <DataTableCard
      title="Leaderboard"
      endpoint={endpoint}
      columns={['ID', 'User Email', 'Points', 'Rank']}
      items={items}
      loading={loading}
      error={error}
      onReload={() => loadLeaderboard()}
      renderRow={(item) => ({
        key: item.id,
        cells: [item.id, item.user_email, item.points, item.rank],
      })}
    />
  );
}

export default Leaderboard;
