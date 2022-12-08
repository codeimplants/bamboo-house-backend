const express = require("express");
const router = express.Router();
const guestRegisterModel = require("../models/guestRegisterModel");
const guestBookingModel = require("../models/guestBookingModel");
const guestModel = require("../models/guestModel");

// Guest Register
router.post("/guestRegister", async (req, res) => {
    if (req.body.isExisting === true) {
        const checkedInExist = await guestRegisterModel.findOne({ guestID: req.body.guestID });
        if (checkedInExist) {
            const compareDates = await guestRegisterModel.find({ check_in: { $eq: req.body.check_in }, check_out: { $eq: req.body.check_out } });
            if (compareDates.length != 0) {
                return res.status(401).json({ error: "Guest has been already checked in with the same date." });
            } else {
                const guestExist = await guestModel.findOne({ _id: req.body.guestID });
                if (guestExist) {
                    const newGuest = new guestRegisterModel(req.body);
                    newGuest.save().then((result) => {
                        return res.status(200).json({ msg: "Guest Checked-in Successfully!!!", details: result });
                    })
                        .catch((error) => {
                            return res.status(401).json({ error: "Something Went Wrong!!!" });
                        });
                } else {
                    return res.status(401).json({ error: "Guest not exist. Please check guestID!!!" });
                }
            }
        }
    } else if (req.body.isExisting === false) {

        const guestExist = await guestModel.findOne({ guest_phone: req.body.guest_phone });
        if (guestExist) return res.status(401).json({ error: "Guest with the phone number already exists" });

        const newGuest = new guestModel(req.body);
        newGuest.save().then((result) => {
            const payload = {
                isExisting: req.body.isExisting,
                guestID: result._id,
                booking_date: req.body.booking_date,
                check_in: req.body.check_in,
                check_out: req.body.check_out,
                room_numbers: req.body.room_numbers,
                room_type: req.body.room_type,
                total_rooms: req.body.total_rooms,
                extra_mattress: req.body.extra_mattress,
                room_rent: req.body.room_rent,
                total_amount: req.body.total_amount,
                advance_amount: req.body.advance_amount,
                balance_amount: req.body.balance_amount,
                vehicle_number: req.body.vehicle_number,
                adults: req.body.adults,
                childrens: req.body.childrens,
                purpose: req.body.purpose
            }

            const newGuestRegister = new guestRegisterModel(payload);
            newGuestRegister.save().then((ele) => {
                return res.status(200).json({ msg: "Guest Checked-in Successfully!!!", details: ele });
            })
                .catch((error) => {
                    guestModel.findByIdAndDelete(result._id, function (err, docs) {
                        return res.status(401).json({ error: "Something Went Wrong!!" });
                    })
                })

        })
            .catch((error) => {
                return res.status(401).json({ error: "Something Went Wrong!!" });
            })
    }
});

// Guest Booking 
router.post("/guestBooking", async (req, res) => {
    if (req.body.isExisting == false) {

        const bookingExist = await guestBookingModel.findOne({ guest_phone: req.body.guest_phone });
        if (bookingExist) return res.status(401).json({ error: "Booking is already exists with this phone number." });

        const isguestExist = await guestModel.findOne({ guest_phone: req.body.guest_phone });

        if (isguestExist) {
            return res.status(401).json({ error: "Guest is already exist with the phone number." });
        } else {
            const newGuest = new guestBookingModel(req.body);
            newGuest.save().then((result) => {
                return res.status(200).json({ msg: "Your booking is confirmed!!!", details: result });
            })
                .catch((error) => {
                    return res.status(401).json({ error: "Something Went Wrong!!!" });
                });
        }

    } else if (req.body.isExisting == true) {
        const bookingExist = await guestBookingModel.findOne({ guestID: req.body.guestID });

        if (bookingExist) {
            const compareDates = await guestBookingModel.find({ check_in: { $eq: req.body.check_in }, check_out: { $eq: req.body.check_out } });
            if (compareDates.length != 0) {
                return res.status(401).json({ error: "Booking is already exists with the same date." });
            } else {
                const guestExist = await guestModel.findOne({ _id: req.body.guestID });
                if (guestExist) {
                    const newGuest = new guestBookingModel(req.body);
                    newGuest.save().then((result) => {
                        return res.status(200).json({ msg: "Your booking is confirmed!!!", details: result });
                    })
                        .catch((error) => {
                            return res.status(401).json({ error: "Something Went Wrong!!!" });
                        });
                }
            }
        } else {
            const guestExist = await guestModel.findOne({ _id: req.body.guestID });
            if (guestExist) {
                const newGuest = new guestBookingModel(req.body);
                newGuest.save().then((result) => {
                    return res.status(200).json({ msg: "Your booking is confirmed!!!", details: result });
                })
                    .catch((error) => {
                        return res.status(401).json({ error: "Something Went Wrong!!!" });
                    });
            }
        }
    }
});

// In House list 
router.post("/getInHouseGuest", async (req, res) => {
    if (req.body.dataRange == "today") {
        const getInHouseGuestDetails = await guestRegisterModel.find({ $and: [{ check_in: { $lte: new Date() } }, { check_out: { $gte: new Date() } }] })
        if (getInHouseGuestDetails) {
            return res.status(200).json(getInHouseGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    } else if (req.body.dataRange == "tomorrow") {
        var date = new Date();
        date.setDate(date.getDate() + 1).toString();

        const getInHouseGuestDetails = await guestRegisterModel.find({ $and: [{ check_in: { $lte: date } }, { check_out: { $gte: date } }] })
        if (getInHouseGuestDetails) {
            return res.status(200).json(getInHouseGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    } else if (req.body.dataRange == "week") {
        var date = new Date();
        date.setDate(date.getDate() + 7).toString();

        const getInHouseGuestDetails = await guestRegisterModel.find({ $and: [{ check_in: { $lte: date } }, { check_out: { $gte: new Date() } }] })
        if (getInHouseGuestDetails) {
            return res.status(200).json(getInHouseGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    }
});

// Arrival List 
router.post("/getArrivalGuest", async (req, res) => {
    if (req.body.dataRange == "today") {
        const getArrivalGuestDetails = await guestBookingModel.find({ check_in: new Date() })
        if (getArrivalGuestDetails) {
            return res.status(200).json(getArrivalGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    } else if (req.body.dataRange == "tomorrow") {
        var date = new Date();
        date.setDate(date.getDate() + 1).toString();

        const getArrivalGuestDetails = await guestBookingModel.find({ check_in: { $eq: date } })
        if (getArrivalGuestDetails) {
            return res.status(200).json(getArrivalGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    } else if (req.body.dataRange == "week") {
        var date = new Date();
        date.setDate(date.getDate() + 7).toString();

        const getArrivalGuestDetails = await guestBookingModel.find({ $and: [{ check_in: { $lte: date } }, { check_out: { $gte: new Date() } }] })
        if (getArrivalGuestDetails) {
            return res.status(200).json(getArrivalGuestDetails);
        } else {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        }
    }
});

// GET all booking data
router.get("/getAllBookingDetails", async (req, res) => {
    const getAllBookingDetails = await guestBookingModel.find();
    if (getAllBookingDetails) {
        return res.status(200).json(getAllBookingDetails);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

// GET all Checked-in Guest data
router.get("/getAllCheckedInGuest", async (req, res) => {
    const getAllCheckedInGuest = await guestRegisterModel.find();
    if (getAllCheckedInGuest) {
        return res.status(200).json(getAllCheckedInGuest);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

// Update Guest Profile
router.post("/updateGuestProfile", async (req, res) => {
    const guestProfileDetails = {
        guest_name: req.body.guest_name,
        guest_phone: req.body.guest_phone,
        guest_address: req.body.guest_address,
        uniqueID_type: req.body.uniqueID_type,
        uniqueID_url: req.body.uniqueID_url,
        nationality: req.body.nationality
    };

    const updateGuestProfile = await guestModel.findOneAndUpdate(req.body._id, guestProfileDetails, { new: true })
    updateGuestProfile.save().then((ele) => {
        return res.status(200).json({ msg: "Guest Profile has been updated successfully!!", details: ele });
    })
        .catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!" });
        })
});

// GET all Existing Guest data
router.get("/getExistingGuest", async (req, res) => {
    const getExistingGuest = await guestModel.find();
    if (getExistingGuest) {
        return res.status(200).json(getExistingGuest);
    } else {
        return res.status(401).json({ error: "Something Went Wrong!!!" });
    }
});

router.post("/addGuest", async (req, res) => {
    const newGuest = new guestModel(req.body);
    newGuest.save().then((result) => {
        return res.status(200).json({ msg: "Guest Added Successfully!!!", details: result });
    })
        .catch((error) => {
            return res.status(401).json({ error: "Something Went Wrong!!!" });
        });
});

module.exports = router;