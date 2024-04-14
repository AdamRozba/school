const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const taskDao = require("../../dao/task-dao.js");

const taskSchema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    desc: { type: "string" },
    status: { type: "string" },
    group: { type: "string" },
  },
  required: ["date", "name","status"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    task = taskDao.create(task);
    res.json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
