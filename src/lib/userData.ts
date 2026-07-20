import type { StudentProfile } from '../App';
import { supabase } from './supabase';

const isProfile = (value: unknown): value is StudentProfile => Boolean(value && typeof value === 'object' && 'nickname' in value && 'countries' in value);

export async function loadProfile() { const { data } = await supabase.from('student_profiles').select('profile').maybeSingle(); return isProfile(data?.profile) ? data.profile : null; }
export async function saveProfile(profile: StudentProfile) { const { data: auth } = await supabase.auth.getUser(); if (!auth.user) return false; const { error } = await supabase.from('student_profiles').upsert({ user_id: auth.user.id, profile, updated_at: new Date().toISOString() }); return !error; }
export async function loadStats() { const { data } = await supabase.from('learning_stats').select('xp').maybeSingle(); return data?.xp ?? 0; }
export async function addXp(amount: number) { const { data: auth } = await supabase.auth.getUser(); if (!auth.user) return 0; const current = await loadStats(); const xp = current + amount; await supabase.from('learning_stats').upsert({ user_id: auth.user.id, xp, updated_at: new Date().toISOString() }); return xp; }
export async function loadSavedUniversities() { const { data } = await supabase.from('saved_universities').select('university_name'); return new Set((data ?? []).map(item => item.university_name)); }
export async function setUniversitySaved(name: string, saved: boolean) { if (saved) return !(await supabase.from('saved_universities').insert({ university_name: name })).error; return !(await supabase.from('saved_universities').delete().eq('university_name', name)).error; }
export async function loadLanguageLevels() { const { data } = await supabase.from('language_levels').select('course_id,level'); return Object.fromEntries((data ?? []).map(item => [item.course_id, item.level])); }
export async function saveLanguageLevel(courseId: string, level: string) { const { data: auth } = await supabase.auth.getUser(); if (!auth.user) return false; return !(await supabase.from('language_levels').upsert({ user_id: auth.user.id, course_id: courseId, level, updated_at: new Date().toISOString() })).error; }
export async function resetLanguageLevel(courseId: string) { const { data: auth } = await supabase.auth.getUser(); if (!auth.user) return false; return !(await supabase.from('language_levels').delete().eq('user_id', auth.user.id).eq('course_id', courseId)).error; }
