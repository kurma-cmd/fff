import { supabase } from './supabase';

export function subscribeToDataChanges(onChange: (table: string) => void) {
  const channel = supabase
    .channel('qadam-data-sync')
    .on('postgres_changes', { event: '*', schema: 'public' }, payload => onChange(payload.table))
    .subscribe();

  return () => { void supabase.removeChannel(channel); };
}
