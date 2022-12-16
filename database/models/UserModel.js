import db from '../config/database.js'

export const getUser = (result) => {
    db.query('SELECT * FROM traineedb.User;', (err) => {
        if(err) {
            console.log(err);
            result(err, null)
        } else {
            result(null, result);
        }
    })
};

export const getUserById = (id, result) => {
    db.query(
            'select * from User where ID = ?',
             [id],
             (err, result) => {
                if(err) {
                    console.log(err);
                    result(err, null)
                } else {
                    result(null, result[0])
                }
             }
            )
}

export const insertUser = (data, result) => {
    db.query('insert into User set',[data],(err,result) => {
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, result)
        }
    })
}

export const updateUserById = (data, id, result) => {
    db.query('update User set UserName = ?, Password = ?, StaffID = ?, CreateAt = ?,   WHERE ID = ?', [data, id], (err, result) => {
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, result)
        }
    })
}