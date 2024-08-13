const express = require('express')
const idx = require('idx')

const router = express.Router()

const {
  getUserById,
  getUserActivityById,
  getUserAverageSession,
  getUserPerformance,
} = require('../../backend/models/models')

const { handleNoUserData } = require('../../backend/middleware/middleware')

const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = require('../data')

router.get('/user/:id', (req, res) => {
  const userId = idx(req, (_) => _.params.id)
  const userData = getUserById(Number(userId))

  return handleNoUserData(res, userData)
})

router.get('/user/:id/activity', (req, res) => {
  const userId = idx(req, (_) => _.params.id)
  const userData = getUserActivityById(Number(userId))

  return handleNoUserData(res, userData)
})

router.get('/user/:id/average-sessions', (req, res) => {
  const userId = idx(req, (_) => _.params.id)
  const userData = getUserAverageSession(Number(userId))

  return handleNoUserData(res, userData)
})

router.get('/user/:id/performance', (req, res) => {
  const userId = idx(req, (_) => _.params.id)
  const userData = getUserPerformance(Number(userId))

  return handleNoUserData(res, userData)
})

module.exports = router
