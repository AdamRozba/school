const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");

const taskSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    desc: { type: "string" },
    status: { type: "string" },
    group: { type: "string" },
   },
  required: ["id","date","name","decsription","status","group"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let task = req.body;

    // validate input
    const valid = ajv.validate(taskSchema, task);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedTask = taskDao.update(task);
    if (!updatedTask) {
      res.status(404).json({
        code: "taskNotFound",
        message: `Task ${task.id} not found`,
      });
      return;
    }

    res.json(updatedTask);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
