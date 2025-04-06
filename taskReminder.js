// Task Reminder System
class Task {
    constructor(title, dueTime, priority) {
        this.title = title;
        this.dueTime = dueTime; // in minutes from now
        this.priority = priority; // 1 (highest) to 5 (lowest)
        this.id = Date.now(); // unique identifier
    }
}

class TaskReminderSystem {
    constructor() {
        this.tasks = [];
    }

    // Add a new task
    addTask(title, dueTime, priority) {
        try {
            if (!title || typeof title !== 'string') {
                throw new Error('Title must be a non-empty string');
            }
            if (typeof dueTime !== 'number' || dueTime <= 0) {
                throw new Error('Due time must be a positive number');
            }
            if (priority < 1 || priority > 5) {
                throw new Error('Priority must be between 1 and 5');
            }

            const task = new Task(title, dueTime, priority);
            this.tasks.push(task);
            this.scheduleReminder(task);
            return task;
        } catch (error) {
            console.error('Error adding task:', error.message);
            throw error;
        }
    }

    // Sort tasks by priority
    sortTasksByPriority() {
        return [...this.tasks].sort((a, b) => a.priority - b.priority);
    }

    // Get tasks due within specified timeframe
    getTasksDueWithin(timeframe) {
        const now = Date.now();
        return this.tasks.filter(task => {
            const dueDate = now + (task.dueTime * 60 * 1000); // Convert minutes to milliseconds
            return dueDate <= now + (timeframe * 60 * 1000);
        });
    }

    // Schedule reminder for a task
    scheduleReminder(task) {
        setTimeout(() => {
            console.log(`REMINDER: Task "${task.title}" is due now!`);
            // Here you could add additional notification logic (email, push notification, etc.)
        }, task.dueTime * 60 * 1000); // Convert minutes to milliseconds
    }

    // Display all tasks
    displayTasks() {
        console.log('\nCurrent Tasks:');
        this.tasks.forEach(task => {
            console.log(`- ${task.title} (Due in ${task.dueTime} minutes, Priority: ${task.priority})`);
        });
    }

    // Remove a task by ID
    removeTask(taskId) {
        try {
            const index = this.tasks.findIndex(task => task.id === taskId);
            if (index === -1) {
                throw new Error('Task not found');
            }
            this.tasks.splice(index, 1);
            return true;
        } catch (error) {
            console.error('Error removing task:', error.message);
            throw error;
        }
    }
}

// Example usage
const reminderSystem = new TaskReminderSystem();

try {
    // Add some example tasks
    reminderSystem.addTask('Complete project report', 5, 1);
    reminderSystem.addTask('Team meeting', 15, 2);
    reminderSystem.addTask('Review code', 30, 3);
    reminderSystem.addTask('Send email', 45, 4);
    reminderSystem.addTask('Lunch break', 60, 5);

    // Display all tasks
    reminderSystem.displayTasks();

    // Display tasks due in next 20 minutes
    console.log('\nTasks due in next 20 minutes:');
    const upcomingTasks = reminderSystem.getTasksDueWithin(20);
    upcomingTasks.forEach(task => {
        console.log(`- ${task.title}`);
    });

    // Display tasks sorted by priority
    console.log('\nTasks sorted by priority:');
    const sortedTasks = reminderSystem.sortTasksByPriority();
    sortedTasks.forEach(task => {
        console.log(`- ${task.title} (Priority: ${task.priority})`);
    });

} catch (error) {
    console.error('Error in example usage:', error.message);
} 