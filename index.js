// console.log(123) to make sure setup worked
const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {

  const browser = await puppeteer.launch( {headless: true} );
  const page = await browser.newPage();
  await page.goto('https://www.traversymedia.com');
  // await page.goto('https://tlchesnutaz.github.io/portfolio/')

  // await page.screenshot({ path:example.png, fullPage: true })
  // await page.pdf({ path: 'example.pdf', format: 'A4' });
  
  // const html = await page.content()
  // console.log(html)
  // const title = await page.evaluate(() => document.title)
  // console.log(title)


  // const text = await page.evaluate(() => document.body.innerText);
  // await page.pdf({ path: 'output.pdf', format: 'A4', margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }, content: text });
  
  // for links we will be getting multiple elements so use querySelectorAll
  // this gives us a node list so then Array.from to create the array form that list of iterable objects from 'a' tags
  // Array.from takes second function - pass in argumetn/variable that represents the element and for each one we want the href/url
  // const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
  // console.log(links);

  // to get courses will need to go to website and look at the structure to see where the info is ou are wanting so you know what to query for
  // in this case it's the section/div courses, and card, footer, etc so need to return object (courses)
  // e = .card - don't forget . before card bc it is a class - review material!

  // const courses = await page.evaluate(() => 
  //   Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
  //   title: e.querySelector('.card-body h3').innerText, 
  //   level: e.querySelector('.card-body .level').innerText,
  //   url: e.querySelector('.card-footer a').href,
  //   promo: e.querySelector('.card-footer .promo-code .promo'),
  //   }))
  // );

  // can do this without Array.from using .map
  const courses = await page.$$eval('#cscourses .card', (elements) => elements.map(e => ({
    title: e.querySelector('.card-body h3').innerText, 
    level: e.querySelector('.card-body .level').innerText,
    url: e.querySelector('.card-footer a').href
    }))
  );

  console.log(courses);

  // save data to JSON file, require fs at top and set following options
  //  null and 4 set it so it's not all on one line
  fs.writeFile('courses.json', JSON.stringify(courses, null, 4), (err) => {
    if (err) throw err;
    console.log('File saved');
    })
  
  await browser.close();
}

run();
