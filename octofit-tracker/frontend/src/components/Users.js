import { useCallback, useEffect, useState } from 'react';
import { buildApiUrl, extractListItems } from './api';
import DataTableCard from './DataTableCard';

function Users() {
  const endpoint = buildApiUrl('users');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = useCallback(async (signal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      console.log('[Users] API endpoint:', endpoint);
      console.log('[Users] API response:', data);
      setItems(extractListItems(data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError('Failed to load users from backend API.');
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();

    loadUsers(controller.signal);
    return () => controller.abort();
  }, [loadUsers]);

  return (
    <DataTableCard
      title="Users"
      endpoint={endpoint}
      columns={['ID', 'Hero', 'Name', 'Email', 'Team']}
      items={items}
      loading={loading}
      error={error}
      onReload={() => loadUsers()}
      renderRow={(item) => ({
        key: item.id,
        cells: [item.id, item.hero_name, item.name, item.email, item.team],
      })}
    />
  );
}

export default Users;
