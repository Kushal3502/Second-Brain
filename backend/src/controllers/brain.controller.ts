import { Request, Response } from "express";
import { Brain } from "../models/brain.model";
import { Link } from "../models/link.model";
import { generateHash } from "../utils/generateHash";
import { User } from "../models/user.model";

export const createBrain = async (req: Request, res: Response) => {
  try {
    const { link, type, title, description } = req.body;

    if (!link || !type || !title) throw new Error("All fields are required");

    const newBrain = await Brain.create({
      link,
      title,
      type,
      description,
      // @ts-ignore
      userId: req.user._id,
    });

    if (!newBrain)
      res.status(400).json({
        success: false,
        message: "Brain not added",
      });

    res.status(200).json({
      success: true,
      brain: newBrain,
      message: "New brain added",
    });
  } catch (error) {
    console.log("Brain creation error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateBrain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { link, type, title, description } = req.body;

    // Check if brain exists
    const brain = await Brain.findById(id);

    if (!brain) {
      return res.status(404).json({
        success: false,
        message: "Brain not found",
      });
    }

    // Verify if user owns this brain
    // @ts-ignore
    if (brain.userId.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this brain",
      });
    }

    // Update brain
    const updatedBrain = await Brain.findByIdAndUpdate(
      id,
      {
        link,
        type,
        title,
        description,
      },
      { new: true }
    ).populate("userId", "username");

    return res.status(200).json({
      success: true,
      brain: updatedBrain,
      message: "Brain updated successfully",
    });
  } catch (error) {
    console.log("Brain creation error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getBrain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brain = await Brain.findById(id).populate("userId", "username");

    if (!brain)
      return res.status(400).json({
        success: false,
        message: "Brain not found",
      });

    return res.status(200).json({
      success: true,
      brain,
      message: "Brain fetched",
    });
  } catch (error) {
    console.log("Brain get error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getUserBrains = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const brains = await Brain.find({ userId }).populate("userId", "username");

    if (!brains || brains.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No brains found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      brains,
      message: "Brains fetched successfully",
    });
  } catch (error) {
    console.log("Brain get error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deleteBrain = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const brain = await Brain.findByIdAndDelete(id);

    if (!brain)
      return res.status(400).json({
        success: false,
        message: "Brain not found",
      });

    return res.status(200).json({
      success: true,
      message: "Brain deleted",
    });
  } catch (error) {
    console.log("Brain delete error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const shareBrain = async (req: Request, res: Response) => {
  try {
    const { share } = req.body;

    if (share) {
      const isLinkExists = await Link.findOne({
        // @ts-ignore
        userId: req.user._id,
      });

      if (isLinkExists) {
        return res.status(200).json({
          success: true,
          hash: isLinkExists.hash,
          message: "Link created",
        });
      }

      const hash = generateHash(10);

      await Link.create({
        hash,
        // @ts-ignore
        userId: req.user._id,
      });

      return res.status(200).json({
        success: true,
        hash,
        message: "Link created",
      });
    } else {
      await Link.deleteOne({
        // @ts-ignore
        userId: req.user._id,
      });

      return res.status(200).json({
        message: "Removed link",
      });
    }
  } catch (error) {
    console.log("Brain share error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getShareBrain = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;

    const link = await Link.findOne({ hash });

    if (!link) {
      return res.status(400).json({
        success: false,
        message: "Invalid hash",
      });
    }

    const brains = await Brain.find({
      userId: link.userId,
    });

    const user = await User.findOne({
      _id: link.userId,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      username: user.username,
      brains,
    });
  } catch (error) {
    console.log("Brain share error :: ", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
