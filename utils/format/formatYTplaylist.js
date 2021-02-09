const formatName = require('./formatName');

const formatYTplaylist = (data) => {
  const items = data.items.map((i) => {
    const { title } = i.snippet;
    // const { videoId } = resourceId;
    const endIdx = title.indexOf('-');
    const artist = title.substring(0, endIdx).trim();

    return artist;
  });


  const toSplit = [];
  const single = [];

  items.forEach((i) => {
    if (i.indexOf('ft.') !== -1 || i.indexOf(',') !== -1 || i.indexOf('&') !== -1) {
      toSplit.push(i);
    } else {
      single.push(formatName(i));
    }
  });


  const splitData = toSplit.map((i) => {
    if (i.indexOf('ft.') !== -1) return i.split('ft.');
    if (i.indexOf(',') !== -1) return i.split(',');
    if (i.indexOf('&') !== -1) return i.split('&');

    return '';
  });

  const flattened = [].concat(...splitData);

  const formatFlatted = flattened.map(i => formatName(i));

  const merged = [...single, ...formatFlatted];

  const dataSet = new Set(merged);

  const final = [...dataSet];

  return final;
};

module.exports = formatYTplaylist;
