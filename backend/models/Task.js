const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: String,
    category: String,
    completed: Boolean,
    dueDate: Date
});
module.exports = mongoose.model('Task', TaskSchema);