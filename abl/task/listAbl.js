const taskDao = require("../../dao/task-dao.js");

async function ListAbl(req, res) {
  try {
    const taskList = taskDao.list();
    res.json(taskList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
