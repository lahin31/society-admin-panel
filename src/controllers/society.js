const Society = require("../models/society");
const SocietyService = require("../services/society/society");
const SocietyEventService = require("../services/society/society-event");
const SocietyNoticeService = require("../services/society/society-notice");

exports.fetchSocieties = async (req, res) => {
  try {
    const societies = await SocietyService.getSocieties();
    return res.status(200).json({
      societies,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.addSociety = async (req, res) => {
  try {
    const { name, desc: description } = req.body;
    const adminId = req.adminId;

    const createSociety = await SocietyService.createSociety({
      name,
      description,
      adminId,
    });

    if (!createSociety) {
      return res.status(404).json({
        error: "Something went wrong",
      });
    }

    return res.status(201).json({
      message: createSociety.message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.fetchSociety = async (req, res) => {
  try {
    const societyId = req.params.society_id;
    const getSociety = await SocietyService.getSociety({ societyId });

    if (getSociety.status === 404) {
      return res.status(404).json({
        message: getSociety.message,
      });
    }

    return res.status(200).json({
      societyId,
      society: getSociety.society,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.fetchSocietyForEdit = async (req, res) => {
  try {
    const societyId = req.body.society_id;

    if (!societyId) {
      return res.status(401).json({
        error: "Society id required",
      });
    }

    const fetchSocietyService = await SocietyService.fetchSocietyForEdit({
      societyId,
    });

    if (fetchSocietyService.status === 404) {
      return res.status(404).json({
        message: fetchSocietyService.message,
      });
    }

    return res.status(200).json({
      societyId,
      society: fetchSocietyService.society[0],
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.updateSociety = async (req, res) => {
  try {
    const {
      society_id: societyId,
      society_name: societyName,
      society_description: societyDescription,
    } = req.body;

    let updateSocietyService = await SocietyService.updateSociety({
      societyId,
      societyName,
      societyDescription,
    });

    if (updateSocietyService.status === 404) {
      return res.status(404).json({
        message: updateSocietyService.message,
      });
    }

    return res.status(200).json({
      message: updateSocietyService.message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.deleteSociety = async (req, res) => {
  try {
    const societyId = req.body.society_id;

    const deleteSociety_service = await SocietyService.deleteSociety({
      societyId,
    });

    if (deleteSociety_service.status === 404) {
      const { message } = deleteSociety_service;
      return res.status(404).json({
        ...(message && message),
      });
    }

    const { successMsg, societies } = deleteSociety_service;

    return res.status(200).json({
      successMsg,
      societies,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const { newEvent, society_id: societyId } = req.body;

    const addEvent_service = await SocietyEventService.createEvent({
      newEvent,
      societyId,
    });

    const { message } = addEvent_service;

    if (addEvent_service.status === 404) {
      return res.status(404).json({
        ...(message && message),
      });
    }

    return res.status(201).json({
      message: addEvent_service.message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.fetchEditEvent = async (req, res) => {
  try {
    const { event_id, society_id: societyId } = req.body;

    const fetchEditEvent_service = await SocietyEventService.fetchEventForEdit({
      event_id,
      societyId,
    });

    if (fetchEditEvent_service.status === 404) {
      return res.status(404).json({
        message: fetchEditEvent_service.message,
      });
    }

    const { event } = fetchEditEvent_service;

    return res.status(200).json({
      event,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { event_id: eventId, society_id: societyId, updatedEvent } = req.body;

    const updateEvent_service = await SocietyEventService.updateEvent({
      eventId,
      societyId,
      updatedEvent,
    });

    const { message } = updateEvent_service;

    if (updateEvent_service.status === 404) {
      return res.status(404).json({
        ...(message && message),
      });
    }

    return res.status(200).json({ message });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.deleteSocietyEvent = async (req, res) => {
  try {
    const { event_id: eventId, society_id: societyId } = req.body;

    const deleteSocietyEvent_service = await SocietyEventService.deleteSocietyEvent(
      {
        eventId,
        societyId,
      }
    );

    const { message } = deleteSocietyEvent_service;

    if (deleteSocietyEvent_service.status === 404) {
      return res.status(404).json({
        message,
      });
    }

    return res.status(200).json({
      message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.addNotice = async (req, res) => {
  try {
    const { newNotice, society_id: societyId } = req.body;

    const addNotice_service = await SocietyNoticeService.createNotice({
      newNotice,
      societyId,
    });

    const { message } = addNotice_service;

    if (addNotice_service.status === 404) {
      return res.status(404).json({
        ...(message && message),
      });
    }

    return res.status(201).json({
      message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.fetchEditNotice = async (req, res) => {
  try {
    const { notice_id, society_id: societyId } = req.body;

    const fetchEditNotice_service = await SocietyNoticeService.fetchEditNotice({
      societyId,
      notice_id,
    });

    if (fetchEditNotice_service.status === 404) {
      const { message } = fetchEditNotice_service;
      return res.status(404).json({
        ...(message && message),
      });
    }

    const { notice } = fetchEditNotice_service;

    return res.status(200).json({
      notice,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const {
      notice_id: noticeId,
      society_id: societyId,
      updatedNotice,
    } = req.body;

    const updateNotice_service = await SocietyNoticeService.updateNotice({
      societyId,
      noticeId,
      updatedNotice,
    });

    const { message } = updateNotice_service;

    if (updateNotice_service.status === 404) {
      return res.status(404).json({
        ...(message && message),
      });
    }

    const { notices } = updateNotice_service;

    return res.status(200).json({ message, notices });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.deleteSocietyNotice = async (req, res) => {
  try {
    const { notice_id, society_id: societyId } = req.body;

    const deleteSocietyNotice_service = await SocietyNoticeService.deleteSocietyNotice(
      {
        notice_id,
        societyId,
      }
    );

    const { message } = deleteSocietyNotice_service;

    if (deleteSocietyNotice_service.status === 404) {
      return res.status(404).json({
        message,
      });
    }

    return res.status(200).json({
      message,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
