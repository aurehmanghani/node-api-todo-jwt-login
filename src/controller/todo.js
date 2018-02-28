import mongoose from 'mongoose';
import { Router } from 'express';
import Todo from '../model/todo';
import bodyParser from 'body-parser';

export default ({ config, db}) => {

    let api = Router();

    /**
     *  Save Todo   // v1/todo/add
     */
    api.post('/add',(req, res) => {

        let todo = new Todo();
        todo.todo = req.body.todo;
        todo.save(err => {
            if(err){
                res.send(err);
            }
            res.json({ message : 'Save Successfully' });
        });

    });

    /**
     *  Get All Todo    // v1/todo/
     */
    api.get('/',(req, res) => {
        Todo.find({},(err, todos) => {

            if(err){
                res.send(err);
            }
            res.json(todos);
        })
    });
    /**
     * Find By ID // v1/todo/id
     */
    api.get('/:id', (req,res) => {
        Todo.findById(req.params.id,(err,todo) =>{
            if(err){
                res.send(err);
            }
            res.json(todo);
        })
    });

    /**
     *  Delete Todo
     */
    api.delete('/:id',( req, res ) => {
        //console.log('delete fire !');
        Todo.remove({_id : req.params.id} , ( err, todo ) => {
            if(err){
                res.send(err);
            }
            res.json({ message: "Todo Delete Successfully ! " });
        });
    });

    api.put('/:id', (req,res) => {
        Todo.findById(req.params.id, ( err, todo ) => {
            if(err){
                res.send(err);
            }
            todo.todo = req.body.todo;
            todo.save(function(){
                if(err){
                    res.send(err)
                }
                res.json({ message: "Updated !"});
            })
        });
    });



    /*  // '/v1/foodtruck/:id' - PUT - update an existing record
    api.put('/:id', (req, res) => {
        FoodTruck.findById(req.params.id, (err, foodtruck) => {
            if (err) {
            res.send(err);
            }
            foodtruck.name = req.body.name;
            foodtruck.foodtype = req.body.foodtype;
            foodtruck.avgcost = req.body.avgcost;
            foodtruck.geometry.coordinates = req.body.geometry.coordinates;
            foodtruck.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Food Truck info updated' });
            });
        });
    });*/

    return api;
}