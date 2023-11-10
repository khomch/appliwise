import { load } from 'cheerio';
import fetch from 'node-fetch';

function removeQueryParameters(url: string) {
  const questionMarkIndex = url.indexOf('?');
  if (questionMarkIndex !== -1) {
    return url.substring(0, questionMarkIndex);
  }

  return url;
}

export const parseFromUrl = async (initialUrl: string) => {
  console.log('PARSING STARTED');
  const URL = removeQueryParameters(initialUrl);
  console.log('URL: ', URL);
  const res = await fetch(URL);
  const html = await res.text();

  const $ = load(html);

  const extractJobCriteria = (obj: Record<string, string | undefined>) => {
    $('.description__job-criteria-list').each((i, ul) => {
      const children = $(ul).children();
      children.each((i, li) => {
        const key = $(li)
          .children('h3')
          .text()
          .trim()
          .toLocaleLowerCase()
          .replace(/\s+/g, '_');
        const value = $(li).children('span').text().trim();
        obj[key] = value;
      });
    });
  };

  const resObj: Record<string, string | undefined> = {
    url: URL,
    img: $('.top-card-layout__card')
      .children('a')
      .children('img')
      .attr('data-delayed-url'),
    position: $('h1').first().text(),
    company: $('.topcard__org-name-link').first().text().trim(),
    title: $('title').first().text(),
    location: $('.topcard__flavor--bullet').first().text().trim(),
    description: $('.description__text')
      .first()
      .text()
      .replace(/\n+|Show more|Show less|/g, '')
      .trim(),
    status: 'backlog',
  };

  extractJobCriteria(resObj);
  return resObj;
};
