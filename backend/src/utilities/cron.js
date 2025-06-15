import Reminder from "../models/reminder.js";

export const checkAndConvertReminders = async (sendNotificationToClient) => {
    try {
        // Get current date and time
        const now = new Date();
        const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        const currentDate = now.toISOString().split('T')[0];
        console.log("Current Time:", currentTime);
        console.log("Current Date:", currentDate);

        // Find all reminders
        const reminders = await Reminder.find({ type: 'reminder' });
        console.log("Found reminders:", reminders.length);

        // Process each reminder
        for (const reminder of reminders) {
            console.log("\nProcessing reminder:", {
                id: reminder._id,
                title: reminder.title,
                date: reminder.date,
                time: reminder.time,
                leadTime: reminder.leadTime
            });

            const reminderTime = reminder.time;
            const reminderDate = reminder.date;
            const leadTime = reminder.leadTime;

            // Calculate notification time based on lead time
            const [hours, minutes] = reminderTime.split(':');
            const reminderDateTime = new Date(reminderDate);
            reminderDateTime.setHours(parseInt(hours), parseInt(minutes));

            // Convert lead time to minutes
            const leadTimeMinutes = parseInt(leadTime);

            // Calculate notification time by subtracting lead time
            const notificationDateTime = new Date(reminderDateTime);
            notificationDateTime.setMinutes(notificationDateTime.getMinutes() - leadTimeMinutes);

            // Format notification time for comparison
            const notificationTime = notificationDateTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
            const notificationDate = notificationDateTime.toISOString().split('T')[0];

            // Convert times to minutes for easier comparison
            const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
            const [notificationHours, notificationMinutes] = notificationTime.split(':').map(Number);

            const currentTotalMinutes = currentHours * 60 + currentMinutes;
            const notificationTotalMinutes = notificationHours * 60 + notificationMinutes;

            console.log("Time comparison:", {
                currentTime,
                notificationTime,
                currentDate,
                notificationDate,
                currentTotalMinutes,
                notificationTotalMinutes,
                difference: currentTotalMinutes - notificationTotalMinutes
            });

            // Check if current time has passed or equals notification time
            if (currentDate === notificationDate && currentTotalMinutes >= notificationTotalMinutes) {
                console.log("Time has passed or equals notification time! Converting reminder to notification");
                // Update reminder to notification
                const updatedReminder = await Reminder.findByIdAndUpdate(
                    reminder._id,
                    { type: 'notification', readStatus: false },
                    { new: true }
                );

                // Send notification to user
                if (updatedReminder) {
                    const notification = {
                        id: updatedReminder._id,
                        title: updatedReminder.title,
                        message: `Reminder: ${updatedReminder.title} is due soon!`,
                        type: 'notification',
                        date: updatedReminder.date,
                        time: updatedReminder.time
                    };

                    // Emit notification to clients via Socket.IO
                    sendNotificationToClient(notification);
                    console.log(`Notification sent for reminder ${reminder._id}`);
                }

                console.log(`Converted reminder ${reminder._id} to notification`);
            } else {
                console.log("Time has not passed yet. Current time:", currentTime, "Notification time:", notificationTime);
            }
        }
    } catch (error) {
        console.error('Error in reminder cron job:', error);
    }
};
