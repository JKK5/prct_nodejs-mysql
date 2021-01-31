var db = require('./db');
var template = require('./template.js');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.home = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function (error, topics) {
    if (error) {
      throw error;
    }
    db.query(
      `SELECT topic. id, title, description, DATE_FORMAT(created, '%Y-%m-%d') AS created, name, profile FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE title LIKE ?`,
      [`%${queryData.keyword}%`],
      function (error2, search) {
        if (error2) {
          throw error2;
        }
        console.log(search);
        var title = 'Search result';
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          `${
            search[0] === undefined
              ? 'No search result.'
              : template.searchTable(search)
          }
          <style>
            table {
              border: 1px solid black;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 3px;
            }
          </style>
          `,
          ``
        );
        response.writeHead(200);
        response.end(html);
      }
    );
  });
};
