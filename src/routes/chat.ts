import { NextFunction, Request, Response, Router } from 'express'
import * as chatController from '../controllers/chatController'

export const router = Router()

router.post('/message', chatController.processMessage)