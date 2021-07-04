// route /list
export default (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  const content = [
    '<div style="width: 320px; margin: 0 auto;">',
    '<span class="title">Methods:</span>',
    "<br />",
    '<a target="_blank" style="text-decoration: none; color: black;" href="http://localhost:3000/api/items?q=televisao">',
    '<span style="color: #FFE600;">Search</span> - clique para visualizar um modelo do m&eacute;todo sendo executado',
    "</a>",
    "<br />",
    '<a target="_blank" style="text-decoration: none; color: black;" href="http://localhost:3000/api/items/MLA886584276">',
    '<span style="color: #FFE600;">Detail Product</span> - clique para visualizar um motodo do m&eacute;todo sendo executado',
    "</a>",
    "</div>",
    "<style>",
    "a, .title { margin: 2px 0; display: block; }",
    "</style>",
  ];
  res.write(content.join(""));
  res.end();
};
