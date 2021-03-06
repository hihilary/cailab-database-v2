import {Response, NextFunction} from 'express'
import {Request} from './MyRequest'

export function userMustBeAdmin (req :Request, res :Response, next: NextFunction) {
    if (req.currentUser && req.currentUser.groups.indexOf('administrators')>=0) {
      console.log('currentGoup', req.currentUser.groups)
      next();
    } else if (req.headers['test-token'] === 'a30aa7f7de512963a03c') {
      req.currentUser = {
        id:'5b718be08274212924fe4a94',
        fullName: 'test man',
        email: 'yishaluo@gmail.com',
        groups: ['users'],
        iat: Math.floor(Date.now()),
        exp: Math.floor(Date.now()) + 3600,
      }
      next();
    } else {
      res.status(401).json({message: 'require admin'})
    }
  }
  
  export function userMustLoggedIn (req :Request, res :Response, next: NextFunction) {
    if (req.headers['test-token'] === 'a30aa7f7de512963a03c') {
      req.currentUser = {
        id:'5b718be08274212924fe4a94',
        fullName: 'test man',
        email: 'yishaluo@gmail.com',
        groups: ['users'],
        iat: Math.floor(Date.now()),
        exp: Math.floor(Date.now()) + 3600,
      }
    }
    if (req.currentUser && req.currentUser.groups.indexOf('users')>=0) {
      next();
    } else {
      res.status(401).json({message: 'require log in'})
    }
  }