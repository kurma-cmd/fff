import { supabase } from './supabase';

export type CompletedStory = {
  story_name: string;
  completed_at: string;
  content_type: 'story' | 'text';
};

export async function loadCompletedStories() {
  const { data } = await supabase.from('story_progress').select('story_name');
  return new Set((data ?? []).map(item => item.story_name));
}

export async function loadStoryProgress() {
  const { data } = await supabase
    .from('story_progress')
    .select('story_name,completed_at,content_type')
    .order('completed_at', { ascending: false });
  return (data ?? []) as CompletedStory[];
}

export async function completeStory(storyName: string) {
  const { error } = await supabase
    .from('story_progress')
    .upsert({ story_name: storyName }, { onConflict: 'user_id,story_name' });
  return !error;
}

export async function completeReadingText(title: string) {
  const { error } = await supabase
    .from('story_progress')
    .upsert({ story_name: title, content_type: 'text' }, { onConflict: 'user_id,story_name' });
  return !error;
}
