const {
  MODIFICATION_DATE_OFFSET,
} = require('./constants');

const checkModDate = (modifed) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const todayTime = new Date().getTime();
  const modifedTime = new Date(modifed).getTime();

  const diffMs = todayTime - modifedTime;
  const diffDays = diffMs / oneDay;

  return diffDays > MODIFICATION_DATE_OFFSET;
};

module.exports = checkModDate;
