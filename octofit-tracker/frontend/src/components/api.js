function normalizeHost(hostname) {
  if (!hostname) {
    return '';
  }

  return hostname.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function getCodespaceApiBase() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  if (typeof window !== 'undefined') {
    const host = normalizeHost(window.location.hostname || '');
    const match = host.match(/^(.*)-3000\.app\.github\.dev$/);
    if (match && match[1]) {
      return `https://${match[1]}-8000.app.github.dev`;
    }
  }

  return '';
}

export function getApiBase() {
  const envBase = process.env.REACT_APP_API_BASE;
  if (envBase) {
    return envBase.replace(/\/$/, '');
  }

  const codespaceBase = getCodespaceApiBase();
  if (codespaceBase) {
    return codespaceBase;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(component) {
  return `${getApiBase()}/api/${component}/`;
}

export function extractListItems(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  return [];
}
