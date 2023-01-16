/*Na aula 268, no último marcador, há um resumo de como o código funciona. Mas,
a lógica geral de construção do site foi: criar primeiro a parte funcional no
app.js, onde ficou toda a lógica de criação de rotas e inicialização de variáveis,
depois criou a estrutura html mas no list.ejs, com alguma lógica lá também e, por
fim, importou um css e foi adaptando o ejs ao css.*/

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let items = ["Buy","Find","Sit"];
let workItems = [];

/*essa linha de código abaixo diz ao app que é gerado usando express, para usar EJS
como seu engenheiro de visualizaçã (view engine), ela tem que ser declarada após
o express. No curso se usou app.use, mas na documentação está app.set. */
app.set("view engine", "ejs");
/**o bodyParser é acima chamado e aqui iniciado, pois ele que vai lidar
com o html de alguma requisição  */
app.use(bodyParser.urlencoded({extended: true}));
/*para que o ejs leia o arquivo css, é preciso que ele esteja dentro
de uma pasta public, além do link href na pasta ejs*/
app.use(express.static("public"));

app.get("/", function(req, res){
  var today = new Date();
  var currentDay = today.getDay();
  //var day = "";
/*aqui o código vai verificar o dia da semana e mudar a mensagem de acordo,
atentar para o write que permite escrever várias mensagens e mandar de uma só
vez pelo send,(o código depois foi substituido pelo de baixo) mas que depois foi
substituido pelo sendFile, que manda todo o html*/
  // if (currentDay === 6 || currentDay === 0 ){
  //   day = "Weekend";
  // } else{
  //   day = "Weekday";
  // }
/*o código abaixo usa o método para ler e exibir a data atual no formato desejado*/
  var day = today.toLocaleDateString("en-US", options);
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

/*atentar para código abaixo que vai renderizar uma página como resposta,
no caso, a página list, passar a variável aqui declarada day, com a variável
lá declarada kindOfDay, também foi declarada a variável newListItem depois
se for criada uma nova rota de render, vai dar erro, por isso, abaixo,
o código de redirect*/
  res.render("list", {listTitle: day, newListItems: items});

});
/*o código abaixo vai vasculhar o body, pegar a informação que tiver no campo
newItem que é um input, salvá-la na variável item e vai redirecionar de volta
para a home route quando o botão for pressionado. A variável item foi iniciada
no começo do código para não gerar problema de escopo, depois o código foi
aumentado para comportar o desvio para a rota work, a lógica
abaixo foi construída usando o console log para saber para onde ia a informação
criada pelo usuário quando clicava no botão submit já dentro da rota work,
assim, se modificou a informação do botão dentro do ejs para
<button type="submit" name="list" value=<%= listTitle %>>+</button>
ou seja, o value ficou dinâmico e se relaciona com o título do <h1> que por sua
vez se relaciona com o app.get abaixo, ou seja, resumindo, o código aproveitou
uma informação que diferenciava as duas rotas para direcionar a informação para
a lista correta
*/
app.post("/", function(req, res){

  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }


});
/*aqui foi criada uma nova rota que vai aproveitar a template para criar uma
nova todo list, os parâmetros são um novo array*/
app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems} )
} );
app.post("/work", function(req, res){

  workItems.push(item);
  res.redirect("/work");
} )

app.listen(3000, function(){
  console.log("server started on port 3000")
})
