import { useCallback, useEffect, useState } from 'react';
import { buildApiUrl, extractListItems } from './api';
import DataTableCard from './DataTableCard';

function Activities() {
  const endpoint = buildApiUrl('activities');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadActivities = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log('[Activities] API endpoint:', endpoint);
      console.log('[Activities] API response:', data);
      setItems(extractListItems(data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to load activities from backend API.');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    loadActivities(controller.signal);
    return () => controller.abort();
  }, [loadActivities]);

  return (
    <DataTableCard
      title="Activities"
      endpoint={endpoint}
      columns={['ID', 'User Email', 'Type', 'Minutes', 'Calories']}
      items={items}
      loading={loading}
      error={error}
      onReload={() => loadActivities()}
      renderRow={(item) => ({
        key: item.id,
        cells: [item.id, item.user_email, item.activity_type, item.duration_minutes, item.calories_burned],
      })}
    />
  );
}

export default Activities;
