const express =  require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner,validateListing}= require("../middlware.js");
const listingCountroller = require("../controllers/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage});


// filter and search
router.get("/filter/:id", wrapAsync(listingCountroller.filter));                              

router.get("/search", wrapAsync(listingCountroller.search))    

//Index and create aroute
router.route("/")
.get(wrapAsync(listingCountroller.index))
.post(isLoggedIn,  upload.single('listing[image]'),  validateListing ,wrapAsync (listingCountroller.createListing));
 
  //New route
  router.get("/new", isLoggedIn , listingCountroller.renderNewForm);

  //show , update ,delete route
router.route("/:id")
.get( wrapAsync(listingCountroller.showListing))
.put( isLoggedIn, isOwner, upload.single('listing[image]') , validateListing, wrapAsync(listingCountroller.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingCountroller.destroyListing));


//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingCountroller.renderEditForm));


module.exports = router;