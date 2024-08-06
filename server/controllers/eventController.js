/* Author: Sivaprakash Chittu Hariharan */

import Event from '../model/Event.js';
import Eventapplicant from '../model/EventApplicant.js';
import mongoose from 'mongoose';
// Create a new event
export const createEvent = async (req, res) => {
    const {
        eventName,
        eventDescription,
        dateTime,
        location
    } = req.body;

    try {
        const newEvent = new Event({
            eventName,
            eventDescription,
            dateTime,
            location
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, eventDescription, dateTime, location } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { eventName, eventDescription, dateTime, location },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }
        res.status(200).json({
            message: 'Event deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

export const Eventcandidateapply = async (req, res) => {
  const { eventId, name, email } = req.body;

  try {
     
      const existingApplication = await Eventapplicant.findOne({ eventId, email });

      if (existingApplication) {
          return res.status(400).json({
              message: 'You have already applied to this event'
          });
      }

    
      const newApplicant = new Eventapplicant({
          eventId,
          name,
          email
      });

      await newApplicant.save();
      res.status(201).json(newApplicant);
  } catch (err) {
      res.status(400).json({
          message: err.message
      });
  }
};


export const getApplicantsByEventId = async (req, res) => {
  const { id: eventId } = req.params;

  if (!eventId) {
    return res.status(400).json({
      message: 'Event ID is required'
    });
  }

  try {
    
    const objectId = mongoose.Types.ObjectId(eventId);


    const applicants = await Eventapplicant.find({ eventId: objectId });

    if (applicants.length === 0) {
      return res.status(404).json({
        message: 'No applicants found for this event'
      });
    }
    res.status(200).json(applicants);
  } catch (err) {
    console.error('Error fetching applicants:', err); // Log full error object
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message // Include error message in response for debugging
    });
  }
};
