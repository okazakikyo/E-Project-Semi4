import db from '../config/database.js'

export const getUser = (result) => {
    db.query('SELECT * FROM User;', (err, res) => {
        if(err) {
            console.log(err);
            result(err, null)
            return;
        } else {
            result(null, res);
        }
    })
};

export const getUserById = (id, result) => {
    db.query(
            'select * from User where ID = ?',
             [id],
             (err, res) => {
                if(err) {
                    console.log(err);
                    result(err, null)
                } else {
                    result(null, res[0])
                }
             }
            )
}

export const insertUser = (data, result) => {
    db.query('insert into User set',[data],(err,res) => {
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, { res, ...data })
        }
    })
}

export const updateUserById = (data, id, result) => {
    db.query('update User set UserName = ?, Password = ?, StaffID = ?, CreateAt = ? WHERE ID = ?', [data, id], (err, res) => {
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, data)
        }
    })
}

export const deleteUserById = (id, result) => {
    db.query('delete from User where ID = ?', id, (err, res) => {
        if(err) {
            result(null, err)
            return
        }
        if(res.affectedRows == 0) {
            result({ data: 'not_found' }, null)
        }
        return result(null, res);
    })
}

export const checkLogin = (data, result) => {
    db.query('select * from User where UserName like ? AND Password like ?', [data.UserName, data.Password], (err, res) => {
        if(err) {
            result(null, err)
            return
        } else {
            result(null, res)
        }
    })
}