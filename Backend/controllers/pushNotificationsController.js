const express = require('express');
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();



const createPushNotification = async (req, res) => {
    const {message } = req.body;
    try {
       await createPushNotification(message);
        res.status(200).json({ message: "Notification created successfully" });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await prisma.push_notification.findMany();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        await markAsRead(id);
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

module.exports = {
    createPushNotification,
    getAllNotifications,
    markAsRead,
};