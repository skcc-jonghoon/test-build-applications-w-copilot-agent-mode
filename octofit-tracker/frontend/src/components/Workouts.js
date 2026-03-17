import { useCallback, useEffect, useState } from 'react';
import { buildApiUrl, extractListItems } from './api';
import DataTableCard from './DataTableCard';

function Workouts() {
  const endpoint = buildApiUrl('workouts');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWorkouts = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log('[Workouts] API endpoint:', endpoint);
      console.log('[Workouts] API response:', data);
      setItems(extractListItems(data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to load workouts from backend API.');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    loadWorkouts(controller.signal);
    return () => controller.abort();
  }, [loadWorkouts]);

  return (
    <DataTableCard
      title="Workouts"
      endpoint={endpoint}
      columns={['ID', 'User Email', 'Title', 'Target', 'Intensity']}
      items={items}
      loading={loading}
      error={error}
      onReload={() => loadWorkouts()}
      renderRow={(item) => ({
        key: item.id,
        cells: [item.id, item.user_email, item.title, item.target, item.intensity],
      })}
    />
  );
}

export default Workouts;
