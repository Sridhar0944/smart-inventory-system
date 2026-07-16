const db = require("../config/db")

const getAllCategories = (callback) =>{
    db.query(
    "SELECT * FROM categories ORDER BY id DESC",
    callback
)};

const getCategoryById = (id,callback) => {
    db.query("SELECT * FROM categories WHERE id=?",[id],callback)
}

const addCategory = (category , callback) => {
    const { category_name , description } = category

    const sql = `
        INSERT INTO categories ( category_name , description ) VALUES (?,?)
    `
    db.query(sql,[category_name,description],callback)
}

const updateCategory = (id,category,callback) => {
    const { category_name , description } = category

    const sql = `
        UPDATE categories 
        SET category_name=?,description=? WHERE id=?
    `
    db.query(sql,[category_name,description,id],callback)
}

const deleteCategory = (id, callback) => {
    db.query(
        "DELETE FROM categories WHERE id = ?",
        [id],
        callback
    );
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
};