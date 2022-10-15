const route = require("express").Router();
const { Post } = require("../models/models");

const types = ["house", "flat", "upper portion", "lower portion", "farm house", "room", "penthouse"];
const priceUnits = ["hundred", "thousand", "million", "billion", "trillion", "crore", "lac"];
const areaUnits = ["marla", "kanal", "square meters", "square yards", "square feet"];
const purposeTypes = ["buy", "sell", "rent"];
const statuses = ["active", "deleted", "sold", "verified"];

route.get("/", async (req, res) => {
    const result = await Post.find({});
    if(result.length <= 0){
        res.status(200).json({"status": 200, "message": "No data found!", "data": []});
        return;
    }
    res.status(200).json({"status": 200, "message": 0, "data": result});
});

route.get("/:id", async (req, res) => {
    const property = await Post.findOne({"_id": req.params.id});
    if(property){
        res.status(200).json({"status": 200, "message": 0, "data": property});
    } else {
        res.status(404).json({"status": 404, "message": "Property not found", "data": []});
    }
});

route.post("/", async (req, res) => {
    const entry = req.body;
    if(
        !req.body.propertyType ||
        !req.body.price ||
        !req.body.priceUnit ||
        !req.body.baths ||
        !req.body.area ||
        !req.body.areaUnit ||
        !req.body.purpose ||
        !req.body.bedrooms ||
        !req.body.location ||
        !req.body.city ||
        !req.body.state ||
        !req.body.country
        ){
            res.status(406).send({"status": 406, "message": "Fill all required fields", "data": []});
            return;
        }

    // Check if type is valid
    if(!types.includes(req.body.propertyType)){
        res.status(406).send({"status": 406, "message": "Property type not allowed", "data": []});
        return;
    }

    // Check if price is valid
    if(isNaN(req.body.price)){
        res.status(406).send({"status": 406, "message": "Invalid Price", "data": []});
        return;
    }

    // Check if price unit is valid
    if(!priceUnits.includes(req.body.priceUnit)){
        res.status(406).send({"status": 406, "message": "Price unit not allowed", "data": []});
        return;
    }

    // Check if baths is valid
    if(isNaN(req.body.baths)){
        res.status(406).send({"status": 406, "message": "Invalid Bathroom(s) count", "data": []});
        return;
    }

    // Check if area is valid
    if(isNaN(req.body.area)){
        res.status(406).send({"status": 406, "message": "Invalid area count", "data": []});
        return;
    }

    // Check if area unit is valid
    if(!areaUnits.includes(req.body.areaUnit)){
        res.status(406).send({"status": 406, "message": "Area unit not allowed", "data": []});
        return;
    }

    // Check if purpose is valid
    if(!purposeTypes.includes(req.body.purpose)){
        res.status(406).send({"status": 406, "message": "Purpose type not allowed", "data": []});
        return;
    }

    // Check if bedrooms are valid
    if(isNaN(req.body.bedrooms)){
        res.status(406).send({"status": 406, "message": "Invalid bedroom(s) count", "data": []});
        return;
    }

    // Code to store data
    entry["status"] = "active";
    const post = new Post(entry);
    const result = await post.save();
    if(result["_id"]){
        res.status(201).json({"status": 201, "message": "Added Successfully", "data": result});
        return;
    }
    res.status(500).json({"status": 500, "message": "Failed to add new property", "data": result});
});

route.delete("/:id", async (req, res) => {
    const result = await Post.deleteOne({_id: req.params.id});
    if(result["deletedCount"] === 1){
        res.status(202).json({"status": 202, "message": "Deleted Successfully", "data": result});
        return;
    }
    res.status(404).json({"status": 404, "message": "Property not found!", "data": result});
});

route.put("/:id", async (req, res) => {

    // Check if type is valid
    if(req.body.propertyType && !types.includes(req.body.propertyType)){
        res.status(406).send({"status": 406, "message": "Property type not allowed", "data": []});
        return;
    }

    // Check if price is valid
    if(req.body.price && isNaN(req.body.price)){
        res.status(406).send({"status": 406, "message": "Invalid Price", "data": []});
        return;
    }

    // Check if price unit is valid
    if(req.body.priceUnit && !priceUnits.includes(req.body.priceUnit)){
        res.status(406).send({"status": 406, "message": "Price unit not allowed", "data": []});
        return;
    }

    // Check if baths is valid
    if(req.body.baths && isNaN(req.body.baths)){
        res.status(406).send({"status": 406, "message": "Invalid Bathroom(s) count", "data": []});
        return;
    }

    // Check if area is valid
    if(req.body.area && isNaN(req.body.area)){
        res.status(406).send({"status": 406, "message": "Invalid area count", "data": []});
        return;
    }

    // Check if area unit is valid
    if(req.body.areaUnit && !areaUnits.includes(req.body.areaUnit)){
        res.status(406).send({"status": 406, "message": "Area unit not allowed", "data": []});
        return;
    }

    // Check if purpose is valid
    if(req.body.purpose && !purposeTypes.includes(req.body.purpose)){
        res.status(406).send({"status": 406, "message": "Purpose type not allowed", "data": []});
        return;
    }

    // Check if bedrooms are valid
    if(req.body.bedrooms && isNaN(req.body.bedrooms)){
        res.status(406).send({"status": 406, "message": "Invalid bedroom(s) count", "data": []});
        return;
    }

    // Check if status is valid
    if(req.body.status && !statuses.includes(req.body.status)){
        res.status(406).send({"status": 406, "message": "Invalid status type", "data": []});
        return;
    }
    
    const result = await Post.updateOne({_id: req.params.id}, {$set: req.body});

    if(result.modifiedCount === 1){
		res.status(202).send({"status": 202, "message": "Updated Successfully", "data": result});
        return;
	}

    if(result.modifiedCount === 0 && result.matchedCount === 1){
		res.status(400).send({"status": 400, "message": "Nothing to update", "data": result});
        return;
	}

    res.status(404).json({"status": 404, "message": "Property not found!", "data": result});

});

module.exports = route;