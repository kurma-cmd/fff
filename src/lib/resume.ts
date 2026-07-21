import { supabase } from './supabase';

const allowedExtensions = new Set(['pdf', 'doc', 'docx']);
const maxSize = 5 * 1024 * 1024;

export async function uploadResume(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!allowedExtensions.has(extension)) throw new Error('Выбери PDF, DOC или DOCX.');
  if (file.size > maxSize) throw new Error('Файл должен быть меньше 5 МБ.');

  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) throw new Error('Сначала войди в аккаунт.');
  const path = `${auth.user.id}/resume`;
  const { error } = await supabase.storage.from('resumes').upload(path, file, { upsert: true, contentType: file.type || undefined });
  if (error) throw new Error('Не удалось загрузить резюме. Попробуй ещё раз.');
  return { path, name: file.name };
}

export async function getResumeUrl(path: string) {
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60);
  if (error) throw new Error('Не удалось открыть резюме.');
  return data.signedUrl;
}
