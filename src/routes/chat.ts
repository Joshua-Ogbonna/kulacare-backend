import { Router } from 'express'
import * as chatController from '../controllers/chatController'
import * as getChatsController from '../controllers/getChatsByUser'

export const router = Router()

router.post('/message', chatController.processMessage)
router.get('/messages/:phoneNumber', getChatsController.getChatsByUser)