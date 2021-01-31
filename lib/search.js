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
      `SELECT * FROM topic WHERE title LIKE?`,
      [`%${queryData.keyword}%`],
      function (error2, topic) {
        if (error2) {
          throw error2;
        }
        console.log(topic);
        var title = 'Search result';
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          // `<h2><a href="/?id=${topic[0].id}">${sanitizeHtml(
          //   title
          // )}</a></h2>${sanitizeHtml(description)}`,
          template.searchList(topic),
          ``
        );
        response.writeHead(200);
        response.end(html);
        // db.query(
        //   `SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=? AND title LIKE ?`,
        //   [topic[0].id, `%${queryData.keyword}%`],
        //   function (error3, search) {
        //     if (error3) {
        //       throw error3;
        //     }
        //     var title = topic[0].title;
        //     var description = topic[0].description;
        //     var list = template.list(topics);
        //     var html = template.HTML(
        //       title,
        //       list,
        //       `<h2><a href="/?id=${topic[0].id}">${sanitizeHtml(
        //         title
        //       )}</a></h2>${sanitizeHtml(description)}`,
        //       ``
        //     );
        //     response.writeHead(200);
        //     response.end(html);
        //   }
        // );
      }
    );
  });
};
