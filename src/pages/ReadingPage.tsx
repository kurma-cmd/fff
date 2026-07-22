import { useEffect, useState } from 'react';
import { readingTexts } from '../lib/readingTexts';
import { QadamSelect } from '../components/QadamSelect';

import { supabase } from '../lib/supabase';
import { completeReadingText } from '../lib/storyProgress';

type ReadingQuestion = { question: string; options: string[]; answer: string };
type LongRead = { title: string; level: string; paragraphs: string[]; questions: ReadingQuestion[] };
const topics = ['a surprising scientific discovery', 'a student who improved their city', 'the creation of a useful technology', 'an expedition that changed its plan', 'a small idea that became a social project', 'how a creative team made a film'];

function parseText(value: string): LongRead | undefined {
  try {
    const parsed: unknown = JSON.parse(value.replace(/^```json\s*|\s*```$/g, ''));
    if (!parsed || typeof parsed !== 'object') return;
    const item = parsed as Record<string, unknown>;
    if (typeof item.title !== 'string' || typeof item.level !== 'string' || !Array.isArray(item.paragraphs) || !Array.isArray(item.questions)) return;
    const questions = item.questions as ReadingQuestion[];
    if (item.paragraphs.length < 5 || questions.length !== 5 || questions.some(q => !q.question || q.options?.length < 3 || !q.options.includes(q.answer))) return;
    return { title: item.title, level: item.level, paragraphs: item.paragraphs as string[], questions };
  } catch { return; }
}

export function ReadingPage() {
  const [language, setLanguage] = useState('English');
  const [text, setText] = useState<LongRead>();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  async function generateText(selectedLanguage = language) {
    setBusy(true); setMessage(''); setAnswers({}); setSaved(false);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const prompt = `Create an engaging reading text in ${selectedLanguage} for a teenager at B1-B2 level about ${topic}. Write 850-1000 words divided into 7-9 substantial paragraphs; never return a shortened summary. Do not use Maya or a library. After it, create exactly 5 comprehension questions: main idea, important detail, cause and effect, word meaning from context, and conclusion. Each question needs 3 plausible options. Return only JSON: {"title":"...","level":"B1-B2 · 10-12 min","paragraphs":["..."],"questions":[{"question":"...","options":["...","...","..."],"answer":"exact option"}]}. Everything inside JSON must be in ${selectedLanguage}.`;
    const { data, error } = await supabase.functions.invoke('ai', { body: { prompt, system: 'You create accurate, age-appropriate educational reading materials. Return valid JSON only.' } });
    const generated = !error && typeof data?.text === 'string' ? parseText(data.text) : undefined;
    if (generated) setText(generated);
    else {
      const availableFallbacks = readingTexts.filter(item => item.language === selectedLanguage && item.title !== text?.title);
      const fallback = availableFallbacks[Math.floor(Math.random() * availableFallbacks.length)]
        ?? readingTexts.find(item => item.language === selectedLanguage)
        ?? readingTexts[0];
      setText({ title: fallback.title, level: fallback.level, paragraphs: fallback.paragraphs, questions: [{ question: fallback.question, options: fallback.options, answer: fallback.answer }] });
      setMessage('AI сейчас недоступен — показан другой текст из библиотеки.');
    }
    setBusy(false);
  }

  useEffect(() => { void generateText(language); }, [language]);
  const score = text?.questions.reduce((total, question, index) => total + Number(answers[index] === question.answer), 0) ?? 0;
  const finished = Boolean(text && Object.keys(answers).length === text.questions.length);

  async function chooseAnswer(index: number, option: string) {
    if (!text || answers[index]) return;
    const next = { ...answers, [index]: option };
    setAnswers(next);
    const allCorrect = text.questions.every((question, questionIndex) => next[questionIndex] === question.answer);
    if (allCorrect && await completeReadingText(text.title)) setSaved(true);
  }

  function retryMistakes() {
    if (!text) return;
    setAnswers(current => Object.fromEntries(Object.entries(current).filter(([index, value]) => text.questions[Number(index)]?.answer === value)));
  }

  return <div className="page-shell reading-page"><header className="page-hero"><p className="eyebrow">Чтение без спешки</p><h1>Большие тексты</h1><p>Каждый раз — новая тема и пять вопросов на настоящее понимание.</p></header>
    <section className="panel reading-language"><label><b>На каком языке хочешь прочитать?</b><QadamSelect value={language} onChange={setLanguage} options={readingTexts.map(item => ({ value: item.language, label: item.language }))} /></label><button className="primary" disabled={busy} onClick={() => void generateText()}>{busy ? 'Создаём текст…' : 'Другой текст ↻'}</button></section>
    {busy && !text ? <section className="panel reading-loading"><span>📖</span><h2>Готовим новую историю…</h2><p>Текст будет большим, поэтому потребуется несколько секунд.</p></section> : text && <><article className="panel long-read"><p className="eyebrow">{text.level}</p><h2>{text.title}</h2>{text.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</article>
    <section className="panel reading-test"><p className="eyebrow">Тест после чтения · {Object.keys(answers).length}/{text.questions.length}</p><h2>Проверь, что ты понял</h2>{text.questions.map((question, index) => <div className="reading-question" key={question.question}><h3>{index + 1}. {question.question}</h3><div className="answer-list">{question.options.map(option => <button className={answers[index] === option ? 'selected-answer' : ''} disabled={Boolean(answers[index])} key={option} onClick={() => void chooseAnswer(index, option)}>{option}</button>)}</div>{answers[index] && <p className={`answer-feedback ${answers[index] === question.answer ? 'correct' : 'wrong'}`}>{answers[index] === question.answer ? 'Верно!' : 'В этом ответе есть ошибка.'}</p>}</div>)}{finished && score < text.questions.length && <div className="reading-score reading-needs-work"><b>{score}/{text.questions.length}</b><span>Повтори только те вопросы, где были ошибки.</span><button className="primary" onClick={retryMistakes}>Работать над ошибками</button></div>}{saved && <div className="reading-score reading-saved"><b>✓</b><span>Текст прочитан и добавлен в таблицу раздела «Язык».</span></div>}</section></>}
    {message && <p className="word-feedback">{message}</p>}
  </div>;
}

