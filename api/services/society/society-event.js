const Society = require("../../models/society");

exports.createEvent = async ({ newEvent, societyId }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  let events = [...society.events];
  events.push(newEvent);
  await Society.updateOne(
    { _id: societyId },
    {
      $set: {
        events,
      },
    }
  );

  return {
    message: "Successfully added",
    status: 201,
  };
};

exports.fetchEventForEdit = async ({ event_id, societyId }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  const event_index = society.events.findIndex((ev) => ev.id === event_id);
  const event = society.events[event_index];

  return {
    event,
  };
};

exports.updateEvent = async ({ eventId, societyId, updatedEvent }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  let events = [...society.events];
  let index = events.findIndex((ev) => ev.id === eventId);
  events[index].title = updatedEvent.title;
  events[index].description = updatedEvent.description;
  events[index].createBy = updatedEvent.createBy;
  events[index].time = updatedEvent.time;
  events[index].date = updatedEvent.date;

  await society.updateOne({ events });

  return { message: "Updated" };
};

exports.deleteSocietyEvent = async ({ eventId, societyId }) => {
  const society = await Society.findById({ _id: societyId });

  let events = [...society.events];
  let index = events.findIndex((ev) => ev.id === eventId);
  events.splice(index, 1);
  await Society.updateOne(
    { _id: societyId },
    {
      $set: {
        events,
      },
    }
  );

  return { message: "Deleted" };
};
