const express = require('express');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: user,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.pk);

  if (!user) {
    return next(new AppError('No user found!'));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const update = await User.update(
    req.body,
    {
      where: { id: req.params.pk },
    },
    { new: true }
  );
  if (!update) {
    return next(new AppError('No user found with that ID'));
  }
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data: update,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.destroy({
    where: { id: req.params.pk },
  });
  if (!user) {
    return next(new AppError('No user found with that ID'));
  }

  res.status(204).json({
    data: null,
  });
});

exports.updateBalance = async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    const update = await user.increment(
      { balance: req.body.amount },
      {
        where: {
          balance: user.balance,
        },
      }
    );
    res.status(200).render('top-up', {
      title: 'Credit Account',
      data: update,
    });
  } else {
    return next(new AppError('No user found with that email'));
  }
};
