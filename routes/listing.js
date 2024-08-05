const express =  require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner,validateListing}= require("../middlware.js");
const listingCountroller = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage});



router.route("/")
.get(wrapAsync(listingCountroller.index))
.post(isLoggedIn,  upload.single('listing[image]'),  validateListing ,wrapAsync (listingCountroller.createListing));
 
 

  //New route
  router.get("/new", isLoggedIn , listingCountroller.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingCountroller.showListing))
.put( isLoggedIn, isOwner, upload.single('listing[image]') , validateListing, wrapAsync(listingCountroller.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingCountroller.destroyListing));
//Index routing
// router.get("/",wrapAsync(listingCountroller.index));




// Show route
// router.get("/:id" ,wrapAsync(listingCountroller.showListing));

//create route
// router.post("/", isLoggedIn,validateListing, wrapAsync (listingCountroller.createListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingCountroller.renderEditForm));

//Update route
// router.put("/:id",isLoggedIn, isOwner, validateListing, wrapAsync(listingCountroller.updateListing));

//delete route
// router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingCountroller.destroyListing));

module.exports = router;