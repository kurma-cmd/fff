import type { LessonExercise } from './languageLessons';
import { supabase } from './supabase';

export async function recordExerciseAttempt(courseId: string, exercise: LessonExercise, chosen: string) {
  await supabase.from('exercise_attempts').insert({ course_id: courseId, skill: exercise.type, instruction: exercise.instruction, phrase: exercise.phrase, options: exercise.options, chosen_answer: chosen, correct_answer: exercise.answer, is_correct: chosen === exercise.answer, resolved: chosen === exercise.answer });
}
