const express = require("express");
const router = express.Router();
const boardMemberModel = require("../models/boardMemberModel");

// Get All Board Member
router.get("/getAllBoardMember", async (req, res) => {
    const getAllBoardMember = await boardMemberModel.find();
    if (getAllBoardMember) {
        return res.status(200).json(getAllBoardMember);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

// Get Specific Board Member
router.get("/getBoardMemberDetails", async (req, res) => {
    const getBoardMemberDetails = await boardMemberModel.findOne({ _id: req.query.id });
    if (getBoardMemberDetails) {
        return res.status(200).json(getBoardMemberDetails);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

// Update Board Member
router.post("/updateBoardMember", async (req, res) => {

    const boardMemberDetails = {
        position: req.body.position,
        fullname: req.body.fullname,
        hotel_name: req.body.hotel_name,
        phone: req.body.phone,
        imgUrl: req.body.imgUrl
    };

    if (req.body._id != null) {
        const findMember = await boardMemberModel.findByIdAndUpdate({ _id: req.body._id }, boardMemberDetails, function (err, result) {
            if (err) {
                return res.status(401).json({ error: "Something Went Wrong!!!" });
            }
            else {
                return res.status(200).json({ message: "Board Member has been updated successfully!!", details: result });
            }
        });
    }
});

// Add Board Member 
// router.post("/addBoardMember", async (req, res) => {
//     const boardMemberExist = await boardMemberModel.findOne({ phone: req.body.phone });
//     if (boardMemberExist) return res.status(401).json({ error: "Board Member is already exists with this phone number." });

//     const newBoardMember = new boardMemberModel(req.body);
//     newBoardMember.save().then((result) => {
//         return res.status(200).json({ msg: "Board Member Added successfully!!", details: result });
//     })
//         .catch((error) => {
//             return res.status(401).json({ error: "Something Went Wrong!!!" });
//         });
// });

module.exports = router;