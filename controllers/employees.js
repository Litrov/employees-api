const {prisma} = require("../prisma/prisma-client");

/**
 * @route GET /api/employees
 * @desc Gett all employees
 * @access Private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(500).json({message: 'Cant take a employees'})
    }
}

/**
 * @route POST /api/employees/add
 * @desc Add an employee
 * @access Private
 */
const add = async (req, res) => {
    const data = req.body;

    try {
        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        });

        return res.status(201).json(employee);

    } catch {
        return res.status(500).json({message: 'Something went wrong'})
    }
}

/**
 *
 * @route POST /api/employees/remove/:id
 * @desc Removing employee
 * @access Private
 */
const remove = async (req, res) => {
    const {id} = req.body

    try {
        await prisma.employee.delete({
            where: {
                id
            }
        });

        res.status(204).json('Ok')
    } catch {
        return res.status(500).json({message: 'Something went wrong'})
    }

}

/**
 *
 * @route PUT /api/employees/edit/:id
 * @desc Editing employee
 * @access Private
 */
const edit = async (req, res) => {
    const data = req.body;
    const id = data.id;

    try {
        await prisma.employee.update({
            where: {
                id
            },
            data,
        });

        res.status(204).json('Ok')
    } catch {
        return res.status(500).json({message: 'Something went wrong'})
    }
}

/**
 *
 * @route GET /api/employees/:id
 * @desc Getting employee
 * @access Private
 */
const get = async (req, res) => {
    const {id} = req.params;

    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        });

        res.status(200).json(employee)
    } catch {
        return res.status(500).json({message: 'Something went wrong'})
    }
}

module.exports = {
    all,
    add,
    remove,
    edit,
    get
}