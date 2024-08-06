/* Author: Sivaprkash Chittu Hariharan */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  eventDescription: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);


export default Event;
