var sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <form action="/search" method="get">
        <p>
          <input type="text" name="keyword" placeholder="Search title you want">
          <input type="submit" value="search">
        </p>
      </form>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list: function (topics) {
    var list = '<ul>';
    var i = 0;
    while (i < topics.length) {
      list =
        list +
        `<li><a href="/?id=${topics[i].id}">${sanitizeHtml(
          topics[i].title
        )}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  },
  authorSelect: function (authors, author_id) {
    var tag = '';
    var i = 0;
    while (i < authors.length) {
      var selected = '';
      if (authors[i].id === author_id) {
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${sanitizeHtml(
        authors[i].name
      )}</option>`;
      i++;
    }
    return `
    <select name="author">
      ${tag}
    </select>`;
  },
  authorTable: function (authors) {
    var tag = `
    <table>
      <caption>List of Authors</caption>
      <thead>
        <tr>
          <th>name</th>
          <th>profile</th>
          <th colspan="2">update/delete</th>
        </tr>
      </thead>
      <tbody>
    `;
    var i = 0;
    while (i < authors.length) {
      tag += `
      <tr>
        <td>${sanitizeHtml(authors[i].name)}</td>
        <td>${sanitizeHtml(authors[i].profile)}</td>
        <td><a href="/author/update?id=${authors[i].id}">update</a></td>
        <td>
        <form action="/author/delete_process" method="post">
          <input type="hidden" name="id" value="${authors[i].id}">
          <input type="submit" value="delete">
        </form>
        </td>
      </tr>
      `;
      i++;
    }
    tag += '</tbody></table>';
    return tag;
  },
  searchTable: function (search) {
    var table = `
    <table>
      <caption>Search Result</caption>
      <thead>
        <tr>
          <th>no.</th>
          <th>title</th>
          <th>text</th>
          <th>user</th>
          <th>created</th>
        </tr>
      </thead>
      <tbody>
      `;
    var i = 0;
    while (i < search.length) {
      table += `
      <tr>
        <td>${search[i].id}</td>
        <td><a href="/?id=${search[i].id}">${search[i].title}</a></td>
        <td>${search[i].description}</td>
        <td>${search[i].name}</td>
        <td>${search[i].created}</td>
      </tr>
      `;
      i++;
    }
    table += '</tbody></table>';
    return table;
  },
};
