var PORT = process.env.PORT || 3000;
var db = require('./db.js')
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tasks', function(request, response) {
    db.tasks.findAll().then(function(items) {
        response.json(items);
    }, function(e) {
        console.log("ye get meh")
        response.status(500).send();
    });
});

app.post('/tasks', function(request, response) {

    var name = request.body.name;
    var owner = request.body.owner;
    var byDate = request.body.date;
    var status = true;

    if (owner == "")
        owner = 'self';

    if (byDate == "") {
        byDate = new Date;
        byDate = byDate.toJSON().slice(0, 10)
    }

    var body = {
        "name": name,
        "owner": owner,
        "byDate": byDate,
        "status": status
    }
    db.tasks.create(body).then(function(tasks) {
        response.redirect('/');
        console.log("redirected to root");
    }, function(e) {
        console.log(e);
    });


});

app.get('/destroy/:id', function(request, response) {
    var selectedid = request.params.id;
    console.log(selectedid);
    selectedid = parseInt(selectedid);

    console.log(selectedid);
    db.tasks.destroy({
        where: {
            id: selectedid
        }
    }).then(function() {
        response.redirect('/');
    }, function(e) {
        console.log(e);
    })
})

db.sequelize.sync({ force: false }).then(function() {

    app.listen(PORT, function() {

        console.log("listening at port" + PORT);

    });

});