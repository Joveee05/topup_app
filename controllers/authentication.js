const express = require('express');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  const userPassword = await User.findOne({
    where: { password: req.body.password },
  });

  if (!user || !userPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    data: user,
  });
});
