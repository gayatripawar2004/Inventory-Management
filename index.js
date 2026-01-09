var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql2");

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "a2z50",
    port: "3307"
});

var app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.render("Home.ejs")
})

app.get("/add_item",function(req,res){
        res.render("Add_item.ejs")
})

app.post("/save",function(req,res){
    var d = req.body;
      var sql = `INSERT INTO 
    inventory_management1(item_name,item_code,quantity,price,expiry_date)
     VALUES
    ('${d.item_name}','${d.item_code}','${d.quantity}','${d.price}','${d.expiry_date}')`
    
     conn.query(sql,function(err,data){
        // res.send(data)
        res.redirect("/add_item")
})
})

app.get("/Item_list",function(req,res) {
    var sql = `SELECT * FROM inventory_management1 `
    conn.query(sql,function(err,data){
        var obj = {"list":data}
        res.render("inventory_list.ejs",obj)
        // res.send(data)
    })
})

app.get("/delete/:id",function(req,res){
    id = req.params.id;
    var sql = `DELETE FROM inventory_management1 WHERE item_id = '${id}'`
    conn.query(sql,function(err,data){
        
        res.redirect("/Item_list")
    })
})
app.get("/update/:id",function(req,res){
    id = req.params.id;
    var sql = `SELECT * FROM inventory_management1 WHERE item_id = '${id}'`
    conn.query(sql,function(err,data){
        var obj = {"item":data}
        res.render("Edit_Item.ejs",obj)
    })
})

app.post("/update_item",function(req,res){
    var d = req.body;
    var sql = `UPDATE inventory_management1 SET
    item_name = '${d.item_name}',
    item_code = '${d.item_code}',
    quantity = '${d.quantity}',
    price = '${d.price}',
    expiry_date = '${d.expiry_date}'
     WHERE item_id = '${d.item_id}'` 
     conn.query(sql,function(err,data){
        
    res.redirect("/Item_list")
})
})

app.listen(1000);