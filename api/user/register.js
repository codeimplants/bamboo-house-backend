const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const guestMOdel = require("../models/userRegisterModel");

router.post("/guestRegister", [body("phone").not().isEmpty(), body("uniqueID_number").not().isEmpty()],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: errors.array()[0],
            });
        }

        const phoneExist = await guestMOdel.findOne({ phone: req.body.phone });

        //if the user already exists then Respond that the user with the phone already exists
        if (phoneExist) return res.status(401).json({ error: "Guest with the phone number already exists" });

        const guestDetails = {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            uniqueID_number: req.body.uniqueID_number,
            uniqueID_url: req.body.uniqueID_url,
            vehicle_number: req.body.vehicle_number,
            room_rent: req.body.room_rent,
            room_number: req.body.room_number,
            room_type: req.body.room_type,
            total_rooms: req.body.total_rooms,
            adults: req.body.adults,
            child: req.body.child,
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            nationality: req.body.nationality,
            purpose: req.body.purpose
        };

        //Saving the user details into database
        const newGuest = new guestMOdel(guestDetails);
        newGuest.save().then((result) => {
            return res.status(200).json({ msg: "Guest Registered Successfully!!!", details: result });
        })
            .catch((error) => {
                return res.status(401).json({ error: "Something Went Wrong!!!" });
            });
    }
);

module.exports = router;