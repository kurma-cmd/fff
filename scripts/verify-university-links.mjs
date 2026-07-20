import { readFile, readdir } from 'node:fs/promises';

const files = (await readdir('src/lib')).filter(name => name.startsWith('catalog') && name.endsWith('.ts'));
const sources = await Promise.all(files.map(name => readFile(`src/lib/${name}`, 'utf8')));
const urls = [...new Set(sources.flatMap(source => source.match(/https:\/\/[^'"\s)]+/g) ?? []))];
const failures = [];
const concurrency = 40;

async function verifyUrl(url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(6_000) });
    if (response.status >= 400 && response.status !== 403 && response.status !== 405) failures.push(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error instanceof Error ? error.message : 'Request failed'} ${url}`);
  }
}

for (let index = 0; index < urls.length; index += concurrency) {
  await Promise.all(urls.slice(index, index + concurrency).map(verifyUrl));
}

console.log(`Checked ${urls.length} official university links.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
