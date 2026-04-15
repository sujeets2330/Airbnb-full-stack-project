const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req,res)=>{
    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
   
    listing.reviews.push(newReview);

     await newReview.save();
     await listing.save();
     req.flash("success", "New Review Added.!");
   return res.redirect(`/listings/${listing._id}`); 
};

// module.exports.destroyReview = async(req,res)=>{
//     let {id ,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     req.flash("success", "Review Deleted.!");
//     return res.redirect(`/listings/${id}`);
//  };
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  
  let review = await Review.findById(reviewId);
  if (!review) {
      req.flash("error", "Review not found!");
      return res.redirect(`/listings/${id}`);
  }

  // Authorization check: Only the review author can delete it
  if (!review.author.equals(req.user._id)) {
      req.flash("error", "You do not have permission to delete this review!");
      return res.redirect(`/listings/${id}`);
  }

  // If authorized, remove review from listing and delete it
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  return res.redirect(`/listings/${id}`);
};
