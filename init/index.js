// const mongoose = require("mongoose");
// const initData =require("./data.js");
// const Listing = require("../models/listing.js");

// const mongo_url = "mongodb://127.0.0.1:27017/wonderlust"

// main().then(()=>{
//     console.log("connected to database");
// })
// .catch((err)=>{
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(mongo_url);
// }
// const initDB = async () =>{
//      await Listing.deleteMany({});
//      initData.data = initData.data.map((obj)=>({...obj, owner: "66adfe4319c1822ad7456796"}));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };
// initDB();


if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const DB_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
	.then(() => {
		console.log("connected to DB");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect( DB_URL );
}

let categoryAll = [
	"Beachfront",
	"Cabins",
	"Omg",
	"Lake",
	"Design",
	"Amazing Pools",
	"Farms",
	"Amazing Views",
	"Rooms",
	"Lakefront",
	"Tiny Homes",
	"Countryside",
	"Treehouse",
	"Trending",
	"Tropical",
	"National Parks",
	"Casties",
	"Camping",
	"Top Of The World",
	"Luxe",
	"Iconic Cities",
	"Earth Homes",
];

const initDB = async () => {
	await Listing.deleteMany({});
	initData.data = initData.data.map((obj) => ({
		...obj,
		owner: "66adfe4319c1822ad7456796",
		price: obj.price * 25,
		category: [
			`${categoryAll[Math.floor(Math.random() * 22)]}`,
			`${categoryAll[Math.floor(Math.random() * 22)]}`,
		],
	}));
	await Listing.insertMany(initData.data);
	console.log("data was initialized");
};
initDB();