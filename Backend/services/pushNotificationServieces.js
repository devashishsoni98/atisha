const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


 const createNotification = async(message)=> {
    try {
        return await prisma.push_notification.create({
            data: { message },
        });
    } catch (error) {
        throw new Error('Failed to create notification');
    }
}

const getAllNotifications = async()=> {
    try {
        return await prisma.push_notification.findMany();
    } catch (error) {
        throw new Error('Failed to get notifications');
    }
}

 const markAsRead = async(id)=> {
    try {
        return await prisma.push_notification.update({
            where: { id },
            data: { is_read: true },
        });
    } catch (error) {
        throw new Error('Failed to mark notification as read');
    }
}

module.exports = { createNotification, getAllNotifications, markAsRead };

