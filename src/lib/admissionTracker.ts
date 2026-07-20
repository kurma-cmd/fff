import { supabase } from './supabase';

export type ApplicationStatus = 'researching' | 'documents' | 'ready' | 'submitted' | 'accepted' | 'declined';
export type TrackedUniversity = { university_name: string; status: ApplicationStatus; deadline: string | null; intended_program: string | null };
export type DeadlineType = 'exam' | 'document' | 'scholarship' | 'other';
export type Deadline = { id: string; title: string; event_type: DeadlineType; due_date: string; completed: boolean };

export async function loadTrackedUniversities() {
  const { data } = await supabase.from('saved_universities').select('university_name,status,deadline,intended_program').order('saved_at');
  return (data ?? []) as TrackedUniversity[];
}

export async function updateTrackedUniversity(name: string, values: Partial<Pick<TrackedUniversity, 'status' | 'deadline' | 'intended_program'>>) {
  return !(await supabase.from('saved_universities').update(values).eq('university_name', name)).error;
}

export async function loadDeadlines() {
  const { data } = await supabase.from('admission_deadlines').select('id,title,event_type,due_date,completed').order('due_date');
  return (data ?? []) as Deadline[];
}

export async function addDeadline(title: string, eventType: DeadlineType, dueDate: string) {
  const { data, error } = await supabase.from('admission_deadlines').insert({ title, event_type: eventType, due_date: dueDate }).select('id,title,event_type,due_date,completed').single();
  return error ? undefined : data as Deadline;
}

export async function toggleDeadline(id: string, completed: boolean) {
  return !(await supabase.from('admission_deadlines').update({ completed }).eq('id', id)).error;
}

export async function deleteDeadline(id: string) {
  return !(await supabase.from('admission_deadlines').delete().eq('id', id)).error;
}
