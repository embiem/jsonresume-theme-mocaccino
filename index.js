const fs = require('fs');
const handlebars = require('handlebars');
const handlebarsWax = require('handlebars-wax');
const moment = require('moment');
const marked = require('marked');

handlebars.registerHelper({
  removeProtocol: url => url.replace(/.*?:\/\//g, ''),
  concat: (...args) => args.filter(arg => typeof arg !== 'object').join(''),
  // Arguments: {address, city, subdivision, postalCode, countryCode}
  // formatAddress: (...args) => addressFormat(args).join(' '),
  formatAddress: (...args) => args.filter(arg => typeof arg !== 'object').join(' '),
  formatDate: date => {
    if (!date) return '';
    const momentDate = moment(date);

    // Check if the original date string contains only a year (4 digits)
    if (/^\d{4}$/.test(date)) {
      return momentDate.format('YYYY');
    }

    // Check if the original date string is year-month format (YYYY-MM)
    if (/^\d{4}-\d{2}$/.test(date)) {
      return momentDate.format('MM/YYYY');
    }

    // For full dates or other formats, default to MM/YYYY
    return momentDate.format('MM/YYYY');
  },
  lowercase: s => s.toLowerCase(),
  eq: (a, b) => a === b,
  markdown: text => (text ? new handlebars.SafeString(marked.parse(text)) : ''),
});

function render(resume) {
  const dir = `${__dirname}/src`;
  const css = fs.readFileSync(`${dir}/style.css`, 'utf-8');
  const resumeTemplate = fs.readFileSync(`${dir}/resume.hbs`, 'utf-8');

  const Handlebars = handlebarsWax(handlebars);

  Handlebars.partials(`${dir}/partials/**/*.{hbs,js}`);

  return Handlebars.compile(resumeTemplate)({
    style: `<style>${css}</style>`,
    resume,
  });
}

module.exports = {
  render,
};
