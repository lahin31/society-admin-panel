const Society = require("../../models/society");

exports.createNotice = async ({ newNotice, societyId }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  let notices = [...society.notices];
  notices.push(newNotice);
  await Society.updateOne(
    { _id: societyId },
    {
      $set: {
        notices,
      },
    }
  );

  return { message: "Successfully added" };
};

exports.fetchEditNotice = async ({ societyId, notice_id }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  const notice_index = society.notices.findIndex((ev) => ev.id === notice_id);
  const notice = society.notices[notice_index];

  return {
    notice,
  };
};

exports.updateNotice = async ({ societyId, noticeId, updatedNotice }) => {
  let society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  let notices = [...society.notices];
  let index = notices.findIndex((ev) => ev.id === noticeId);
  notices[index].title = updatedNotice.title;
  notices[index].description = updatedNotice.description;
  notices[index].createdBy = updatedNotice.createdBy;

  await society.updateOne({ notices });

  return { message: "Updated", notices };
};

exports.deleteSocietyNotice = async ({ notice_id, societyId }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  let notices = [...society.notices];
  let index = notices.findIndex((ev) => ev.id === notice_id);
  notices.splice(index, 1);
  await Society.updateOne(
    { _id: societyId },
    {
      $set: {
        notices,
      },
    }
  );
  return {
    message: "Deleted",
  };
};
