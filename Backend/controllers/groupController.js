const Group = require("../models/Group");

exports.getAllGroups = async (req, res, next) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
};

exports.getGroupById = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
};

exports.createGroup = async (req, res, next) => {
  try {
    const { name, subject, description, location, startDate, endDate, hoursPerDay } = req.body;

    if (!name || !subject || !startDate || !endDate) {
      return res.status(400).json({ message: "Name, subject, startDate and endDate are required" });
    }

    const newGroup = await Group.create({
      name,
      subject,
      description,
      location,
      startDate,
      endDate,
      hoursPerDay,
      members: [req.user ? req.user.id : null], // optional if using authentication
    });

    res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedGroup = await Group.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // validates new fields as well
    });

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    next(error);
  }
};


exports.deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGroup = await Group.findByIdAndDelete(id);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.joinGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // For now, assume req.user.id = current user
    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    // Check if already a member
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "Already a member of this group" });
    }

    group.members.push(userId);
    await group.save();

    res.status(200).json({ message: "Joined group successfully", group });
  } catch (error) {
    next(error);
  }
};

exports.leaveGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const userId = req.user ? req.user.id : req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!group.members.includes(userId)) {
      return res.status(400).json({ message: "You are not a member of this group" });
    }

    group.members = group.members.filter((member) => member.toString() !== userId);
    await group.save();

    res.status(200).json({ message: "You have left the group successfully", group });
  } catch (error) {
    next(error);
  }
};
