/* 
  if there is an error thrown in the DB, asyncMiddleware
  will pass it to next() and express will handle the error */
import raw from "../../middleware/route.async.wrapper.mjs";
import db from "../../db/mysql.connection.mjs";
// import user_model from "./user.model.mjs";
import express from "express";
import log from "@ajar/marker";

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW USER
router.post("/",raw(async (req, res) => {
    log.obj(req.body, "create a user, req.body:");
    const sql = `INSERT INTO users SET ?`;
    const [result] = await db.query(sql, req.body);
    const ok = {status:200,message:`User Created successfully`};
    const fail = {status:404,message:`Error in creating user `};
    const {status,message } = result.affectedRows ? ok : fail;
    res.status(status).json({message,result});
  })
);

// GET ALL USERS
router.get("/",raw(async (req, res) => {
    // const sql = `
    // SELECT first_name, last_name, email, phone
    // FROM users
    // ORDER BY last_name asc;`;
    const sql = `SELECT * FROM users`;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  })
);

router.get('/paginate/:page?/:items?', raw( async(req, res)=> {

  log.obj(req.params, "paginate, req.params:");
  let { page = 0 ,items = 10 } = req.params;

//   const users = await user_model.find()
//                 .select(`first_name last_name email phone`)
//                 .limit(parseInt(items))
//                 .skip(parseInt(page * items))

    const sql = `
      SELECT * FROM users 
      LIMIT ${parseInt(items)} 
      OFFSET ${parseInt(page * items)}`;
      
    const [rows] = await db.query(sql);
    res.status(200).json(rows);   

}))


// GETS A SINGLE USER
router.get("/:id",raw(async (req, res) => {
    const sql = `SELECT * FROM users WHERE id = '${req.params.id}'`;
    const [[user]] = await db.query(sql);
    if (!user) return res.status(404).json({ message: `No user found. with id of ${req.params.id}` });
    res.status(200).json(user);
  })
);
// UPDATES A SINGLE USER
router.put("/:id",raw(async (req, res) => { 
    const updates =  Object.entries(req.body).map(([key])=>`${key}=?`) 
    const sql = `UPDATE users SET ${updates} WHERE id='${req.params.id}'`;
    // log.yellow(sql);
    const [result] = await db.query(sql,Object.values(req.body));

    const ok = {status:200,message:`User ${req.params.id} updated successfully`};
    const fail = {status:404,message:`Error in updating user ${req.params.id}`};
    const {status,message} = result.affectedRows ? ok : fail;
    res.status(status).json({message});
  })
);

// const result = await db.query(
//   `UPDATE programming_languages 
//   SET first_name=?, last_name=?, email=?, phone=? 
//   WHERE id=?`, 
//   [ 
//     'Roger', 'Rabbit', 'roger@rabbit.io', '+972-54-4869-722',
//     'b8ba2a9c-9dc2-11eb-82c9-00e270875516'
//   ]
// );



// DELETES A USER
router.delete("/:id",raw(async (req, res) => {
    var sql = `DELETE FROM users WHERE id=?`;
    const [result] = await db.query(sql,[req.params.id]);
    const ok = {status:200,message:`User ${req.params.id} deleted successfully`};
    const fail = {status:404,message:`Error in deleting user ${req.params.id}`};
    const {status,message} = result.affectedRows ? ok : fail;
    res.status(status).json({message});
  })
);

export default router;
