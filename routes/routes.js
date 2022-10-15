const route = require("express").Router();

const data = [];

route.get("/", (req, res) => {
    if(data.length <= 0){
        res.status(200).json({"status": 200, "message": "No data found!", "data": []});
        return;
    }
    res.status(200).json({"status": 200, "message": 0, "data": data});
});

route.get("/:id", (req, res) => {
    const property = data.find((item) => item["id"] == req.params.id);
    if(property){
        res.status(200).json({"status": 200, "message": 0, "data": property});
    } else {
        res.status(404).json({"status": 404, "message": "Property not found", "data": []});
    }
});

route.post("/", (req, res) => {
    const entry = req.body;
    if(
        !req.body.type ||
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
    const types = ["house", "flat", "upper portion", "lower portion", "farm house", "room", "penthouse"];
    if(!types.includes(req.body.type)){
        res.status(406).send({"status": 406, "message": "Property type not allowed", "data": []});
        return;
    }

    // Check if price is valid
    if(isNaN(req.body.price)){
        res.status(406).send({"status": 406, "message": "Invalid Price", "data": []});
        return;
    }

    // Check if price unit is valid
    const priceUnits = ["hundred", "thousand", "million", "billion", "trillion", "crore", "lac"];
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
    const areaUnits = ["marla", "kanal", "square meters", "square yards", "square feet"];
    if(!areaUnits.includes(req.body.areaUnit)){
        res.status(406).send({"status": 406, "message": "Area unit not allowed", "data": []});
        return;
    }

    // Check if purpose is valid
    if(req.body.purpose != "sell" && req.body.purpose != "rent"){
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
    data.push(entry);
    res.status(201).json({"status": 201, "message": "Added Successfully", "data": entry});

});



module.exports = route;