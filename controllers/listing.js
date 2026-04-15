const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
     res.render("listings/index.ejs",{allListings});
  }

  module.exports.renderNewForm =  (req,res)=>{
    res.render("listings/new.ejs");
 };

 module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id).populate({path :"reviews",
      populate : {path:"author"},
    })
      .populate("owner");
     if(!listing){
      req.flash("error", "Lisitng you requested for does not exist.!");
      return res.redirect("/listings");
     }
      res.render("listings/show.ejs",{ listing });
  };

  module.exports.createListing = async(req,res,next)=>{
     let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send()
     
    let url= req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    newListing.geometry = response.body.features[0].geometry;    
    let savedListing =  await newListing.save();
      console.log(savedListing);
    req.flash("success", "New Listing Created.!");
    res.redirect("/listings");
  }


  module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Lisitng you requested for does not exist.!");
     return res.redirect("/listings");
     }
     let originalImageUrl = listing.image.url;
originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_fill,h_250,w_250/bo_5px_solid_lightblue");
  res.render("listings/edit.ejs",{listing, originalImageUrl});
  }
  
  // module.exports.updateListing = async (req, res)=>{
  //   let { id } = req.params;
  //   let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });
  //   if( typeof req.file !== "undefined"){
  //     let url= req.file.path;
  //     let filename = req.file.filename;
  //     listing.image = {url ,filename};
  //     await listing.save();
  //   }
  //  req.flash("success", "Listing Updated Successfully.!");
  //   res.redirect(`/listings/${id}`);
  // };
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // If location is updated, geocode the new location
    if (req.body.listing.location && req.body.listing.location !== listing.location) {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();
        listing.geometry = response.body.features[0].geometry;  
    }

    // Update listing with new data
    Object.assign(listing, req.body.listing);

    // If a new image is uploaded, update it
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();
    req.flash("success", "Listing Updated Successfully.!");
    res.redirect(`/listings/${id}`);
};


  module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
   let deletedListing =  await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", "Listing Deleted!");
   res.redirect("/listings");
  };



 

module.exports.getSearchSuggestions = async (req, res) => {
    let query = req.query.q.trim();
    if (!query) return res.json([]);

    let regex = new RegExp(query, "i"); // Case-insensitive search

    let suggestions = await Listing.find(
        { $or: [
            { title: { $regex: regex } },
            { category: { $regex: regex } },
            { location: { $regex: regex } },
            { country: { $regex: regex } }
        ]}
    ).limit(5); // Limit to 5 results

    res.json(suggestions.map(listing => listing.title)); // Send only titles as suggestions
};


  module.exports.filter = async (req, res, next) => {
    let { id } = req.params;
    let allListings = await Listing.find({ category: { $all: [id] } });
    // console.log(allListings);
    if (allListings.length != 0) {
      res.locals.success = `Listings Find by ${id}`;
      res.render("listings/index.ejs", { allListings });
    } else {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
    }
  };

  module.exports.search = async (req, res) => {
    console.log(req.query.q);
    let input = req.query.q.trim();

    if (!input) {
        req.flash("error", "Search value empty !!!");
        return res.redirect("/listings");
    }

    let allListings = await Listing.find({ $text: { $search: input } });

    // If no results, fallback to regex search
    if (allListings.length === 0) {
        let searchPattern = new RegExp(input, "i");
        let query = {
            $or: [
                { title: { $regex: searchPattern } },
                { category: { $regex: searchPattern } },
                { country: { $regex: searchPattern } },
                { location: { $regex: searchPattern } }
            ]
        };
        allListings = await Listing.find(query).sort({ _id: -1 });
    }

    if (allListings.length > 0) {
        res.locals.success = `Listings searched for "${input}"`;
        return res.render("listings/index.ejs", { allListings });
    } else {
        req.flash("error", "No matching listings found!");
        return res.redirect("/listings");
    }
};


  
  // module.exports.search = async (req, res) => {
  //   console.log(req.query.q);
  //   let input = req.query.q.trim().replace(/\s+/g, " ");
  //   if (input == "" || input == " ") {
    
  //     req.flash("error", "Search value empty !!!");
  //     res.redirect("/listings");
  //   }
  
  //   // convert every word 1st latter capital and other small
  //   let data = input.split("");
  //   let element = "";
  //   let flag = false;
  //   for (let index = 0; index < data.length; index++) {
  //     if (index == 0 || flag) {
  //       element = element + data[index].toUpperCase();
  //     } else {
  //       element = element + data[index].toLowerCase();
  //     }
  //     flag = data[index] == " ";
  //   }
  //   console.log(element);
  
  //   let allListings = await Listing.find({
  //     title: { $regex: element, $options: "i" },
  //   });
  //   if (allListings.length != 0) {
  //     res.locals.success = "Listings searched by Title";
  //     res.render("listings/index.ejs", { allListings });
  //     return;
  //   }
  //   if (allListings.length == 0) {
  //     allListings = await Listing.find({
  //       category: { $regex: element, $options: "i" },
  //     }).sort({ _id: -1 });
  //     if (allListings.length != 0) {
  //       res.locals.success = "Listings searched by Category";
  //       res.render("listings/index.ejs", { allListings });
  //       return;
  //     }
  //   }
  //   if (allListings.length == 0) {
  //     allListings = await Listing.find({
  //       country: { $regex: element, $options: "i" },
  //     }).sort({ _id: -1 });
  //     if (allListings.length != 0) {
  //       res.locals.success = "Listings searched by Country";
  //       res.render("listings/index.ejs", { allListings });
  //       return;
  //     }
  //   }
  //   if (allListings.length == 0) {
  //     let allListings = await Listing.find({
  //       location: { $regex: element, $options: "i" },
  //     }).sort({ _id: -1 });
  //     if (allListings.length != 0) {
  //       res.locals.success = "Listings searched by Location";
  //       res.render("listings/index.ejs", { allListings });
  //       return;
  //     }
  //   }
  //   const intValue = parseInt(element, 10); // 10 for decimal return - int ya NaN
  //   const intDec = Number.isInteger(intValue); // check intValue is Number & Not Number return - true ya false
  
  //   if (allListings.length == 0 && intDec) {
  //     allListings = await Listing.find({ price: { $lte: element } }).sort({
  //       price: 1,
  //     });
  //     if (allListings.length != 0) {
  //       res.locals.success = `Listings searched for less than Rs ${element}`;
  //       res.render("listings/index.ejs", { allListings });
  //       return;
  //     }
  //   }
  //   if (allListings.length == 0) {
  //     req.flash("error", "Listings is not here !!!");
  //     res.redirect("/listings");
  //   }
  // };
  

