const Admin = require("../../models/admin");
const Society = require("../../models/society");

exports.getSocieties = async () => {
  const societies = await Society.find({});
  return societies;
};

exports.getSociety = async ({ societyId }) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "Not found",
      status: 404,
    };
  }

  return {
    society,
  };
};

exports.createSociety = async ({ name, description, adminId }) => {
  const admin = await Admin.findById({ _id: adminId });

  if (!name || !description || !admin) {
    return {
      error: "Something went wrong",
    };
  }

  const society = new Society({ name, description });

  await society.save();

  return {
    message: "Added Successfully",
  };
};

exports.fetchSocietyForEdit = async ({ societyId }) => {
  const society = await Society.find({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  return { society };
};

exports.updateSociety = async ({
  societyId,
  societyName,
  societyDescription,
}) => {
  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  await Society.updateOne(
    { _id: societyId },
    {
      $set: {
        name: societyName,
        description: societyDescription,
      },
    }
  );

  return {
    message: "Updated",
  };
};

exports.deleteSociety = async ({ societyId }) => {
  if (!societyId) {
    return {
      message: "Need an ID",
      status: 404,
    };
  }

  const society = await Society.findById({ _id: societyId });

  if (!society) {
    return {
      message: "No society found",
      status: 404,
    };
  }

  await Society.deleteOne({ _id: societyId });
  const societies = await Society.find({});

  return {
    successMsg: "Successfully deleted",
    societies,
  };
};
