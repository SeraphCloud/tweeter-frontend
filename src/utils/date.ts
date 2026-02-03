/**
 * Formata uma data ISO para tempo relativo em português
 * Ex: "agora", "5 min", "2 h", "3 d"
 */
export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffSecs < 60) {
    return 'agora';
  }

  if (diffMins < 60) {
    return `${diffMins} min`;
  }

  if (diffHours < 24) {
    return `${diffHours} h`;
  }

  if (diffDays < 30) {
    return `${diffDays} d`;
  }

  // Para datas mais antigas, retorna formato de data
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
}
