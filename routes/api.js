const express = require('express');
const router = new express.Router();
const pool = require('./db').pool;
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const request = require('request');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
